import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Text, Input, Button, TextArea } from 'tamagui';
import { Plus, Send, Package, Clock, CheckCircle, XCircle, ArrowUp, ArrowDown } from '@tamagui/lucide-icons';

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
  const [activeTab, setActiveTab] = useState<'pedidos' | 'novo'>('pedidos');
  const [novoPedido, setNovoPedido] = useState({
    produto: '',
    codigo: '',
    quantidade: '',
    observacao: '',
    tipo: 'entrada' as 'entrada' | 'saida',
    destinatario: '',
  });

  const colors = {
    cardBackground: '#111111',
    text: '#FFFFFF',
    secondaryText: '#9CA3AF',
    background: '#000000',
    primary: '#22C55E',
    border: '#1F1F1F',
    accent: '#374151',
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

  const PedidoCard = ({ pedido }: { pedido: PedidoItem }) => (
    <YStack
      backgroundColor={colors.cardBackground}
      padding="$4"
      borderRadius="$3"
      marginBottom="$3"
      borderWidth={1}
      borderColor={colors.border}
    >
      <YStack gap="$3">
        {/* Header do Pedido */}
        <XStack alignItems="center" justifyContent="space-between">
          <YStack flex={1}>
            <Text fontSize={16} fontWeight="600" color={colors.text}>
              {pedido.produto}
            </Text>
            <XStack alignItems="center" gap="$2" marginTop="$1">
              <Text fontSize={12} color={colors.secondaryText}>
                {pedido.codigo}
              </Text>
              <Text fontSize={12} color={colors.secondaryText}>•</Text>
              <Text fontSize={12} color={colors.secondaryText}>
                {pedido.data}
              </Text>
            </XStack>
          </YStack>
          
          <XStack alignItems="center" gap="$2">
            {getTipoIcon(pedido.tipo)}
            <YStack alignItems="center">
              <YStack alignItems="center" style={{ color: getStatusColor(pedido.status) }}>
                {getStatusIcon(pedido.status)}
              </YStack>
              <Text fontSize={10} color={getStatusColor(pedido.status)} textAlign="center">
                {pedido.status === 'pendente' ? 'Pendente' :
                 pedido.status === 'aprovado' ? 'Aprovado' :
                 pedido.status === 'entregue' ? 'Entregue' : 'Rejeitado'}
              </Text>
            </YStack>
          </XStack>
        </XStack>

        {/* Informações do Pedido */}
        <XStack gap="$4">
          <YStack flex={1}>
            <Text fontSize={20} fontWeight="700" color={colors.text}>
              {pedido.quantidade}
            </Text>
            <Text fontSize={12} color={colors.secondaryText}>
              {pedido.unidade}
            </Text>
          </YStack>
          
          <YStack flex={2}>
            <Text fontSize={14} fontWeight="500" color={colors.text}>
              {pedido.tipo === 'entrada' ? 'Entrada' : 'Saída'}
            </Text>
            <Text fontSize={12} color={colors.secondaryText}>
              {pedido.solicitante ? `Solicitante: ${pedido.solicitante}` : 
               pedido.destinatario ? `Destino: ${pedido.destinatario}` : ''}
            </Text>
          </YStack>
        </XStack>

        {/* Observação */}
        {pedido.observacao && (
          <YStack>
            <Text fontSize={12} color={colors.secondaryText}>
              Observação: {pedido.observacao}
            </Text>
          </YStack>
        )}

        {/* Ações */}
        {pedido.status === 'pendente' && (
          <XStack gap="$2" marginTop="$2">
            <Button 
              flex={1} 
              size="$2" 
              bg={colors.primary}
              color="white"
              borderRadius="$2"
              onPress={() => console.log('Aprovar', pedido.id)}
            >
              <Text color="white" fontSize={12}>Aprovar</Text>
            </Button>
            <Button 
              flex={1} 
              size="$2" 
              bg={colors.danger}
              color="white"
              borderRadius="$2"
              onPress={() => console.log('Rejeitar', pedido.id)}
            >
              <Text color="white" fontSize={12}>Rejeitar</Text>
            </Button>
          </XStack>
        )}
      </YStack>
    </YStack>
  );

  const renderPedidosList = () => (
    <YStack gap="$4">
      {/* Estatísticas */}
      <XStack gap="$3">
        <YStack 
          flex={1} 
          backgroundColor={colors.cardBackground} 
          padding="$3" 
          borderRadius="$3" 
          borderWidth={1} 
          borderColor={colors.border}
        >
          <YStack alignItems="center" gap="$1">
            <Text fontSize={18} fontWeight="700" color={colors.warning}>
              {mockPedidos.filter(p => p.status === 'pendente').length}
            </Text>
            <Text fontSize={10} color={colors.secondaryText}>Pendentes</Text>
          </YStack>
        </YStack>
        
        <YStack 
          flex={1} 
          backgroundColor={colors.cardBackground} 
          padding="$3" 
          borderRadius="$3" 
          borderWidth={1} 
          borderColor={colors.border}
        >
          <YStack alignItems="center" gap="$1">
            <Text fontSize={18} fontWeight="700" color={colors.info}>
              {mockPedidos.filter(p => p.status === 'aprovado').length}
            </Text>
            <Text fontSize={10} color={colors.secondaryText}>Aprovados</Text>
          </YStack>
        </YStack>
        
        <YStack 
          flex={1} 
          backgroundColor={colors.cardBackground} 
          padding="$3" 
          borderRadius="$3" 
          borderWidth={1} 
          borderColor={colors.border}
        >
          <YStack alignItems="center" gap="$1">
            <Text fontSize={18} fontWeight="700" color={colors.primary}>
              {mockPedidos.filter(p => p.status === 'entregue').length}
            </Text>
            <Text fontSize={10} color={colors.secondaryText}>Entregues</Text>
          </YStack>
        </YStack>
      </XStack>

      {/* Lista de Pedidos */}
      <YStack gap="$2">
        <Text fontSize={16} fontWeight="600" color={colors.text}>
          Pedidos Recentes
        </Text>
        
        {mockPedidos.map((pedido) => (
          <PedidoCard key={pedido.id} pedido={pedido} />
        ))}
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
          <XStack alignItems="center" gap="$2">
            <Send size={16} />
            <Text color="white">Enviar Pedido</Text>
          </XStack>
        </Button>
      </XStack>
    </YStack>
  );

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <YStack padding="$4" gap="$4" backgroundColor={colors.background}>
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
              <XStack alignItems="center" gap="$2">
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
  );
};

export default PedidosTab;
