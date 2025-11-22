import React, { useState } from 'react';
import { ScrollView, Alert, Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { YStack, XStack, Text, Input, Button, useTheme, Card, Spinner } from 'tamagui';
import { Search, User, Phone, MapPin, Mail, Eye, CheckCircle, XCircle } from '@tamagui/lucide-icons';
import { useThemeContext } from '../../../contexts/ThemeContext';
import { customerService } from '../../../services/customerService'; // Importe o serviço
import { Customer } from '../../../types/api'; // Importe o tipo novo

export default function ClientesScreen() {
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useThemeContext();

  // Estados
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

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
  };

  const performSearch = async () => {
    if (searchTerm.trim() === '') {
      Alert.alert('Atenção', 'Por favor, digite um nome, CPF ou ID para buscar.');
      return;
    }

    console.log('🚀 [ClientesScreen] Iniciando busca...');
    console.log('🔎 [ClientesScreen] Termo:', searchTerm);

    Keyboard.dismiss();
    setIsLoading(true);
    setHasSearched(true);

    try {
      console.log('📡 [ClientesScreen] Chamando customerService.searchCustomers...');
      const data = await customerService.searchCustomers(searchTerm);

      console.log('✅ [ClientesScreen] Dados recebidos:', data);
      console.log('📊 [ClientesScreen] Tipo:', typeof data);
      console.log('📏 [ClientesScreen] É array?', Array.isArray(data));
      console.log('📦 [ClientesScreen] Length:', data?.length);

      setCustomers(data);
      console.log('💾 [ClientesScreen] Estado atualizado com', data?.length, 'clientes');
    } catch (error) {
      console.error('❌ [ClientesScreen] Erro na busca:', error);
      Alert.alert('Erro', 'Não foi possível realizar a busca. Verifique sua conexão.');
      setCustomers([]);
    } finally {
      setIsLoading(false);
      console.log('🏁 [ClientesScreen] Busca finalizada');
    }
  };

  const ClientCard = ({ client }: { client: Customer }) => (
    <Card
      bg={colors.cardBackground}
      padding="$5"
      borderRadius="$3"
      marginBottom="$3"
      borderWidth={1}
      borderColor={colors.border}
      pressStyle={{ scale: 0.98 }}
    >
      <YStack gap="$4">
        {/* Header do Card */}
        <XStack alignItems="center" justifyContent="space-between">
          <YStack flex={1}>
            <Text fontSize={18} fontWeight="700" color={colors.text} numberOfLines={1}>
              {client.nome}
            </Text>
            <XStack gap="$2" alignItems="center" marginTop="$1">
              <Text fontSize={13} color={colors.secondaryText}>
                ID: {client.id}
              </Text>
              <Text color={colors.secondaryText}>•</Text>
              {/* Status Visual */}
              <XStack alignItems="center" gap="$1">
                {client.status === 'S' ? (
                  <CheckCircle size={12} color={colors.success} />
                ) : (
                  <XCircle size={12} color={colors.danger} />
                )}
                <Text fontSize={12} color={client.status === 'S' ? colors.success : colors.danger}>
                  {client.status === 'S' ? 'Ativo' : 'Inativo'}
                </Text>
              </XStack>
            </XStack>
          </YStack>
        </XStack>

        {/* Informações */}
        <YStack gap="$3">
          {/* CPF / CNPJ */}
          <XStack alignItems="center" gap="$3">
            <YStack
              bg={colors.accent}
              padding="$2"
              borderRadius="$2"
              width={32}
              height={32}
              alignItems="center"
              justifyContent="center"
            >
              <User size={16} color={colors.secondaryText} />
            </YStack>
            <YStack flex={1}>
              <Text fontSize={14} color={colors.text}>
                {client.cpf_cnpj}
              </Text>
              <Text fontSize={12} color={colors.secondaryText}>
                Documento
              </Text>
            </YStack>
          </XStack>

          {/* Contato (Celular ou Whatsapp) */}
          <XStack alignItems="center" gap="$3">
            <YStack
              bg={colors.accent}
              padding="$2"
              borderRadius="$2"
              width={32}
              height={32}
              alignItems="center"
              justifyContent="center"
            >
              <Phone size={16} color={colors.secondaryText} />
            </YStack>
            <YStack flex={1}>
              <Text fontSize={14} color={colors.text}>
                {client.contato.celular || client.contato.whatsapp || 'Não informado'}
              </Text>
              <Text fontSize={12} color={colors.secondaryText}>
                Contato
              </Text>
            </YStack>
          </XStack>

          {/* Endereço */}
          <XStack alignItems="center" gap="$3">
            <YStack
              bg={colors.accent}
              padding="$2"
              borderRadius="$2"
              width={32}
              height={32}
              alignItems="center"
              justifyContent="center"
            >
              <MapPin size={16} color={colors.secondaryText} />
            </YStack>
            <YStack flex={1}>
              <Text fontSize={14} color={colors.text} numberOfLines={2}>
                {client.endereco}
              </Text>
              <Text fontSize={12} color={colors.secondaryText}>
                Endereço
              </Text>
            </YStack>
          </XStack>
        </YStack>

        {/* Ações */}
        <XStack gap="$3" marginTop="$2">
          <Button
            flex={1}
            size="$3"
            bg={colors.primary}
            color="white"
            borderRadius="$2"
            fontWeight="600"
            onPress={() => console.log('Ver detalhes', client.id)}
          >
            <XStack alignItems="center" gap="$2">
              <Eye size={16} />
              <Text color="white" fontSize={14}>Detalhes</Text>
            </XStack>
          </Button>
        </XStack>
      </YStack>
    </Card>
  );

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <YStack
        padding="$5"
        gap="$5"
        backgroundColor={colors.background}
        paddingBottom="$20"
        paddingTop={insets.top + 20}
      >
        {/* Header */}
        <YStack gap="$2" alignItems="center">
          <Text fontSize={28} fontWeight="900" color={colors.text} marginTop="$3">
            Clientes
          </Text>
          <Text fontSize={15} color={colors.secondaryText} textAlign="center">
            Pesquise por Nome, CPF/CNPJ ou ID
          </Text>
        </YStack>

        {/* Search Input */}
        <XStack gap="$3" alignItems="center">
          <YStack
            flex={1}
            bg={colors.cardBackground}
            borderRadius="$10"
            borderWidth={1}
            borderColor={colors.border}
            height={56}
            justifyContent="center"
          >
            <XStack alignItems="center" paddingHorizontal="$4" gap="$3">
              <Search size={20} color={colors.secondaryText} />
              <Input
                flex={1}
                placeholder="Buscar cliente..."
                placeholderTextColor={colors.secondaryText}
                color={colors.text}
                borderWidth={0}
                backgroundColor="transparent"
                value={searchTerm}
                onChangeText={setSearchTerm}
                fontSize={16}
                onSubmitEditing={performSearch}
                returnKeyType="search"
              />
            </XStack>
          </YStack>

          <Button
            bg={colors.success}
            width={56}
            height={56}
            borderRadius={28}
            alignItems="center"
            justifyContent="center"
            onPress={performSearch}
            disabled={isLoading}
            opacity={isLoading ? 0.7 : 1}
            shadowColor={colors.success}
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
            elevation={5}
          >
            {isLoading ? <Spinner color="white" /> : <Search size={24} color="white" />}
          </Button>
        </XStack>

        {/* Resultados */}
        {hasSearched && (
          <YStack gap="$4">
            <Text fontSize={18} fontWeight="400" color={colors.text}>
              {isLoading
                ? 'Buscando...'
                : `${customers?.length || 0} resultado${customers?.length !== 1 ? 's' : ''}`
              }
            </Text>

            {!isLoading && customers?.length > 0 ? (
              customers.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))
            ) : !isLoading ? (
              <Card
                bg={colors.cardBackground}
                padding="$8"
                borderRadius="$3"
                alignItems="center"
                borderWidth={1}
                borderColor={colors.border}
              >
                <YStack alignItems="center" gap="$3">
                  <YStack
                    bg={colors.accent}
                    padding="$4"
                    borderRadius="$4"
                    width={80}
                    height={80}
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Search size={32} color={colors.secondaryText} />
                  </YStack>
                  <YStack alignItems="center" gap="$2">
                    <Text fontSize={16} color={colors.text} fontWeight="600">
                      Nenhum cliente encontrado
                    </Text>
                    <Text fontSize={14} color={colors.secondaryText} textAlign="center">
                      Verifique os dados e tente novamente
                    </Text>
                  </YStack>
                </YStack>
              </Card>
            ) : null}
          </YStack>
        )}
      </YStack>
    </ScrollView>
  );
}