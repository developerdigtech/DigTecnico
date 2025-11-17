import { Tabs } from 'expo-router/tabs';
import { Home, Settings, User, Archive, Search } from '@tamagui/lucide-icons';
import { YStack, Text } from "tamagui";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '../../contexts/ThemeContext';
import { Platform } from 'react-native';

interface TabIconProps {
    Icon: any;
    color: string;
    isFocused: boolean;
    label: string;
}

const TabIcon = ({ Icon, color, isFocused, label }: TabIconProps) => {
    const { isDarkMode } = useThemeContext();

    const colors = {
        activeBackground: '#22C55E',
        activeIcon: '#FFFFFF',
        activeText: '#22C55E',
        inactiveIcon: isDarkMode ? '#A0A0A0' : '#6B7280',
        inactiveText: isDarkMode ? '#A0A0A0' : '#6B7280',
    };

    return (
        <YStack 
            alignItems="center" 
            justifyContent="center" 
            gap={4}
            animation="quick"
            scale={isFocused ? 1 : 0.9}
            width={70}
        >
            <YStack position="relative">
                {/* Background animado para o ícone ativo */}
                <YStack
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    backgroundColor={isFocused ? colors.activeBackground : 'transparent'}
                    borderRadius={16}
                    animation="slow"
                    opacity={isFocused ? 1 : 0}
                />
                
                {/* Container do ícone */}
                <YStack
                    alignItems="center"
                    justifyContent="center"
                    paddingVertical={6}
                    paddingHorizontal={12}
                >
                    <Icon 
                        size={24} 
                        color={isFocused ? colors.activeIcon : colors.inactiveIcon} 
                        strokeWidth={isFocused ? 2.5 : 2} 
                    />
                </YStack>
            </YStack >
            
            <Text
                fontSize={10}
                fontWeight={isFocused ? "bold" : "600"}
                color={isFocused ? colors.activeText : colors.inactiveText}
                animation="quick"
                opacity={isFocused ? 1 : 0.7}
                textAlign="center"
                y={isFocused ? 0 : 2}
            >
                {label}
            </Text>
        </YStack>
    );
};

export default function TabsLayout() {
    const insets = useSafeAreaInsets();
    const { isDarkMode } = useThemeContext();
    const isAndroid = Platform.OS === 'android';

    const colors = {
        tabBarBackground: isDarkMode ? '#1F1F1F' : '#FFFFFF',
        tabBarBorder: isDarkMode ? '#333333' : '#E0E0E0',
        activeTint: '#22C55E',
        inactiveTint: isDarkMode ? '#A0A0A0' : '#6B7280',
        shadowColor: isDarkMode ? '#000000' : '#000000',
    };
    
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.activeTint,
                tabBarInactiveTintColor: colors.inactiveTint,
                tabBarStyle: {
                    backgroundColor: colors.tabBarBackground,
                    borderTopWidth: 1,
                    borderTopColor: colors.tabBarBorder,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: isAndroid ? 20 : 30,
                    shadowColor: colors.shadowColor,
                    shadowOffset: { 
                        width: 0, 
                        height: -8 
                    },
                    shadowOpacity: isDarkMode ? 0.5 : 0.2,
                    shadowRadius: 24,
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
                    paddingTop: 16,
                    height: (insets.bottom > 0 ? insets.bottom : 16) + 76,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                },
                tabBarItemStyle: {
                    paddingVertical: 8,
                },
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
            }}
        >
            <Tabs.Screen
                name='Home/index'
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            Icon={Home} 
                            color={color}
                            isFocused={focused} 
                            label="Home" 
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='Clientes/index'
                options={{
                    title: "Buscar",
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            Icon={Search} 
                            color={color}
                            isFocused={focused} 
                            label="buscar" 
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='Almoxarifado/index'
                options={{
                    title: "Estoque",
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            Icon={Archive} 
                            color={color}
                            isFocused={focused} 
                            label="Estoque" 
                        />
                    )
                }}
            />
            <Tabs.Screen
                name='Perfil/index'
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon 
                            Icon={User} 
                            color={color}
                            isFocused={focused} 
                            label="Perfil" 
                        />
                    )
                }}
            />
        </Tabs>
    );
}