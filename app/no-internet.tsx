import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function NoInternetScreen() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
   
    NetInfo.fetch().then(state => {
      setIsConnected(state.isConnected ?? true);
    });

 
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? true);
    });

    return () => unsubscribe();
  }, []);


  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/noInternet.jpg")}
        style={styles.image}
      />

      <Text style={styles.title}>Whoops! No Connection</Text>
      <Text style={styles.subtitle}>
        Check your Wi-Fi or data and try again.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => NetInfo.fetch().then(s => setIsConnected(s.isConnected ?? false))}
      >
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
      
      {/* Debug text to see current state */}
      <Text style={{marginTop: 10, color: 'red'}}>
        Status: {isConnected ? "Connected" : "Offline"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20 },
  image: { width: 100, height: 100, marginBottom: 20 }, // Ensure dimensions are set
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A1A1A' },
  subtitle: { fontSize: 16, color: '#777', textAlign: 'center', marginTop: 10, marginBottom: 30 },
  button: { backgroundColor: '#007AFF', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 25 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' }
});
