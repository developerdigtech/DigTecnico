import { Tabs } from 'expo-router/tabs';
import { Home, Settings, User, FileText } from '@tamagui/lucide-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#007AFF',
                tabBarInactiveTintColor: '#8E8E93',
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopColor: '#1C1C1E',
                },
            }}
        >
            <Tabs.Screen 
                name='Dashboard' 
                options={{
                    title: "Painel",
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />
                }}
            />
            <Tabs.Screen 
                name='Relatorios' 
                options={{
                    title: "Relatórios",
                    tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />
                }}
            />
            <Tabs.Screen 
                name='Perfil' 
                options={{
                    title: "Perfil",
                    tabBarIcon: ({ color, size }) => <User size={size} color={color} />
                }}
            />
            <Tabs.Screen 
                name='Configuracoes' 
                options={{
                    title: "Configurações",
                    tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />
                }}
            />
        </Tabs>
    );
}