import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '@/app/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const HeaderBack = ({ title }) => {
  const navigation = useNavigation();
  const { themeMode } = useAuthContext();
  const inset = useSafeAreaInsets(); // Access the safe area insets

  return (
    <View
      style={[
        styles.headerContainer,
        // { paddingTop: inset.top }, // Adjust padding for safe area
      ]}
    >
      <Pressable
        hitSlop={30}
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.backButton}
      >
        <Icon
          name="arrow-back"
          size={24}
          color={themeMode === 'dark' ? '#fff' : '#fff'}
        />
      </Pressable>
      <Text
        style={[
          styles.title,
          themeMode === 'dark' && { color: '#fff' },
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default HeaderBack;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#4D55F5',
    paddingHorizontal: 15,
    height: 70,
    // borderBottomStartRadius: 15,
    // borderBottomEndRadius: 15,
    width:'100%'
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    // fontSize: width * 0.02,
    fontSize:18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    left: 8,
  },
});
