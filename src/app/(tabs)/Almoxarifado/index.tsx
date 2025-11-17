import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { YStack, useTheme } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EstoqueTab from '../../../components/almoxarifado/EstoqueTab';
import PedidosTab from '../../../components/almoxarifado/PedidosTab';

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

  const renderScene = SceneMap({
    estoque: () => <EstoqueTab />,
    pedidos: () => <PedidosTab />,
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