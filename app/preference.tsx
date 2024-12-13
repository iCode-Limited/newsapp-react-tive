import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthContext } from '@/app/AuthContext';
import HeaderBack from '@/components/header/HeaderBack';
import { navigate } from 'expo-router/build/global-state/routing';
import { useNavigation } from '@react-navigation/native';

const Preference = () => {
  const [preferences, setPreferences] = useState({
    Politics: false,
    Education: false,
    Business: false,
    Sports: false,
    Entertainment: false,
    Technology: false,
    Automobile: false,
    International: false,
    Travel: false,
    Fashion: false,
    Science: false,
  });

  const { themeMode } = useAuthContext(); 
  const navigation = useNavigation();

  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const savedPreferences = await AsyncStorage.getItem('preferences');
        if (savedPreferences) {
          setPreferences(JSON.parse(savedPreferences));
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };
    loadPreferences();
  }, []);

  useEffect(() => {
    const savePreferences = async () => {
      try {
        await AsyncStorage.setItem('preferences', JSON.stringify(preferences));
      } catch (error) {
        console.error('Error saving preferences:', error);
      }
    };
    savePreferences();
  }, [preferences]);

  const togglePreference = (key) => {
    setPreferences((prevPreferences) => ({
      ...prevPreferences,
      [key]: !prevPreferences[key],
    }));
  };

  const colors = {
    light: {
      background: "#f5f5f5",
      text: "#333",
      borderColor: "#ddd",
      checkboxColor: "#4D55F5",
    },
    dark: {
      background: "#1C1C22",
      text: "#fff",
      borderColor: "#555",
      checkboxColor: "#4D55F5", 
    },
  };

  const currentTheme = colors[themeMode || "light"];

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
      <HeaderBack title={'Preferences'} navigation={navigation}/>
      {/* <Text style={[styles.headerText, { color: currentTheme.text }]}>My Preferences</Text> */}
      {Object.keys(preferences).map((key) => (
        <View style={[styles.settingItem, { borderBottomColor: currentTheme.borderColor }]} key={key}>
          <Text style={[styles.settingItemText, { color: currentTheme.text }]}>{key}</Text>
          <Checkbox
            color={currentTheme.checkboxColor}
            style={styles.checkbox}
            value={preferences[key]}
            onValueChange={() => togglePreference(key)}
          />
        </View>
      ))}
    </View>
  );
};

export default Preference;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 10,
    // paddingVertical: 30,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 40,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor:'#ddd'
  },
  settingItemText: {
    fontSize: 18,
    fontWeight: '700',
  },
  checkbox: {},
});
