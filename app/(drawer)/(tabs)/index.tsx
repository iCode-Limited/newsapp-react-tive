import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Pressable,
  Share,
} from "react-native";
import Header from "../../../components/header/Header";
import data from "../../../constants/data/data.json";
import Icon from "react-native-vector-icons/MaterialIcons";
import Fav from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAuthContext } from '../../AuthContext';

const { width, height } = Dimensions.get("window");

const MainScreen = ({ navigation }) => {
  const [carouselData, setCarouselData] = useState([]);
  const [favoritedItems, setFavoritedItems] = useState({});
  const router = useRouter();
  const { themeMode } = useAuthContext();

  useEffect(() => {
    setCarouselData(data.news_posts || []);
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      setFavoritedItems(savedFavorites ? JSON.parse(savedFavorites) : {});
    } catch (error) {
      console.error("Error loading favorites", error);
    }
  };

  const handleShare = async (item) => {
    try {
      await Share.share({
        message: `${item.title}\n\n${item.content}\n\nRead more: ${item.url}`,
      });
    } catch (error) {
      console.error("Error sharing content", error);
    }
  };

  const toggleFavorite = async (item) => {
    try {
      const updatedFavorites = { ...favoritedItems };
      if (updatedFavorites[item.id]) {
        delete updatedFavorites[item.id];
      } else {
        updatedFavorites[item.id] = item;
      }

      await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavoritedItems(updatedFavorites);
    } catch (error) {
      console.error("Error toggling favorite", error);
    }
  };

  const renderItem = ({ item, index }) => {
    const shouldShowAd = (index + 1) % 3 === 0;

    return (
      <View style={[styles.itemContainer, themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/DetailScreen",
              params: { item: JSON.stringify(item) },
            })
          }
        >
          <Image
            source={{ uri: item.image }}
            style={[styles.itemImage, shouldShowAd && styles.smallItemImage]}
          />
          <Text numberOfLines={3} style={[styles.itemTitle, themeMode === "dark" && { color: "#fff" }]}>
            {item.title}
          </Text>
          <Text numberOfLines={15} style={[styles.itemDescription, themeMode === "dark" && { color: "#fff" }]}>
            {item.content}
          </Text>
        </Pressable>
        <View style={[styles.iconContainer, shouldShowAd && styles.smallicon]}>
          <TouchableOpacity
            style={[styles.iconButton]}
            onPress={() => toggleFavorite(item)}
          >
            <Fav
              name={favoritedItems[item.id] ? "bookmark" : "bookmark-o"}
              size={24}
              color={favoritedItems[item.id] ? "#4D55F5" : "#ccc"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleShare(item)}
          >
            <Icon name="share" size={24} color="#4D55F5" />
          </TouchableOpacity>
        </View>
        {shouldShowAd && (
          <View style={styles.adContainer}>
            <Text style={styles.adText}>This is your  Ad Container</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, themeMode === "dark" && { backgroundColor: "#1C1C22" }]}>
      <Header title="Top News" navigation={navigation} />
      <FlatList
        data={carouselData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        snapToAlignment="start"
        decelerationRate="fast"
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  flatListContainer: {
    flexGrow: 1,
    gap: 25,
    alignItems: "center",
  },
  itemContainer: {
    width: "95%",
    height: height * 0.8,
    padding: 10,
    backgroundColor: "#fff",
    // borderRadius: 10,
    // overflow: "hidden",
    // shadowColor: "#333030",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    // elevation: 4,
    // borderWidth: 1,
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',  
    // borderColor: "#ccc",
    // borderBottomColor:'#ccc',
    // borderBottomWidth:1,
  },
  itemImage: {
    width: "100%",
    height: 212,
    resizeMode: "cover",
    borderRadius: 10,
  },
  smallItemImage: {
    height: 200,
  },
  itemTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  itemDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,  
    marginBottom: 10,
  },
  iconButton: {
    marginHorizontal: 20,
  },
  adContainer: {
    height: 90,
    marginTop: 45,
    padding: 20,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  adText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  smallicon: {
    marginHorizontal: 20,
    top:40
    // bottom: 50,
  },
});
