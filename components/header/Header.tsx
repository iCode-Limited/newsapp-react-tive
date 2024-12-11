import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function Header({ title }) {
  const navigation = useNavigation();
  const styles = Styles();
  const router = useRouter();

  return (
    <View style={styles.header}>
      <Pressable 
       hitSlop={30}
       onPress={() => navigation.toggleDrawer()}>
        <Image
          style={{ width: 22, height: 25 }}
          source={require("../../assets/images/drawerIc.png")}
        />
      </Pressable>
     
    <View style={{flexDirection:'row', justifyContent:'space-evenly',alignItems:'center',gap:10}}>
    <Image
        style={styles.logo}
        source={require("../../assets/images/logo.png")}
      />
      <Text style={styles.titleText}>News</Text>
      <Text style={styles.subtitleText}>| {title}</Text>
    </View>
    <Pressable 
    hitSlop={30}
    onPress={() =>
            router.push({
              pathname: "/Settings",
            })
          }>
        <Image style={{ width: 22, height: 22,tintColor:'#fff' }} source={require('../../src/assets/images/setting.png')} />
      </Pressable>
      
    </View>
  );
}

const Styles = () => {
  const inset = useSafeAreaInsets();

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#4D55F5",
      paddingHorizontal: 15,
      paddingTop: inset.top,
      height: 110,
      borderBottomStartRadius: 15,
      borderBottomEndRadius: 15,
    },
    titleText: {
      fontSize: 18,
      fontWeight: "bold",
      color:'#fff'
    },
    subtitleText: {
      fontSize: 18,
      fontWeight: "600",
      color:'#fff'
      // marginLeft: 5,
    },
    logo: {
      width: 30,
      height: 30,
      borderRadius: 15,
      // marginRight: 8,
    },
  });
};
