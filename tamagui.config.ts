import { config as defaultConfig } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';
import { themes } from './themes';

const tamaguiConfig = createTamagui({
  ...defaultConfig,
  themes: themes,
});

export type AppConfig = typeof tamaguiConfig;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
