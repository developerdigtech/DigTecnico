/**
 * Tipos para respostas da API
 */

// Tipos base
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  timestamp?: string;
}

export interface ApiError {
  success: false;
  error: string;
  message: string;
  statusCode: number;
  timestamp?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Tipos de Autenticação
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}

// Tipos de Usuário
export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'admin' | 'technician' | 'manager';
  filial: string;
  location?: string;
}

// Tipos de Ordem de Serviço
export interface Order {
  id: string;
  numero: string;
  clienteId: string;
  clienteNome: string;
  endereco: string;
  cidade: string;
  bairro: string;
  tipo: 'instalacao' | 'manutencao' | 'reparo' | 'vistoria';
  status: 'aberta' | 'em_andamento' | 'concluida' | 'cancelada';
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
  descricao: string;
  dataAbertura: string;
  dataPrevisao?: string;
  dataConclusao?: string;
  tecnicoId?: string;
  tecnicoNome?: string;
  observacoes?: string;
  latitude?: number;
  longitude?: number;
}

export interface OrderDetail extends Order {
  cliente: Client;
  tecnico?: User;
  historico: OrderHistory[];
  materiais: Material[];
  fotos: Photo[];
}

export interface OrderHistory {
  id: string;
  ordemId: string;
  usuarioId: string;
  usuarioNome: string;
  acao: string;
  descricao: string;
  dataHora: string;
}

// Tipos de Cliente
export interface Client {
  id: string;
  nome: string;
  cpfCnpj: string;
  email?: string;
  telefone: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  latitude?: number;
  longitude?: number;
  observacoes?: string;
}

// Tipos de Almoxarifado
export interface Material {
  id: string;
  codigo: string;
  nome: string;
  descricao?: string;
  unidade: string;
  quantidade: number;
  quantidadeMinima?: number;
  preco?: number;
  categoria?: string;
  localizacao?: string;
}

export interface StockOrder {
  id: string;
  numero: string;
  tecnicoId: string;
  tecnicoNome: string;
  dataHora: string;
  status: 'pendente' | 'aprovado' | 'entregue' | 'cancelado';
  itens: StockOrderItem[];
  observacoes?: string;
}

export interface StockOrderItem {
  id: string;
  materialId: string;
  materialNome: string;
  quantidade: number;
  quantidadeAprovada?: number;
  quantidadeEntregue?: number;
}

// Tipos de Dashboard
export interface DashboardStats {
  ordensAbertas: number;
  ordensEmAndamento: number;
  ordensFechadasHoje: number;
  ordensDesignadas: number;
  tempoMedioAtendimento?: number;
  satisfacaoCliente?: number;
}

// Tipos de Foto
export interface Photo {
  id: string;
  url: string;
  thumbnail?: string;
  descricao?: string;
  dataHora: string;
}
