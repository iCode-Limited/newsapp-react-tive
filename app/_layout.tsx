import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { SafeAreaProvider, SafeAreaView,initialWindowMetrics } from 'react-native-safe-area-context';
import AuthContextProvider from './AuthContext';

export default function App() {
  return (
    <SafeAreaProvider >
      <AuthContextProvider>
        <ThemeProvider
          value={{
            ...DefaultTheme,
            colors: {
              ...DefaultTheme.colors,
              background: '#FFF',
            },
          }}
        >
          <View style={{ flex: 1, backgroundColor: '#4D55F5' }}>
            <StatusBar style="light" />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(drawer)" />
              <Stack.Screen name="AuthContext" />
              <Stack.Screen name="Setting" />
            </Stack>
          </View>
        </ThemeProvider>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
