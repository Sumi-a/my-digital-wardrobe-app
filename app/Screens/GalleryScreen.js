import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { db, storage } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const GalleryScreen = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "wardrobeItems"));
      const itemData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        url: doc.data().imageUrl,
        category: doc.data().category?.toLowerCase().includes("top")
          ? "Tops"
          : "Bottoms",
      }));
      setImages(itemData);
    } catch (error) {
      console.error("Error fetching images:", error);
      Alert.alert("Error", "Failed to load images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchImages();
    }
  }, [isFocused]);

  const handleImageSelect = (item) => {
    if (item.category === "Tops") {
      setSelectedTop(selectedTop?.id === item.id ? null : item);
    } else if (item.category === "Bottoms") {
      setSelectedBottom(selectedBottom?.id === item.id ? null : item);
    }
  };

  const handleCreateOutfit = () => {
    if (selectedTop && selectedBottom) {
      router.push({
        pathname: "Screens/OutfitScreen",
        params: {
          selectedTops: JSON.stringify(selectedTop),
          selectedBottoms: JSON.stringify(selectedBottom),
        },
      });
    } else {
      Alert.alert(
        "Selection Required",
        "Please select both a top and bottom item"
      );
    }
  };

  const handleDelete = async (item) => {
    Alert.alert("Delete Item", " Are you sure you want to delete this?", [
      { text: "AS IF!", style: "cancel" },
      {
        text: "TOTALLY",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "wardrobeItems", item.id));
            if (item.storagePath) {
              const storageRef = ref(storage, item.storagePath);
              await deleteObject(storageRef);
            }
            if (selectedTop?.id === item.id) setSelectedTop(null);
            if (selectedBottom?.id === item.id) setSelectedBottom(null);
            setImages((prevImages) =>
              prevImages.filter((img) => img.id !== item.id)
            );
            Alert.alert("Item deleted!");
          } catch (error) {
            console.error("Error deleting item:", error);
            Alert.alert("Failed to delete. Try again!");
          }
        },
      },
    ]);
  };

  const renderCategory = (category, items = []) => {
    return (
      <View style={styles.categoryContainer}>
        <LinearGradient
          colors={["#2196F3", "#1565C0"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.categoryHeader}
        >
          <Text style={styles.categoryHeaderText}>
            {category} ({items.length})
            {category === "Tops" && selectedTop && " - Selected!"}
            {category === "Bottoms" && selectedBottom && " - Selected!"}
          </Text>
        </LinearGradient>

        {items.length > 0 ? (
          <View style={styles.itemsContainer}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={({ item }) => (
                <View style={styles.imageWrapper}>
                  <TouchableOpacity
                    onPress={() => handleImageSelect(item)}
                    style={styles.imageContainer}
                  >
                    <Image
                      source={{ uri: item.url }}
                      style={[
                        styles.image,
                        ((selectedTop?.id === item.id && category === "Tops") ||
                          (selectedBottom?.id === item.id &&
                            category === "Bottoms")) &&
                          styles.selectedImage,
                      ]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(item)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={20} color="#FF1493" />
                  </TouchableOpacity>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ) : (
          <Text style={styles.noItemsText}> No items!</Text>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF1493" />
        <Text style={styles.loadingText}>
          Loading your totally awesome wardrobe...
        </Text>
      </View>
    );
  }

  const groupedImages = images.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#2196F3", "#1565C0"]} style={styles.header}>
        <Text style={styles.headerTitle}>YOUR WARDROBE</Text>
      </LinearGradient>

      <View style={styles.mainContent}>
        {renderCategory("Tops", groupedImages["Tops"])}
        {renderCategory("Bottoms", groupedImages["Bottoms"])}
      </View>

      <View style={styles.outfitControls}>
        <TouchableOpacity
          style={[
            styles.createOutfitButton,
            (!selectedTop || !selectedBottom) &&
              styles.createOutfitButtonDisabled,
          ]}
          onPress={handleCreateOutfit}
          disabled={!selectedTop || !selectedBottom}
        >
          <LinearGradient
            colors={["#2196F3", "#1565C0"]}
            style={styles.gradientButton}
          >
            <Text style={styles.createOutfitButtonText}>Create Outfit</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearSelectionsButton}
          onPress={() => {
            setSelectedTop(null);
            setSelectedBottom(null);
          }}
        >
          <Text style={styles.clearSelectionsButtonText}>Clear Selection</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF0F5",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#1565C0",
    fontStyle: "italic",
  },
  mainContent: {
    flex: 1,
    padding: 10,
  },
  categoryContainer: {
    marginVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  categoryHeader: {
    padding: 15,
  },
  categoryHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  itemsContainer: {
    padding: 10,
  },
  imageWrapper: {
    marginHorizontal: 5,
    position: "relative",
  },
  imageContainer: {
    padding: 5,
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: "#FF1493",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 12,
    padding: 4,
    zIndex: 1,
  },
  noItemsText: {
    padding: 20,
    textAlign: "center",
    color: "#FF1493",
    fontStyle: "italic",
    fontSize: 16,
  },
  outfitControls: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#FFB6C1",
  },
  createOutfitButton: {
    marginBottom: 10,
    borderRadius: 25,
    overflow: "hidden",
  },
  gradientButton: {
    padding: 15,
    alignItems: "center",
  },
  createOutfitButtonDisabled: {
    opacity: 0.5,
  },
  createOutfitButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  clearSelectionsButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  clearSelectionsButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default GalleryScreen;
