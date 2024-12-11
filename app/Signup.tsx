import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { FIREBASE_AUTH } from "@/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAuthContext } from "@/app/AuthContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const router = useRouter();
  const auth = FIREBASE_AUTH;
  const { themeMode } = useAuthContext();

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
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert("Success", `Signup successful for ${user.email}`);
      router.push("/(tabs)");
    } catch (error) {
      console.error("Signup Error: ", error);
      Alert.alert("Error", error.message);
    }
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      Alert.alert("Success", `Welcome back, ${user.email}`);
      router.push("/(tabs)");
    } catch (error) {
      console.error("Sign-In Error: ", error);
      Alert.alert("Error", error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email to reset the password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert("Success", "Password reset email sent!");
      setIsForgotPassword(false);
    } catch (error) {
      console.error("Password Reset Error: ", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={80}
      >
        <ScrollView
          contentContainerStyle={[
            styles.scrollContainer,
            { backgroundColor: currentTheme.background },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {isForgotPassword && (
            <TouchableOpacity
              style={styles.goBackIcon}
              onPress={() => setIsForgotPassword(false)}
            >
              <Icon name="arrow-back" size={28} color={currentTheme.text} />
            </TouchableOpacity>
          )}

          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
          </View>

          <Text style={[styles.title, { color: currentTheme.text }]}>
            {isForgotPassword ? "Reset Password" : "Signup"}
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
                style={[
                  styles.button,
                  { backgroundColor: currentTheme.buttonBackground },
                ]}
                onPress={handleSignup}
              >
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <Text style={[styles.orText, { color: currentTheme.text }]}>OR</Text>
              <TouchableOpacity
                style={[
                  styles.secondaryButton,
                  { backgroundColor: currentTheme.secondaryButtonBackground },
                ]}
                onPress={() => router.push('/')}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsForgotPassword(true)}>
                <Text style={[styles.forgotPasswordText, { color: currentTheme.buttonBackground }]}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={[
                styles.button,
                { backgroundColor: currentTheme.buttonBackground },
              ]}
              onPress={handleForgotPassword}
            >
              <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
    marginTop: 20,
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
  orText: {
    fontSize: 18,
    marginVertical: 10,
  },
  forgotPasswordText: {
    fontSize: 16,
    marginTop: 10,
  },
  goBackIcon: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
});
