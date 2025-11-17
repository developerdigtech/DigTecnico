import { Slot } from 'expo-router';
import { TamaguiProvider, Theme } from 'tamagui';
import config from '../../tamagui.config';
import { ThemeProvider, useThemeContext } from '../contexts/ThemeContext';

function AppContent() {
  const { isDarkMode } = useThemeContext();
  
  return (
    <Theme name={isDarkMode ? "dark" : "light"}>
      <Slot />
    </Theme>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <TamaguiWrapper />
    </ThemeProvider>
  );
}

function TamaguiWrapper() {
  const { isDarkMode } = useThemeContext();

  return (
    <TamaguiProvider config={config} defaultTheme={isDarkMode ? "dark" : "light"}>
      <AppContent />
    </TamaguiProvider>
  );
}
