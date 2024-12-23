import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/app/AuthContext";
import HeaderBack from "@/components/header/HeaderBack";

const MyFavorites = () => {
  const navigation = useNavigation();
  const [favoritedItems, setFavoritedItems] = useState([]);
  const router = useRouter();
  const { themeMode, user } = useAuthContext(); // Access user from context

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem("favorites");
        setFavoritedItems(
          savedFavorites ? Object.values(JSON.parse(savedFavorites)) : []
        );
      } catch (error) {
        console.error("Error loading favorites", error);
      }
    };

    if (user) {
      // Only load favorites if the user is signed in
      loadFavorites();
    } else {
      setFavoritedItems([]); // Clear favorites when the user signs out
    }

    const unsubscribe = navigation.addListener("focus", loadFavorites);
    return unsubscribe;
  }, [navigation, user]);

  const removeFavorite = async (id) => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        delete parsedFavorites[id];

        await AsyncStorage.setItem("favorites", JSON.stringify(parsedFavorites));
        setFavoritedItems(Object.values(parsedFavorites));
      }
    } catch (error) {
      console.error("Error removing favorite", error);
    }
  };

  const handleToDetailScreen = (item) => {
    router.push({
      pathname: "/DetailScreen",
      params: { item: JSON.stringify(item) },
    });
  };

  const renderFavItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleToDetailScreen(item)}>
      <View
        style={[
          styles.itemContainer,
          themeMode === "dark" && { backgroundColor: "#333030" },
        ]}
      >
        <Image source={{ uri: item.image }} style={styles.itemImage} />
        <View style={styles.itemText}>
          <Text
            numberOfLines={2}
            style={[
              styles.itemTitle,
              themeMode === "dark" && { color: "#fff" },
            ]}
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={3}
            style={[
              styles.itemDescription,
              themeMode === "dark" && { color: "#ccc" },
            ]}
          >
            {item.content}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (!user) {
    // Render message if the user is not signed in
    return (
      <View
        style={[
          styles.container,
          themeMode === "dark" && { backgroundColor: "#1C1C22" },
        ]}
      >
        <HeaderBack title={"Bookmark"} navigation={navigation} />
        <View style={styles.noFavoritesContainer}>
          <Icon name="person-outline" size={50} color="#FF6347" />
          <Text
            style={[
              styles.noFavoritesText,
              themeMode === "dark" && { color: "#fff" },
            ]}
          >
            Please sign in to view your bookmarks.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        themeMode === "dark" && { backgroundColor: "#1C1C22" },
      ]}
    >
      <HeaderBack title={"Bookmark"} navigation={navigation} />
      {favoritedItems.length === 0 ? (
        <View style={styles.noFavoritesContainer}>
          <Icon name="bookmark-border" size={50} color="#FF6347" />
          <Text
            style={[
              styles.noFavoritesText,
              themeMode === "dark" && { color: "#fff" },
            ]}
          >
            You haven’t marked any articles to read them later. To do so, you
            can tap the bookmark.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritedItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderFavItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noFavoritesText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomColor: "#ccc",
  },
  itemImage: {
    width: 65,
    height: 80,
    borderRadius: 5,
    marginRight: 10,
  },
  itemText: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#555",
  },
});

export default MyFavorites;
