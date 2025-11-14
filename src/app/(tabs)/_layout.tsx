import { Tabs } from 'expo-router/tabs';
import { Home, Settings, User, Archive, Search } from '@tamagui/lucide-icons';
import { YStack, Text } from "tamagui";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabIcon = ({ Icon, color, isFocused, label }) => {
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
                    backgroundColor={isFocused ? '$accent1' : 'transparent'}
                    borderRadius={12}
                    animation="quick"
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
                        color={isFocused ? "#FFFFFF" : "#6B7280"} 
                        strokeWidth={isFocused ? 2.5 : 2} 
                    />
                </YStack>
            </YStack >
            
            <Text
                fontSize={10}
                fontWeight={isFocused ? "bold" : "600"}
                
                color={isFocused ? "$accent1" : "#6B7280"}
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
    
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#6B7280',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    elevation: 30,
                    shadowColor: '#000',
                    shadowOffset: { 
                        width: 0, 
                        height: -8 
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 24,
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 16,
                    paddingTop: 16,
                    height: (insets.bottom > 0 ? insets.bottom : 16) + 76,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30,
                    borderTopColor: 'rgba(0, 0, 0, 0.08)',
                   
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