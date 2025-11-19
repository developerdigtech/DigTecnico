import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { YStack, useTheme } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '../../../contexts/ThemeContext';
import EstoqueTab from '../../../components/almoxarifado/EstoqueTab';
import PedidosTab from '../../../components/almoxarifado/PedidosTab';

const AlmoxarifadoScreen = () => {
  const layout = useWindowDimensions();
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();
  const insets = useSafeAreaInsets();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'estoque', title: 'Meu Estoque' },
    { key: 'pedidos', title: 'Pedidos & Envios' },
  ]);

  const colors = {
    background: isDarkMode ? '#000000' : '#FFFFFF',
    cardBackground: isDarkMode ? '#1F1F1F' : '#F8F9FA',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#A0A0A0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    primary: '#11b3e4ff',
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