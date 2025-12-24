import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function NoInternetScreen() {
  const checkConnection = () => {
    NetInfo.fetch();
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/no-internet.jpg')}
        style={styles.image} 
      />
      <Text style={styles.title}>Whoops! No Connection</Text>
      <Text style={styles.subtitle}>Check your Wi-Fi or data and try again.</Text>
      
      <TouchableOpacity style={styles.button} onPress={checkConnection}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20 },
  image: { width: 280, height: 280, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  subtitle: { fontSize: 16, color: '#777', textAlign: 'center', marginTop: 10, marginBottom: 30 },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 25 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' }
});
