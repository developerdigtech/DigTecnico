import { useState } from 'react';
import { Button, Input, YStack, Text, Image, View } from 'tamagui';
import { LogIn } from '@tamagui/lucide-icons';
import { ImageBackground, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { DarkTheme } from '@react-navigation/native';

const localLogo = require('../assets/image/logo-fibron.png')

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Adicione sua lógica de autenticação aqui
    console.log('Login com:', { email, password });
    alert(`Login com: ${email}`);
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
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              width="100%"
            />
            <Input
              size="$4"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              width="100%"
             
            />
            <Button
              icon={<LogIn size={20} strokeWidth={2.5} />}
              size="$4"
              onPress={handleLogin}
              marginTop="$3"
              width="100%"
              color={'$black1'}
              fontWeight={"bold"}
               theme="accent"
            >
              Entrar
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
  },
  imageStyle: {
    opacity: 0.5,
  },
});
