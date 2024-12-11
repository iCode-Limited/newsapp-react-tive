import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import AuthContextProvider from './AuthContext'; 

export default function App() {
  return (
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
        <StatusBar style="light" backgroundColor="#4D55F5" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(drawer)" />
          <Stack.Screen name="AuthContext" />
          <Stack.Screen name="Setting" />
        </Stack>
      </ThemeProvider>
    </AuthContextProvider>
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
