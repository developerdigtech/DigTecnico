import { YStack, XStack, Text, Avatar, Button, Switch, Separator, Theme, ScrollView } from "tamagui";
import { useState } from "react";
import { Mail, Phone, MapPin, Moon, Sun, LogOut, Edit3 } from "@tamagui/lucide-icons";

export default function Perfil() {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleThemeToggle = (checked: boolean) => {
        setIsDarkMode(checked);
        // TODO: Implementar persistência do tema com AsyncStorage
        // e aplicar globalmente usando Context
    };

    const userInfo = {
        name: "João Silva",
        username: "@joaosilva",
        email: "joao.silva@email.com",
        phone: "(11) 98765-4321",
        location: "São Paulo, SP",
        avatar: "https://i.pravatar.cc/300"
    };

    return (
        <Theme name={isDarkMode ? "dark" : "light"}>
            <ScrollView backgroundColor="$background">
                <YStack flex={1} paddingHorizontal="$4" paddingVertical="$6">
                    
                    {/* Header com Avatar */}
                    <YStack alignItems="center" gap="$4" marginBottom="$6">
                        <YStack position="relative">
                            <Avatar circular size="$12" borderWidth={3} borderColor="$borderColor">
                                <Avatar.Image 
                                    source={{ uri: userInfo.avatar }} 
                                />
                                <Avatar.Fallback backgroundColor="#007AFF" />
                            </Avatar>
                            
                            <YStack
                                position="absolute"
                                bottom={0}
                                right={0}
                                backgroundColor="$background"
                                borderRadius="$10"
                                padding="$2"
                                borderWidth={2}
                                borderColor="$borderColor"
                            >
                                <Edit3 size={16} color="#6B7280" />
                            </YStack>
                        </YStack>
                        
                        <YStack alignItems="center" gap="$2">
                            <Text fontSize="$9" fontWeight="700" color="$color">
                                {userInfo.name}
                            </Text>
                            <Text fontSize="$5" color="$color11">
                                {userInfo.username}
                            </Text>
                        </YStack>

                        <Button 
                            size="$3" 
                            chromeless 
                            borderWidth={1}
                            borderColor="$borderColor"
                            icon={Edit3}
                        >
                            Editar Perfil
                        </Button>
                    </YStack>

                    <Separator marginVertical="$5" />

                    {/* Informações do Usuário */}
                    <YStack gap="$3" marginBottom="$5">
                        <Text 
                            fontSize="$6" 
                            fontWeight="700" 
                            color="$color" 
                            marginBottom="$3"
                            paddingLeft="$2"
                        >
                            Informações Pessoais
                        </Text>

                        {/* Email */}
                        <XStack 
                            gap="$3" 
                            alignItems="center"
                            padding="$4"
                            backgroundColor="$backgroundHover"
                            borderRadius="$4"
                            borderWidth={1}
                            borderColor="$borderColor"
                        >
                            <YStack 
                                backgroundColor="$blue4" 
                                padding="$3" 
                                borderRadius="$3"
                            >
                                <Mail size={20} color="#007AFF" />
                            </YStack>
                            <YStack flex={1}>
                                <Text fontSize="$3" color="$color11" marginBottom="$1">
                                    Email
                                </Text>
                                <Text fontSize="$4" fontWeight="600" color="$color">
                                    {userInfo.email}
                                </Text>
                            </YStack>
                        </XStack>

                        {/* Telefone */}
                        <XStack 
                            gap="$3" 
                            alignItems="center"
                            padding="$4"
                            backgroundColor="$backgroundHover"
                            borderRadius="$4"
                            borderWidth={1}
                            borderColor="$borderColor"
                        >
                            <YStack 
                                backgroundColor="$green4" 
                                padding="$3" 
                                borderRadius="$3"
                            >
                                <Phone size={20} color="#10B981" />
                            </YStack>
                            <YStack flex={1}>
                                <Text fontSize="$3" color="$color11" marginBottom="$1">
                                    Telefone
                                </Text>
                                <Text fontSize="$4" fontWeight="600" color="$color">
                                    {userInfo.phone}
                                </Text>
                            </YStack>
                        </XStack>

                        {/* Localização */}
                        <XStack 
                            gap="$3" 
                            alignItems="center"
                            padding="$4"
                            backgroundColor="$backgroundHover"
                            borderRadius="$4"
                            borderWidth={1}
                            borderColor="$borderColor"
                        >
                            <YStack 
                                backgroundColor="$yellow4" 
                                padding="$3" 
                                borderRadius="$3"
                            >
                                <MapPin size={20} color="#F59E0B" />
                            </YStack>
                            <YStack flex={1}>
                                <Text fontSize="$3" color="$color11" marginBottom="$1">
                                    Localização
                                </Text>
                                <Text fontSize="$4" fontWeight="600" color="$color">
                                    {userInfo.location}
                                </Text>
                            </YStack>
                        </XStack>
                    </YStack>

                    <Separator marginVertical="$5" />

                    {/* Preferências */}
                    <YStack gap="$3" marginBottom="$5">
                        <Text 
                            fontSize="$6" 
                            fontWeight="700" 
                            color="$color" 
                            marginBottom="$3"
                            paddingLeft="$2"
                        >
                            Preferências
                        </Text>

                        {/* Toggle de Tema */}
                        <XStack 
                            justifyContent="space-between" 
                            alignItems="center"
                            padding="$4"
                            backgroundColor="$backgroundHover"
                            borderRadius="$4"
                            borderWidth={1}
                            borderColor="$borderColor"
                            pressStyle={{
                                backgroundColor: "$backgroundPress"
                            }}
                        >
                            <XStack gap="$3" alignItems="center" flex={1}>
                                <YStack 
                                    backgroundColor={isDarkMode ? "$purple4" : "$orange4"}
                                    padding="$3" 
                                    borderRadius="$3"
                                >
                                    {isDarkMode ? (
                                        <Moon size={20} color="#A855F7" />
                                    ) : (
                                        <Sun size={20} color="#F97316" />
                                    )}
                                </YStack>
                                <YStack flex={1}>
                                    <Text fontSize="$4" fontWeight="600" color="$color" marginBottom="$1">
                                        {isDarkMode ? "Tema Escuro" : "Tema Claro"}
                                    </Text>
                                    <Text fontSize="$3" color="$color11">
                                        Alternar entre claro e escuro
                                    </Text>
                                </YStack>
                            </XStack>
                            
                            <Switch 
                                size="$4"
                                checked={isDarkMode}
                                onCheckedChange={handleThemeToggle}
                            >
                                <Switch.Thumb animation="bouncy" />
                            </Switch>
                        </XStack>
                    </YStack>

                    {/* Botão de Logout */}
                    <Button 
                        size="$5" 
                        theme="red"
                        icon={LogOut}
                        marginTop="$4"
                        onPress={() => console.log("Logout")}
                        pressStyle={{
                            scale: 0.98
                        }}
                        animation="bouncy"
                    >
                        Sair da Conta
                    </Button>
                </YStack>
            </ScrollView>
        </Theme>
    );
}