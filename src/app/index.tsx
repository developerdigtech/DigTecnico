import { useState } from 'react';
import { Button, Input, YStack, Text, Image, View, Spinner } from 'tamagui';
import { LogIn, AlertCircle } from '@tamagui/lucide-icons';
import { ImageBackground, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { router } from 'expo-router';
import { authService } from '../services/authService';

const localLogo = require('../assets/image/logo-fibron.png')

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Limpa erros anteriores
    setError('');

    // Validação básica
    if (!username.trim()) {
      setError('Por favor, insira seu e-mail');
      return;
    }

    if (!password) {
      setError('Por favor, insira sua senha');
      return;
    }

    try {
      setIsLoading(true);
      
      // Chama o serviço de autenticação
      const response = await authService.login({
        username: username.trim(),
        password: password,
      });

      console.log('Login realizado com sucesso:', response.user);
      
      // Redireciona para a tela Home
      router.replace("/(tabs)/Home");
      
    } catch (err: any) {
      console.error('Erro no login:', err);
      
      // Tratamento de erros
      if (err.statusCode === 401) {
        setError('Usuário ou senha incorretos');
      } else if (err.statusCode === 0) {
        setError('Erro de conexão. Verifique sua internet');
      } else {
        setError(err.message || 'Erro ao fazer login. Tente novamente');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../assets/image/background.png')}
      style={styles.background}
      imageStyle={styles.imageStyle}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <YStack
          flex={1}
          justifyContent="center"
          alignItems="center"
          padding="$4"
          space="$3"
          
        >
          <YStack
            padding="$4"
            borderRadius="$4"
            width="100%"
            maxWidth={400}
            space="$3"
          >
            <View jc="center" ai="center" marginBottom="$3">
              <Image
                source={localLogo}
                width={200}
                height={150}
                resizeMode="contain"
                alt="Minha Logo"
              />
            </View>

            <Input
              size="$4"
              placeholder="E-mail"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                setError(''); // Limpa erro ao digitar
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              width="100%"
              disabled={isLoading}
            />
            <Input
              size="$4"
              placeholder="Senha"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(''); // Limpa erro ao digitar
              }}
              secureTextEntry
              width="100%"
              disabled={isLoading}
            />

            {/* Mensagem de erro */}
            {error ? (
              <YStack
                backgroundColor="$red4"
                padding="$3"
                borderRadius="$3"
                borderWidth={1}
                borderColor="$red8"
              >
                <Text color="$red10" fontSize="$3" textAlign="center">
                  {error}
                </Text>
              </YStack>
            ) : null}

            <Button
              icon={isLoading ? <Spinner /> : <LogIn size={20} strokeWidth={2.5} />}
              size="$4"
              onPress={handleLogin}
              marginTop="$3"
              width="100%"
              color={'$black1'}
              fontWeight={"bold"}
              theme="accent"
              disabled={isLoading}
              opacity={isLoading ? 0.6 : 1}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>

           
          </YStack>
        </YStack>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
  imageStyle: {
    opacity: 0.5,
  },
});
