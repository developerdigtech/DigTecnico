import React from 'react';
import { FlatList } from 'react-native';
import { YStack, XStack, Text, useTheme } from 'tamagui';

interface Order {
  id: string;
  client: string;
  description: string;
  date: string;
  status: string;
}

const OpenOrdersTab = () => {
  const theme = useTheme();

  const colors = {
   
    cardBackground: theme.backgroundFocus.val,
    text: theme.color.val,
    secondaryText: theme.colorFocus.val,
    primary: '#007AFF',
    warning: '#FF9500',
    danger: '#FF3B30',
  };

  const orders: Order[] = [
    { id: '001', client: 'João Silva', description: 'Manutenção preventiva', date: '10/11/2025', status: 'Em andamento' },
    { id: '002', client: 'Maria Santos', description: 'Reparo urgente', date: '12/11/2025', status: 'Pendente' },
    { id: '003', client: 'Pedro Costa', description: 'Instalação nova', date: '13/11/2025', status: 'Em andamento' },
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

export default OpenOrdersTab;