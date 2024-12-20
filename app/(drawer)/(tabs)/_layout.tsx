import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function App() {
    const insets = useSafeAreaInsets(); 

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#4EDEFF",
                tabBarInactiveTintColor: "#FFF",
                tabBarActiveBackgroundColor: "#4D55F5",
                tabBarStyle: {
                    backgroundColor: "#4D55F5",
                    paddingVertical: 10,
                    // height: Platform.OS === 'ios' ? 60 + insets.bottom : 60, 
                    height:60,
                    position: 'absolute',
                    bottom: 0,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontStyle: "normal",
                    fontWeight: "500",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="bookmark"
                options={{
                    title: 'Bookmark',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "bookmark" : "bookmark-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="auth"
                options={{
                    title: 'User',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={24}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
