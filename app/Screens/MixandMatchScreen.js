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
} from "react-native";
import { fetchWardrobe, saveOutfit } from "../outfitfirestore";

const { width, height } = Dimensions.get("window");
const imageWidth = width * 0.65; // Reduce image width slightly for better layout
const imageHeight = imageWidth * 1.1; // Maintain aspect ratio
const buttonSize = width * 0.1; // Adjust button size to avoid overlap

const MixAndMatchScreen = ({ navigation }) => {
  const [wardrobe, setWardrobe] = useState({ tops: [], bottoms: [] });
  const [selectedTopIndex, setSelectedTopIndex] = useState(0);
  const [selectedBottomIndex, setSelectedBottomIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadWardrobe = async () => {
      try {
        const data = await fetchWardrobe();
        setWardrobe(data);
      } catch (error) {
        console.error("Error loading wardrobe:", error);
        Alert.alert("Error", "Could not load wardrobe items");
      }
    };
    loadWardrobe();
  }, []);

  const handleSaveOutfit = async () => {
    if (isSaving) return;
    setIsSaving(true);

    const selectedTop = wardrobe.tops[selectedTopIndex];
    const selectedBottom = wardrobe.bottoms[selectedBottomIndex];

    if (!selectedTop || !selectedBottom) {
      Alert.alert("Error", "Please select a top and a bottom.");
      setIsSaving(false);
      return;
    }

    const newOutfit = {
      name: "Custom Outfit",
      category: "Mixed",
      top: selectedTop.url,
      bottom: selectedBottom.url,
    };

    try {
      await saveOutfit(newOutfit);
      Alert.alert("Success", "Your outfit has been saved!", [
        { text: "OK", onPress: () => navigation.navigate("OutfitScreen") },
      ]);
    } catch (error) {
      console.error("Error saving outfit:", error);
      Alert.alert("Error", "Could not save outfit");
    }
    setIsSaving(false);
  };

  const navigateItem = (array, currentIndex, direction) => {
    return (currentIndex + direction + array.length) % array.length;
  };

  if (!wardrobe.tops.length || !wardrobe.bottoms.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Add some tops and bottoms to your wardrobe first!
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollViewContent}
    >
      <View style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Your Outfit Combination</Text>

        {/* Top Image with Navigation Buttons */}
        <View style={styles.imageRow}>
          <TouchableOpacity
            style={[
              styles.navButton,
              { width: buttonSize, height: buttonSize },
            ]}
            onPress={() =>
              setSelectedTopIndex(
                navigateItem(wardrobe.tops, selectedTopIndex, -1)
              )
            }
          >
            <Text style={styles.navButtonText}>{"<"}</Text>
          </TouchableOpacity>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: wardrobe.tops[selectedTopIndex]?.url }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            style={[
              styles.navButton,
              { width: buttonSize, height: buttonSize },
            ]}
            onPress={() =>
              setSelectedTopIndex(
                navigateItem(wardrobe.tops, selectedTopIndex, 1)
              )
            }
          >
            <Text style={styles.navButtonText}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {/* Bottom Image with Navigation Buttons */}
        <View style={styles.imageRow}>
          <TouchableOpacity
            style={[
              styles.navButton,
              { width: buttonSize, height: buttonSize },
            ]}
            onPress={() =>
              setSelectedBottomIndex(
                navigateItem(wardrobe.bottoms, selectedBottomIndex, -1)
              )
            }
          >
            <Text style={styles.navButtonText}>{"<"}</Text>
          </TouchableOpacity>
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: wardrobe.bottoms[selectedBottomIndex]?.url }}
              style={styles.previewImage}
              resizeMode="cover"
            />
          </View>
          <TouchableOpacity
            style={[
              styles.navButton,
              { width: buttonSize, height: buttonSize },
            ]}
            onPress={() =>
              setSelectedBottomIndex(
                navigateItem(wardrobe.bottoms, selectedBottomIndex, 1)
              )
            }
          >
            <Text style={styles.navButtonText}>{">"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Outfit Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSaveOutfit}
        disabled={isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? "Saving..." : "Save Outfit"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE6F0",
  },
  scrollViewContent: {
    padding: 16,
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: 10, // Reduced spacing to fit save button
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10, // Slightly reduced margin to fit screen
    width: "100%",
  },
  navButton: {
    backgroundColor: "#FF1493",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  navButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageWrapper: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFF",
    elevation: 3,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  saveButton: {
    backgroundColor: "#FF1493",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
    elevation: 3,
    marginTop: 10, // Ensure it's visible even on smaller screens
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE6F0",
  },
  emptyText: {
    color: "#FF1493",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MixAndMatchScreen;
