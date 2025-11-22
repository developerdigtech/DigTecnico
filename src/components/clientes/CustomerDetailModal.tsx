import React from 'react';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';
import { YStack, XStack, Text, Button, Card, Separator, Avatar } from 'tamagui';
import { X, User, Phone, Mail, MapPin, FileText, CheckCircle, XCircle, Navigation } from '@tamagui/lucide-icons';
import { useThemeContext } from '../../contexts/ThemeContext';
import { Customer } from '../../types/api';

interface CustomerDetailModalProps {
    visible: boolean;
    customer: Customer | null;
    onClose: () => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({ visible, customer, onClose }) => {
    const { isDarkMode } = useThemeContext();

    const colors = {
        cardBackground: isDarkMode ? '#1F1F1F' : '#FFFFFF',
        text: isDarkMode ? '#FFFFFF' : '#000000',
        secondaryText: isDarkMode ? '#A0A0A0' : '#666666',
        background: isDarkMode ? '#000000' : '#F8F9FA',
        primary: '#11b3e4ff',
        border: isDarkMode ? '#333333' : '#E0E0E0',
        accent: isDarkMode ? '#374151' : '#F3F4F6',
        success: '#11b3e4ff',
        danger: '#EF4444',
        overlay: isDarkMode ? 'rgba(0, 0, 0, 0.85)' : 'rgba(0, 0, 0, 0.5)',
    };

    if (!customer) return null;

    const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
        <YStack gap="$2">
            <XStack alignItems="center" gap="$2">
                <YStack
                    bg={colors.accent}
                    padding="$2"
                    borderRadius="$2"
                    width={32}
                    height={32}
                    alignItems="center"
                    justifyContent="center"
                >
                    <Icon size={16} color={colors.secondaryText} />
                </YStack>
                <YStack flex={1}>
                    <Text fontSize={12} color={colors.secondaryText} marginBottom="$1">
                        {label}
                    </Text>
                    <Text fontSize={14} color={colors.text} fontWeight="500">
                        {value || 'Não informado'}
                    </Text>
                </YStack>
            </XStack>
        </YStack>
    );

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <YStack flex={1} backgroundColor={colors.overlay}>
                {/* Header fixo */}
                <YStack
                    backgroundColor={colors.cardBackground}
                    paddingTop="$12"
                    paddingHorizontal="$5"
                    paddingBottom="$4"
                    borderBottomWidth={1}
                    borderBottomColor={colors.border}
                >
                    <XStack alignItems="center" justifyContent="space-between" marginBottom="$3">
                        <Text fontSize={24} fontWeight="800" color={colors.text}>
                            Detalhes do Cliente
                        </Text>
                        <TouchableOpacity onPress={onClose}>
                            <YStack
                                backgroundColor={colors.accent}
                                padding="$2"
                                borderRadius="$10"
                                width={40}
                                height={40}
                                alignItems="center"
                                justifyContent="center"
                            >
                                <X size={24} color={colors.text} />
                            </YStack>
                        </TouchableOpacity>
                    </XStack>

                    {/* Avatar e Nome */}
                    <XStack alignItems="center" gap="$4" marginBottom="$2">
                        <Avatar circular size="$8" backgroundColor={customer.status === 'S' ? colors.success : colors.danger}>
                            <Avatar.Fallback
                                backgroundColor={customer.status === 'S' ? colors.success : colors.danger}
                                justifyContent="center"
                                alignItems="center"
                            >
                                <User size={32} color="white" />
                            </Avatar.Fallback>
                        </Avatar>
                        <YStack flex={1}>
                            <Text fontSize={20} fontWeight="700" color={colors.text} numberOfLines={2}>
                                {customer.nome}
                            </Text>
                            <XStack alignItems="center" gap="$2" marginTop="$1">
                                <Text fontSize={13} color={colors.secondaryText}>
                                    ID: {customer.id}
                                </Text>
                                <Text color={colors.secondaryText}>•</Text>
                                <XStack alignItems="center" gap="$1">
                                    {customer.status === 'S' ? (
                                        <CheckCircle size={14} color={colors.success} />
                                    ) : (
                                        <XCircle size={14} color={colors.danger} />
                                    )}
                                    <Text fontSize={13} color={customer.status === 'S' ? colors.success : colors.danger}>
                                        {customer.status === 'S' ? 'Ativo' : 'Inativo'}
                                    </Text>
                                </XStack>
                            </XStack>
                        </YStack>
                    </XStack>
                </YStack>

