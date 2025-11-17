import React, { useState } from 'react';
import { ScrollView, Modal, Pressable, View, Dimensions, Platform } from 'react-native';
import { YStack, XStack, Text, Input, Button, TextArea, ListItem, Avatar, Separator } from 'tamagui';
import { Plus, Send, Package, Clock, CheckCircle, XCircle, ArrowUp, ArrowDown, X, Eye } from '@tamagui/lucide-icons';
import { useThemeContext } from '../../contexts/ThemeContext';

interface PedidoItem {
  id: number;
  produto: string;
  codigo: string;
  quantidade: number;
  unidade: string;
  observacao?: string;
  status: 'pendente' | 'aprovado' | 'rejeitado' | 'entregue';
  tipo: 'entrada' | 'saida';
  data: string;
  solicitante?: string;
  destinatario?: string;
}

const PedidosTab = () => {
  const { isDarkMode } = useThemeContext();
  const [activeTab, setActiveTab] = useState<'pedidos' | 'novo'>('pedidos');
  const [selectedPedido, setSelectedPedido] = useState<PedidoItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoPedido, setNovoPedido] = useState({
    produto: '',
    codigo: '',
    quantidade: '',
    observacao: '',
    tipo: 'entrada' as 'entrada' | 'saida',
    destinatario: '',
  });
  const isAndroid = Platform.OS === 'android';

  const colors = {
    cardBackground: isDarkMode ? '#1F1F1F' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#000000',
    secondaryText: isDarkMode ? '#A0A0A0' : '#666666',
    background: isDarkMode ? '#000000' : '#F8F9FA',
    primary: '#22C55E',
    border: isDarkMode ? '#333333' : '#E0E0E0',
    accent: isDarkMode ? '#374151' : '#F3F4F6',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
  };

  // Mock data dos pedidos
  const mockPedidos: PedidoItem[] = [
    {
      id: 1,
      produto: 'Parafuso Phillips 6x40mm',
      codigo: 'PAR001',
      quantidade: 100,
      unidade: 'unid',
      status: 'pendente',
      tipo: 'entrada',
      data: '2024-11-14',
      solicitante: 'João Silva',
      observacao: 'Urgente para obra',
    },
    {
      id: 2,
      produto: 'Cabo Elétrico 2.5mm²',
      codigo: 'CAB001',
      quantidade: 50,
      unidade: 'm',
      status: 'aprovado',
      tipo: 'saida',
      data: '2024-11-13',
      destinatario: 'Obra Centro',
      observacao: 'Entrega até sexta-feira',
    },
    {
      id: 3,
      produto: 'Disjuntor 20A',
      codigo: 'DIS001',
      quantidade: 10,
      unidade: 'unid',
      status: 'entregue',
      tipo: 'entrada',
      data: '2024-11-12',
      solicitante: 'Maria Santos',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return colors.warning;
      case 'aprovado': return colors.info;
      case 'entregue': return colors.primary;
      case 'rejeitado': return colors.danger;
      default: return colors.secondaryText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pendente': return <Clock size={16} />;
      case 'aprovado': return <CheckCircle size={16} />;
      case 'entregue': return <Package size={16} />;
      case 'rejeitado': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getTipoIcon = (tipo: string) => {
    return tipo === 'entrada' ? 
      <ArrowDown size={16} color={colors.primary} /> : 
      <ArrowUp size={16} color={colors.info} />;
  };

  const handleSubmitPedido = () => {
    // Aqui você implementaria a lógica para enviar o pedido
    console.log('Novo pedido:', novoPedido);
    
    // Reset form
    setNovoPedido({
      produto: '',
      codigo: '',
      quantidade: '',
      observacao: '',
      tipo: 'entrada',
      destinatario: '',
    });
    
    // Voltar para a aba de pedidos
    setActiveTab('pedidos');
  };

  const handleOpenPedidoDetails = (pedido: PedidoItem) => {
    setSelectedPedido(pedido);
    setIsModalOpen(true);
  };

  const handleClosePedidoDetails = () => {
    setSelectedPedido(null);
    setIsModalOpen(false);
  };

  const handleAprovarPedido = (pedidoId: number) => {
    console.log('Aprovar pedido', pedidoId);
    // Aqui você implementaria a lógica para aprovar o pedido
    handleClosePedidoDetails();
  };

  const handleRejeitarPedido = (pedidoId: number) => {
    console.log('Rejeitar pedido', pedidoId);
    // Aqui você implementaria a lógica para rejeitar o pedido
    handleClosePedidoDetails();
  };

  const PedidoListItem = ({ pedido }: { pedido: PedidoItem }) => (
    <ListItem
      hoverTheme
      pressTheme  
      backgroundColor={colors.cardBackground}
      borderRadius="$4"
      marginBottom="$2"
      borderWidth={1}
      borderColor={colors.border}
      padding="$3"
      onPress={() => handleOpenPedidoDetails(pedido)}
      {...(isAndroid && {
        elevation: isDarkMode ? 2 : 4,
      })}
      {...(!isAndroid && {
        shadowColor: isDarkMode ? '#FFFFFF' : '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDarkMode ? 0.1 : 0.1,
        shadowRadius: 3,
      })}
    >
      <ListItem.Text>
        <XStack alignItems="center" justifyContent="space-between" width="100%">
          {/* Avatar com ícone do tipo */}
          <XStack alignItems="center" gap="$3" flex={1}>
            <Avatar circular size="$5" backgroundColor={getStatusColor(pedido.status)}>
              <Avatar.Image src={undefined} />
              <Avatar.Fallback 
                backgroundColor={getStatusColor(pedido.status)}
                justifyContent="center"
                alignItems="center"
              >
                {pedido.tipo === 'entrada' ? 
                  <ArrowDown size={18} color="white" /> : 
                  <ArrowUp size={18} color="white" />
                }
              </Avatar.Fallback>
            </Avatar>

            <YStack flex={1}>
              <Text fontSize={16} fontWeight="600" color={colors.text}>
                {pedido.produto}
              </Text>
            </YStack>
          </XStack>

          {/* Quantidade */}
          <XStack alignItems="center" gap="$2">
            <Text fontSize={18} fontWeight="700" color={colors.text}>
              {pedido.quantidade}
            </Text>
            <Text fontSize={12} color={colors.secondaryText}>
              {pedido.unidade}
            </Text>
            <Eye size={16} color={colors.secondaryText} />
          </XStack>
        </XStack>
      </ListItem.Text>
    </ListItem>
  );

  const renderPedidosList = () => (
    <YStack gap="$4">
      {/* Estatísticas */}
      <YStack gap="$2">
        <Text fontSize={14} fontWeight="500" color={colors.text}>
          Status dos Pedidos
        </Text>
        
        <YStack gap="$2">
          <ListItem
            backgroundColor={colors.cardBackground}
            borderRadius="$3"
            borderWidth={1}
            borderColor={colors.border}
            padding="$3"
            {...(isAndroid && {
              elevation: isDarkMode ? 2 : 4,
            })}
            {...(!isAndroid && {
              shadowColor: isDarkMode ? '#FFFFFF' : '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDarkMode ? 0.1 : 0.1,
              shadowRadius: 3,
            })}
          >
            <ListItem.Text>
              <XStack alignItems="center" justifyContent="space-between" width="100%">
                <XStack alignItems="center" gap="$3">
                  <Avatar circular size="$4" backgroundColor={colors.warning}>
                    <Avatar.Fallback 
                      backgroundColor={colors.warning}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Clock size={16} color="white" />
                    </Avatar.Fallback>
                  </Avatar>
                  <Text fontSize={16} fontWeight="500" color={colors.text}>
                    Pendentes
                  </Text>
                </XStack>
                <Text fontSize={20} fontWeight="700" color={colors.warning}>
                  {mockPedidos.filter(p => p.status === 'pendente').length}
                </Text>
              </XStack>
            </ListItem.Text>
          </ListItem>

          <ListItem
            backgroundColor={colors.cardBackground}
            borderRadius="$3"
            borderWidth={1}
            borderColor={colors.border}
            padding="$3"
            {...(isAndroid && {
              elevation: isDarkMode ? 2 : 4,
            })}
            {...(!isAndroid && {
              shadowColor: isDarkMode ? '#FFFFFF' : '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDarkMode ? 0.1 : 0.1,
              shadowRadius: 3,
            })}
          >
            <ListItem.Text>
              <XStack alignItems="center" justifyContent="space-between" width="100%">
                <XStack alignItems="center" gap="$3">
                  <Avatar circular size="$4" backgroundColor={colors.info}>
                    <Avatar.Fallback 
                      backgroundColor={colors.info}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <CheckCircle size={16} color="white" />
                    </Avatar.Fallback>
                  </Avatar>
                  <Text fontSize={16} fontWeight="500" color={colors.text}>
                    Aprovados
                  </Text>
                </XStack>
                <Text fontSize={20} fontWeight="700" color={colors.info}>
                  {mockPedidos.filter(p => p.status === 'aprovado').length}
                </Text>
              </XStack>
            </ListItem.Text>
          </ListItem>

          <ListItem
            backgroundColor={colors.cardBackground}
            borderRadius="$3"
            borderWidth={1}
            borderColor={colors.border}
            padding="$3"
            {...(isAndroid && {
              elevation: isDarkMode ? 2 : 4,
            })}
            {...(!isAndroid && {
              shadowColor: isDarkMode ? '#FFFFFF' : '#000000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isDarkMode ? 0.1 : 0.1,
              shadowRadius: 3,
            })}
          >
            <ListItem.Text>
              <XStack alignItems="center" justifyContent="space-between" width="100%">
                <XStack alignItems="center" gap="$3">
                  <Avatar circular size="$4" backgroundColor={colors.primary}>
                    <Avatar.Fallback 
                      backgroundColor={colors.primary}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Package size={16} color="white" />
                    </Avatar.Fallback>
                  </Avatar>
                  <Text fontSize={16} fontWeight="500" color={colors.text}>
                    Entregues
                  </Text>
                </XStack>
                <Text fontSize={20} fontWeight="700" color={colors.primary}>
                  {mockPedidos.filter(p => p.status === 'entregue').length}
                </Text>
              </XStack>
            </ListItem.Text>
          </ListItem>
        </YStack>
      </YStack>

      {/* Lista de Pedidos */}
      <YStack gap="$2">
        <Text fontSize={16} fontWeight="600" color={colors.text}>
          Pedidos Recentes
        </Text>
        
        <YStack gap="$1">
          {mockPedidos.map((pedido, index) => (
            <React.Fragment key={pedido.id}>
              <PedidoListItem pedido={pedido} />
              {index < mockPedidos.length - 1 && (
                <Separator marginVertical="$1" borderColor={colors.border} />
              )}
            </React.Fragment>
          ))}
        </YStack>
      </YStack>
    </YStack>
  );

  const renderNovoPedido = () => (
    <YStack gap="$4">
      <Text fontSize={18} fontWeight="600" color={colors.text}>
        Novo Pedido
      </Text>

      {/* Tipo de Pedido */}
      <YStack gap="$2">
        <Text fontSize={14} color={colors.text}>Tipo de Movimentação</Text>
        <XStack gap="$3">
          <Button
            flex={1}
            bg={novoPedido.tipo === 'entrada' ? colors.primary : 'transparent'}
            borderWidth={1}
            borderColor={novoPedido.tipo === 'entrada' ? colors.primary : colors.border}
            onPress={() => setNovoPedido({...novoPedido, tipo: 'entrada'})}
          >
            <XStack alignItems="center" gap="$2">
              <ArrowDown size={16} />
              <Text color={novoPedido.tipo === 'entrada' ? 'white' : colors.text}>
                Entrada
              </Text>
            </XStack>
          </Button>
          <Button
            flex={1}
            bg={novoPedido.tipo === 'saida' ? colors.info : 'transparent'}
            borderWidth={1}
            borderColor={novoPedido.tipo === 'saida' ? colors.info : colors.border}
            onPress={() => setNovoPedido({...novoPedido, tipo: 'saida'})}
          >
            <XStack alignItems="center" gap="$2">
              <ArrowUp size={16} />
              <Text color={novoPedido.tipo === 'saida' ? 'white' : colors.text}>
                Saída
              </Text>
            </XStack>
          </Button>
        </XStack>
      </YStack>

      {/* Produto */}
      <YStack gap="$2">
        <Text fontSize={14} color={colors.text}>Produto</Text>
        <Input
          placeholder="Nome do produto"
          placeholderTextColor={colors.secondaryText}
          color={colors.text}
          bg={colors.cardBackground}
          borderColor={colors.border}
          value={novoPedido.produto}
          onChangeText={(text) => setNovoPedido({...novoPedido, produto: text})}
        />
      </YStack>

      {/* Código */}
      <YStack gap="$2">
        <Text fontSize={14} color={colors.text}>Código</Text>
        <Input
          placeholder="Código do produto"
          placeholderTextColor={colors.secondaryText}
          color={colors.text}
          bg={colors.cardBackground}
          borderColor={colors.border}
          value={novoPedido.codigo}
          onChangeText={(text) => setNovoPedido({...novoPedido, codigo: text})}
        />
      </YStack>

      {/* Quantidade */}
      <YStack gap="$2">
        <Text fontSize={14} color={colors.text}>Quantidade</Text>
        <Input
          placeholder="Quantidade"
          placeholderTextColor={colors.secondaryText}
          color={colors.text}
          bg={colors.cardBackground}
          borderColor={colors.border}
          keyboardType="numeric"
          value={novoPedido.quantidade}
          onChangeText={(text) => setNovoPedido({...novoPedido, quantidade: text})}
        />
      </YStack>

      {/* Destinatário (apenas para saída) */}
      {novoPedido.tipo === 'saida' && (
        <YStack gap="$2">
          <Text fontSize={14} color={colors.text}>Destinatário</Text>
          <Input
            placeholder="Para onde vai o material"
            placeholderTextColor={colors.secondaryText}
            color={colors.text}
            bg={colors.cardBackground}
            borderColor={colors.border}
            value={novoPedido.destinatario}
            onChangeText={(text) => setNovoPedido({...novoPedido, destinatario: text})}
          />
        </YStack>
      )}

      {/* Observação */}
      <YStack gap="$2">
        <Text fontSize={14} color={colors.text}>Observação (opcional)</Text>
        <TextArea
          placeholder="Informações adicionais sobre o pedido"
          placeholderTextColor={colors.secondaryText}
          color={colors.text}
          bg={colors.cardBackground}
          borderColor={colors.border}
          value={novoPedido.observacao}
          onChangeText={(text) => setNovoPedido({...novoPedido, observacao: text})}
        />
      </YStack>

      {/* Botões */}
      <XStack gap="$3" marginTop="$4">
        <Button
          flex={1}
          bg="transparent"
          borderWidth={1}
          borderColor={colors.border}
          onPress={() => setActiveTab('pedidos')}
        >
          <Text color={colors.text}>Cancelar</Text>
        </Button>
        <Button
          flex={1}
          bg={colors.primary}
          onPress={handleSubmitPedido}
        >
          <XStack alignItems="center" justifyContent="center" gap="$2">
            <Send size={16} />
            <Text color="white">Enviar Pedido</Text>
          </XStack>
        </Button>
      </XStack>
    </YStack>
  );

  const renderPedidoDetailsModal = () => {
    if (!selectedPedido) return null;
    
    const { height: screenHeight, width: screenWidth } = Dimensions.get('screen');

    return (
      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent={true}
        statusBarTranslucent={true}
        onRequestClose={handleClosePedidoDetails}
      >
        {/* Container absoluto que cobre TODA a tela incluindo tab bar */}
        <View 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: screenWidth,
            height: screenHeight + 200, // Extra altura para garantir cobertura completa
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 999999999,
            elevation: 999999999,
          }}
        >
          <Pressable 
            style={{ 
              flex: 1,
              justifyContent: 'flex-end'
            }} 
            onPress={handleClosePedidoDetails}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              <YStack 
                backgroundColor={colors.background}
                borderTopLeftRadius={24}
                borderTopRightRadius={24}
                height="90%"
                maxHeight="90%"
                {...(isAndroid && {
                  elevation: 25,
                })}
                {...(!isAndroid && {
                  shadowColor: isDarkMode ? '#FFFFFF' : '#000000',
                  shadowOffset: { width: 0, height: -8 },
                  shadowOpacity: isDarkMode ? 0.2 : 0.25,
                  shadowRadius: 20,
                })}
                overflow="hidden"
              >
                {/* Handle melhorado */}
                <YStack alignItems="center" paddingVertical="$4">
                  <YStack 
                    width={50}
                    height={5}
                    backgroundColor={colors.secondaryText}
                    borderRadius={10}
                    opacity={0.5}
                  />
                </YStack>

                {/* ScrollView com configuração corrigida */}
                <ScrollView 
                  showsVerticalScrollIndicator={true}
                  style={{ 
                    flex: 1,
                    maxHeight: '100%'
                  }}
                  contentContainerStyle={{ 
                    paddingBottom: 60,
                    paddingHorizontal: 20,
                    paddingTop: 12,
                    flexGrow: 1
                  }}
                  bounces={true}
                  scrollEventThrottle={16}
                  nestedScrollEnabled={true}
                  keyboardShouldPersistTaps="handled"
                  scrollEnabled={true}
                  alwaysBounceVertical={false}
                >
                  <YStack gap="$4" minHeight="100%">
                    {/* Header melhorado */}
                    <XStack alignItems="center" justifyContent="space-between" marginBottom="$2">
                      <YStack>
                        <Text fontSize={18} fontWeight="700" color={colors.text}>
                          Detalhes do Pedido
                        </Text>
                        <Text fontSize={12} color={colors.secondaryText} opacity={0.8}>
                          Revise as informações 
                        </Text>
                      </YStack>
                      <Button
                        circular
                        size="$3"
                        backgroundColor={colors.cardBackground}
                        borderWidth={1}
                        borderColor={colors.border}
                        onPress={handleClosePedidoDetails}
                        pressStyle={{ scale: 0.95 }}
                      >
                        <X size={16} color={colors.secondaryText} />
                      </Button>
                    </XStack>

                    {/* Status e Tipo - Card destacado */}
                    <YStack 
                      backgroundColor={colors.cardBackground}
                      borderRadius="$4"
                      borderWidth={1}
                      borderColor={colors.border}
                      padding="$3"
                      gap="$2"
                      {...(isAndroid && {
                        elevation: isDarkMode ? 3 : 5,
                      })}
                      {...(!isAndroid && {
                        shadowColor: isDarkMode ? '#FFFFFF' : '#000000',
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: isDarkMode ? 0.15 : 0.15,
                        shadowRadius: 4,
                      })}
                    >
                      <XStack gap="$3" alignItems="center">
                        <Avatar circular size="$5" backgroundColor={getStatusColor(selectedPedido.status)}>
                          <Avatar.Fallback 
                            backgroundColor={getStatusColor(selectedPedido.status)}
                            justifyContent="center"
                            alignItems="center"
                          >
                            {selectedPedido.tipo === 'entrada' ? 
                              <ArrowDown size={20} color="white" /> : 
                              <ArrowUp size={20} color="white" />
                            }
                          </Avatar.Fallback>
                        </Avatar>
                        
                        <YStack flex={1} gap="$1">
                          <Text fontSize={16} fontWeight="600" color={colors.text}>
                            {selectedPedido.produto}
                          </Text>
                          
                          <XStack alignItems="center" gap="$2">
                            <YStack 
                              backgroundColor={getStatusColor(selectedPedido.status)}
                              paddingHorizontal="$2"
                              paddingVertical="$1"
                              borderRadius="$2"
                            >
                              <Text fontSize={10} color="white" fontWeight="600" letterSpacing={0.3}>
                                {selectedPedido.status === 'pendente' ? 'PENDENTE' :
                                 selectedPedido.status === 'aprovado' ? 'APROVADO' :
                                 selectedPedido.status === 'entregue' ? 'ENTREGUE' : 'REJEITADO'}
                              </Text>
                            </YStack>
                            
                            <YStack 
                              backgroundColor={selectedPedido.tipo === 'entrada' ? colors.primary + '20' : colors.info + '20'}
                              paddingHorizontal="$2"
                              paddingVertical="$1"
                              borderRadius="$2"
                              borderWidth={1}
                              borderColor={selectedPedido.tipo === 'entrada' ? colors.primary : colors.info}
                            >
                              <Text 
                                fontSize={10} 
                                color={selectedPedido.tipo === 'entrada' ? colors.primary : colors.info} 
                                fontWeight="600"
                                letterSpacing={0.3}
                              >
                                {selectedPedido.tipo === 'entrada' ? 'ENTRADA' : 'SAÍDA'}
                              </Text>
                            </YStack>
                          </XStack>
                          
                          {/* Quantidade destacada */}
                          <XStack alignItems="baseline" gap="$1">
                            <Text fontSize={18} fontWeight="700" color={colors.text}>
                              {selectedPedido.quantidade}
                            </Text>
                            <Text fontSize={12} color={colors.secondaryText} fontWeight="500">
                              {selectedPedido.unidade}
                            </Text>
                          </XStack>
                        </YStack>
                      </XStack>
                    </YStack>

                    {/* Informações do Produto */}
                    <YStack 
                      backgroundColor={colors.cardBackground}
                      borderRadius="$3"
                      borderWidth={1}
                      borderColor={colors.border}
                      padding="$3"
                      gap="$2"
                      {...(isAndroid && {
                        elevation: isDarkMode ? 2 : 4,
                      })}
                      {...(!isAndroid && {
                        shadowColor: isDarkMode ? '#FFFFFF' : '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: isDarkMode ? 0.1 : 0.1,
                        shadowRadius: 3,
                      })}
                    >
                      <Text fontSize={14} fontWeight="600" color={colors.text}>
                        Informações do Produto
                      </Text>

                      <YStack gap="$1">
                        <XStack justifyContent="space-between" alignItems="center" paddingVertical="$0.5">
                          <Text fontSize={13} color={colors.secondaryText} fontWeight="500">Código:</Text>
                          <Text fontSize={13} fontWeight="600" color={colors.text}>
                            {selectedPedido.codigo}
                          </Text>
                        </XStack>

                        <Separator borderColor={colors.border} opacity={0.3} />

                        <XStack justifyContent="space-between" alignItems="center" paddingVertical="$0.5">
                          <Text fontSize={13} color={colors.secondaryText} fontWeight="500">Data:</Text>
                          <Text fontSize={13} fontWeight="600" color={colors.text}>
                            {selectedPedido.data}
                          </Text>
                        </XStack>

                        {selectedPedido.solicitante && (
                          <>
                            <Separator borderColor={colors.border} opacity={0.3} />
                            <XStack justifyContent="space-between" alignItems="center" paddingVertical="$0.5">
                              <Text fontSize={13} color={colors.secondaryText} fontWeight="500">Solicitante:</Text>
                              <Text fontSize={13} fontWeight="600" color={colors.text}>
                                {selectedPedido.solicitante}
                              </Text>
                            </XStack>
                          </>
                        )}

                        {selectedPedido.destinatario && (
                          <>
                            <Separator borderColor={colors.border} opacity={0.3} />
                            <XStack justifyContent="space-between" alignItems="center" paddingVertical="$0.5">
                              <Text fontSize={13} color={colors.secondaryText} fontWeight="500">Destinatário:</Text>
                              <Text fontSize={13} fontWeight="600" color={colors.text}>
                                {selectedPedido.destinatario}
                              </Text>
                            </XStack>
                          </>
                        )}

                        {selectedPedido.observacao && (
                          <>
                            <Separator marginVertical="$1" borderColor={colors.border} />
                            <YStack gap="$1">
                              <Text fontSize={13} color={colors.secondaryText} fontWeight="500">Observação:</Text>
                              <YStack 
                                backgroundColor={colors.background}
                                borderRadius="$2"
                                padding="$2"
                                borderWidth={1}
                                borderColor={colors.border}
                              >
                                <Text fontSize={12} color={colors.text} lineHeight={16}>
                                  {selectedPedido.observacao}
                                </Text>
                              </YStack>
                            </YStack>
                          </>
                        )}
                      </YStack>
                    </YStack>

                    {/* Ações para pedidos pendentes - Melhoradas */}
                    {selectedPedido.status === 'pendente' && (
                      <YStack gap="$3" marginTop="$1">
                        <YStack gap="$1">
                          <Text fontSize={15} fontWeight="600" color={colors.text}>
                            Selecione uma opção
                          </Text>
                          <Text fontSize={12} color={colors.secondaryText} opacity={0.9}>
                            Aprove ou recuse este pedido de movimentação
                          </Text>
                        </YStack>
                        
                        <YStack gap="$2">
                          <Button
                            size="$4"
                            backgroundColor={colors.primary}
                            borderRadius="$3"
                            pressStyle={{ scale: 0.98, backgroundColor: colors.primary + 'dd' }}
                            onPress={() => handleAprovarPedido(selectedPedido.id)}
                          >
                            <XStack alignItems="center" justifyContent="center" gap="$2">
                              <CheckCircle size={18} color="white" />
                              <Text color="white" fontSize={14} fontWeight="600">
                                Aceitar Pedido
                              </Text>
                            </XStack>
                          </Button>
                          
                          <Button
                            size="$4"
                            backgroundColor="transparent"
                            borderWidth={1}
                            borderColor={colors.danger}
                            borderRadius="$3"
                            pressStyle={{ scale: 0.98, backgroundColor: colors.danger + '20' }}
                            onPress={() => handleRejeitarPedido(selectedPedido.id)}
                          >
                            <XStack alignItems="center" justifyContent="center" gap="$2">
                              <XCircle size={18} color={colors.danger} />
                              <Text color={colors.danger} fontSize={14} fontWeight="600">
                                Recusar Pedido
                              </Text>
                            </XStack>
                          </Button>
                        </YStack>
                      </YStack>
                    )}
                  </YStack>
                </ScrollView>
              </YStack>
            </Pressable>
          </Pressable>
        </View>
      </Modal>
    );
  };  return (
    <>
      <ScrollView 
        style={{ flex: 1, backgroundColor: colors.background }}
        showsVerticalScrollIndicator={false}
      >
        <YStack padding="$4" gap="$4" backgroundColor={colors.background} paddingBottom="$20">
          {/* Header com navegação */}
          <YStack gap="$3">
            <YStack gap="$1" alignItems="center">
              <Text fontSize={24} fontWeight="800" color={colors.text}>
                Pedidos & Envios
              </Text>
              <Text fontSize={14} color={colors.secondaryText}>
                Gerencie entradas e saídas do estoque
              </Text>
            </YStack>

            {/* Tab Navigation */}
            <XStack gap="$3">
              <Button
                flex={1}
                bg={activeTab === 'pedidos' ? colors.primary : 'transparent'}
                borderWidth={1}
                borderColor={activeTab === 'pedidos' ? colors.primary : colors.border}
                onPress={() => setActiveTab('pedidos')}
              >
                <Text color={activeTab === 'pedidos' ? 'white' : colors.text}>
                  Pedidos
                </Text>
              </Button>
              <Button
                flex={1}
                bg={activeTab === 'novo' ? colors.primary : 'transparent'}
                borderWidth={1}
                borderColor={activeTab === 'novo' ? colors.primary : colors.border}
                onPress={() => setActiveTab('novo')}
              >
                <XStack alignItems="center" justifyContent="center" gap="$2">
                  <Plus size={16} />
                  <Text color={activeTab === 'novo' ? 'white' : colors.text}>
                    Novo
                  </Text>
                </XStack>
              </Button>
            </XStack>
          </YStack>

          {/* Content */}
          {activeTab === 'pedidos' ? renderPedidosList() : renderNovoPedido()}
        </YStack>
      </ScrollView>

      {/* Modal de detalhes do pedido */}
      {renderPedidoDetailsModal()}
    </>
  );
};

export default PedidosTab;
