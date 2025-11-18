import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { useNetworkInfo } from '../../hooks/useNetworkInfo';
import { Wifi, AlertTriangle, CheckCircle, Copy } from '@tamagui/lucide-icons';

interface TechnicianNetworkCheckProps {
  isDarkMode?: boolean;
  clientWifiName?: string; // Nome da rede do cliente (se conhecida)
}

/**
 * Componente para verificar se o técnico está conectado na mesma rede do cliente
 * Demonstra uso prático do SSID para diagnóstico de campo
 */
export const TechnicianNetworkCheck: React.FC<TechnicianNetworkCheckProps> = ({ 
  isDarkMode = false, 
  clientWifiName 
}) => {
  const { networkInfo, getSSIDInfo, isSameNetwork, isWifi } = useNetworkInfo();

  const colors = {
    cardBackground: isDarkMode ? '#1F1F1F' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#A0A0A0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
  };

  const ssidInfo = getSSIDInfo();

  /**
   * Verifica se técnico e cliente estão na mesma rede
   * Útil para diagnósticos e testes de conectividade
   */
  const getNetworkStatus = () => {
    if (!isWifi || !ssidInfo.available) {
      return {
        status: 'warning',
        message: 'Técnico não está conectado ao Wi-Fi',
        recommendation: 'Conecte-se ao Wi-Fi para realizar testes de rede',
        icon: AlertTriangle,
        color: colors.warning,
      };
    }

    if (clientWifiName && isSameNetwork(clientWifiName)) {
      return {
        status: 'success',
        message: 'Técnico conectado à rede do cliente',
        recommendation: 'Ideal para testes de conectividade e diagnósticos',
        icon: CheckCircle,
        color: colors.success,
      };
    }

    if (clientWifiName && !isSameNetwork(clientWifiName)) {
      return {
        status: 'warning',
        message: 'Técnico em rede diferente do cliente',
        recommendation: `Considere conectar-se à rede: ${clientWifiName}`,
        icon: AlertTriangle,
        color: colors.warning,
      };
    }

    return {
      status: 'info',
      message: 'Rede do cliente não informada',
      recommendation: 'Verifique qual rede Wi-Fi o cliente utiliza',
      icon: Wifi,
      color: colors.secondaryText,
    };
  };

  const networkStatus = getNetworkStatus();

  const copySSID = () => {
    if (ssidInfo.displayName) {
      // Aqui você implementaria a cópia para clipboard
      console.log('SSID copiado:', ssidInfo.displayName);
    }
  };

  return (
    <Card
      backgroundColor={colors.cardBackground}
      padding="$4"
      borderRadius="$4"
      borderWidth={1}
      borderColor={colors.border}
      shadowColor={isDarkMode ? "#000000" : "#000000"}
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={isDarkMode ? 0.3 : 0.1}
      shadowRadius={4}
      elevation={3}
    >
      {/* Header */}
      <XStack alignItems="center" gap="$3" marginBottom="$3">
        <networkStatus.icon size={20} color={networkStatus.color} />
        <YStack flex={1}>
          <Text color={colors.text} fontSize={16} fontWeight="700">
            Diagnóstico de Rede
          </Text>
          <Text color={colors.secondaryText} fontSize={12}>
            Verificação da conectividade do técnico
          </Text>
        </YStack>
      </XStack>

      {/* Status atual */}
      <YStack 
        backgroundColor={networkStatus.color} 
        padding="$3" 
        borderRadius="$3" 
        marginBottom="$3"
        opacity={0.9}
      >
        <Text color="#FFFFFF" fontSize={14} fontWeight="600" marginBottom="$1">
          {networkStatus.message}
        </Text>
        <Text color="#FFFFFF" fontSize={12}>
          {networkStatus.recommendation}
        </Text>
      </YStack>

      {/* Informações detalhadas */}
      <YStack gap="$2">
        {/* Rede do técnico */}
        <XStack alignItems="center" justifyContent="space-between">
          <YStack flex={1}>
            <Text color={colors.secondaryText} fontSize={12}>
              Rede do Técnico (SSID)
            </Text>
            <Text color={colors.text} fontSize={14} fontWeight="500">
              {ssidInfo.displayName}
            </Text>
          </YStack>
          
          {ssidInfo.available && (
            <TouchableOpacity onPress={copySSID}>
              <XStack
                backgroundColor={colors.success}
                paddingHorizontal="$2"
                paddingVertical="$1"
                borderRadius="$2"
                alignItems="center"
                gap="$1"
              >
                <Copy size={10} color="#FFFFFF" />
                <Text fontSize={9} color="#FFFFFF" fontWeight="600">
                  Copiar
                </Text>
              </XStack>
            </TouchableOpacity>
          )}
        </XStack>

        {/* Rede do cliente (se informada) */}
        {clientWifiName && (
          <XStack alignItems="center">
            <YStack flex={1}>
              <Text color={colors.secondaryText} fontSize={12}>
                Rede do Cliente
              </Text>
              <Text color={colors.text} fontSize={14} fontWeight="500">
                {clientWifiName}
              </Text>
            </YStack>
          </XStack>
        )}

        {/* Informações técnicas */}
        {networkInfo.ipAddress && (
          <XStack alignItems="center">
            <YStack flex={1}>
              <Text color={colors.secondaryText} fontSize={12}>
                IP do Técnico
              </Text>
              <Text color={colors.text} fontSize={14} fontWeight="500">
                {networkInfo.ipAddress}
              </Text>
            </YStack>
          </XStack>
        )}
      </YStack>

      {/* Exemplo de código para desenvolvedores */}
      <YStack 
        backgroundColor={isDarkMode ? '#0F172A' : '#F8FAFC'} 
        padding="$3" 
        borderRadius="$3" 
        marginTop="$3"
      >
        <Text color={colors.text} fontSize={11} fontWeight="600" marginBottom="$2">
          💡 Como funciona o SSID:
        </Text>
        <Text color={colors.secondaryText} fontSize={10} fontFamily="monospace">
{`// SSID = Service Set Identifier (nome da rede Wi-Fi)
const { getSSIDInfo, isSameNetwork } = useNetworkInfo();

// Obter informações detalhadas do SSID
const ssidInfo = getSSIDInfo();
console.log(ssidInfo.displayName); // "${ssidInfo.displayName}"

// Verificar se está na mesma rede que o cliente
const sameNetwork = isSameNetwork("${clientWifiName || 'MinhaRede'}");

// Sintaxe de acesso seguro
const ssid = networkInfo?.details?.ssid;`}
        </Text>
      </YStack>
    </Card>
  );
};
