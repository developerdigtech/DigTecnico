import { YStack, XStack, Text, Avatar, Button, Switch, Separator, Theme, ScrollView, Card, Spinner } from "tamagui";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Moon, Sun, LogOut, Edit3, Share2, Wifi, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import NetInfo from '@react-native-community/netinfo';
import * as Location from 'expo-location';
import { Platform, Alert } from 'react-native';
import { useThemeContext } from '../../../contexts/ThemeContext';
import { SSIDDisplay } from '../../../components/network/SSIDDisplay';
import { authService } from '../../../services/authService';
import { User } from '../../../types/api';

export default function Perfil() {
    const { isDarkMode, toggleTheme } = useThemeContext();
    const [networkInfo, setNetworkInfo] = useState<any>(null);
    const [isNetworkExpanded, setIsNetworkExpanded] = useState(false);
    const [locationPermission, setLocationPermission] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const insets = useSafeAreaInsets();

    const handleThemeToggle = () => {
        toggleTheme();
    };

    // Carrega os dados do usuário
    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            setIsLoading(true);
            const userData = await authService.getUserData();
            
            if (userData) {
                setUser(userData);
            } else {
                // Se não houver dados, redireciona para login
                router.replace('/');
            }
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'Sair',
            'Deseja realmente sair da sua conta?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Sair',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await authService.logout();
                            router.replace('/');
                        } catch (error) {
                            console.error('Erro ao fazer logout:', error);
                        }
                    }
                }
            ]
        );
    };

    // Solicita permissão de localização (necessário para SSID no iOS)
    useEffect(() => {
        const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
                const { status } = await Location.requestForegroundPermissionsAsync();
                setLocationPermission(status === 'granted');
                
                if (status !== 'granted') {
                    console.log('Permissão de localização negada. SSID não estará disponível no iOS.');
                }
            }
        };

        requestLocationPermission();
    }, []);

    // Captura informações da rede
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setNetworkInfo(state);
        });

        return () => unsubscribe();
    }, []);

    // Mostra loading enquanto carrega dados
    if (isLoading) {
        return (
            <YStack 
                flex={1} 
                backgroundColor="$background" 
                alignItems="center" 
                justifyContent="center"
            >
                <Spinner size="large" color="$color" />
                <Text marginTop="$4" color="$color">Carregando perfil...</Text>
            </YStack>
        );
    }

    // Se não houver usuário, não renderiza nada
    if (!user) {
        return null;
    }

    return (
        <YStack 
            flex={1} 
            backgroundColor="$background" 
            paddingHorizontal="$4" 
            paddingTop={insets.top + 12} 
            paddingBottom={insets.bottom + 80} 
            gap="$2"
        >
                {/* Avatar e Nome */}
                <YStack alignItems="center" gap="$2" marginVertical="$2">
                    <YStack position="relative">
                        <Avatar circular size="$8" borderWidth={2} borderColor="$borderColor">
                            <Avatar.Image 
                                source={{ uri: user.avatar || "https://github.com/renan-maestre.png" }} 
                            />
                            <Avatar.Fallback backgroundColor="$accent2">
                                <Text fontSize="$6" fontWeight="bold" color="white">
                                    {user.name.charAt(0).toUpperCase()}
                                </Text>
                            </Avatar.Fallback>
                        </Avatar>
                        
                        <Button
                            position="absolute"
                            bottom={-5}
                            right={-5}
                            size="$3"
                            circular
                            backgroundColor={isDarkMode ? "$purple8" : "$orange8"}
                            borderWidth={2}
                            borderColor="$background"
                            icon={isDarkMode ? <Moon size={16} color="white" /> : <Sun size={16} color="white" />}
                            onPress={handleThemeToggle}
                            pressStyle={{
                                scale: 0.9,
                                backgroundColor: isDarkMode ? "$purple9" : "$orange9"
                            }}
                        />
                    </YStack>
                    
                    <YStack alignItems="center" gap="$1">
                        <Text fontSize="$4" fontWeight="900" color="$color">
                            {user.role === 'admin' ? 'ADMINISTRADOR' : 'TÉCNICO'}
                        </Text>
                        <Text fontSize="$5" fontWeight="900" color="$color">
                            {user.name}
                        </Text>
                    </YStack>
                </YStack>
                
                {/* Card de Informações do Usuário */}
                <Card
                    backgroundColor="$backgroundHover"
                    borderRadius="$4"
                    padding="$3"
                    borderWidth={1}
                    borderColor="$borderColor"
                >
                    <XStack justifyContent="space-between" alignItems="flex-start">
                        <YStack gap="$1" flex={1}>
                            <Text fontSize="$4" fontWeight="700" color="$color">
                                Informações do usuário
                            </Text>
                            <Text fontSize="$2" color="$color">
                                Usuário: {user.username}
                            </Text>
                            <Text fontSize="$2" color="$color">
                                E-mail: {user.email}
                            </Text>
                            {user.phone && (
                                <Text fontSize="$2" color="$color">
                                    Telefone: {user.phone}
                                </Text>
                            )}
                            <Text fontSize="$2" color="$color">
                                Filial: {user.filial}
                            </Text>
                            {user.location && (
                                <Text fontSize="$2" color="$color">
                                    Localização: {user.location}
                                </Text>
                            )}
                            <Text fontSize="$2" color="$color">
                                ID: {user.id}
                            </Text>
                        </YStack>
                        <Button
                            size="$8"
                            icon={LogOut}
                            chromeless
                            onPress={handleLogout}
                            pressStyle={{
                                scale: 0.9
                            }}
                        />
                    </XStack>
                </Card>

                {/* Informações da Rede - Acordeão */}
                <Card
                    backgroundColor="$backgroundHover"
                    borderRadius="$4"
                    padding="$3"
                    borderWidth={1}
                    borderColor="$borderColor"
                    marginTop="$2"
                    pressStyle={{
                        scale: 0.98
                    }}
                    onPress={() => setIsNetworkExpanded(!isNetworkExpanded)}
                >
                    <XStack justifyContent="space-between" alignItems="center">
                        <XStack alignItems="center" gap="$2">
                            <Wifi size={16} color="$color" />
                            <Text fontSize="$4" fontWeight="700" color="$color">
                                Informações da rede
                            </Text>
                        </XStack>
                        
                        {isNetworkExpanded ? (
                            <ChevronUp size={20} color="$color" />
                        ) : (
                            <ChevronDown size={20} color="$color" />
                        )}
                    </XStack>
                    
                    {isNetworkExpanded && (
                        <YStack gap="$1" marginTop="$2" paddingTop="$2" borderTopWidth={1} borderTopColor="$borderColor">
                            {networkInfo ? (
                                <>
                                    <Text fontSize="$2" color="$color">
                                        Tipo: {networkInfo.type || 'Desconhecido'}
                                    </Text>
                                    <Text fontSize="$2" color="$color">
                                        Conectado: {networkInfo.isConnected ? 'Sim' : 'Não'}
                                    </Text>
                                    {networkInfo.type === 'wifi' && (
                                        <>
                                            {networkInfo.details?.ssid ? (
                                                <Text fontSize="$2" color="$color">
                                                    SSID: {networkInfo?.details?.ssid}
                                                </Text>
                                            ) : (
                                                <Text fontSize="$2" color="$color" opacity={0.6}>
                                                    SSID: {Platform.OS === 'ios' && !locationPermission 
                                                        ? 'Requer permissão de localização' 
                                                        : 'Não disponível'}
                                                </Text>
                                            )}
                                            {networkInfo.details?.bssid && (
                                                <Text fontSize="$2" color="$color">
                                                    BSSID: {networkInfo.details.bssid}
                                                </Text>
                                            )}
                                            {networkInfo.details?.strength && (
                                                <Text fontSize="$2" color="$color">
                                                    Força: {networkInfo.details.strength}%
                                                </Text>
                                            )}
                                            {networkInfo.details?.ipAddress && (
                                                <Text fontSize="$2" color="$color">
                                                    IP: {networkInfo.details.ipAddress}
                                                </Text>
                                            )}
                                            {networkInfo.details?.subnet && (
                                                <Text fontSize="$2" color="$color">
                                                    Máscara de rede: {networkInfo.details.subnet}
                                                </Text>
                                            )}
                                            {networkInfo.details?.frequency && (
                                                <Text fontSize="$2" color="$color">
                                                    Frequência: {networkInfo.details.frequency} MHz
                                                </Text>
                                            )}
                                        </>
                                    )}
                                    {networkInfo.type === 'cellular' && (
                                        <>
                                            {networkInfo.details?.cellularGeneration && (
                                                <Text fontSize="$2" color="$color">
                                                    Geração: {networkInfo.details.cellularGeneration}
                                                </Text>
                                            )}
                                            {networkInfo.details?.carrier && (
                                                <Text fontSize="$2" color="$color">
                                                    Operadora: {networkInfo.details.carrier}
                                                </Text>
                                            )}
                                        </>
                                    )}
                                    <Text fontSize="$2" color="$color">
                                        Internet: {networkInfo.isInternetReachable ? 'Disponível' : 'Indisponível'}
                                    </Text>
                                </>
                            ) : (
                                <Text fontSize="$2" color="$color">
                                    Carregando informações...
                                </Text>
                            )}
                        </YStack>
                    )}
                </Card>

               

                
            </YStack>
    );
}