import { StyleSheet, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    // 1. Use SafeAreaView to automatically handle the top notch/status bar overlap
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#202124" />
      <WebView 
        source={{ uri: 'https://www.google.com' }} 
        style={styles.webview} 
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#202124' // Ensures the safe area matches your dark theme
  },
  webview: { flex: 1 },
});
