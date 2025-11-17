// import HomeScreen from "../../../screens/HomeScreen";

// export default function Dashboard() {
//     return (
//        <HomeScreen></HomeScreen>
//     )
// }

import React, { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { XStack, YStack, Text, useTheme } from 'tamagui';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '../../../contexts/ThemeContext';
import DashboardTab from '../../../components/home/DashboardTab';
import OpenOrdersTab from '../../../components/home/OpenOrdersTab';
import ClosedOrdersTab from '../../../components/home/ClosedOrdersTab';

const HomeScreen = () => {
  const layout = useWindowDimensions();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useThemeContext();
  
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'dashboard', title: 'Visão Geral' },
    { key: 'open', title: 'Abertas' },
    { key: 'closed', title: 'Finalizadas' },
  ]);

  const colors = {
    background: isDarkMode ? '#000000' : '#FFFFFF',
    cardBackground: isDarkMode ? '#1F1F1F' : '#F8F9FA',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#A0A0A0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
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
        borderRadius: 2,
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
        textTransform: 'none',
      }}
      activeColor={colors.primary}
      inactiveColor={colors.secondaryText}
      pressColor={`${colors.primary}20`}
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