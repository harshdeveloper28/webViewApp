import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://www.google.com' }} 
        style={styles.webview}
        // Optional: shows loading state until the web page is ready
        startInLoadingState={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000'  , marginTop:40},
  webview: { flex: 1 },
});
