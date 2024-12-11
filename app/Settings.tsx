import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Share, Switch, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from './AuthContext';

const Settings = () => {
  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false); 
  const router = useRouter();
  const navigation = useNavigation();
  const { themeMode,toggleThemeMode } = useAuthContext();


  const toggleNotifications = () => {
    setIsNotificationsEnabled((prev) => !prev); 
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this amazing app: https://example.com', 
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('App shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error while sharing:', error.message);
    }
  };

  const changeLanguage = (language) => {
    setSelectedLanguage(language);
    setIsLanguageModalVisible(false); 
  };

  return (
    <View style={[styles.container,themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
     <Pressable
        hitSlop={30}
        style={styles.goBackIcon}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Icon name="arrow-back" size={28} color="#333" style={[themeMode === "dark" && { color: "#fff" }]} />
      </Pressable>
      <Text style={[styles.headerText,themeMode === "dark" && { color: "#fff" }]}>Settings</Text>

      <View style={styles.settingItem}>
        <Icon name="notifications" size={24} color="#4D55F5" />
        <View style={styles.switchStyle}>
        <Text style={[styles.settingItemText,themeMode === "dark" && { color: "#fff" }]}>Notifications</Text>
        <Switch
            value={isNotificationsEnabled} 
            onValueChange={toggleNotifications}
            trackColor={{ false: '#B2B2B2', true: '#878cf5' }} 
            thumbColor={isNotificationsEnabled ? '#4D55F5' : '#f4f3f4'} 
          />
        </View>
      </View>

      <TouchableOpacity onPress={() => setIsLanguageModalVisible(true)} style={styles.settingItem}>
        <Icon name="language" size={24} color="#4D55F5" />
        <Text style={[styles.settingItemText,themeMode === "dark" && { color: "#fff" }]}>Language: {selectedLanguage}</Text>
      </TouchableOpacity>

      <View style={styles.settingItem}>
        <Icon name="brightness-6" size={24} color="#4D55F5" />
        <View style={styles.switchStyle}>
        <Text style={[styles.settingItemText,themeMode === "dark" && { color: "#fff" }]}>Dark Mode</Text>
        <Switch
                        trackColor={{ false: '#B2B2B2', true: '#878cf5' }}
                        thumbColor={themeMode === "dark" ? '#4D55F5' : '#f4f3f4'}
                        onValueChange={toggleThemeMode}
                        value={themeMode === "dark"}
                    />
        </View>
      </View>

      <TouchableOpacity onPress={() => onShare()} style={styles.settingItem}>
        <Icon name="share" size={24} color="#4D55F5" />
        <Text style={[styles.settingItemText,themeMode === "dark" && { color: "#fff" }]}>Share App</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="star-rate" size={24} color="#4D55F5" />
        <Text style={[styles.settingItemText,themeMode === "dark" && { color: "#fff" }]}>Rate App</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() =>
            router.push({
              pathname: "/Feedback",
            })
          } style={styles.settingItem}>
        <Icon name="feedback" size={24} color="#4D55F5" />
        <Text style={[styles.settingItemText,themeMode === "dark" && { color: "#fff" }]}>Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="description" size={24} color="#4D55F5" />
        <Text style={[styles.settingItemText,themeMode === "dark" && { color: "#fff" }]}>T & C</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Icon name="lock" size={24} color="#4D55F5" />
        <Text style={[styles.settingItemText,themeMode === "dark" && { color: "#fff" }]}>Privacy</Text>
      </TouchableOpacity>

      <Modal
        visible={isLanguageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsLanguageModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent,themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
            <Text style={[styles.modalHeader,themeMode === "dark" && { color: "#fff" }]}>Select Language</Text>
            <View style={styles.languageOptions}>
              <Pressable style={styles.languageBtn} onPress={() => changeLanguage('English')}>
                <Text style={styles.btnTxt}>English</Text>
              </Pressable>
              <Pressable style={styles.languageBtn} onPress={() => changeLanguage('German')}>
                <Text style={styles.btnTxt}>German</Text>
              </Pressable>
              <Pressable style={styles.languageBtn} onPress={() => setIsLanguageModalVisible(false)}>
                <Text style={styles.btnTxt}>Close</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 15,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    marginLeft: 20,
    top:40
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
    top:20
  },
  settingItemText: {
    textAlign:'center',
    marginLeft: 20,
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    width: '80%',
    maxWidth: 350,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  languageOptions: {
    flexDirection: 'column',
    gap: 15,
    alignItems: 'center',
    width: '100%',
  },
  languageBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 45,
    backgroundColor: '#4D55F5',
    borderRadius: 25,
  },
  btnTxt: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  switchStyle:{
    flexDirection: 'row',
    alignItems: 'center',
    // padding: 15,
    justifyContent:'space-between',
    // marginBottom: 10,
    width:'100%',
},
goBackIcon: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
});
