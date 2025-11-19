import { useState, useEffect, useRef } from 'react';
import { Button, Input, YStack, Text, Image, View, Spinner, XStack } from 'tamagui';
import { LogIn, AlertCircle, Eye, EyeOff } from '@tamagui/lucide-icons';
import { ImageBackground, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, Animated } from 'react-native';
import { router } from 'expo-router';
import { authService } from '../services/authService';

const localLogo = require('../assets/image/digtechBranco.png')

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Valores animados
  const logoScale = useRef(new Animated.Value(1.5)).current; // Começa com 2x o tamanho
  const logoTranslateY = useRef(new Animated.Value(0)).current;
  const backgroundOpacity = useRef(new Animated.Value(0)).current; // Começa com fundo preto (opacity 0)
  const formOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Aguarda 500ms antes de iniciar a animação
    const timer = setTimeout(() => {
      // Primeira fase: reduz tamanho e opacidade do fundo
      Animated.parallel([
        // Reduz o tamanho da logo
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        // Aumenta opacidade do fundo de 0 para 0.5
        Animated.timing(backgroundOpacity, {
          toValue: 1, // Valor de 0 a 1 que será multiplicado por 0.5 no overlay
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // Segunda fase: desloca a logo para cima com animação suave
        Animated.timing(logoTranslateY, {
          toValue: -120, // Move a logo para cima para dar espaço ao formulário
          duration: 800,
          useNativeDriver: true,
        }).start(() => {
          // Terceira fase: mostra o formulário com fade-in suave
          Animated.timing(formOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        });
      });
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

      // Chama o serviço de autenticação com o novo formato
      const response = await authService.login({
        email: username.trim(),
        password: password,
      });

      //console.log('Login realizado com sucesso:', response.user);

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
    <View style={styles.container}>
      {/* Background com opacidade animada */}
      <ImageBackground
        source={require('../assets/image/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <Animated.View
          style={[
            styles.overlay,
            {
              opacity: backgroundOpacity.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.5], // De totalmente transparente (0) para semi-transparente (0.5)
              })
            }
          ]}
        />
      </ImageBackground>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          {/* Logo animada - posicionada absolutamente no centro */}
          <Animated.View
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginLeft: -100, // Metade da largura da logo (200/2)
              marginTop: -75,   // Metade da altura da logo (150/2)
              transform: [
                { scale: logoScale },
                { translateY: logoTranslateY }
              ],
              zIndex: 2,
            }}
          >
            <Image
              source={localLogo}
              width={200}
              height={150}
              resizeMode="contain"
              alt="Minha Logo"
            />
          </Animated.View>

          {/* Formulário com fade in */}
          <Animated.View
            style={{
              opacity: formOpacity,
              width: '90%',
              maxWidth: 400,
              paddingHorizontal: 16,
            }}
          >
            <YStack
              padding="$4"
              borderRadius="$4"
              width="100%"
              space="$3"
              mt={"$15"}
            >
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

              {/* Input de senha com ícone de visualização */}
              <YStack position="relative" width="100%">
                <Input
                  size="$4"
                  placeholder="Senha"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setError(''); // Limpa erro ao digitar
                  }}
                  secureTextEntry={!showPassword}
                  width="100%"
                  disabled={isLoading}
                  paddingRight="$11"
                />
                <Button
                  position="absolute"
                  right="$2"
                  top="50%"
                  y={-20}
                  chromeless
                  circular
                  size="$3"
                  icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  pressStyle={{
                    scale: 0.9,
                  }}
                />
              </YStack>

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
                bg={"#11b3e4ff"}
                disabled={isLoading}
                opacity={isLoading ? 0.6 : 1}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </YStack>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 1)', // Opacidade máxima, será controlada pela animação
  },
});
