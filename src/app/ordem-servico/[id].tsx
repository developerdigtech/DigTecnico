import React, { cloneElement, useState } from 'react';
import { ScrollView, Platform, TouchableOpacity } from 'react-native';
import { YStack, XStack, Text, Button, Separator } from 'tamagui';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '../../contexts/ThemeContext';
import {
  ArrowLeft,
  User,
  MapPin,
  Phone,
  FileText,
  Clock,
  AlertCircle,
  Copy,
  CheckCircle2,
  Archive,
  List,
  Users,
  Settings
} from '@tamagui/lucide-icons';

export default function OrdemServicoDetalhes() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isDarkMode } = useThemeContext();
  const isAndroid = Platform.OS === 'android';
  const [activeTab, setActiveTab] = useState('os');
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [osStatus, setOsStatus] = useState('Pendente');

  const colors = {
    background: isDarkMode ? '#000000' : '#F8F9FA',
    cardBackground: isDarkMode ? '#1F1F1F' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#A0A0A0' : '#666666',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    primary: '#11b3e4ff',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
    headerBackground: isDarkMode ? '#1A1A1A' : '#FFFFFF',
  };

  // Dados mockados baseados na imagem fornecida
  const osData = {
    id: id as string,
    atendente: 'VitorAlessandro',
    motivo: 'Recolhimento de equipamento',
    prioridade: 'Prioridade normal',
    cliente: 'FABIO RODRIGUES',
    endereco: 'CORREGO CONDESCENDENCIA, SN, ZONA RURAL, CAPUTIRA',
    complemento: 'CASA CERCA DE BAMBU',
    pontoReferencia: 'PROCURAR PELA CASA DO JOSE TORRE, SENTINDO BOA VISTA',
    latitude: '-20.215165',
    longitude: '-42.247145',
    telefone: '(31) 99755-0265',
    descricao: 'Ir ao local recolher o equipamento. Caso cliente queira reativar, basta pagar o último boleto.',
    status: osStatus,
    data: '17/11/2025',
    hora: '17:31'
  };

  // Dados do cliente
  const clienteData = {
    statusInternet: 'Offline',
    pop: 'CAPUTIRA',
    plano: 'FIBRON 150 MEGA',
    statusContrato: 'Suspenso',
    idContrato: '14613',
    login: 'fabio123',
    senha: '2024',
    loginTV: 'Não informado',
    senhaTV: 'Não informado',
    statusTV: 'Não informado',
    ipConexao: 'Não informado'
  };

  // Histórico de OS
  const historicoOS = [
    {
      id: '31537',
      tecnico: 'WeslleyGomes',
      cidade: 'CAPUTIRA',
      motivo: 'Instalação Fibra',
      agendamento: '02/01/2025 13:00'
    },
    {
      id: '31780',
      tecnico: 'WeslleyGomes',
      cidade: 'CAPUTIRA',
      motivo: 'Sinal alto',
      agendamento: '13/01/2025 13:00'
    },
    {
      id: '35078',
      tecnico: 'Ederson',
      cidade: 'CAPUTIRA',
      motivo: 'Recolhimento de equipamento',
      agendamento: 'Sem agendamento'
    },
    {
      id: '35156',
      tecnico: 'Ederson',
      cidade: 'CAPUTIRA',
      motivo: 'Recolhimento de equipamento',
      agendamento: '29/05/2025 19:29'
    }
  ];

  // Almoxarifado do cliente
  const almoxarifadoData = [
    { nome: 'CONECTOR VERDE', quantidade: 2 },
    { nome: 'ZTE V9 5G', quantidade: 1 },
    { nome: 'FONTE', quantidade: 1 }
  ];

  // Ações disponíveis
  const acoesData = [
    { titulo: 'Ligar para o cliente: (31) 99755-0265', icon: Phone },
    { titulo: 'Chamar cliente no WhatsApp', icon: Phone },
    { titulo: 'Ativar contrato de Internet', icon: Settings },
    { titulo: 'Adicionar anotação à O.S', icon: FileText },
    { titulo: 'Reabrir O.S', icon: FileText }
  ];

  const tabs = [
    { id: 'os', label: 'SERVIÇO', icon: FileText },
    { id: 'cliente', label: 'CLIENTE', icon: User },
    { id: 'acoes', label: 'AÇÕES', icon: Settings },
    { id: 'almoxarifado', label: 'ALMOXARIFADO', icon: Archive }
  ];

  // Função para realizar check-in
  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setOsStatus('Em andamento');
    console.log('Check-in realizado para OS:', osData.id);
  };

  const InfoCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <YStack
      backgroundColor={colors.cardBackground}
      padding="$4"
      borderRadius="$4"
      marginBottom="$3"
      borderWidth={1}
      borderColor={colors.border}
      shadowColor={isDarkMode ? "#000000" : "#000000"}
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={isDarkMode ? 0.3 : 0.1}
      shadowRadius={4}
      elevation={isAndroid ? 3 : 2}
    >
      <Text fontSize={16} fontWeight="700" color={colors.primary} marginBottom="$3">
        {title}
      </Text>
      {children}
    </YStack>
  );

  const InfoRow = ({ icon: Icon, label, value, copyable = false }: {
    icon: any;
    label: string;
    value: string;
    copyable?: boolean;
  }) => (
    <XStack alignItems="flex-start" marginBottom="$2" gap="$2">
      <Icon size={16} color={colors.secondaryText} marginTop="$1" />
      <YStack flex={1}>
        <Text fontSize={12} color={colors.secondaryText} marginBottom="$1">
          {label}
        </Text>
        <XStack alignItems="center" justifyContent="space-between">
          <Text fontSize={14} color={colors.text} flex={1} flexWrap="wrap">
            {value}
          </Text>
          {copyable && (
            <TouchableOpacity style={{ marginLeft: 8 }}>
              <XStack
                backgroundColor={colors.primary}
                paddingHorizontal="$2"
                paddingVertical="$1"
                borderRadius="$2"
                alignItems="center"
                gap="$1"
              >
                <Copy size={12} color="#FFFFFF" />
                <Text fontSize={10} color="#FFFFFF" fontWeight="600">
                  Copiar
                </Text>
              </XStack>
            </TouchableOpacity>
          )}
        </XStack>
      </YStack>
    </XStack>
  );

  // Componente para renderizar dados do cliente
  const DadosClienteTab = () => {
    const [clienteActiveTab, setClienteActiveTab] = useState('dados');

    const clienteTabs = [
      { id: 'dados', label: 'DADOS DO CLIENTE' },
      { id: 'historico', label: 'HISTÓRICO DE O.S' }
    ];

    return (
      <YStack>
        {/* Sub-tabs para cliente */}
        <YStack
          alignItems="center"
          justifyContent="center"
          marginBottom="$4"
          paddingHorizontal="$2"
        >
          <XStack
            backgroundColor={colors.cardBackground}
            borderRadius="$4"
            borderWidth={1}
            borderColor={colors.border}
            width="100%"
            maxWidth={400}
          >
            {clienteTabs.map((tab, index) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setClienteActiveTab(tab.id)}
                style={{ flex: 1 }}
              >
                <YStack
                  alignItems="center"
                  justifyContent="center"
                  paddingVertical="$2"
                  paddingHorizontal="$2"
                  backgroundColor={clienteActiveTab === tab.id ? colors.primary : 'transparent'}
                  borderRadius="$3"
                  margin={3}
                  minHeight={40}
                >
                  <Text
                    fontSize={11}
                    fontWeight="700"
                    color={clienteActiveTab === tab.id ? '#FFFFFF' : colors.secondaryText}
                    textAlign="center"
                    numberOfLines={2}
                  >
                    {tab.label}
                  </Text>
                </YStack>
              </TouchableOpacity>
            ))}
          </XStack>
        </YStack>

        {clienteActiveTab === 'dados' ? (
          <YStack>
            <InfoCard title="STATUS DA CONEXÃO">
              <XStack alignItems="center" marginBottom="$2">
                <Text fontSize={14} color={colors.text}>Status da Internet</Text>
                <Text fontSize={14} color={colors.danger} marginLeft="auto" fontWeight="600">
                  {clienteData.statusInternet}
                </Text>
              </XStack>
              <XStack alignItems="center" marginBottom="$2">
                <Text fontSize={14} color={colors.text}>POP</Text>
                <Text fontSize={14} color={colors.text} marginLeft="auto">
                  {clienteData.pop}
                </Text>
              </XStack>
              <XStack alignItems="center" marginBottom="$2">
                <Text fontSize={14} color={colors.text}>Plano</Text>
                <Text fontSize={14} color={colors.text} marginLeft="auto">
                  {clienteData.plano}
                </Text>
              </XStack>
              <XStack alignItems="center" marginBottom="$2">
                <Text fontSize={14} color={colors.text}>Status Contrato</Text>
                <Text fontSize={14} color={colors.danger} marginLeft="auto" fontWeight="600">
                  {clienteData.statusContrato}
                </Text>
              </XStack>
            </InfoCard>

            <InfoCard title="INFORMAÇÕES DA CONTA">
              {[
                { label: 'ID Contrato', value: clienteData.idContrato },
                { label: 'Login', value: clienteData.login },
                { label: 'Senha', value: clienteData.senha },
                { label: 'Login TV', value: clienteData.loginTV },
                { label: 'Senha TV', value: clienteData.senhaTV },
                { label: 'Status TV', value: clienteData.statusTV },
                { label: 'IP de conexão', value: clienteData.ipConexao }
              ].map((item, index) => (
                <XStack key={index} alignItems="center" justifyContent="space-between" marginBottom="$2">
                  <Text fontSize={14} color={colors.text}>{item.label}</Text>
                  <XStack alignItems="center" gap="$2">
                    <Text fontSize={14} color={colors.text}>{item.value}</Text>
                    <TouchableOpacity>
                      <XStack
                        backgroundColor={colors.primary}
                        paddingHorizontal="$2"
                        paddingVertical="$1"
                        borderRadius="$2"
                        alignItems="center"
                        gap="$1"
                      >
                        <Copy size={12} color="#FFFFFF" />
                        <Text fontSize={10} color="#FFFFFF" fontWeight="600">
                          Copiar
                        </Text>
                      </XStack>
                    </TouchableOpacity>
                  </XStack>
                </XStack>
              ))}
            </InfoCard>
          </YStack>
        ) : (
          <HistoricoTab />
        )}
      </YStack>
    );
  };

  // Componente para renderizar ações
  const AcoesTab = () => {
    // Ações que ficam inativas antes do check-in
    const acoesBloqueadas = ['Ativar contrato de Internet', 'Adicionar anotação à O.S'];

    return (
      <YStack>
        {acoesData.map((acao, index) => {
          const isBlocked = !isCheckedIn && acoesBloqueadas.some(bloqueada => acao.titulo.includes(bloqueada.split(' ')[0]));

          return (
            <TouchableOpacity
              key={index}
              style={{ marginBottom: 12 }}
              disabled={isBlocked}
            >
              <XStack
                backgroundColor={isBlocked ? colors.border : colors.cardBackground}
                padding="$4"
                borderRadius="$4"
                borderWidth={1}
                borderColor={colors.border}
                alignItems="center"
                gap="$3"
                shadowColor={isDarkMode ? "#000000" : "#000000"}
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={isDarkMode ? 0.3 : 0.1}
                shadowRadius={4}
                elevation={isAndroid ? 3 : 2}
                opacity={isBlocked ? 0.5 : 1}
              >
                <acao.icon size={20} color={isBlocked ? colors.secondaryText : colors.primary} />
                <Text fontSize={14} color={isBlocked ? colors.secondaryText : colors.text} flex={1}>
                  {acao.titulo}
                </Text>
                {isBlocked && (
                  <Text fontSize={10} color={colors.secondaryText} fontWeight="600">
                    Bloqueado
                  </Text>
                )}
              </XStack>
            </TouchableOpacity>
          );
        })}

        {!isCheckedIn && (
          <YStack
            backgroundColor={colors.warning}
            padding="$3"
            borderRadius="$4"
            marginTop="$2"
          >
            <Text fontSize={12} color="#FFFFFF" textAlign="center" fontWeight="600">
              ⚠️ Realize o CHECK-IN para liberar todas as funcionalidades
            </Text>
          </YStack>
        )}
      </YStack>
    );
  };

  // Componente para renderizar almoxarifado
  const AlmoxarifadoTab = () => (
    <YStack>
      <InfoCard title="ALMOXARIFADO DO CLIENTE">
        <TouchableOpacity
          style={{ marginBottom: 16 }}
          disabled={!isCheckedIn}
        >
          <XStack
            backgroundColor={isCheckedIn ? colors.primary : colors.border}
            padding="$3"
            borderRadius="$3"
            alignItems="center"
            justifyContent="center"
            borderWidth={2}
            borderColor={isCheckedIn ? colors.primary : colors.border}
            borderStyle="dashed"
            opacity={isCheckedIn ? 1 : 0.5}
          >
            <Text
              color={isCheckedIn ? "#FFFFFF" : colors.secondaryText}
              fontSize={14}
              fontWeight="600"
            >
              {isCheckedIn ? "Adicionar item" : "Adicionar item (Bloqueado)"}
            </Text>
          </XStack>
        </TouchableOpacity>

        {!isCheckedIn && (
          <YStack
            backgroundColor={colors.warning}
            padding="$2"
            borderRadius="$3"
            marginBottom="$3"
          >
            <Text fontSize={11} color="#FFFFFF" textAlign="center" fontWeight="600">
              ⚠️ CHECK-IN necessário para gerenciar almoxarifado
            </Text>
          </YStack>
        )}

        {almoxarifadoData.map((item, index) => (
          <YStack
            key={index}
            backgroundColor={colors.cardBackground}
            padding="$4"
            borderRadius="$4"
            marginBottom="$3"
            borderWidth={1}
            borderColor={colors.border}
            shadowColor={isDarkMode ? "#000000" : "#000000"}
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={isDarkMode ? 0.2 : 0.05}
            shadowRadius={2}
            elevation={isAndroid ? 2 : 1}
          >
            <Text fontSize={16} fontWeight="700" color={colors.text} marginBottom="$1">
              {item.nome}
            </Text>
            <Text fontSize={14} color={colors.secondaryText}>
              QTD: {item.quantidade}
            </Text>
          </YStack>
        ))}
      </InfoCard>
    </YStack>
  );

  // Componente para renderizar histórico
  const HistoricoTab = () => (
    <YStack>
      <InfoCard title="HISTÓRICO DE O.S">
        {historicoOS.map((os, index) => (
          <YStack
            key={index}
            backgroundColor={colors.cardBackground}
            padding="$4"
            borderRadius="$4"
            marginBottom="$3"
            borderWidth={1}
            borderColor={colors.border}
            shadowColor={isDarkMode ? "#000000" : "#000000"}
            shadowOffset={{ width: 0, height: 1 }}
            shadowOpacity={isDarkMode ? 0.2 : 0.05}
            shadowRadius={2}
            elevation={isAndroid ? 2 : 1}
          >
            <XStack alignItems="center" marginBottom="$2">
              <FileText size={16} color={colors.primary} />
              <Text fontSize={14} fontWeight="700" color={colors.text} marginLeft="$2">
                O.S: {os.id}
              </Text>
            </XStack>
            <XStack alignItems="center" marginBottom="$1">
              <User size={14} color={colors.secondaryText} />
              <Text fontSize={12} color={colors.secondaryText} marginLeft="$2">
                Técnico: {os.tecnico}
              </Text>
            </XStack>
            <XStack alignItems="center" marginBottom="$1">
              <MapPin size={14} color={colors.secondaryText} />
              <Text fontSize={12} color={colors.secondaryText} marginLeft="$2">
                Cidade: {os.cidade}
              </Text>
            </XStack>
            <XStack alignItems="center" marginBottom="$1">
              <AlertCircle size={14} color={colors.secondaryText} />
              <Text fontSize={12} color={colors.secondaryText} marginLeft="$2">
                Motivo: {os.motivo}
              </Text>
            </XStack>
            <XStack alignItems="center">
              <Clock size={14} color={colors.secondaryText} />
              <Text fontSize={12} color={colors.secondaryText} marginLeft="$2">
                Agendamento: {os.agendamento}
              </Text>
            </XStack>
          </YStack>
        ))}
      </InfoCard>
    </YStack>
  );

  // Componente para renderizar OS (conteúdo original)
  const ServicoTab = () => (
    <YStack>
      {/* Informações do Atendimento */}
      <InfoCard title="SERVIÇO">
        <InfoRow icon={User} label="Atendente" value={osData.atendente} />
        <InfoRow icon={FileText} label="Motivo da O.S" value={osData.motivo} />
        <InfoRow icon={AlertCircle} label="Prioridade" value={osData.prioridade} />
      </InfoCard>

      {/* Informações do Cliente */}
      <InfoCard title="CLIENTE">
        <InfoRow icon={User} label="Cliente" value={osData.cliente} copyable />
      </InfoCard>

      {/* Endereço */}
      <InfoCard title="ENDEREÇO">
        <InfoRow icon={MapPin} label="Endereço ( Cliente )" value={osData.endereco} copyable />
        <InfoRow icon={MapPin} label="Complemento" value={osData.complemento} />
        <InfoRow icon={MapPin} label="Ponto de Referencia" value={osData.pontoReferencia} />
        <InfoRow
          icon={MapPin}
          label="Latitude e Longitude"
          value={`${osData.latitude} ${osData.longitude}`}
          copyable
        />
      </InfoCard>

      {/* Contato */}
      <InfoCard title="CONTATO">
        <InfoRow icon={Phone} label="Telefone" value={osData.telefone} copyable />
      </InfoCard>

      {/* Descrição */}
      <InfoCard title="DESCRIÇÃO DA OS">
        <Text fontSize={14} color={colors.text} lineHeight={20}>
          {osData.descricao}
        </Text>
      </InfoCard>

      {/* Botão Check-in/Checklist - apenas na aba serviço */}
      <Button
        backgroundColor={isCheckedIn ? colors.info : colors.primary}
        color="#FFFFFF"
        fontSize={16}
        fontWeight="700"
        height={56}
        borderRadius="$4"
        marginTop="$4"
        shadowColor={isCheckedIn ? colors.info : colors.primary}
        shadowOffset={{ width: 0, height: 4 }}
        shadowOpacity={0.3}
        shadowRadius={8}
        elevation={isAndroid ? 6 : 4}
        pressStyle={{
          opacity: 0.9,
          scale: 0.98
        }}
        onPress={() => {
          if (!isCheckedIn) {
            handleCheckIn();
          } else {
            // Navegar para checklist
            console.log('Abrir checklist para OS:', osData.id);
          }
        }}
      >
        <XStack alignItems="center" gap="$2">
          {isCheckedIn ? (
            <List size={20} color="#FFFFFF" />
          ) : (
            <CheckCircle2 size={20} color="#FFFFFF" />
          )}
          <Text color="#FFFFFF" fontSize={16} fontWeight="700">
            {isCheckedIn ? "CHECK LIST" : "CHECK-IN"}
          </Text>
        </XStack>
      </Button>
    </YStack>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'os':
        return <ServicoTab />;
      case 'cliente':
        return <DadosClienteTab />;
      case 'acoes':
        return <AcoesTab />;
      case 'almoxarifado':
        return <AlmoxarifadoTab />;
      default:
        return <ServicoTab />;
    }
  };

  return (
    <YStack flex={1} backgroundColor={colors.background}>
      {/* Header */}
      <YStack
        backgroundColor={colors.headerBackground}
        paddingTop={insets.top}
        paddingHorizontal="$4"
        paddingBottom="$3"
        borderBottomWidth={1}
        borderBottomColor={colors.border}
        shadowColor={isDarkMode ? "#000000" : "#000000"}
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={isDarkMode ? 0.3 : 0.1}
        shadowRadius={4}
        elevation={isAndroid ? 5 : 3}
      >
        <XStack alignItems="center" justifyContent="space-between">
          <TouchableOpacity onPress={() => router.back()}>
            <XStack alignItems="center" gap="$2">
              <ArrowLeft size={24} color={colors.text} />
              <Text fontSize={18} fontWeight="600" color={colors.text}>
                OS - {osData.id}
              </Text>
            </XStack>
          </TouchableOpacity>

          <XStack
            backgroundColor={osStatus === 'Pendente' ? colors.warning : colors.primary}
            paddingHorizontal="$3"
            paddingVertical="$2"
            borderRadius="$3"
          >
            <Text color="#FFFFFF" fontSize={12} fontWeight="700">
              {osStatus}
            </Text>
          </XStack>
        </XStack>
      </YStack>

      {/* Tabs Navigation */}
      <YStack
        backgroundColor={colors.headerBackground}
        borderBottomWidth={1}
        borderBottomColor={colors.border}
        ai={'center'}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 8,
            paddingVertical: 8
          }}
        >
          <XStack gap="$3">
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setActiveTab(tab.id)}
              >
                <YStack
                  alignItems="center"
                  justifyContent="center"
                  paddingVertical="$3"
                  paddingHorizontal="$3"
                  borderRadius="$3"
                  backgroundColor={activeTab === tab.id ? colors.primary : 'transparent'}
                  minWidth={70}
                  borderWidth={1}
                  borderColor={activeTab === tab.id ? colors.primary : colors.border}
                >
                  <tab.icon
                    size={22}
                    color={activeTab === tab.id ? '#FFFFFF' : colors.secondaryText}
                  />
                  <Text
                    fontSize={10}
                    fontWeight="700"
                    color={activeTab === tab.id ? '#FFFFFF' : colors.secondaryText}
                    marginTop="$1"
                    textAlign="center"
                    numberOfLines={1}
                  >
                    {tab.label}
                  </Text>
                </YStack>
              </TouchableOpacity>
            ))}
          </XStack>
        </ScrollView>
      </YStack>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 120
        }}
      >
        {renderTabContent()}
      </ScrollView>
    </YStack>
  );
}
