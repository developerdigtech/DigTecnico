# 🧪 Teste de Integração com API - Login

## ✅ Implementação Concluída!

### O que foi feito:

1. **Endpoint configurado**: `/signin` (POST)
2. **URL base**: `http://localhost:4444/mobile`
3. **Tela de login integrada** com tratamento completo de erros

---

## 📝 Estrutura da Requisição

### URL Completa
```
POST http://localhost:4444/mobile/signin
```

### Headers
```json
{
  "Content-Type": "application/json",
  "Accept": "application/json"
}
```

### Body (JSON)
```json
{
  "username": "ELEONAY@gmail.com",
  "password": "123456"
}
```

---

## 🧑‍💻 Como Testar

### 1. **Prepare o Backend**
Certifique-se de que seu backend está rodando em:
```
http://localhost:4444
```

Se estiver testando em dispositivo físico, use o IP da sua máquina:
```typescript
// Em src/config/api.ts
development: 'http://SEU-IP:4444/mobile',
// Exemplo: 'http://192.168.1.100:4444/mobile'
```

### 2. **Inicie o App**
```bash
npm start
# ou
expo start
```

### 3. **Teste o Login**
- Abra o app
- Digite o e-mail: `ELEONAY@gmail.com`
- Digite a senha: `123456`
- Clique em "Entrar"

---

## 🎯 Comportamentos Implementados

### ✅ Durante o Login:
- Botão mostra "Entrando..." com spinner
- Campos de input ficam desabilitados
- Não é possível clicar múltiplas vezes

### ✅ Em Caso de Sucesso:
- Token é salvo automaticamente
- Dados do usuário são armazenados
- Redireciona para a tela Home
- Console mostra: `Login realizado com sucesso: [dados do usuário]`

### ✅ Em Caso de Erro:
- **401 (Não autorizado)**: "Usuário ou senha incorretos"
- **Erro de rede**: "Erro de conexão. Verifique sua internet"
- **Outros erros**: Mensagem retornada pela API

### ✅ Validações:
- Campo de e-mail não pode estar vazio
- Campo de senha não pode estar vazio
- Erros aparecem em card vermelho acima do botão
- Erro desaparece ao começar a digitar

---

## 🔍 Como Debugar

### Ver requisições no Console:
Abra o Metro Bundler e procure por:
```
Login realizado com sucesso: {...}
# ou
Erro no login: {...}
```

### Testar a API diretamente:
```bash
# Com curl
curl -X POST http://localhost:4444/mobile/signin \
  -H "Content-Type: application/json" \
  -d '{"username":"ELEONAY@gmail.com","password":"123456"}'

# Com HTTPie
http POST localhost:4444/mobile/signin \
  username=ELEONAY@gmail.com \
  password=123456
```

### Ver o token salvo:
O token é salvo automaticamente no AsyncStorage em:
- `@DigTecnico:token`
- `@DigTecnico:refreshToken`
- `@DigTecnico:user`

---

## 📱 Testando em Dispositivo Físico

### Android/iOS (mesma rede WiFi):

1. **Descubra seu IP local:**
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Windows
   ipconfig
   ```

2. **Configure a URL em `src/config/api.ts`:**
   ```typescript
   const API_URLS = {
     development: 'http://192.168.1.XXX:4444/mobile',
     // Substitua XXX pelo seu IP
   };
   ```

3. **Certifique-se de que o backend aceita conexões externas:**
   ```javascript
   // No seu backend
   app.listen(4444, '0.0.0.0', () => {
     console.log('Server running on port 4444');
   });
   ```

---

## 🎨 Resposta Esperada do Backend

### Sucesso (200):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "refresh_token_here",
    "user": {
      "id": "user_id",
      "name": "Eleonay",
      "username": "ELEONAY@gmail.com",
      "email": "ELEONAY@gmail.com",
      "role": "technician",
      "filial": "Fibron"
    }
  }
}
```

### Erro (401):
```json
{
  "success": false,
  "error": "unauthorized",
  "message": "Credenciais inválidas",
  "statusCode": 401
}
```

---

## 🔧 Ajustes Necessários no Backend

Se o formato da resposta do seu backend for diferente, ajuste em:

### `src/services/authService.ts`
```typescript
// Se o backend retorna direto sem "data":
const response = await apiClient.post<LoginResponse>(
  API_ENDPOINTS.AUTH.LOGIN,
  credentials
);

// Ajuste aqui conforme a estrutura real:
return response.data; // ou apenas response
```

### `src/types/api.ts`
```typescript
// Ajuste os tipos conforme o retorno real do backend
export interface LoginResponse {
  token: string;
  refreshToken: string;
  user: User;
}
```

---

## ✨ Próximos Passos

Após o login funcionar:

1. **Proteger rotas**: Verificar autenticação antes de acessar outras telas
2. **Integrar outras APIs**: Ordens, clientes, almoxarifado
3. **Refresh token**: Renovar token automaticamente quando expirar
4. **Logout**: Limpar dados e redirecionar para login

---

## 🐛 Problemas Comuns

### "Erro de conexão"
- ✅ Backend está rodando?
- ✅ URL está correta em `api.ts`?
- ✅ Mesma rede (se testando em dispositivo físico)?
- ✅ Firewall não está bloqueando?

### "Usuário ou senha incorretos"
- ✅ Credenciais estão corretas?
- ✅ Backend está validando corretamente?
- ✅ Endpoint `/signin` existe?

### "Token não está sendo salvo"
- ✅ Verifique se o AsyncStorage tem permissões
- ✅ Veja os logs do console

---

## 📞 Suporte

Se tiver problemas:
1. Verifique os logs do Metro Bundler
2. Teste a API diretamente (curl/Postman)
3. Verifique se o formato da resposta está correto
4. Confira se o token está sendo retornado

---

**Status**: ✅ Pronto para teste!

Basta iniciar o backend e testar o login no app.
