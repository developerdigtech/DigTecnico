import { apiClient } from '../utils/apiClient';
import { API_ENDPOINTS } from '../config/api';
import { Customer } from '../types/api';

export const customerService = {
  /**
   * Busca clientes por termo (Nome, CPF/CNPJ ou ID)
   * Endpoint: /customers?search=TERMO
   */
  async searchCustomers(term: string): Promise<Customer[]> {
    try {
      // O apiClient já injeta o token JWT automaticamente
      const endpoint = `${API_ENDPOINTS.CUSTOMERS.SEARCH}?search=${encodeURIComponent(term)}`;

      // A API retorna o array direto, mas o apiClient envolve em { success, data }
      const response = await apiClient.get<Customer[]>(endpoint);

      // O apiClient agora sempre retorna { success: boolean, data: T }
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  },


};