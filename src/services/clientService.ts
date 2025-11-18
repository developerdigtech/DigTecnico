/**
 * Serviço de Clientes
 */

import { apiClient } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { Client, PaginatedResponse } from '../types/api';

export const clientService = {
  /**
   * Lista todos os clientes
   */
  async listClients(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
  }): Promise<PaginatedResponse<Client>> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
      if (params?.search) queryParams.append('search', params.search);

      const endpoint = `${API_ENDPOINTS.CLIENTS.LIST}?${queryParams.toString()}`;
      const response = await apiClient.get<PaginatedResponse<Client>>(endpoint);

      return response.data;
    } catch (error) {
      console.error('Erro ao listar clientes:', error);
      throw error;
    }
  },

  /**
   * Obtém os detalhes de um cliente específico
   */
  async getClientDetail(clientId: string): Promise<Client> {
    try {
      const response = await apiClient.get<Client>(
        API_ENDPOINTS.CLIENTS.DETAIL(clientId)
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes do cliente:', error);
      throw error;
    }
  },

  /**
   * Busca clientes por nome, CPF/CNPJ ou telefone
   */
  async searchClients(query: string): Promise<Client[]> {
    try {
      const response = await apiClient.get<Client[]>(
        `${API_ENDPOINTS.CLIENTS.SEARCH}?q=${encodeURIComponent(query)}`
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  },
};
