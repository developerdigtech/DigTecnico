import React from 'react';
import { YStack, XStack, Text, Card } from 'tamagui';
import { Platform } from 'react-native';
import { useNetworkInfo } from '../../hooks/useNetworkInfo';
import { Wifi, WifiOff, Smartphone, AlertTriangle, Eye, EyeOff } from '@tamagui/lucide-icons';

interface SSIDDisplayProps {
  isDarkMode?: boolean;
}

/**
 * Componente para exibir informações de SSID (nome da rede Wi-Fi)
 * 
 * Este componente demonstra como usar o SSID de forma prática,
 * incluindo tratamento de diferentes cenários e limitações de plataforma.
 */
export const SSIDDisplay: React.FC<SSIDDisplayProps> = ({ isDarkMode = false }) => {
  const { networkInfo, loading, isWifi, getSSIDInfo } = useNetworkInfo();

  const colors = {
    cardBackground: isDarkMode ? '#1F1F1F' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#A0A0A0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  };

  const ssidInfo = getSSIDInfo();

  if (loading) {
    return (
      <Card backgroundColor={colors.cardBackground} padding="$4" borderRadius="$4">
        <Text color={colors.text}>Carregando informações de rede...</Text>
      </Card>
    );
  }

  /**
   * Função para renderizar o ícone baseado no tipo de conexão
   */
  const renderConnectionIcon = () => {
    if (!networkInfo.isConnected) {
      return <WifiOff size={20} color={colors.danger} />;
    }

    if (isWifi) {
      return <Wifi size={20} color={colors.success} />;
    }

    return <Smartphone size={20} color={colors.info} />;
  };

  /**
   * Função para renderizar o SSID com tratamento de diferentes cenários
   */
  const renderSSIDInfo = () => {
    if (!isWifi) {
      return (
        <XStack alignItems="center" gap="$2">
          <Smartphone size={16} color={colors.info} />
          <Text color={colors.text} fontSize={14}>
            Não conectado ao Wi-Fi
          </Text>
        </XStack>
      );
    }

    return (
      <YStack gap="$2">
        <XStack alignItems="center" gap="$2">
          {ssidInfo.hidden ? (
            <EyeOff size={16} color={colors.warning} />
          ) : (
            <Eye size={16} color={colors.success} />
          )}
          
          <Text color={colors.text} fontSize={16} fontWeight="600">
            {/* 
              Breakdown da sintaxe: networkInfo?.details?.ssid
              1. networkInfo: Estado que armazena informações da rede
              2. ?.: Operador de encadeamento opcional
              3. details: Propriedade com detalhes específicos da rede  
              4. ssid: Nome da rede Wi-Fi (Service Set Identifier)
            */}
            SSID: {ssidInfo.displayName}
          </Text>
        </XStack>

        {/* Explicação do status */}
        <Text color={colors.secondaryText} fontSize={12}>
          {ssidInfo.reason}
        </Text>

        {/* Aviso específico para iOS */}
        {Platform.OS === 'ios' && !ssidInfo.available && (
          <XStack 
            backgroundColor={colors.warning} 
            padding="$2" 
            borderRadius="$3" 
            alignItems="center" 
            gap="$2"
          >
            <AlertTriangle size={14} color="#FFFFFF" />
            <Text color="#FFFFFF" fontSize={11} flex={1}>
              iOS pode restringir acesso ao SSID por questões de privacidade
            </Text>
          </XStack>
        )}

        {/* Informações técnicas adicionais */}
        {ssidInfo.available && networkInfo.bssid && (
          <YStack gap="$1" marginTop="$2">
            <Text color={colors.secondaryText} fontSize={12}>
              Detalhes técnicos:
            </Text>
            <Text color={colors.secondaryText} fontSize={11}>
              BSSID: {networkInfo.bssid}
            </Text>
            {networkInfo.frequency && (
              <Text color={colors.secondaryText} fontSize={11}>
                Frequência: {networkInfo.frequency} MHz
              </Text>
            )}
            {networkInfo.ipAddress && (
              <Text color={colors.secondaryText} fontSize={11}>
                IP: {networkInfo.ipAddress}
              </Text>
            )}
          </YStack>
        )}
      </YStack>
    );
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
        {renderConnectionIcon()}
        <YStack flex={1}>
          <Text color={colors.text} fontSize={16} fontWeight="700">
            Informações de Rede
          </Text>
          <Text color={colors.secondaryText} fontSize={12}>
            {networkInfo.connectionType === 'wifi' ? 'Wi-Fi' : 
             networkInfo.connectionType === 'cellular' ? 'Dados Móveis' : 
             'Sem conexão'}
          </Text>
        </YStack>
      </XStack>

      {/* SSID Info */}
      {renderSSIDInfo()}

      {/* Exemplo de uso prático */}
      {ssidInfo.available && (
        <YStack 
          backgroundColor={isDarkMode ? '#0F172A' : '#F8FAFC'} 
          padding="$3" 
          borderRadius="$3" 
          marginTop="$3"
        >
          <Text color={colors.text} fontSize={12} fontWeight="600" marginBottom="$1">
            Exemplo de uso no código:
          </Text>
          <Text color={colors.secondaryText} fontSize={11} fontFamily="monospace">
            {`// Acessando o SSID de forma segura
const ssid = networkInfo?.details?.ssid;

// Com o hook personalizado
const { getSSIDInfo } = useNetworkInfo();
const ssidInfo = getSSIDInfo();`}
          </Text>
        </YStack>
      )}
    </Card>
  );
};
