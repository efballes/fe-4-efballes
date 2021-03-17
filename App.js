import { SessionProvider } from "./src/hooks/Session";
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from "./src/views/login";

export default function App() {
  return (
    <SessionProvider>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Login/>
        <StatusBar style="auto" />
      </View>
    </SessionProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
