/**
 * Serviço de Almoxarifado
 */

import { apiClient } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { Material, StockOrder, StockOrderItem } from '../types/api';

export const warehouseService = {
  /**
   * Lista todos os materiais em estoque
   */
  async getStock(params?: {
    search?: string;
    category?: string;
  }): Promise<Material[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.search) queryParams.append('search', params.search);
      if (params?.category) queryParams.append('category', params.category);

      const endpoint = `${API_ENDPOINTS.WAREHOUSE.STOCK}?${queryParams.toString()}`;
      const response = await apiClient.get<Material[]>(endpoint);

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estoque:', error);
      throw error;
    }
  },

  /**
   * Lista pedidos de material
   */
  async getOrders(params?: {
    status?: string;
    tecnicoId?: string;
  }): Promise<StockOrder[]> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params?.status) queryParams.append('status', params.status);
      if (params?.tecnicoId) queryParams.append('tecnicoId', params.tecnicoId);

      const endpoint = `${API_ENDPOINTS.WAREHOUSE.ORDERS}?${queryParams.toString()}`;
      const response = await apiClient.get<StockOrder[]>(endpoint);

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw error;
    }
  },

  /**
   * Cria um novo pedido de material
   */
  async createOrder(orderData: {
    itens: { materialId: string; quantidade: number }[];
    observacoes?: string;
  }): Promise<StockOrder> {
    try {
      const response = await apiClient.post<StockOrder>(
        API_ENDPOINTS.WAREHOUSE.CREATE_ORDER,
        orderData
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw error;
    }
  },

  /**
   * Atualiza a quantidade de um material no estoque
   */
  async updateStock(materialId: string, quantity: number): Promise<Material> {
    try {
      const response = await apiClient.put<Material>(
        API_ENDPOINTS.WAREHOUSE.UPDATE_STOCK,
        { materialId, quantity }
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar estoque:', error);
      throw error;
    }
  },
};