                {/* Conteúdo scrollável */}
                <ScrollView
                    style={{ flex: 1, backgroundColor: colors.background }}
                    showsVerticalScrollIndicator={false}
                >
                    <YStack padding="$5" gap="$5" paddingBottom="$20">
                        {/* Seção: Informações Pessoais */}
                        <Card
                            bg={colors.cardBackground}
                            padding="$4"
                            borderRadius="$3"
                            borderWidth={1}
                            borderColor={colors.border}
                        >
                            <Text fontSize={16} fontWeight="700" color={colors.text} marginBottom="$4">
                                Informações Pessoais
                            </Text>

                            <YStack gap="$4">
                                <InfoRow icon={FileText} label="CPF/CNPJ" value={customer.cpf_cnpj} />
                                <Separator borderColor={colors.border} />
                                <InfoRow icon={MapPin} label="Endereço" value={customer.endereco} />
                                <Separator borderColor={colors.border} />
                                <InfoRow icon={MapPin} label="UF" value={customer.uf} />
                            </YStack>
                        </Card>

                        {/* Seção: Contato */}
                        <Card
                            bg={colors.cardBackground}
                            padding="$4"
                            borderRadius="$3"
                            borderWidth={1}
                            borderColor={colors.border}
                        >
                            <Text fontSize={16} fontWeight="700" color={colors.text} marginBottom="$4">
                                Contato
                            </Text>

                            <YStack gap="$4">
                                <InfoRow
                                    icon={Phone}
                                    label="Celular"
                                    value={customer.contato.celular || 'Não informado'}
                                />
                                <Separator borderColor={colors.border} />
                                <InfoRow
                                    icon={Phone}
                                    label="WhatsApp"
                                    value={customer.contato.whatsapp || 'Não informado'}
                                />
                                <Separator borderColor={colors.border} />
                                <InfoRow
                                    icon={Mail}
                                    label="E-mail"
                                    value={customer.contato.email || 'Não informado'}
                                />
                            </YStack>
                        </Card>

                        {/* Seção: Localização */}
                        {(customer.localizacao.latitude || customer.localizacao.longitude) && (
                            <Card
                                bg={colors.cardBackground}
                                padding="$4"
                                borderRadius="$3"
                                borderWidth={1}
                                borderColor={colors.border}
                            >
                                <Text fontSize={16} fontWeight="700" color={colors.text} marginBottom="$4">
                                    Localização GPS
                                </Text>

                                <YStack gap="$4">
                                    <InfoRow
                                        icon={Navigation}
                                        label="Latitude"
                                        value={customer.localizacao.latitude || 'Não informado'}
                                    />
                                    <Separator borderColor={colors.border} />
                                    <InfoRow
                                        icon={Navigation}
                                        label="Longitude"
                                        value={customer.localizacao.longitude || 'Não informado'}
                                    />
                                </YStack>
                            </Card>
                        )}

                        {/* Ações */}
                        <YStack gap="$3">
                            <Button
                                size="$5"
                                bg={colors.primary}
                                color="white"
                                borderRadius="$3"
                                fontWeight="600"
                                pressStyle={{ scale: 0.98, opacity: 0.9 }}
                                onPress={() => console.log('Abrir no mapa')}
                            >
                                <XStack alignItems="center" gap="$2">
                                    <MapPin size={20} color="white" />
                                    <Text color="white" fontSize={16} fontWeight="600">
                                        Ver no Mapa
                                    </Text>
                                </XStack>
                            </Button>

                            <Button
                                size="$5"
                                bg={colors.success}
                                color="white"
                                borderRadius="$3"
                                fontWeight="600"
                                pressStyle={{ scale: 0.98, opacity: 0.9 }}
                                onPress={() => console.log('Ligar para cliente')}
                            >
                                <XStack alignItems="center" gap="$2">
                                    <Phone size={20} color="white" />
                                    <Text color="white" fontSize={16} fontWeight="600">
                                        Ligar para Cliente
                                    </Text>
                                </XStack>
                            </Button>
                        </YStack>
                    </YStack>
                </ScrollView>
            </YStack>
        </Modal>
    );
};

export default CustomerDetailModal;
