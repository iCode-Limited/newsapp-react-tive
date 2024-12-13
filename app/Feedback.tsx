import { StyleSheet, Text, View, TextInput, TouchableOpacity, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from './AuthContext';
import HeaderBack from '@/components/header/HeaderBack';
const Feedback = ( ) => {
  const [feedback, setFeedback] = useState('');
  const navigation = useNavigation();
  const { themeMode } = useAuthContext();

  const handleSubmit = () => {
    if (feedback.trim()) {
      console.log('Feedback submitted:', feedback);
      setFeedback('');
    } else {
      alert('Please enter your feedback!');
    }
  };

  return (
    <View style={[styles.container,themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
      <HeaderBack title={'FeedBack'} navigation={navigation}/>
      <View style={styles.contentContainer}>
      <Text style={[styles.header,themeMode === "dark" && { color: "#fff" }]}>We value your feedback!</Text>
      <TextInput
  style={[
    styles.textInput,
    themeMode === "dark" && { backgroundColor: "#1C1C22", color: "#FFFFFF" } 
  ]}
  placeholder="Type your feedback here..."
  placeholderTextColor={themeMode === "dark" ? "#A9A9A9" : "#888888"} 
  value={feedback}
  onChangeText={setFeedback}
  multiline
/>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

export default Feedback;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  //   padding: 20,
  //   backgroundColor: '#f9f9f9',
  //   justifyContent: 'center',
  // },
  // goBackIcon: {
  //   position: 'absolute',
  //   top: 50,
  //   left: 20,
  //   zIndex: 10,
  },
  contentContainer:{
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  textInput: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    height: 50,
    backgroundColor: '#4D55F5',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
