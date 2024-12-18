import React from "react";
import { StyleSheet, Text, View, Image,Pressable } from "react-native";
import { useLocalSearchParams } from "expo-router"; 
import { useAuthContext } from "./AuthContext";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import HeaderBack from "@/components/header/HeaderBack";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const DetailScreen = () => {
  const { item } = useLocalSearchParams();
  const { themeMode } = useAuthContext();
  const navigation = useNavigation();

  const parsedItem = JSON.parse(Array.isArray(item) ? item[0] : item);

  return (
    <View style={[styles.container,themeMode === "dark" && { backgroundColor: "#333030" }]}>
      <HeaderBack title={'News'} navigation={navigation}/>
      <View style={styles.contentContainer}>
      {parsedItem.image && (
        <Image source={{ uri: parsedItem.image }} style={styles.image} />
      )}
      <Text style={[styles.title,themeMode === "dark" && { color: "#fff" }]}>{parsedItem.title}</Text>
      <Text style={[styles.content,themeMode === "dark" && { color: "#ccc" }]}>{parsedItem.content}</Text>

      </View>
    </View>
  );
};


export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer:{
    // padding:10,
  },
  image: {
    width: "100%",
    height: verticalScale(280),
    resizeMode: "cover",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: moderateScale(10),
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: moderateScale(10),
  },
  goBackIcon: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
});
