import React from 'react';
import { FlatList } from 'react-native';
import { YStack, XStack, Text, useTheme } from 'tamagui';

interface Order {
  id: string;
  client: string;
  description: string;
  date: string;
  closedDate: string;
}

const ClosedOrdersTab = () => {
  const theme = useTheme();

  const colors = {
   
    cardBackground: theme.backgroundFocus.val,
    text: theme.color.val,
    secondaryText: theme.colorFocus.val,
    primary: '#007AFF',
    success: '#34C759',
  };

  const orders: Order[] = [
    { id: '098', client: 'Ana Lima', description: 'Troca de peças', date: '05/11/2025', closedDate: '08/11/2025' },
    { id: '097', client: 'Carlos Souza', description: 'Revisão completa', date: '01/11/2025', closedDate: '06/11/2025' },
    { id: '096', client: 'Fernanda Dias', description: 'Ajustes finais', date: '28/10/2025', closedDate: '30/10/2025' },
  ];

  const renderItem = ({ item }: { item: Order }) => (
    <YStack
      bg={"$gray1Dark"}
      padding="$4"
      borderRadius="$4"
      marginBottom="$3"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={4}
      elevation={3}
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
          <Text color="#FFFFFF" fontSize={12} fontWeight="600">
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
    <FlatList
      data={orders}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 100,
      }}
    />
  );
};

export default ClosedOrdersTab;