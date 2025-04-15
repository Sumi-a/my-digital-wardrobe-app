import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { getOutfits, deleteOutfit } from "../outfitfirestore";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.45; // Adjusted for 2 columns layout

const OutfitScreen = () => {
  const [outfits, setOutfits] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchOutfits = async () => {
      setLoading(true);
      try {
        const fetchedOutfits = await getOutfits();
        console.log("Fetched outfits:", fetchedOutfits); // Debugging log
        setOutfits(fetchedOutfits);
      } catch (error) {
        console.error("Error fetching outfits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOutfits();
  }, []);

  const handleDeleteOutfit = async (id) => {
    Alert.alert(
      "Delete Outfit",
      "Are you sure you want to delete this outfit?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteOutfit(id);
              setOutfits((prevOutfits) =>
                prevOutfits.filter((outfit) => outfit.id !== id)
              );
            } catch (error) {
              console.error("Error deleting outfit:", error);
            }
          },
        },
      ]
    );
  };

  const renderOutfitCard = ({ item }) => (
    <View style={styles.outfitCard}>
      <View style={styles.imageWrapper}>
        {item.top ? (
          <Image
            source={{ uri: item.top }}
            style={styles.outfitImage}
            resizeMode="cover"
            onError={(e) =>
              console.log(
                "Error loading top image:",
                item.top,
                e.nativeEvent.error
              )
            }
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Top</Text>
          </View>
        )}
      </View>

      <View style={styles.imageWrapper}>
        {item.bottom ? (
          <Image
            source={{ uri: item.bottom }}
            style={styles.outfitImage}
            resizeMode="cover"
            onError={(e) =>
              console.log(
                "Error loading bottom image:",
                item.bottom,
                e.nativeEvent.error
              )
            }
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Bottom</Text>
          </View>
        )}
      </View>

      <View style={styles.outfitDetails}>
        <Text style={styles.outfitName}>{item.name || "Untitled Outfit"}</Text>
        <Text style={styles.outfitCategory}>
          {item.category || "No Category"}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteOutfit(item.id)}
      >
        <MaterialIcons name="delete" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF1493" />
            <Text style={styles.loadingText}>Loading outfits...</Text>
          </View>
        ) : outfits.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No outfits found. Create one!</Text>
          </View>
        ) : (
          <FlatList
            data={outfits}
            renderItem={renderOutfitCard}
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/*  Updated Bottom Navigation */}
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
            onPress={() => router.push("Screens/GalleryScreen")}
          >
            <MaterialIcons name="photo-library" size={24} color="#757575" />
            <Text style={styles.navLabel}>Wardrobe</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("Screens/upload")}
          >
            <MaterialIcons name="add-circle" size={24} color="#757575" />
            <Text style={styles.navLabel}>Add Item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("Screens/MixandMatchScreen")}
          >
            <MaterialIcons name="shuffle" size={24} color="#757575" />
            <Text style={styles.navLabel}>Mix & Match</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.navItem, styles.activeNavItem]}
            onPress={() => router.push("Screens/OutfitScreen")}
          >
            <MaterialIcons name="checkroom" size={24} color="#3a7bd5" />
            <Text style={[styles.navLabel, styles.activeNavLabel]}>
              Outfits
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#1565C0",
    fontStyle: "italic",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#FF1493",
    fontStyle: "italic",
  },
  listContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  outfitCard: {
    width: cardWidth,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: "relative",
  },
  imageWrapper: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFF",
    elevation: 3,
    marginBottom: 10,
  },
  outfitImage: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
  },
  placeholderText: {
    color: "#666",
    fontSize: 14,
  },
  outfitDetails: {
    alignItems: "center",
  },
  outfitName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  outfitCategory: {
    fontSize: 14,
    color: "#666",
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#E53935",
    padding: 6,
    borderRadius: 15,
    elevation: 3,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#4A5568",
  },
  activeNavItem: {
    backgroundColor: "#E3F2FD",
    borderRadius: 24,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeNavLabel: {
    color: "#3a7bd5",
    fontWeight: "bold",
  },
});

export default OutfitScreen;

