/**
 * Serviço de Dashboard
 */

import { apiClient } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { DashboardStats, Order } from '../types/api';

export const dashboardService = {
  /**
   * Obtém estatísticas do dashboard
   */
  async getStats(): Promise<DashboardStats> {
    try {
      const response = await apiClient.get<DashboardStats>(
        API_ENDPOINTS.DASHBOARD.STATS
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw error;
    }
  },

  /**
   * Obtém ordens recentes
   */
  async getRecentOrders(limit: number = 10): Promise<Order[]> {
    try {
      const response = await apiClient.get<Order[]>(
        `${API_ENDPOINTS.DASHBOARD.RECENT_ORDERS}?limit=${limit}`
      );

      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ordens recentes:', error);
      throw error;
    }
  },
};
