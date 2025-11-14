import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Text, Input, Button, useTheme, Card } from 'tamagui';
import { Search, User, Phone, MapPin, Mail, Eye } from '@tamagui/lucide-icons';

const Relatorios = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Cores mais suaves para design clean
  const colors = {
    cardBackground: '#111111',
    text: '#FFFFFF',
    secondaryText: '#9CA3AF',
    background: '#000000',
    primary: '#22C55E',
    border: '#1F1F1F',
    accent: '#374151',
    success: '#22C55E',
  };

  // Mock data - substitua por dados reais da sua API
  const mockClients = [
    {
      id: 1,
      nome: 'João Silva',
      cpf: '123.456.789-00',
      login: 'joao.silva',
      telefone: '(11) 99999-9999',
      email: 'joao@email.com',
      endereco: 'Rua das Flores, 123',
    },
    {
      id: 2,
      nome: 'Maria Santos',
      cpf: '987.654.321-00',
      login: 'maria.santos',
      telefone: '(11) 88888-8888',
      email: 'maria@email.com',
      endereco: 'Av. Principal, 456',
    },
    {
      id: 3,
      nome: 'Pedro Oliveira',
      cpf: '456.789.123-00',
      login: 'pedro.oliveira',
      telefone: '(11) 77777-7777',
      email: 'pedro@email.com',
      endereco: 'Rua Central, 789',
    },
  ];

  const performSearch = () => {
    setHasSearched(true);
    
    if (searchTerm.trim() === '') {
      setFilteredClients([]);
      return;
    }

    const filtered = mockClients.filter(client =>
      client.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cpf.includes(searchTerm) ||
      client.id.toString().includes(searchTerm) ||
      client.login.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredClients(filtered);
  };

  const ClientCard = ({ client }: { client: any }) => (
    <Card
      bg={colors.cardBackground}
      padding="$5"
      borderRadius="$3"
      marginBottom="$3"
      borderWidth={1}
      borderColor={colors.border}
      pressStyle={{ scale: 0.98 }}
      hoverStyle={{ borderColor: colors.accent }}
    >
      <YStack gap="$4">
        {/* Header do Card */}
        <XStack alignItems="center"  justifyContent="space-between">
          <YStack flex={1}>
            <Text fontSize={20} fontWeight="500" color={colors.text}>
              {client.nome}
            </Text>
            <Text fontSize={13} color={colors.secondaryText} marginTop="$1">
              ID: {client.id} • {client.login}
            </Text>
          </YStack>
        </XStack>

        {/* Informações */}
        <YStack gap="$3">
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
                {client.cpf}
              </Text>
              <Text fontSize={12} color={colors.secondaryText}>
                CPF
              </Text>
            </YStack>
          </XStack>

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
                {client.telefone}
              </Text>
              <Text fontSize={12} color={colors.secondaryText}>
                Telefone
              </Text>
            </YStack>
          </XStack>

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
              <Mail size={16} color={colors.secondaryText} />
            </YStack>
            <YStack flex={1}>
              <Text fontSize={14} color={colors.text}>
                {client.email}
              </Text>
              <Text fontSize={12} color={colors.secondaryText}>
                E-mail
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
            fontWeight="500"
            onPress={() => console.log('Ver detalhes', client.id)}
          >
            <XStack alignItems="center" gap="$2">
              <Eye size={16} />
              <Text color="white" fontSize={14}>Detalhes</Text>
            </XStack>
          </Button>
          <Button 
            flex={1} 
            size="$3" 
            bg="transparent"
            borderWidth={1}
            borderColor={colors.border}
            color={colors.text}
            borderRadius="$2"
            fontWeight="500"
            onPress={() => console.log('Editar', client.id)}
          >
            <Text color={colors.text} fontSize={14}>Editar</Text>
          </Button>
        </XStack>
      </YStack>
    </Card>
  );

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <YStack padding="$5" gap="$5" backgroundColor={colors.background}>
        {/* Header Clean */}
        <YStack gap="$2" ai={'center'}>
          <Text 
            fontSize={28} 
            fontWeight="900" 
            color={colors.text}
          >
            Clientes
          </Text>
          <Text 
            fontSize={15} 
            color={colors.secondaryText}
            lineHeight={22}
          >
            Pesquise e gerencie seus clientes
          </Text>
        </YStack>

        {/* Search Input with Round Button */}
        <XStack gap="$3" alignItems="center">
          <YStack
            flex={1}
            bg={colors.cardBackground}
            borderRadius="$10"
            borderWidth={1}
            borderColor={colors.border}
            overflow="hidden"
            height={56}
            ai={'center'}
            jc={'center'}
          >
            <XStack alignItems="center" padding="$4" gap="$3">
              <Search size={20} color={colors.secondaryText} />
              <Input
                flex={1}
                placeholder="Buscar cliente"
                placeholderTextColor={colors.secondaryText}
                color={colors.text}
                borderWidth={0}
                backgroundColor="transparent"
                value={searchTerm}
                onChangeText={setSearchTerm}
                fontSize={16}
                fontWeight="400"
                onSubmitEditing={performSearch}
              />
            </XStack>
          </YStack>

          {/* Round Green Search Button */}
          <Button
            bg={colors.success}
            width={56}
            height={56}
            borderRadius={28}
            alignItems="center"
            justifyContent="center"
            pressStyle={{ scale: 0.95, backgroundColor: '#16A34A' }}
            hoverStyle={{ backgroundColor: '#16A34A' }}
            onPress={performSearch}
            shadowColor="#22C55E"
            shadowOffset={{ width: 0, height: 4 }}
            shadowOpacity={0.3}
            shadowRadius={8}
            elevation={5}
          >
            <Search size={24} color="white" />
          </Button>
        </XStack>

        {/* Search Results - só mostra após clicar no botão */}
        {hasSearched && (
          <YStack gap="$4">
            <Text 
              fontSize={18} 
              fontWeight="400" 
              color={colors.text}
            >
              {filteredClients.length} resultado{filteredClients.length !== 1 ? 's' : ''}
            </Text>

            {filteredClients.length > 0 ? (
              filteredClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))
            ) : (
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
                    <Text 
                      fontSize={16} 
                      color={colors.text}
                      fontWeight="400"
                    >
                      Nenhum cliente encontrado
                    </Text>
                    <Text 
                      fontSize={14} 
                      color={colors.secondaryText}
                      textAlign="center"
                    >
                      Tente usar outros termos de busca
                    </Text>
                  </YStack>
                </YStack>
              </Card>
            )}
          </YStack>
        )}

        {/* Empty State Clean - só mostra quando não buscou ainda */}
        {!hasSearched && (
          <Card
            bg={colors.cardBackground}
            padding="$8"
            borderRadius="$3"
            alignItems="center"
            borderWidth={1}
            borderColor={colors.border}
          >
            <YStack alignItems="center" gap="$4" maxWidth={280}>
              <YStack 
                bg={colors.accent} 
                padding="$4" 
                borderRadius="$4"
                width={80}
                height={80}
                alignItems="center"
                justifyContent="center"
              >
                <User size={32} color={colors.secondaryText} />
              </YStack>
              
              <YStack alignItems="center" gap="$3">
                <Text 
                  fontSize={18} 
                  color={colors.text}
                  fontWeight="400"
                  textAlign="center"
                >
                  Busque por clientes
                </Text>
                <Text 
                  fontSize={14} 
                  color={colors.secondaryText}
                  textAlign="center"
                  lineHeight={20}
                >
                  Digite no campo acima e clique no botão verde para buscar por nome, CPF, ID ou login
                </Text>
              </YStack>
            </YStack>
          </Card>
        )}
      </YStack>
    </ScrollView>
  );
};

export default Relatorios;