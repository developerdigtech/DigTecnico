import React from 'react';
import { FlatList, Platform } from 'react-native';
import { YStack, XStack, Text, useTheme } from 'tamagui';
import { useThemeContext } from '../../contexts/ThemeContext';

interface Order {
  id: string;
  client: string;
  description: string;
  date: string;
  status: string;
}

const OpenOrdersTab = () => {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();
  const isAndroid = Platform.OS === 'android';

  const colors = {
    background: isDarkMode ? '#000000' : '#FFFFFF',
    cardBackground: isDarkMode ? '#1F1F1F' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#A0A0A0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    primary: '#007AFF',
    warning: '#F59E0B',
    danger: '#EF4444',
  };

  const orders: Order[] = [
    { id: '001', client: 'João Silva', description: 'Manutenção preventiva', date: '10/11/2025', status: 'Em andamento' },
    { id: '002', client: 'Maria Santos', description: 'Reparo urgente', date: '12/11/2025', status: 'Pendente' },
    { id: '003', client: 'Pedro Costa', description: 'Instalação nova', date: '13/11/2025', status: 'Em andamento' },
  ];

  const renderItem = ({ item }: { item: Order }) => (
    <YStack
      bg={colors.cardBackground}
      padding="$4"
      borderRadius="$4"
      borderWidth={1}
      borderColor={colors.border}
      marginBottom="$3"
      shadowColor={isDarkMode ? "#000000" : "#000000"}
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={isDarkMode ? 0.5 : 0.1}
      shadowRadius={4}
      elevation={isAndroid ? 5 : 3}
      pressStyle={{ opacity: 0.9 }}
      cursor="pointer"
    >
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$2">
        <Text fontSize={16} fontWeight="700" color={colors.primary}>
          OS #{item.id}
        </Text>
        <XStack
          backgroundColor={item.status === 'Em andamento' ? colors.warning : colors.danger}
          paddingHorizontal="$3"
          paddingVertical="$1"
          borderRadius="$3"
        >
          <Text color="#FFFFFF" fontSize={12} fontWeight="600">
            {item.status}
          </Text>
        </XStack>
      </XStack>
      <Text fontSize={18} fontWeight="600" color={colors.text} marginBottom="$1">
        {item.client}
      </Text>
      <Text fontSize={14} color={colors.secondaryText} marginBottom="$2">
        {item.description}
      </Text>
      <Text fontSize={12} color={colors.secondaryText}>
        Data: {item.date}
      </Text>
    </YStack>
  );

  return (
    <YStack flex={1} backgroundColor={colors.background}>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={{ backgroundColor: colors.background }}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 100,
        }}
      />
    </YStack>
  );
};

export default OpenOrdersTab;