import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet, Text } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import NetInfo from '@react-native-community/netinfo';

// 1. Hold native splash screen immediately [web:1]
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [appIsReady, setAppIsReady] = useState(false);
  const { isConnected } = NetInfo.useNetInfo();
  
  // Animation value for the bouncing effect [web:184]
  const bounceValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 2. Start the Bouncing Loop
    const bounceAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(bounceValue, {
          toValue: -40, // Move up 40px
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceValue, {
          toValue: 0, // Move down to original
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );
    bounceAnimation.start();

    // 3. 5-Second Timer before hiding splash [web:181]
    const timer = setTimeout(async () => {
      setAppIsReady(true);
      bounceAnimation.stop();
      await SplashScreen.hideAsync(); // Hide native splash to show custom bouncing icon
    }, 5000);

    return () => {
      clearTimeout(timer);
      bounceAnimation.stop();
    };
  }, []);

  // 4. Global Network Monitor Redirect [web:49][web:50]
  useEffect(() => {
    if (appIsReady) {
      if (isConnected === false) {
        router.replace('/no-internet');
      } else if (isConnected === true) {
        router.replace('/(tabs)');
      }
    }
  }, [isConnected, appIsReady]);

  // Show the bouncing icon while loading
  if (!appIsReady) {
    return (
      <View style={styles.splashContainer}>
        <Animated.Image
          source={require('../assets/images/splashIcon.png')}
          style={[
            styles.logo,
            { transform: [{ translateY: bounceValue }] }
          ]}
        />
        <Text style={styles.loadingText}>Initializing App...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="no-internet" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: { width: 150, height: 150, resizeMode: 'contain' },
  loadingText: { marginTop: 20, fontSize: 16, color: '#007AFF', fontWeight: 'bold' }
});
