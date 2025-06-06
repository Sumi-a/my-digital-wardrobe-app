import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { fetchWardrobe, saveOutfit } from "../outfitfirestore";
import { useRouter } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");
const imageWidth = width * 0.4;
const imageHeight = imageWidth * 1.2;

const MixAndMatchScreen = () => {
  const [wardrobe, setWardrobe] = useState({ tops: [], bottoms: [] });
  const [selectedTopIndex, setSelectedTopIndex] = useState(0);
  const [selectedBottomIndex, setSelectedBottomIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadWardrobe();
  }, []);

  const loadWardrobe = async () => {
    try {
      const data = await fetchWardrobe();
      setWardrobe(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading wardrobe:", error);
      Alert.alert(
        "Error",
        "Could not load your wardrobe. Please check your connection and try again.",
        [{ text: "Retry", onPress: loadWardrobe }]
      );
    }
  };

  const handleSaveOutfit = async () => {
    if (isSaving) return;
    setIsSaving(true);

    const selectedTop = wardrobe.tops[selectedTopIndex];
    const selectedBottom = wardrobe.bottoms[selectedBottomIndex];

    if (!selectedTop || !selectedBottom) {
      Alert.alert(
        "Oops!",
        "Please make sure both top and bottom are selected."
      );
      setIsSaving(false);
      return;
    }

    const newOutfit = {
      name: "Custom Outfit",
      category: "Mixed",
      top: selectedTop.url,
      bottom: selectedBottom.url,
      createdAt: new Date().toISOString(),
    };

    try {
      await saveOutfit(newOutfit);
      Alert.alert(
        "Success!",
        "Your outfit has been saved to your collection.",
        [
          {
            text: "View Outfits",
            onPress: () => router.push("Screens/OutfitScreen"),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Unable to save outfit. Please try again.");
    }
    setIsSaving(false);
  };

  const handleRandomize = () => {
    setSelectedTopIndex(Math.floor(Math.random() * wardrobe.tops.length));
    setSelectedBottomIndex(Math.floor(Math.random() * wardrobe.bottoms.length));
  };

  const navigateItem = (array, currentIndex, direction) => {
    return (currentIndex + direction + array.length) % array.length;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF1493" />
        <Text style={styles.loadingText}>Loading your wardrobe...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Create Your Outfit</Text>
        <Text style={styles.subtitle}>
          Mix and match to find your perfect combination
        </Text>

        {/* Tops Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Top</Text>
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() =>
                setSelectedTopIndex(
                  navigateItem(wardrobe.tops, selectedTopIndex, -1)
                )
              }
            >
              <MaterialIcons name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: wardrobe.tops[selectedTopIndex]?.url }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() =>
                setSelectedTopIndex(
                  navigateItem(wardrobe.tops, selectedTopIndex, 1)
                )
              }
            >
              <MaterialIcons name="chevron-right" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottoms Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bottom</Text>
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() =>
                setSelectedBottomIndex(
                  navigateItem(wardrobe.bottoms, selectedBottomIndex, -1)
                )
              }
            >
              <MaterialIcons name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: wardrobe.bottoms[selectedBottomIndex]?.url }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() =>
                setSelectedBottomIndex(
                  navigateItem(wardrobe.bottoms, selectedBottomIndex, 1)
                )
              }
            >
              <MaterialIcons name="chevron-right" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.randomizeButton]}
            onPress={handleRandomize}
          >
            <MaterialIcons name="shuffle" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Random Match</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSaveOutfit}
            disabled={isSaving}
          >
            <MaterialIcons name="save" size={24} color="#FFF" />
            <Text style={styles.buttonText}>
              {isSaving ? "Saving..." : "Save Outfit"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
          style={styles.navItem}
          onPress={() => router.push("Screens/GalleryScreen")}
        >
          <MaterialIcons name="photo-library" size={24} color="#757575" />
          <Text style={styles.navLabel}>Wardrobe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, styles.activeNavItem]}
          onPress={() => router.push("Screens/MixandMatchScreen")}
        >
          <MaterialIcons name="shuffle" size={24} color="#3a7bd5" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Mix & Match</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/OutfitScreen")}
        >
          <MaterialIcons name="checkroom" size={24} color="#757575" />
          <Text style={styles.navLabel}>Outfits</Text>
        </TouchableOpacity>
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
    backgroundColor: "#FFF0F5",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    paddingLeft: 4,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navigationButton: {
    backgroundColor: "#2196F3",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: 12,
    backgroundColor: "#FFF",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    minWidth: width * 0.4,
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  randomizeButton: {
    backgroundColor: "#1565C0",
  },
  saveButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
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

export default MixAndMatchScreen;
