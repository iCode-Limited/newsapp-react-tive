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
} from "react-native";
import Header from "../../../components/header/Header";
import data from "../../../constants/data/data.json";
import Icon from "react-native-vector-icons/MaterialIcons";
import Fav from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useAuthContext } from "../../AuthContext";
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get("window");

const snapToIntervalValue = Platform.OS === 'ios' 
  ? verticalScale(560) + moderateScale(22) 
  : verticalScale(565) + moderateScale(22);  

const itemHeight = Platform.OS === 'ios' 
  ? verticalScale(560) 
  : verticalScale(565); 

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
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "ios" ? moderateScale(9) : moderateScale(43),
        }}
        data={carouselData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={snapToIntervalValue}
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
    paddingVertical: moderateScale(14),
    paddingBottom: Platform.OS === "ios" ? moderateScale(10) : moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },

  itemContainer: {
    // width: "100%", 
    height: itemHeight,
    backgroundColor: "#fff",
    marginBottom: moderateScale(20),
    justifyContent: "space-between",
    overflow: "hidden",
  },

  itemImage: {
    width: "100%",
    height: verticalScale(280),
    resizeMode: "cover",
  },

  smallItemImage: {
    width: "100%",
    height: verticalScale(240),
    resizeMode: "cover",
  },

  itemTitle: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    marginVertical: moderateScale(5),
    paddingHorizontal: moderateScale(10),
  },

  itemDescription: {
    fontSize: moderateScale(14),
    color: "#333",
    height: verticalScale(120),
    flexWrap: "wrap",
    textAlign: "justify",
    paddingHorizontal: moderateScale(10),
  },

  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: moderateScale(10),
    height: verticalScale(50),
    bottom: Platform.OS === "ios" ? moderateScale(40) : moderateScale(10)
  },

  adContainer: {
    height:100,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
    marginBottom:Platform.OS === "ios" ? moderateScale(42) : moderateScale(0),
    marginHorizontal: moderateScale(10),
  },

  adText: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#fff",
  },

  smallicon: {
    flexDirection: "row",
    justifyContent: "space-around",
    top: Platform.OS === "ios" ? moderateScale(-10) : moderateScale(20)
  },

  smallTitle: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    marginVertical: moderateScale(5),
  },

  smallDescription: {
    fontSize: moderateScale(13),
    color: "#333",
    height: verticalScale(85),
    flexWrap: "wrap",
    textAlign: "justify",
    paddingHorizontal: moderateScale(10),
  },
});
