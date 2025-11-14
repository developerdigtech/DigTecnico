import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { YStack, useTheme } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { Text, Input, Button } from 'tamagui';
import { Search, Package, Plus, Send } from '@tamagui/lucide-icons';

const AlmoxarifadoScreen = () => {
  const layout = useWindowDimensions();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'estoque', title: 'Meu Estoque' },
    { key: 'pedidos', title: 'Pedidos & Envios' },
  ]);

  const colors = {
    background: theme.background.val || '#000000',
    cardBackground: theme.backgroundFocus.val || '#111111',
    text: theme.color.val || '#FFFFFF',
    secondaryText: theme.colorFocus.val || '#9CA3AF',
    border: theme.borderColor.val || '#1F1F1F',
    primary: '#22C55E',
  };

  // Componente de Estoque
  const EstoqueTab = () => (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <YStack padding="$4" gap="$4" backgroundColor={colors.background}>
        <YStack gap="$2" alignItems="center">
          <Text fontSize={24} fontWeight="800" color={colors.text}>
            Meu Estoque
          </Text>
          <Text fontSize={14} color={colors.secondaryText}>
            Gerencie seus produtos e monitore o estoque
          </Text>
        </YStack>
        
        <YStack backgroundColor={colors.cardBackground} padding="$4" borderRadius="$3" borderWidth={1} borderColor={colors.border}>
          <Text fontSize={16} fontWeight="600" color={colors.text} marginBottom="$3">
            Produtos em Estoque
          </Text>
          
          <YStack gap="$3">
            <YStack backgroundColor={colors.background} padding="$3" borderRadius="$2">
              <Text fontSize={14} fontWeight="500" color={colors.text}>Parafuso Phillips 6x40mm</Text>
              <Text fontSize={12} color={colors.secondaryText}>Código: PAR001 • Quantidade: 150 unid</Text>
              <Text fontSize={12} color={colors.primary}>R$ 0,25 por unid</Text>
            </YStack>
            
            <YStack backgroundColor={colors.background} padding="$3" borderRadius="$2">
              <Text fontSize={14} fontWeight="500" color={colors.text}>Cabo Elétrico 2.5mm²</Text>
              <Text fontSize={12} color={colors.secondaryText}>Código: CAB001 • Quantidade: 25 m</Text>
              <Text fontSize={12} color="#F59E0B">Estoque baixo</Text>
            </YStack>
            
            <YStack backgroundColor={colors.background} padding="$3" borderRadius="$2">
              <Text fontSize={14} fontWeight="500" color={colors.text}>Disjuntor 20A</Text>
              <Text fontSize={12} color={colors.secondaryText}>Código: DIS001 • Quantidade: 8 unid</Text>
              <Text fontSize={12} color="#EF4444">Estoque crítico</Text>
            </YStack>
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );

  // Componente de Pedidos
  const PedidosTab = () => (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <YStack padding="$4" gap="$4" backgroundColor={colors.background}>
        <YStack gap="$2" alignItems="center">
          <Text fontSize={24} fontWeight="800" color={colors.text}>
            Pedidos & Envios
          </Text>
          <Text fontSize={14} color={colors.secondaryText}>
            Gerencie entradas e saídas do estoque
          </Text>
        </YStack>
        
        <Button backgroundColor={colors.primary} borderRadius="$3" size="$4">
          <Text color="white" fontSize={16} fontWeight="600">
            + Novo Pedido
          </Text>
        </Button>
        
        <YStack backgroundColor={colors.cardBackground} padding="$4" borderRadius="$3" borderWidth={1} borderColor={colors.border}>
          <Text fontSize={16} fontWeight="600" color={colors.text} marginBottom="$3">
            Pedidos Recentes
          </Text>
          
          <YStack gap="$3">
            <YStack backgroundColor={colors.background} padding="$3" borderRadius="$2">
              <Text fontSize={14} fontWeight="500" color={colors.text}>Entrada: Parafuso Phillips 6x40mm</Text>
              <Text fontSize={12} color={colors.secondaryText}>Quantidade: 100 unid • Solicitante: João Silva</Text>
              <Text fontSize={12} color="#F59E0B">Status: Pendente</Text>
            </YStack>
            
            <YStack backgroundColor={colors.background} padding="$3" borderRadius="$2">
              <Text fontSize={14} fontWeight="500" color={colors.text}>Saída: Cabo Elétrico 2.5mm²</Text>
              <Text fontSize={12} color={colors.secondaryText}>Quantidade: 50 m • Destino: Obra Centro</Text>
              <Text fontSize={12} color="#3B82F6">Status: Aprovado</Text>
            </YStack>
            
            <YStack backgroundColor={colors.background} padding="$3" borderRadius="$2">
              <Text fontSize={14} fontWeight="500" color={colors.text}>Entrada: Disjuntor 20A</Text>
              <Text fontSize={12} color={colors.secondaryText}>Quantidade: 10 unid • Solicitante: Maria Santos</Text>
              <Text fontSize={12} color={colors.primary}>Status: Entregue</Text>
            </YStack>
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );

  const renderScene = SceneMap({
    estoque: EstoqueTab,
    pedidos: PedidosTab,
  });

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ 
        backgroundColor: colors.primary,
        height: 3,
      }}
      style={{ 
        backgroundColor: colors.cardBackground,
        borderBottomColor: colors.border,
        borderBottomWidth: 1,
        elevation: 0,
        shadowOpacity: 0,
      }}
      labelStyle={{
        fontWeight: '600',
        fontSize: 14,
      }}
      activeColor={colors.primary}
      inactiveColor={colors.secondaryText}
    />
  );

  return (
    <YStack 
      flex={1} 
      backgroundColor={colors.background}
      paddingTop={insets.top}
    >
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </YStack>
  );
};

export default AlmoxarifadoScreen;