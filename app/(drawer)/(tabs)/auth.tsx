import React from "react";
import { StyleSheet, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/app/AuthContext";
import HeaderBack from "@/components/header/HeaderBack";

const SignOut = () => {
  const { signOut } = useAuthContext(); // Access signOut from context
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();  // Sign out the user
      router.push("/");  // Navigate to login screen
    } catch (error) {
      Alert.alert("Error", error.message); // Show error if sign-out fails
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBack title={'Sign Out'} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Are you sure you want to sign out?</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignOut}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignOut;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    width: "80%",
    paddingVertical: 15,
    borderRadius: 10,
    backgroundColor: "#1E90FF",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
