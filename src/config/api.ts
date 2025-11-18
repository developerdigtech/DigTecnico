/**
 * Configurações da API
 */

// URLs base por ambiente
const API_URLS = {
  development: 'http://localhost:3000/api',
  staging: 'https://staging-api.fibron.com/api',
  production: 'https://api.fibron.com/api',
};

// Ambiente atual (pode ser controlado por variável de ambiente)
const ENV = 'development'; // ou 'staging', 'production'

export const API_CONFIG = {
  BASE_URL: API_URLS[ENV],
  TIMEOUT: 30000, // 30 segundos
  HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Endpoints da API
export const API_ENDPOINTS = {
  // Autenticação
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH_TOKEN: '/auth/refresh',
    VERIFY: '/auth/verify',
  },
  
  // Usuários/Técnicos
  USERS: {
    PROFILE: '/users/profile',
    UPDATE_PROFILE: '/users/profile/update',
    TECHNICIANS: '/users/technicians',
  },
  
  // Ordens de Serviço
  ORDERS: {
    LIST: '/orders',
    DETAIL: (id: string) => `/orders/${id}`,
    CREATE: '/orders',
    UPDATE: (id: string) => `/orders/${id}`,
    CLOSE: (id: string) => `/orders/${id}/close`,
    OPEN: '/orders/open',
    CLOSED: '/orders/closed',
    STATISTICS: '/orders/statistics',
  },
  
  // Clientes
  CLIENTS: {
    LIST: '/clients',
    DETAIL: (id: string) => `/clients/${id}`,
    SEARCH: '/clients/search',
  },
  
  // Almoxarifado
  WAREHOUSE: {
    STOCK: '/warehouse/stock',
    ORDERS: '/warehouse/orders',
    CREATE_ORDER: '/warehouse/orders/create',
    UPDATE_STOCK: '/warehouse/stock/update',
  },
  
  // Dashboard
  DASHBOARD: {
    STATS: '/dashboard/stats',
    RECENT_ORDERS: '/dashboard/recent-orders',
  },
};
