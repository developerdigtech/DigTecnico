import { YStack, XStack, Text, Avatar, Button, Switch, Separator, Theme, ScrollView, Card } from "tamagui";
import { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Moon, Sun, LogOut, Edit3, Share2, Wifi, ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";
import NetInfo from '@react-native-community/netinfo';
import * as Location from 'expo-location';
import { Platform } from 'react-native';

export default function Perfil() {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [networkInfo, setNetworkInfo] = useState<any>(null);
    const [isNetworkExpanded, setIsNetworkExpanded] = useState(false);
    const [locationPermission, setLocationPermission] = useState(false);
    const insets = useSafeAreaInsets();

    const handleThemeToggle = () => {
        setIsDarkMode(!isDarkMode);
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

    const userInfo = {
        name: "Renan",
        username: "admin",
        filial: "Fibron",
        version: "20240708",
        server: "sgp",
        email: "joao.silva@email.com",
        phone: "(11) 98765-4321",
        location: "São Paulo, SP",
        avatar: "https://github.com/renan-maestre.png",
        ordensDesignadas: 38,
        ordensFechadasHoje: 0
    };

    return (
        <Theme name={isDarkMode ? "dark" : "light"}>
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
                                source={{ uri: userInfo.avatar }} 
                            />
                            <Avatar.Fallback backgroundColor="$accent2" />
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
                            TÉCNICO
                        </Text>
                        <Text fontSize="$5" fontWeight="900" color="$color">
                            {userInfo.name}
                        </Text>
                    </YStack>
                </YStack>
                
                {/* Card de Informações do Usuário */}
                <Card
                    backgroundColor="$gray3"
                    borderRadius="$4"
                    padding="$3"
                    borderWidth={1}
                    borderColor="$borderColor"
                >
                    <XStack justifyContent="space-between" alignItems="flex-start">
                        <YStack gap="$1">
                            <Text fontSize="$4" fontWeight="700" color="$color">
                                Informações do usuário
                            </Text>
                            <Text fontSize="$2" color="$color">
                                Usuário: {userInfo.username}
                            </Text>
                            <Text fontSize="$2" color="$color">
                                Filial: {userInfo.filial}
                            </Text>
                            <Text fontSize="$2" color="$color">
                                Versão: {userInfo.version}
                            </Text>
                            <Text fontSize="$2" color="$color">
                                Server: {userInfo.server}
                            </Text>
                        </YStack>
                        <Button
                            size="$8"
                            icon={LogOut}
                            chromeless
                            onPress={() => router.replace("/")}
                            pressStyle={{
                                scale: 0.9
                            }}
                        />
                    </XStack>
                </Card>

                {/* Informações da Rede - Acordeão */}
                <Card
                    backgroundColor="$gray3"
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
                                                    SSID: {networkInfo.details.ssid}
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
        </Theme>
    );
}