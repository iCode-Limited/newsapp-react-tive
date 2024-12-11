import React from "react";
import { StyleSheet, Text, View, Image,Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router"; 
import { useAuthContext } from "./AuthContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const DetailScreen = () => {
  const { item } = useLocalSearchParams();
  const { themeMode } = useAuthContext();
  const navigation = useNavigation();

  const parsedItem = JSON.parse(Array.isArray(item) ? item[0] : item);

  return (
    <View style={[styles.container,themeMode === "dark" && { backgroundColor: "#333030" }]}>
        <Pressable
      hitSlop={30}
        style={styles.goBackIcon}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-back" size={28} color="#333" style={[themeMode === "dark" && { color: "#fff" }]} />
      </Pressable>
      {parsedItem.image && (
        <Image source={{ uri: parsedItem.image }} style={styles.image} />
      )}
      <Text style={[styles.title,themeMode === "dark" && { color: "#fff" }]}>{parsedItem.title}</Text>
      <Text style={[styles.content,themeMode === "dark" && { color: "#ccc" }]}>{parsedItem.content}</Text>
    </View>
  );
};


export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    top:30
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    // marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  goBackIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
});