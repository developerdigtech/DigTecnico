import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Avatar, XStack, YStack, Text, useTheme } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DashboardTab from '../components/home/DashboardTab';
import OpenOrdersTab from '../components/home/OpenOrdersTab';
import ClosedOrdersTab from '../components/home/ClosedOrdersTab';

const HomeScreen = () => {
  const layout = useWindowDimensions();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'dashboard', title: 'Visão Geral' },
    { key: 'open', title: 'Abertas' },
    { key: 'closed', title: 'Finalizadas' },
  ]);

  const isDark = theme.background.val === '#000000' || theme.background.val === 'rgb(0, 0, 0)';

  const colors = {
    background: theme.background.val,
    cardBackground: theme.backgroundFocus.val,
    text: theme.color.val,
    secondaryText: theme.colorFocus.val,
    border: theme.borderColor.val,
    primary: '#22C55E',
  };

  const renderScene = SceneMap({
    dashboard: DashboardTab,
    open: OpenOrdersTab,
    closed: ClosedOrdersTab,
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

export default HomeScreen;