import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '@/app/AuthContext';
const { width } = Dimensions.get('window');

const HeaderBack = ({ title }) => {
      const navigation = useNavigation();
      const { themeMode } = useAuthContext();
    
  return (
    <View style={styles.headerContainer}>
      <Pressable 
      hitSlop={30}
      onPress={() => {
          navigation.goBack();
        }} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" style={[themeMode === "dark" && { color: "#fff" }]} />
      </Pressable>
      <Text style={[styles.title,themeMode === "dark" && { color: "#fff" }]}>{title}</Text>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  headerContainer: {
    width: '50%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: width * 0.07, 
    fontWeight: 'bold',
    color: '#000',
    flex: 1, 
    left:8
    // textAlign: 'center',
  },
});
