/**
 * Serviço de Autenticação
 */

import { apiClient } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { LoginRequest, LoginResponse, User } from '../types/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  TOKEN: '@DigTecnico:token',
  REFRESH_TOKEN: '@DigTecnico:refreshToken',
  USER: '@DigTecnico:user',
};

export const authService = {
  /**
   * Realiza o login do usuário
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<any>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      console.log('Resposta completa da API:', response);

      // A resposta pode vir em response.data ou diretamente em response
      // dependendo de como o apiClient está configurado
      const responseData = response.data || response;

      console.log('Response data:', responseData);

      // Valida se tem access_token
      if (!responseData.access_token) {
        console.error('Estrutura de resposta:', responseData);
        throw new Error('Token não encontrado na resposta');
      }

      // Valida se tem usuário
      if (!responseData.user) {
        console.error('Estrutura de resposta:', responseData);
        throw new Error('Dados do usuário não encontrados na resposta');
      }

      const userData = responseData.user;
      const filialData = responseData.filia || responseData.filial || {};

      // Monta os dados no formato esperado pela aplicação
      const loginData: LoginResponse = {
        token: responseData.access_token,
        refreshToken: responseData.access_token, // API não retornou refresh token no exemplo
        user: {
          id: userData.funcionario_id?.toString() || userData.id?.toString() || '',
          name: userData.nome || '',
          username: userData.email?.split('@')[0] || '',
          email: userData.email || '',
          phone: filialData.telefone || '',
          avatar: userData.avatar,
          role: 'technician', // Assumindo técnico por padrão
          filial: filialData.fantasia || filialData.razao_social || '',
          location: '',
          organizationId: filialData.id?.toString(),
          branchId: filialData.id?.toString(),
          externalUserId: userData.funcionario_id?.toString()
        }
      };

      console.log('Dados processados:', loginData);

      // Armazena token
      await apiClient.setToken(loginData.token);

      // Armazena refresh token
      if (loginData.refreshToken) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.REFRESH_TOKEN,
          loginData.refreshToken
        );
      }

      // Armazena dados do usuário
      await AsyncStorage.setItem(
        STORAGE_KEYS.USER,
        JSON.stringify(loginData.user)
      );

      // Armazena dados da filial
      if (filialData && filialData.id) {
        await AsyncStorage.setItem(
          '@DigTecnico:filial',
          JSON.stringify(filialData)
        );
      }

      return loginData;
    } catch (error: any) {
      console.error('Erro no login:', error);

      // Se o erro já tem statusCode, repassa ele
      if (error.statusCode !== undefined) {
        throw error;
      }

      // Senão, cria um erro genérico
      throw {
        success: false,
        error: 'login_failed',
        message: error.message || 'Falha ao realizar login',
        statusCode: 500,
      };
    }
  },

  /**
   * Realiza o logout do usuário
   */
  async logout(): Promise<void> {
    try {
      // Tenta fazer logout no servidor
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error('Erro ao fazer logout no servidor:', error);
    } finally {
      // Limpa dados locais independente do resultado
      await apiClient.clearToken();
    }
  },

  /**
   * Verifica se o usuário está autenticado
   */
  async isAuthenticated(): Promise<boolean> {
    try {
      const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
      return !!token;
    } catch (error) {
      return false;
    }
  },

  /**
   * Obtém os dados do usuário armazenados
   */
  async getUserData(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erro ao recuperar dados do usuário:', error);
      return null;
    }
  },

  /**
   * Atualiza o token usando o refresh token
   */
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

      if (!refreshToken) {
        return null;
      }

      const response = await apiClient.post<{ token: string }>(
        API_ENDPOINTS.AUTH.REFRESH_TOKEN,
        { refreshToken }
      );

      if (response.success && response.data.token) {
        await apiClient.setToken(response.data.token);
        return response.data.token;
      }

      return null;
    } catch (error) {
      console.error('Erro ao renovar token:', error);
      return null;
    }
  },
};
