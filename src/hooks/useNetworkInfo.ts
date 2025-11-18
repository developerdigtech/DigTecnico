import { useState, useEffect } from 'react';
import NetInfo, { NetInfoState, NetInfoWifiState } from '@react-native-community/netinfo';
import { Platform } from 'react-native';

/**
 * Interface para as informações de rede
 */
interface NetworkInfo {
  isConnected: boolean;
  connectionType: string;
  ssid: string | null; // SSID = Service Set Identifier (nome da rede Wi-Fi)
  ipAddress: string | null;
  frequency: number | null;
  strength: number | null;
  bssid: string | null; // BSSID = Basic Service Set Identifier (endereço MAC do roteador)
  subnet: string | null;
  isInternetReachable: boolean | null;
}

/**
 * Hook personalizado para obter informações detalhadas de rede
 * 
 * O SSID (Service Set Identifier) é o nome da rede Wi-Fi que aparece
 * quando você procura por redes disponíveis no seu dispositivo.
 * 
 * IMPORTANTE: No iOS, devido a restrições de privacidade da Apple,
 * o SSID pode não estar disponível em algumas situações.
 */
export const useNetworkInfo = () => {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    isConnected: false,
    connectionType: 'none',
    ssid: null,
    ipAddress: null,
    frequency: null,
    strength: null,
    bssid: null,
    subnet: null,
    isInternetReachable: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Função para processar informações de rede Wi-Fi
   * 
   * Breakdown da sintaxe networkInfo?.details?.ssid:
   * - networkInfo: Estado que armazena informações da rede
   * - ?.: Operador de encadeamento opcional (optional chaining)
   * - details: Propriedade que contém detalhes específicos da rede
   * - ssid: Propriedade que contém o nome da rede Wi-Fi
   */
  const processWifiInfo = (state: NetInfoWifiState): Partial<NetworkInfo> => {
    const details = state.details;
    
    return {
      // O operador ?. é crucial aqui porque:
      // - Se details for null ou undefined → retorna undefined
      // - Só acessa as propriedades se details existir
      // - Evita erros de "Cannot read property of null/undefined"
      ssid: details?.ssid || null,
      ipAddress: details?.ipAddress || null,
      frequency: details?.frequency || null,
      strength: details?.strength || null,
      bssid: details?.bssid || null,
      subnet: details?.subnet || null,
    };
  };

  /**
   * Função para atualizar as informações de rede
   */
  const updateNetworkInfo = (state: NetInfoState) => {
    try {
      const baseInfo: NetworkInfo = {
        isConnected: state.isConnected ?? false,
        connectionType: state.type || 'none',
        isInternetReachable: state.isInternetReachable,
        ssid: null,
        ipAddress: null,
        frequency: null,
        strength: null,
        bssid: null,
        subnet: null,
      };

      // Se estivermos conectados via Wi-Fi, extrair informações específicas
      if (state.type === 'wifi' && state.isConnected) {
        const wifiInfo = processWifiInfo(state as NetInfoWifiState);
        setNetworkInfo({ ...baseInfo, ...wifiInfo });
      } else {
        setNetworkInfo(baseInfo);
      }

      setError(null);
    } catch (err) {
      console.error('Erro ao processar informações de rede:', err);
      setError('Erro ao obter informações de rede');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Obter estado inicial da rede
    NetInfo.fetch().then(updateNetworkInfo);

    // Escutar mudanças na conexão de rede
    const unsubscribe = NetInfo.addEventListener(updateNetworkInfo);

    return () => {
      unsubscribe();
    };
  }, []);

  /**
   * Função para obter o SSID de forma mais detalhada
   * 
   * Exemplo de uso:
   * const ssidInfo = getSSIDInfo();
   * console.log(ssidInfo.displayName); // "MinhaRede_5G" ou "Não disponível"
   */
  const getSSIDInfo = () => {
    const ssid = networkInfo.ssid;
    
    // Verificações específicas para diferentes cenários
    if (!ssid) {
      if (Platform.OS === 'ios') {
        return {
          displayName: 'Não disponível (iOS)',
          reason: 'Restrições de privacidade do iOS podem impedir o acesso ao SSID',
          available: false,
        };
      }
      return {
        displayName: 'Não disponível',
        reason: 'Não conectado ao Wi-Fi ou SSID não detectado',
        available: false,
      };
    }

    // Alguns roteadores retornam '<unknown ssid>' quando o SSID está oculto
    if (ssid === '<unknown ssid>') {
      return {
        displayName: 'Rede oculta',
        reason: 'Rede Wi-Fi com SSID oculto',
        available: true,
        hidden: true,
      };
    }

    return {
      displayName: ssid,
      reason: 'SSID obtido com sucesso',
      available: true,
      hidden: false,
    };
  };

  /**
   * Função para atualizar manualmente as informações
   */
  const refresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const state = await NetInfo.fetch();
      updateNetworkInfo(state);
    } catch (err) {
      console.error('Erro ao atualizar informações de rede:', err);
      setError('Erro ao atualizar informações de rede');
      setLoading(false);
    }
  };

  /**
   * Função para verificar se estamos na mesma rede que um SSID específico
   */
  const isSameNetwork = (targetSSID: string): boolean => {
    const currentSSID = networkInfo.ssid;
    return currentSSID !== null && currentSSID === targetSSID;
  };

  return {
    networkInfo,
    loading,
    error,
    refresh,
    getSSIDInfo,
    isSameNetwork,
    
    // Propriedades computadas para facilitar o uso
    isWifi: networkInfo.connectionType === 'wifi',
    isMobile: networkInfo.connectionType === 'cellular',
    hasInternet: networkInfo.isInternetReachable === true,
  };
};
