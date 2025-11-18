/**
 * Hook para gerenciar ordens de serviço
 */

import { useState, useEffect, useCallback } from 'react';
import { orderService } from '../services/orderService';
import { Order, OrderDetail } from '../types/api';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async (params?: {
    status?: string;
    tecnicoId?: string;
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await orderService.listOrders(params);
      setOrders(response.data);
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar ordens');
      console.error('Erro ao buscar ordens:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getOrderDetail = useCallback(async (orderId: string): Promise<OrderDetail | null> => {
    try {
      setIsLoading(true);
      setError(null);
      const order = await orderService.getOrderDetail(orderId);
      return order;
    } catch (err: any) {
      setError(err.message || 'Erro ao buscar detalhes da ordem');
      console.error('Erro ao buscar detalhes:', err);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const closeOrder = useCallback(async (orderId: string, data: {
    observacoes?: string;
    fotos?: string[];
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      const updatedOrder = await orderService.closeOrder(orderId, data);
      
      // Atualiza a lista local
      setOrders(prev => prev.map(order => 
        order.id === orderId ? updatedOrder : order
      ));
      
      return updatedOrder;
    } catch (err: any) {
      setError(err.message || 'Erro ao fechar ordem');
      console.error('Erro ao fechar ordem:', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    orders,
    isLoading,
    error,
    fetchOrders,
    getOrderDetail,
    closeOrder,
  };
};
