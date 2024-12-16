import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView, Image, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/app/AuthContext";
import HeaderBack from "@/components/header/HeaderBack";

const AuthScreen = () => {
  const { user, signOut, signUp, signIn, resetPassword, themeMode } = useAuthContext();
  const router = useRouter();

  const colors = {
    light: {
      background: "#f5f5f5",
      text: "#333",
      inputBackground: "#fff",
      inputBorder: "#ccc",
      buttonBackground: "#1E90FF",
      secondaryButtonBackground: "#FFA500",
      placeholderText: "#999",
    },
    dark: {
      background: "#1C1C22",
      text: "#fff",
      inputBackground: "#333",
      inputBorder: "#555",
      buttonBackground: "#1E90FF",
      secondaryButtonBackground: "#FFA500",
      placeholderText: "#888",
    },
  };

  const currentTheme = colors[themeMode || "light"];
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/"); 
    } catch (error) {
      Alert.alert("Error", error.message); 
    }
  };

  const handleSignup = async () => {
    try {
      const user = await signUp(email, password);
      router.push("/(tabs)");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const user = await signIn(email, password);
      router.push("/(tabs)");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleForgotPassword = async () => {
    try {
      await resetPassword(email);
      Alert.alert("Success", "Password reset email sent!");
      setIsForgotPassword(false);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <HeaderBack title={user ? 'Sign Out' : 'User'} />
      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        {user ? (
          <>
            <View style={[styles.logoContainer]}>
              <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
            </View>
            <Text style={[styles.title,{ color: currentTheme.text }]}>Are you sure you want to sign out?</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignOut}
            >
              <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
          <View style={styles.logoContainer}>
                  <Image source={require("../../../assets/images/logo.png")} style={styles.logo} />
                </View>
            <Text style={[styles.title, { color: currentTheme.text }]}>
              {isForgotPassword ? "Reset Password" : "User"}
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: currentTheme.inputBackground,
                  borderColor: currentTheme.inputBorder,
                  color: currentTheme.text,
                },
              ]}
              placeholder="Enter your email"
              placeholderTextColor={currentTheme.placeholderText}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {!isForgotPassword && (
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: currentTheme.inputBackground,
                    borderColor: currentTheme.inputBorder,
                    color: currentTheme.text,
                  },
                ]}
                placeholder="Enter your password"
                placeholderTextColor={currentTheme.placeholderText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            )}

            {!isForgotPassword ? (
              <>
                
                <TouchableOpacity
                  style={[styles.secondaryButton, { backgroundColor: currentTheme.secondaryButtonBackground }]}
                  onPress={handleSignIn}
                >
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
                <Text style={[styles.orText, { color: currentTheme.text }]}>OR</Text>

                <TouchableOpacity
                  style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
                  // onPress={() => router.push('/Signup')}
                  onPress={handleSignup}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsForgotPassword(true)}>
                  <Text style={[styles.forgotPasswordText, { color: currentTheme.buttonBackground }]}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
                onPress={handleForgotPassword}
              >
                <Text style={styles.buttonText}>Send Reset Link</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
    justifyContent: 'center', 
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50, 
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",  
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#1E90FF",
    alignItems: "center",
  },
  secondaryButton: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  forgotPasswordText: {
    fontSize: 16,
    marginTop: 10,
  },
  orText: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center", 
  },
});
