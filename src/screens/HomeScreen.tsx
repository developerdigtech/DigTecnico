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
    primary: '#007AFF',
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
      {/* Header personalizado */}
      <XStack
        backgroundColor={colors.cardBackground}
        paddingHorizontal="$4"
        paddingVertical="$3"
        alignItems="center"
        justifyContent="space-between"
        borderBottomWidth={1}
        borderBottomColor={colors.border}
      >
        <YStack flex={1}>
          <Text 
            fontSize={20} 
            fontWeight="700" 
            color={colors.text}
            marginBottom="$1"
          >
            Olá, Técnico! 👋
          </Text>
          <Text 
            fontSize={14} 
            color={colors.secondaryText}
          >
            Bem-vindo de volta
          </Text>
        </YStack>
        
        <XStack gap="$3" alignItems="center">
          <XStack 
            position="relative"
            onPress={() => console.log('Notificações')}
            pressStyle={{ opacity: 0.7 }}
            cursor="pointer"
          >
            <Ionicons 
              name="notifications-outline" 
              size={24} 
              color={colors.text} 
            />
            <XStack
              position="absolute"
              top={-4}
              right={-4}
              backgroundColor="#FF3B30"
              borderRadius={10}
              minWidth={18}
              height={18}
              justifyContent="center"
              alignItems="center"
              paddingHorizontal="$1"
            >
              <Text 
                color="#FFFFFF" 
                fontSize={10} 
                fontWeight="700"
              >
                3
              </Text>
            </XStack>
          </XStack>
          
          <XStack
            onPress={() => console.log('Perfil')}
            pressStyle={{ opacity: 0.7 }}
            cursor="pointer"
          >
            <Avatar circular size="$5">
              <Avatar.Image src="https://i.pravatar.cc/150?img=32" />
              <Avatar.Fallback backgroundColor={colors.primary} />
            </Avatar>
          </XStack>
        </XStack>
      </XStack>

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