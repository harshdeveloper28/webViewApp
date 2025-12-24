import { useEffect, useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import NetInfo from '@react-native-community/netinfo';

// Keep the splash screen visible while loading
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [isSplashDone, setSplashDone] = useState(false);
  const { isConnected } = NetInfo.useNetInfo();

  useEffect(() => {
    // 5-second splash screen timer
    const timer = setTimeout(async () => {
      setSplashDone(true);
      await SplashScreen.hideAsync();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Continuous monitoring: redirect if internet status changes
    if (isSplashDone) {
      if (isConnected === false) {
        router.replace('/no-internet');
      } else if (isConnected === true) {
        router.replace('/(tabs)');
      }
    }
  }, [isConnected, isSplashDone]);

  if (!isSplashDone) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="no-internet" />
    </Stack>
  );
}
