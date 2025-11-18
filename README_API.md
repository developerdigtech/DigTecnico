# Guia de Integração com a API

Este documento explica como usar a estrutura de API organizada no projeto DigTecnico.

## 📁 Estrutura de Pastas

```
src/
├── config/
│   └── api.ts                 # Configurações da API e endpoints
├── types/
│   └── api.ts                 # Tipagens TypeScript
├── utils/
│   └── apiClient.ts           # Cliente HTTP para requisições
├── services/
│   ├── index.ts               # Exportação centralizada
│   ├── authService.ts         # Serviço de autenticação
│   ├── orderService.ts        # Serviço de ordens de serviço
│   ├── clientService.ts       # Serviço de clientes
│   ├── warehouseService.ts    # Serviço de almoxarifado
│   └── dashboardService.ts    # Serviço de dashboard
└── hooks/
    ├── useAuth.ts             # Hook de autenticação
    └── useOrders.ts           # Hook de ordens de serviço
```

## 🔧 Configuração

### 1. Configurar URL da API

Edite `src/config/api.ts` e configure as URLs do seu backend:

```typescript
const API_URLS = {
  development: 'http://localhost:3000/api',
  staging: 'https://staging-api.fibron.com/api',
  production: 'https://api.fibron.com/api',
};
```

### 2. Escolher Ambiente

Altere a constante `ENV` para o ambiente desejado:

```typescript
const ENV = 'development'; // ou 'staging', 'production'
```

## 📖 Como Usar

### Autenticação

```typescript
import { authService } from '../services';

// Login
try {
  const response = await authService.login({
    username: 'admin',
    password: '123456'
  });
  
  console.log('Usuário logado:', response.user);
} catch (error) {
  console.error('Erro no login:', error);
}

// Logout
await authService.logout();

// Verificar se está autenticado
const isAuth = await authService.isAuthenticated();
```

### Usando Hooks em Componentes

```typescript
import { useAuth } from '../hooks/useAuth';

export default function LoginScreen() {
  const { user, isLoading, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login({
        username: 'admin',
        password: '123456'
      });
      // Sucesso!
    } catch (error) {
      // Tratar erro
    }
  };

  return (
    // Seu componente...
  );
}
```

### Ordens de Serviço

```typescript
import { orderService } from '../services';

// Listar ordens abertas
const openOrders = await orderService.getOpenOrders();

// Detalhes de uma ordem
const order = await orderService.getOrderDetail('ordem-id');

// Fechar ordem
await orderService.closeOrder('ordem-id', {
  observacoes: 'Serviço concluído com sucesso',
  fotos: ['url-foto-1', 'url-foto-2']
});

// Estatísticas
const stats = await orderService.getStatistics();
```

### Usando Hook de Ordens

```typescript
import { useOrders } from '../hooks/useOrders';

export default function OrdersScreen() {
  const { orders, isLoading, error, fetchOrders, closeOrder } = useOrders();

  useEffect(() => {
    fetchOrders({ status: 'aberta' });
  }, []);

  const handleCloseOrder = async (orderId: string) => {
    try {
      await closeOrder(orderId, {
        observacoes: 'Concluído'
      });
    } catch (error) {
      // Tratar erro
    }
  };

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Erro: {error}</Text>;

  return (
    // Renderizar ordens...
  );
}
```

### Clientes

```typescript
import { clientService } from '../services';

// Listar clientes
const clients = await clientService.listClients({
  page: 1,
  pageSize: 20
});

// Buscar cliente
const results = await clientService.searchClients('João Silva');

// Detalhes do cliente
const client = await clientService.getClientDetail('cliente-id');
```

### Almoxarifado

```typescript
import { warehouseService } from '../services';

// Buscar estoque
const stock = await warehouseService.getStock({
  category: 'cabos'
});

// Listar pedidos
const orders = await warehouseService.getOrders({
  status: 'pendente'
});

// Criar pedido
await warehouseService.createOrder({
  itens: [
    { materialId: 'mat-1', quantidade: 5 },
    { materialId: 'mat-2', quantidade: 3 }
  ],
  observacoes: 'Urgente'
});
```

### Dashboard

```typescript
import { dashboardService } from '../services';

// Estatísticas
const stats = await dashboardService.getStats();

// Ordens recentes
const recentOrders = await dashboardService.getRecentOrders(10);
```

## 🎨 Exemplo Completo

```typescript
import { YStack, Text, Button } from 'tamagui';
import { useState, useEffect } from 'react';
import { useOrders } from '../hooks/useOrders';
import { dashboardService } from '../services';

export default function DashboardScreen() {
  const { orders, isLoading, fetchOrders } = useOrders();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Buscar ordens abertas
      await fetchOrders({ status: 'aberta' });
      
      // Buscar estatísticas
      const dashStats = await dashboardService.getStats();
      setStats(dashStats);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  if (isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <YStack padding="$4" gap="$4">
      <Text fontSize="$6" fontWeight="bold">
        Dashboard
      </Text>

      {stats && (
        <YStack gap="$2">
          <Text>Ordens Abertas: {stats.ordensAbertas}</Text>
          <Text>Ordens Fechadas Hoje: {stats.ordensFechadasHoje}</Text>
        </YStack>
      )}

      <Button onPress={loadData}>
        Atualizar
      </Button>
    </YStack>
  );
}
```

## 🔐 Tratamento de Erros

Todos os serviços lançam erros do tipo `ApiError`:

```typescript
try {
  await orderService.getOpenOrders();
} catch (error: any) {
  if (error.statusCode === 401) {
    // Não autorizado - redirecionar para login
  } else if (error.statusCode === 0) {
    // Erro de rede
    console.log('Sem conexão com o servidor');
  } else {
    // Outro erro
    console.log(error.message);
  }
}
```

## 📝 Notas Importantes

1. **Token de Autenticação**: É gerenciado automaticamente pelo `apiClient`
2. **Timeout**: Configurado para 30 segundos (ajuste em `api.ts`)
3. **Storage**: Usa `AsyncStorage` para persistir token e dados do usuário
4. **TypeScript**: Todos os tipos estão definidos em `types/api.ts`
5. **Extensibilidade**: Fácil adicionar novos serviços seguindo o padrão existente

## 🚀 Próximos Passos

1. Configure a URL do seu backend em `config/api.ts`
2. Ajuste os tipos em `types/api.ts` conforme sua API
3. Implemente os componentes usando os hooks e serviços
4. Adicione tratamento de erros apropriado
5. Teste a integração com seu backend

## 📞 Suporte

Se tiver dúvidas, consulte a documentação do seu backend ou entre em contato com a equipe de desenvolvimento.
