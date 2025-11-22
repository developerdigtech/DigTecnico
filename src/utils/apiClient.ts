/**
 * Cliente HTTP para fazer requisições à API
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../config/api';
import { ApiResponse, ApiError } from '../types/api';

// Chaves para armazenamento
const STORAGE_KEYS = {
  TOKEN: '@DigTecnico:token',
  REFRESH_TOKEN: '@DigTecnico:refreshToken',
  USER: '@DigTecnico:user',
};

export class ApiClient {
  private static instance: ApiClient;
  private token: string | null = null;

  private constructor() {
    this.loadToken();
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  // Carrega o token do storage
  private async loadToken() {
    try {
      this.token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch (error) {
      console.error('Erro ao carregar token:', error);
    }
  }

  // Define o token de autenticação
  async setToken(token: string) {
    this.token = token;
    await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  // Remove o token de autenticação
  async clearToken() {
    this.token = null;
    await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  }

  // Método genérico para fazer requisições
  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    useRootUrl = false
  ): Promise<ApiResponse<T>> {
    try {
      // Garante que o token está carregado
      if (!this.token) {
        await this.loadToken();
      }

      // Monta headers
      const headers: Record<string, string> = {
        ...API_CONFIG.HEADERS,
        ...(options.headers as Record<string, string>),
      };

      // Adiciona token se existir
      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      // Monta URL completa - usa ROOT_URL se especificado
      const baseUrl = useRootUrl ? API_CONFIG.ROOT_URL : API_CONFIG.BASE_URL;
      const url = `${baseUrl}${endpoint}`;

      // Faz a requisição com timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Parse da resposta
      const data = await response.json();

      // Verifica se houve erro HTTP
      if (!response.ok) {
        const error: ApiError = {
          success: false,
          error: data.error || 'Erro desconhecido',
          message: data.message || 'Ocorreu um erro na requisição',
          statusCode: response.status,
        };

        // Se for erro 401, limpa o token
        if (response.status === 401) {
          await this.clearToken();
        }

        throw error;
      }

      // Se a resposta já está no formato ApiResponse, retorna direto
      // Caso contrário, envolve os dados no formato esperado
      if (data && typeof data === 'object' && 'success' in data && 'data' in data) {
        return data;
      }

      // A API retornou dados diretos (array ou objeto), então envolvemos no formato ApiResponse
      return {
        success: true,
        data: data,
      } as ApiResponse<T>;
    } catch (error: any) {
      // Tratamento de erros
      if (error.name === 'AbortError') {
        throw {
          success: false,
          error: 'timeout',
          message: 'A requisição demorou muito para responder',
          statusCode: 408,
        } as ApiError;
      }

      if (error.success === false) {
        throw error;
      }

      throw {
        success: false,
        error: 'network_error',
        message: 'Erro de conexão com o servidor',
        statusCode: 0,
      } as ApiError;
    }
  }

  // Métodos HTTP

  async get<T>(endpoint: string, useRootUrl = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'GET',
    }, useRootUrl);
  }

  async post<T>(endpoint: string, body?: any, useRootUrl = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }, useRootUrl);
  }

  async put<T>(endpoint: string, body?: any, useRootUrl = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    }, useRootUrl);
  }

  async patch<T>(endpoint: string, body?: any, useRootUrl = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }, useRootUrl);
  }

  async delete<T>(endpoint: string, useRootUrl = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    }, useRootUrl);
  }
}

// Exporta instância única
export const apiClient = ApiClient.getInstance();
