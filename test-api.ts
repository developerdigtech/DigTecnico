/**
 * Script de teste rápido da API
 * Execute este arquivo para testar a conexão com o backend
 */

import { authService } from './src/services/authService';
import { API_CONFIG } from './src/config/api';

async function testarConexao() {
  console.log('=================================');
  console.log('🧪 TESTE DE CONEXÃO COM A API');
  console.log('=================================\n');

  console.log('📍 URL Base:', API_CONFIG.BASE_URL);
  console.log('📍 Endpoint de Login:', API_CONFIG.BASE_URL + '/signin');
  console.log('\n');

  console.log('🔄 Tentando fazer login...');
  console.log('Username: ELEONAY@gmail.com');
  console.log('Password: 123456\n');

  try {
    const response = await authService.login({
      username: 'ELEONAY@gmail.com',
      password: '123456'
    });

    console.log('✅ LOGIN BEM-SUCEDIDO!\n');
    console.log('👤 Usuário:', JSON.stringify(response.user, null, 2));
    console.log('\n🔑 Token recebido:', response.token.substring(0, 50) + '...');
    console.log('\n=================================');
    console.log('✅ TESTE CONCLUÍDO COM SUCESSO!');
    console.log('=================================\n');

  } catch (error: any) {
    console.log('❌ ERRO NO LOGIN!\n');
    
    if (error.statusCode === 0) {
      console.log('🔴 Erro de Conexão');
      console.log('   - Verifique se o backend está rodando');
      console.log('   - URL configurada:', API_CONFIG.BASE_URL);
      console.log('   - Se estiver testando em dispositivo físico, use o IP da máquina\n');
    } else if (error.statusCode === 401) {
      console.log('🔴 Credenciais Inválidas');
      console.log('   - Verifique o usuário e senha no backend\n');
    } else if (error.statusCode === 404) {
      console.log('🔴 Endpoint não encontrado');
      console.log('   - Verifique se o endpoint /signin existe no backend\n');
    } else {
      console.log('🔴 Erro:', error.message);
      console.log('   Status Code:', error.statusCode);
      console.log('   Detalhes:', JSON.stringify(error, null, 2));
    }

    console.log('\n=================================');
    console.log('❌ TESTE FALHOU');
    console.log('=================================\n');
  }
}

// Executa o teste
testarConexao();
