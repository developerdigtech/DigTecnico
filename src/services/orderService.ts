/**
 * Serviço de Ordens de Serviço
 */

import { apiClient } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { Order, OrderDetail, PaginatedResponse } from '../types/api';

export const orderService = {
  /**
   * Lista todas as ordens de serviço
   */
  async listOrders(params?: {
    page?: number;
    pageSize?: number;
    status?: string;
    tecnicoId?: string;
  }): Promise<PaginatedResponse<Order>> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.pageSize) queryParams.append('pageSize', params.pageSize.toString());
      if (params?.status) queryParams.append('status', params.status);
      if (params?.tecnicoId) queryParams.append('tecnicoId', params.tecnicoId);

      const endpoint = `${API_ENDPOINTS.ORDERS.LIST}?${queryParams.toString()}`;
      const response = await apiClient.get<PaginatedResponse<Order>>(endpoint);

      return response.data;
    } catch (error) {
      console.error('Erro ao listar ordens:', error);
      throw error;
    }
  },

  /**
   * Obtém os detalhes de uma ordem específica
   */
  async getOrderDetail(orderId: string): Promise<OrderDetail> {
    try {
      const response = await apiClient.get<OrderDetail>(
        API_ENDPOINTS.ORDERS.DETAIL(orderId)
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar detalhes da ordem:', error);
      throw error;
    }
  },

  /**
   * Lista ordens abertas
   */
  async getOpenOrders(): Promise<Order[]> {
    try {
      const response = await apiClient.get<Order[]>(
        API_ENDPOINTS.ORDERS.OPEN
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ordens abertas:', error);
      throw error;
    }
  },

  /**
   * Lista ordens fechadas
   */
  async getClosedOrders(params?: {
    startDate?: string;
    endDate?: string;
  }): Promise<Order[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.startDate) queryParams.append('startDate', params.startDate);
      if (params?.endDate) queryParams.append('endDate', params.endDate);

      const endpoint = `${API_ENDPOINTS.ORDERS.CLOSED}?${queryParams.toString()}`;
      const response = await apiClient.get<Order[]>(endpoint);

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ordens fechadas:', error);
      throw error;
    }
  },

  /**
   * Cria uma nova ordem de serviço
   */
  async createOrder(orderData: Partial<Order>): Promise<Order> {
    try {
      const response = await apiClient.post<Order>(
        API_ENDPOINTS.ORDERS.CREATE,
        orderData
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao criar ordem:', error);
      throw error;
    }
  },

  /**
   * Atualiza uma ordem de serviço
   */
  async updateOrder(orderId: string, orderData: Partial<Order>): Promise<Order> {
    try {
      const response = await apiClient.put<Order>(
        API_ENDPOINTS.ORDERS.UPDATE(orderId),
        orderData
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar ordem:', error);
      throw error;
    }
  },

  /**
   * Fecha uma ordem de serviço
   */
  async closeOrder(orderId: string, data: {
    observacoes?: string;
    fotos?: string[];
  }): Promise<Order> {
    try {
      const response = await apiClient.post<Order>(
        API_ENDPOINTS.ORDERS.CLOSE(orderId),
        data
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao fechar ordem:', error);
      throw error;
    }
  },

  /**
   * Obtém estatísticas das ordens
   */
  async getStatistics(): Promise<{
    ordensAbertas: number;
    ordensEmAndamento: number;
    ordensFechadasHoje: number;
    ordensDesignadas: number;
  }> {
    try {
      const response = await apiClient.get<{
        ordensAbertas: number;
        ordensEmAndamento: number;
        ordensFechadasHoje: number;
        ordensDesignadas: number;
      }>(API_ENDPOINTS.ORDERS.STATISTICS);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  },
};
