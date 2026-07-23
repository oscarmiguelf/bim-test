import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { DependenciesProvider } from '@/core/di/DependenciesProvider';
import { AppNavigator } from '@/navigation/AppNavigator';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <DependenciesProvider>
        <AppNavigator />
      </DependenciesProvider>
    </ThemeProvider>
  );
}
