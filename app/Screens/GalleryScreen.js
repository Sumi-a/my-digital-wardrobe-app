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
  ScrollView,
  SafeAreaView,
} from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { db, storage } from "../firebase";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { handleCreateOutfit } from "../outfitfirestore";

const GalleryScreen = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const [showTutorial, setShowTutorial] = useState(true);
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

  const handleCreateOutfitPress = async () => {
    if (selectedTop && selectedBottom) {
      const newOutfit = {
        top: { id: selectedTop.id, url: selectedTop.url },
        bottom: { id: selectedBottom.id, url: selectedBottom.url },
        createdAt: new Date().toISOString(),
      };
      try {
        await handleCreateOutfit(newOutfit);
        Alert.alert("Success", "Outfit created! View it in Mix & Match");
        router.push("Screens/MixandMatchScreen");
      } catch (error) {
        console.error("Error creating outfit:", error);
        Alert.alert("Error", "Failed to create outfit. Please try again.");
      }
    } else {
      Alert.alert(
        "Selection Needed",
        "Please select both a top and bottom to create an outfit"
      );
    }
  };

  const handleDelete = async (item) => {
    Alert.alert(
      "Delete Item",
      "Are you sure you want to delete this item from your wardrobe?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
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
              Alert.alert("Success", "Item deleted from your wardrobe!");
            } catch (error) {
              console.error("Error deleting item:", error);
              Alert.alert("Error", "Failed to delete item. Please try again!");
            }
          },
        },
      ]
    );
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

        {showTutorial && items.length > 0 && (
          <View style={styles.tutorialContainer}>
            <Text style={styles.tutorialText}>
              Tap an item to select it for an outfit. Select both a top and
              bottom to create a new outfit!
            </Text>
            <TouchableOpacity
              style={styles.tutorialButton}
              onPress={() => setShowTutorial(false)}
            >
              <Text style={styles.tutorialButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        )}

        {items.length > 0 ? (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            horizontal
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
                  <View style={styles.imageOverlay}>
                    <Text style={styles.tapText}>Tap to select</Text>
                  </View>
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
        ) : (
          <View style={styles.emptyStateContainer}>
            <Ionicons name="shirt-outline" size={40} color="#FF1493" />
            <Text style={styles.noItemsText}>
              No items in your {category.toLowerCase()} yet!
            </Text>
            <TouchableOpacity
              style={styles.addItemButton}
              onPress={() => router.push("Screens/upload")}
            >
              <Text style={styles.addItemButtonText}>Add {category}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF1493" />
        <Text style={styles.loadingText}>Loading your wardrobe...</Text>
      </SafeAreaView>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF0F5" }}>
      <View style={styles.container}>
        <LinearGradient colors={["#2196F3", "#1565C0"]} style={styles.header}>
          <Text style={styles.headerTitle}>YOUR WARDROBE</Text>
          <Text style={styles.headerSubtitle}>
            {images.length} items in your collection
          </Text>
        </LinearGradient>

        <ScrollView style={styles.mainContent}>
          {renderCategory("Tops", groupedImages["Tops"])}
          {renderCategory("Bottoms", groupedImages["Bottoms"])}
        </ScrollView>

        <View style={styles.outfitControls}>
          {(selectedTop || selectedBottom) && (
            <View style={styles.selectionInfo}>
              <Text style={styles.selectionText}>
                {selectedTop ? "✓ Top selected" : "⨯ Select a top"}
                {" | "}
                {selectedBottom ? "✓ Bottom selected" : "⨯ Select a bottom"}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.createOutfitButton,
              (!selectedTop || !selectedBottom) &&
                styles.createOutfitButtonDisabled,
            ]}
            onPress={handleCreateOutfitPress}
            disabled={!selectedTop || !selectedBottom}
          >
            <LinearGradient
              colors={["#2196F3", "#1565C0"]}
              style={styles.gradientButton}
            >
              <Text style={styles.createOutfitButtonText}>
                {selectedTop && selectedBottom
                  ? "Create Outfit"
                  : "Select items to create outfit"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {(selectedTop || selectedBottom) && (
            <TouchableOpacity
              style={styles.clearSelectionsButton}
              onPress={() => {
                setSelectedTop(null);
                setSelectedBottom(null);
              }}
            >
              <Text style={styles.clearSelectionsButtonText}>
                Clear Selection
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("Screens/HomeScreen")}
          >
            <MaterialIcons name="home" size={24} color="#757575" />
            <Text style={styles.navLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("Screens/upload")}
          >
            <MaterialIcons name="add-circle" size={24} color="#757575" />
            <Text style={styles.navLabel}>Add Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, styles.activeNavItem]}
            onPress={() => router.push("Screens/GalleryScreen")}
          >
            <MaterialIcons name="photo-library" size={24} color="#3a7bd5" />
            <Text style={[styles.navLabel, styles.activeNavLabel]}>
              Wardrobe
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("Screens/MixandMatchScreen")}
          >
            <MaterialIcons name="shuffle" size={24} color="#757575" />
            <Text style={styles.navLabel}>Mix & Match</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("Screens/OutfitScreen")}
          >
            <MaterialIcons name="checkroom" size={24} color="#757575" />
            <Text style={styles.navLabel}>Outfits</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
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
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginTop: 5,
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
  tutorialContainer: {
    padding: 15,
    backgroundColor: "#E3F2FD",
    borderBottomWidth: 1,
    borderBottomColor: "#BBDEFB",
  },
  tutorialText: {
    fontSize: 14,
    color: "#1565C0",
    textAlign: "center",
  },
  tutorialButton: {
    marginTop: 10,
    alignSelf: "center",
  },
  tutorialButtonText: {
    color: "#1565C0",
    fontWeight: "bold",
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
  imageOverlay: {
    position: "absolute",
    bottom: 10,
    left: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 5,
    borderRadius: 4,
  },
  tapText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
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
  emptyStateContainer: {
    padding: 30,
    alignItems: "center",
  },
  noItemsText: {
    marginTop: 10,
    textAlign: "center",
    color: "#FF1493",
    fontSize: 16,
  },
  addItemButton: {
    marginTop: 15,
    backgroundColor: "#FF1493",
    padding: 10,
    borderRadius: 20,
  },
  addItemButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  outfitControls: {
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#FFB6C1",
  },
  selectionInfo: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
  },
  selectionText: {
    textAlign: "center",
    color: "#1565C0",
    fontSize: 14,
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
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
  },
  activeNavItem: {
    backgroundColor: "#E3F2FD",
  },
  navLabel: {
    fontSize: 12,
    color: "#757575",
    marginTop: 4,
  },
  activeNavLabel: {
    color: "#3a7bd5",
    fontWeight: "bold",
  },
});

export default GalleryScreen;
