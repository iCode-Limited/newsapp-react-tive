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
  Platform,
  SafeAreaView,
  Alert
} from "react-native";
import Header from "../../../components/header/Header";
import data from "../../../constants/data/data.json";
import Icon from "react-native-vector-icons/MaterialIcons";
import Fav from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../AuthContext";

const { width, height } = Dimensions.get("window");

const MainScreen = ({ navigation }) => {
  const [carouselData, setCarouselData] = useState([]);
  const [favoritedItems, setFavoritedItems] = useState({});
  const router = useRouter();
  const { themeMode, user } = useAuthContext();

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
    if (!user) {
      router.push({
        pathname: "/Signup",
        // params: { redirectTo: JSON.stringify({ screen: "favorite", item }) },
      });
      return;
    }
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
      <View
        style={[
          styles.itemContainer,
          themeMode === "dark" && { backgroundColor: "#1C1C22" },
        ]}
      >
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
          <Text
            numberOfLines={2}
            style={[
              styles.itemTitle,
              shouldShowAd && styles.smallTitle,
              themeMode === "dark" && { color: "#fff" },
            ]}
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={8}
            style={[
              styles.itemDescription,
              shouldShowAd && styles.smallDescription,
              themeMode === "dark" && { color: "#fff" },
            ]}
          >
            {item.content}
          </Text>
        </Pressable>
        <View style={[styles.iconContainer, shouldShowAd && styles.smallicon]}>
          {user ? (
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
          ) : (
            <TouchableOpacity
              style={[styles.iconButton]}
              onPress={() =>
                router.push({
                  pathname: "/Signup",
                })
              }
            >
              <Fav name="bookmark-o" size={24} color="#ccc" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleShare(item)}
          >
            <Icon name="share" size={24} color="#4D55F5" />
          </TouchableOpacity>
        </View>
        {shouldShowAd && (
          <View style={styles.adContainer}>
            <Text style={styles.adText}>This is your Ad Container</Text>
          </View>
        )}
      </View>
    );
  };
  

  return (
    <View
      style={[
        styles.container,
        themeMode === "dark" && { backgroundColor: "#1C1C22" },
      ]}
    >
      <Header title="Top News" navigation={navigation} />
      <FlatList
        data={carouselData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        pagingEnabled={true}

        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.flatListContainer,
          // {
          //   paddingBottom:
          //     Platform.OS === "ios"
          //       ? height * 0
          //       : height * 0,
          // },
        ]}
        snapToAlignment="start"
        decelerationRate={Platform.OS === "ios" ? "fast" : "normal"}
        snapToInterval={height * 0.8 + 20}

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
    alignItems: "center",
    paddingVertical: 14,
    paddingBottom: Platform.OS === "ios" ? 0 : 50,
    paddingHorizontal:10,

  },

  itemContainer: {
    // width: width * 0.9,
    height: Platform.OS === "ios" ? height * 0.8 : height * 0.8,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  itemImage: {
    width: "100%",
    height: Platform.OS === "ios" ? "60%" : "60%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  smallItemImage: {
    height: Platform.OS === "ios" ? "50%" : "50%",
  },
  itemTitle: {
    height: '10%',
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  itemDescription: {
    // fontSize: width * 0.04,
    color: "#333",
    height: Platform.OS === "ios" ? "20%" : "23.5%",
    flexWrap: "wrap",
    textAlign: "justify",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    bottom: Platform.OS === "ios" ? 40 : 20,
    height: '15%',
  },
  iconButton: {
    // flexDirection: "row",
    // justifyContent: "space-around",
    // paddingVertical: 10,
    // bottom: Platform.OS === "ios" ? 60 : 0,
    // backgroundColor:'red'
  },
  adContainer: {
    height: Platform.OS === "ios" ? 100 : 100,
    backgroundColor: "red",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    bottom: Platform.OS === "ios" ? 130 : 110,
  },
  adText: {
    fontSize: Platform.OS === "ios" ? 20 : 18,
    fontWeight: "bold",
    color: "#fff",
  },
  smallicon: {
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: Platform.OS === "ios" ? 80 : 70,
    height: '15%',
  },
  smallTitle:{
    height: '10%',
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  smallDescription:{
    fontSize: width * 0.04,
    color: "#333",
    height: Platform.OS === "ios" ? "19%" : "23.5%",
    flexWrap: "wrap",
    textAlign: "justify",
  }
});
