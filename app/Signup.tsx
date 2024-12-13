import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/app/AuthContext";
import HeaderBack from "@/components/header/HeaderBack";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const router = useRouter();
  const { themeMode, signUp, signIn, resetPassword } = useAuthContext();

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

  const handleSignup = async () => {
    try {
      const user = await signUp(email, password);
      // Alert.alert("Success", `Signup successful for ${user.email}`);
      router.push("/(tabs)");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const user = await signIn(email, password);
      // Alert.alert("Success", `Welcome back, ${user.email}`);
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
      <HeaderBack title={"User"} />
      <ScrollView contentContainerStyle={[styles.scrollContainer]}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
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
              onPress={() => router.push('/Signup')}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

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
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
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
  },
});
