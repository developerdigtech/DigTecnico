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
      const response = await apiClient.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      if (response.success && response.data) {
        // Armazena token
        await apiClient.setToken(response.data.token);
        
        // Armazena refresh token
        await AsyncStorage.setItem(
          STORAGE_KEYS.REFRESH_TOKEN,
          response.data.refreshToken
        );
        
        // Armazena dados do usuário
        await AsyncStorage.setItem(
          STORAGE_KEYS.USER,
          JSON.stringify(response.data.user)
        );

        return response.data;
      }

      throw new Error('Falha ao realizar login');
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
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
