/**
 * Serviço de Empresa/Filial
 * Responsável por buscar informações da empresa e filial
 */

import { API_ENDPOINTS } from '../config/api';
import { apiClient } from '../utils/apiClient';
import { CompanyBranch, ApiResponse } from '../types/api';

/**
 * Busca os dados de uma filial específica
 * @param organizationId - ID da organização
 * @param branchId - ID da filial
 * @returns Dados completos da filial
 */
const getBranchInfo = async (
  organizationId: string,
  branchId: string
): Promise<CompanyBranch> => {
  try {
    // Usa useRootUrl = true porque este endpoint não usa o prefixo /mobile
    const response = await apiClient.get<CompanyBranch>(
      API_ENDPOINTS.COMPANY.BRANCH(organizationId, branchId),
      true // useRootUrl
    );
    return response.data || response;
  } catch (error: any) {
    console.error('Erro ao buscar dados da filial:', error);
    throw error;
  }
};

export const companyService = {
  getBranchInfo,
};
