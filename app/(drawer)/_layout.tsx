import { StyleSheet, Text, View, Image, Pressable, Share } from 'react-native';
import React, { useState } from 'react';
import { Drawer } from 'expo-router/drawer';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Searchbar } from 'react-native-paper';
import { useAuthContext } from '../AuthContext';
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { usePathname, useRouter } from 'expo-router';

const CustomDrawer = (props) => {
    const pathname = usePathname();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const { themeMode } = useAuthContext();



    return (
        <DrawerContentScrollView {...props} style={[themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
            <Searchbar
                placeholder="Search"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={[styles.searchbar, themeMode === "dark" && { backgroundColor: "#333030" }]}
                inputStyle={[{ color: themeMode === "dark" ? "#FFF" : "#000" }]}
                placeholderTextColor={themeMode === "dark" ? "#fff" : "#000"}
            />

            <DrawerItem
                icon={({ color, size, focused }) => (
                    <Icon name="bookmark" size={24} color="#4D55F5" />
                )}
                label={"My Bookmark"}
                labelStyle={[styles.navItemLabel, themeMode === "dark" && { color: "#fff" }]}
                style={[{
                    marginVertical: 8,
                    backgroundColor: pathname == "index" ? "rgba(78, 223, 255,0.4)" : "rgba(78, 223, 255,0.4)",
                }, themeMode === "dark" && { backgroundColor: "#333030" }]}
                contentContainerStyle={styles.drawerItemContainer}
                onPress={() => router.push('/bookmark')}
            />
            <DrawerItem
                icon={({ color, size, focused }) => (
                    <Icon name="assignment" size={24} color="#4D55F5" />
                )}
                label={"My Preferences"}
                labelStyle={[styles.navItemLabel, themeMode === "dark" && { color: "#fff" }]}
                style={[{
                    marginVertical: 8,
                    backgroundColor: pathname == "index" ? "rgba(78, 223, 255,0.4)" : "rgba(78, 223, 255,0.4)",
                }, themeMode === "dark" && { backgroundColor: "#333030" }]}
                contentContainerStyle={styles.drawerItemContainer}
                onPress={() => router.push('../../../preference')}
            />
            <DrawerItem
                icon={({ color, size, focused }) => (
                    <Icon name="article" size={24} color="#4D55F5" />
                )}
                label={"All News"}
                labelStyle={[styles.navItemLabel, themeMode === "dark" && { color: "#fff" }]}
                style={[{
                    marginVertical: 8,
                    backgroundColor: pathname == "index" ? "rgba(78, 223, 255,0.4)" : "rgba(78, 223, 255,0.4)",
                }, themeMode === "dark" && { backgroundColor: "#333030" }]}
                contentContainerStyle={styles.drawerItemContainer}
                onPress={() => router.push('/')}
            />
        </DrawerContentScrollView>
    );
};

export default function Layout() {
    return (
        <Drawer drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerLabelStyle: {
                    fontFamily: "helvetica",
                    marginLeft: -20,
                    fontSize: 18,
                    color: '#000'
                },
            }}
        >
        </Drawer>
    );
}

const styles = StyleSheet.create({
    navItemLabel: {
        marginLeft: 16,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: "helvetica",
        color: "#000",

    },
    drawerItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    drawerIc: {
        width: 20,
        height: 20,
    },
    searchbar: {
        // marginHorizontal: 5,
        marginVertical: 8,
        backgroundColor: 'rgba(78, 223, 255,0.4)'

    },
});
