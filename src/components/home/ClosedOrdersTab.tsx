import React from 'react';
import { FlatList, Platform } from 'react-native';
import { YStack, XStack, Text, useTheme } from 'tamagui';
import { useThemeContext } from '../../contexts/ThemeContext';

interface Order {
  id: string;
  client: string;
  description: string;
  date: string;
  closedDate: string;
}

const ClosedOrdersTab = () => {
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
    success: '#1fae4fff',
  };

  const orders: Order[] = [
    { id: '098', client: 'Ana Lima', description: 'Troca de peças', date: '05/11/2025', closedDate: '08/11/2025' },
    { id: '097', client: 'Carlos Souza', description: 'Revisão completa', date: '01/11/2025', closedDate: '06/11/2025' },
    { id: '096', client: 'Fernanda Dias', description: 'Ajustes finais', date: '28/10/2025', closedDate: '30/10/2025' },
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
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$2" >
        <Text fontSize={16} fontWeight="700" color={colors.primary}>
          OS #{item.id}
        </Text>
        <XStack
          backgroundColor={colors.success}
          paddingHorizontal="$3"
          paddingVertical="$1"
          borderRadius="$3"
        >
          <Text color="#FFFFFF" fontSize={12} fontWeight="800">
            Finalizada
          </Text>
        </XStack>
      </XStack>
      <Text fontSize={18} fontWeight="600" color={colors.text} marginBottom="$1">
        {item.client}
      </Text>
      <Text fontSize={14} color={colors.secondaryText} marginBottom="$2">
        {item.description}
      </Text>
      <XStack justifyContent="space-between">
        <Text fontSize={12} color={colors.secondaryText}>
          Abertura: {item.date}
        </Text>
        <Text fontSize={12} color={colors.secondaryText}>
          Conclusão: {item.closedDate}
        </Text>
      </XStack>
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

export default ClosedOrdersTab;