import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { YStack, XStack, Text, Input, Button, ListItem, Separator, Avatar } from 'tamagui';
import { Search, Package, AlertTriangle, TrendingUp, TrendingDown, Eye, Edit3, BarChart3 } from '@tamagui/lucide-icons';

interface Product {
  id: number;
  nome: string;
  codigo: string;
  categoria: string;
  quantidade: number;
  minimo: number;
  unidade: string;
  preco: number;
  localizacao: string;
  status: 'normal' | 'baixo' | 'critico';
}

const EstoqueTab = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

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
  };

  // Mock data dos produtos em estoque
  const mockProducts: Product[] = [
    {
      id: 1,
      nome: 'Parafuso Phillips 6x40mm',
      codigo: 'PAR001',
      categoria: 'Parafusos',
      quantidade: 150,
      minimo: 50,
      unidade: 'unid',
      preco: 0.25,
      localizacao: 'A1-B2',
      status: 'normal',
    },
    {
      id: 2,
      nome: 'Cabo Elétrico 2.5mm²',
      codigo: 'CAB001',
      categoria: 'Cabos',
      quantidade: 25,
      minimo: 30,
      unidade: 'm',
      preco: 3.50,
      localizacao: 'C3-D4',
      status: 'baixo',
    },
    {
      id: 3,
      nome: 'Disjuntor 20A',
      codigo: 'DIS001',
      categoria: 'Elétricos',
      quantidade: 8,
      minimo: 15,
      unidade: 'unid',
      preco: 45.90,
      localizacao: 'E1-F2',
      status: 'critico',
    },
    {
      id: 4,
      nome: 'Tubo PVC 32mm',
      codigo: 'TUB001',
      categoria: 'Tubulação',
      quantidade: 80,
      minimo: 25,
      unidade: 'm',
      preco: 12.40,
      localizacao: 'G5-H6',
      status: 'normal',
    },
  ];

  const performSearch = () => {
    setHasSearched(true);
    
    if (searchTerm.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const filtered = mockProducts.filter(product =>
      product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoria.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredProducts(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critico': return colors.danger;
      case 'baixo': return colors.warning;
      default: return colors.primary;
    }
  };

  const getStatusIcon = (status: string) => {
    const iconColor = getStatusColor(status);
    switch (status) {
      case 'critico': return <TrendingDown size={16} color={iconColor} />;
      case 'baixo': return <AlertTriangle size={16} color={iconColor} />;
      default: return <TrendingUp size={16} color={iconColor} />;
    }
  };

  const ProductListItem = ({ product }: { product: Product }) => (
    <ListItem
      hoverTheme
      pressTheme
      backgroundColor={colors.cardBackground}
      borderRadius="$4"
      marginBottom="$2"
      borderWidth={1}
      borderColor={colors.border}
      onPress={() => console.log('Ver detalhes', product.id)}
    >
      <ListItem.Text>
        <XStack alignItems="center" justifyContent="space-between" width="100%">
          {/* Avatar com ícone da categoria */}
          <XStack alignItems="center" gap="$3" flex={1}>
            <Avatar circular size="$6" backgroundColor={getStatusColor(product.status)}>
              <Avatar.Image src={undefined} />
              <Avatar.Fallback 
                backgroundColor={getStatusColor(product.status)}
                justifyContent="center"
                alignItems="center"
              >
                <Package size={20} color="white" />
              </Avatar.Fallback>
            </Avatar>

            <YStack flex={1} gap="$1">
              <Text fontSize={16} fontWeight="600" color={colors.text}>
                {product.nome}
              </Text>
              <XStack alignItems="center" gap="$2">
                <Text fontSize={12} color={colors.secondaryText}>
                  {product.codigo}
                </Text>
                <Text fontSize={12} color={colors.secondaryText}>•</Text>
                <Text fontSize={12} color={colors.secondaryText}>
                  {product.categoria}
                </Text>
              </XStack>
              <XStack alignItems="center" gap="$2">
                <Package size={12} color={colors.secondaryText} />
                <Text fontSize={11} color={colors.secondaryText}>
                  {product.localizacao}
                </Text>
              </XStack>
            </YStack>
          </XStack>

          {/* Informações numéricas */}
          <YStack alignItems="flex-end" gap="$1" minWidth={80}>
            <XStack alignItems="center" gap="$2">
              <Text fontSize={18} fontWeight="700" color={colors.text}>
                {product.quantidade}
              </Text>
              <Text fontSize={12} color={colors.secondaryText}>
                {product.unidade}
              </Text>
            </XStack>
            
            <Text fontSize={12} color={colors.primary}>
              R$ {product.preco.toFixed(2)}/{product.unidade}
            </Text>
            
            <XStack alignItems="center" justifyContent="center" gap="$1">
              {getStatusIcon(product.status)}
              <Text fontSize={10} color={getStatusColor(product.status)} textAlign="center">
                {product.status === 'critico' ? 'Crítico' : 
                 product.status === 'baixo' ? 'Baixo' : 'OK'}
              </Text>
            </XStack>
          </YStack>
        </XStack>
      </ListItem.Text>
    </ListItem>
  );

  // Estatísticas rápidas
  const totalProducts = mockProducts.length;
  const criticalProducts = mockProducts.filter(p => p.status === 'critico').length;
  const lowStockProducts = mockProducts.filter(p => p.status === 'baixo').length;

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: colors.background }}
      showsVerticalScrollIndicator={false}
    >
      <YStack padding="$4" gap="$4" backgroundColor={colors.background} paddingBottom="$20">
        {/* Header */}
        <YStack gap="$2" alignItems="center">
          <Text fontSize={24} fontWeight="800" color={colors.text}>
            Meu Estoque
          </Text>
          <Text fontSize={14} color={colors.secondaryText}>
            Gerencie seus produtos e monitore o estoque
          </Text>
        </YStack>

        {/* Estatísticas Rápidas */}
        <YStack gap="$2">
          <Text fontSize={14} fontWeight="500" color={colors.text}>
            Resumo do Estoque
          </Text>
          
          <YStack gap="$2">
            <ListItem
              backgroundColor={colors.cardBackground}
              borderRadius="$3"
              borderWidth={1}
              borderColor={colors.border}
              padding="$3"
            >
              <ListItem.Text>
                <XStack alignItems="center" justifyContent="space-between" width="100%">
                  <XStack alignItems="center" gap="$3">
                    <Avatar circular size="$4" backgroundColor={colors.accent}>
                      <Avatar.Fallback 
                        backgroundColor={colors.accent}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <BarChart3 size={16} color={colors.text} />
                      </Avatar.Fallback>
                    </Avatar>
                    <Text fontSize={16} fontWeight="500" color={colors.text}>
                      Total de Produtos
                    </Text>
                  </XStack>
                  <Text fontSize={24} fontWeight="700" color={colors.text}>
                    {totalProducts}
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
                        <AlertTriangle size={16} color="white" />
                      </Avatar.Fallback>
                    </Avatar>
                    <Text fontSize={16} fontWeight="500" color={colors.text}>
                      Estoque Baixo
                    </Text>
                  </XStack>
                  <Text fontSize={24} fontWeight="700" color={colors.warning}>
                    {lowStockProducts}
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
            >
              <ListItem.Text>
                <XStack alignItems="center" justifyContent="space-between" width="100%">
                  <XStack alignItems="center" gap="$3">
                    <Avatar circular size="$4" backgroundColor={colors.danger}>
                      <Avatar.Fallback 
                        backgroundColor={colors.danger}
                        justifyContent="center"
                        alignItems="center"
                      >
                        <TrendingDown size={16} color="white" />
                      </Avatar.Fallback>
                    </Avatar>
                    <Text fontSize={16} fontWeight="500" color={colors.text}>
                      Estoque Crítico
                    </Text>
                  </XStack>
                  <Text fontSize={24} fontWeight="700" color={colors.danger}>
                    {criticalProducts}
                  </Text>
                </XStack>
              </ListItem.Text>
            </ListItem>
          </YStack>
        </YStack>

        {/* Search Input */}
        <ListItem
          backgroundColor={colors.cardBackground}
          borderRadius="$4"
          borderWidth={1}
          borderColor={colors.border}
          padding="$3"
        >
          <ListItem.Text>
            <XStack alignItems="center" gap="$3" width="100%">
              <Search size={18} color={colors.secondaryText} />
              <Input
                flex={1}
                placeholder="Buscar produtos por nome, código ou categoria"
                placeholderTextColor={colors.secondaryText}
                color={colors.text}
                borderWidth={0}
                backgroundColor="transparent"
                value={searchTerm}
                onChangeText={setSearchTerm}
                fontSize={14}
                onSubmitEditing={performSearch}
              />
              <Button
                backgroundColor={colors.primary}
                size="$3"
                borderRadius="$2"
                pressStyle={{ scale: 0.95 }}
                onPress={performSearch}
              >
                <Text color="white" fontSize={12} fontWeight="600">
                  Buscar
                </Text>
              </Button>
            </XStack>
          </ListItem.Text>
        </ListItem>

        {/* Lista de Produtos */}
        {hasSearched ? (
          <YStack gap="$3">
            <Text fontSize={16} fontWeight="500" color={colors.text}>
              {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
            </Text>

            {filteredProducts.length > 0 ? (
              <YStack gap="$1">
                {filteredProducts.map((product, index) => (
                  <React.Fragment key={product.id}>
                    <ProductListItem product={product} />
                    {index < filteredProducts.length - 1 && (
                      <Separator marginVertical="$1" borderColor={colors.border} />
                    )}
                  </React.Fragment>
                ))}
              </YStack>
            ) : (
              <YStack
                backgroundColor={colors.cardBackground}
                padding="$6"
                borderRadius="$3"
                alignItems="center"
                borderWidth={1}
                borderColor={colors.border}
              >
                <YStack alignItems="center" gap="$3">
                  <Package size={48} color={colors.secondaryText} />
                  <YStack alignItems="center" gap="$1">
                    <Text fontSize={16} color={colors.text}>
                      Nenhum produto encontrado
                    </Text>
                    <Text fontSize={12} color={colors.secondaryText} textAlign="center">
                      Tente usar outros termos de busca
                    </Text>
                  </YStack>
                </YStack>
              </YStack>
            )}
          </YStack>
        ) : (
          <YStack gap="$3">
            <Text fontSize={16} fontWeight="500" color={colors.text}>
              Produtos em estoque
            </Text>
            
            <YStack gap="$1">
              {mockProducts.map((product, index) => (
                <React.Fragment key={product.id}>
                  <ProductListItem product={product} />
                  {index < mockProducts.length - 1 && (
                    <Separator marginVertical="$1" borderColor={colors.border} />
                  )}
                </React.Fragment>
              ))}
            </YStack>
          </YStack>
        )}
      </YStack>
    </ScrollView>
  );
};

export default EstoqueTab;
