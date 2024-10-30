import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Animated,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase";

const SCREEN_WIDTH = Dimensions.get("window").width;

const OutfitCreationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { selectedTops, selectedBottoms } = params;

  const [outfits, setOutfits] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoadErrors, setImageLoadErrors] = useState({});

  // Function to validate image URL
  const isValidImageUrl = (url) => {
    if (!url) return false;
    try {
      const parsedUrl = new URL(url);
      return (
        parsedUrl.protocol === "https:" &&
        parsedUrl.hostname === "firebasestorage.googleapis.com"
      );
    } catch {
      return false;
    }
  };

  const saveNewOutfit = async (top, bottom) => {
    try {
      const outfitData = {
        topImage: {
          id: top.id,
          imageUrl: top.imageUrl,
        },
        bottomImage: {
          id: bottom.id,
          imageUrl: bottom.imageUrl,
        },
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, "outfits"), outfitData);
      console.log("New outfit saved with ID:", docRef.id);
      return docRef.id;
    } catch (error) {
      console.error("Error saving new outfit:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadSavedOutfits = async () => {
      setIsLoading(true);
      try {
        const outfitsRef = collection(db, "outfits");
        const q = query(outfitsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const loadedOutfits = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();

          // Validate URLs before adding to loaded outfits
          if (
            isValidImageUrl(data.topImage?.imageUrl) &&
            isValidImageUrl(data.bottomImage?.imageUrl)
          ) {
            loadedOutfits.push({
              id: doc.id,
              topImage: {
                id: data.topImage.id,
                imageUrl: data.topImage.imageUrl,
              },
              bottomImage: {
                id: data.bottomImage.id,
                imageUrl: data.bottomImage.imageUrl,
              },
              createdAt: data.createdAt,
            });
          } else {
            console.warn(`Outfit ${doc.id} has invalid image URLs:`, {
              top: data.topImage?.imageUrl,
              bottom: data.bottomImage?.imageUrl,
            });
          }
        });

        console.log(`Loaded ${loadedOutfits.length} valid outfits`);
        setOutfits(loadedOutfits);
      } catch (error) {
        console.error("Error loading outfits:", error);
        Alert.alert(
          "Error",
          "Failed to load outfits. Please check your connection and try again."
        );
      } finally {
        setIsLoading(false);
      }
    };

    const saveAndLoadOutfits = async () => {
      try {
        if (selectedTops && selectedBottoms) {
          const tops =
            typeof selectedTops === "string"
              ? JSON.parse(selectedTops)
              : selectedTops;
          const bottoms =
            typeof selectedBottoms === "string"
              ? JSON.parse(selectedBottoms)
              : selectedBottoms;

          if (
            isValidImageUrl(tops.imageUrl) &&
            isValidImageUrl(bottoms.imageUrl)
          ) {
            await saveNewOutfit(tops, bottoms);
          } else {
            console.error("Invalid image URLs in selected items");
          }
        }
        await loadSavedOutfits();
      } catch (error) {
        console.error("Error in initialization:", error);
        Alert.alert(
          "Error",
          "Failed to process outfit data. Please check your connection and try again."
        );
        setIsLoading(false);
      }
    };

    saveAndLoadOutfits();
  }, [selectedTops, selectedBottoms]);

  const handleImageError = (outfitId, imageType, error) => {
    console.error(
      `Error loading ${imageType} image for outfit ${outfitId}:`,
      error
    );
    setImageLoadErrors((prev) => ({
      ...prev,
      [`${outfitId}-${imageType}`]: true,
    }));
  };

  const renderImage = (outfit, imageType) => {
    const imageData =
      imageType === "top" ? outfit.topImage : outfit.bottomImage;
    const errorKey = `${outfit.id}-${imageType}`;
    const hasError = imageLoadErrors[errorKey];

    if (hasError) {
      return (
        <View style={[styles.image, styles.errorContainer]}>
          <Text style={styles.errorText}>Failed to load image</Text>
        </View>
      );
    }

    return (
      <Image
        source={{ uri: imageData.imageUrl }}
        style={styles.image}
        onError={(error) => handleImageError(outfit.id, imageType, error)}
        loadingIndicatorSource={require("../assets/images/icon.png")}
        defaultSource={require("../assets/images/icon.png")}
      />
    );
  };

  const handleNext = () => {
    if (currentIndex < outfits.length - 1) {
      Animated.spring(position, {
        toValue: { x: -SCREEN_WIDTH, y: 0 },
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(currentIndex + 1);
        position.setValue({ x: 0, y: 0 });
      });
    }
  };


  const handlePrevious = () => {
    if (currentIndex > 0) {
      Animated.spring(position, {
        toValue: { x: SCREEN_WIDTH, y: 0 },
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(currentIndex - 1);
        position.setValue({ x: 0, y: 0 });
      });
    }
  };

  const renderOutfit = (outfit, index) => {
    const isCurrentOutfit = index === currentIndex;

    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp",
    });

    const animatedCardStyle = {
      transform: [{ rotate }],
      opacity: isCurrentOutfit ? 1 : 0.5,
    };

    return isCurrentOutfit ? (
      <Animated.View
        key={outfit.id}
        style={[styles.outfitContainer, animatedCardStyle]}
      >
        <View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>Top</Text>
          {renderImage(outfit, "top")}
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>Bottom</Text>
          {renderImage(outfit, "bottom")}
        </View>
      </Animated.View>
    ) : null;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Your Created Outfits",
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Loading outfits...</Text>
          </View>
        ) : outfits.length > 0 ? (
          <>
            {outfits.map((outfit, index) => renderOutfit(outfit, index))}
            <View style={styles.navigationContainer}>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  //currentIndex === 0 && styles.disabledButton,
                ]}
                onPress={handlePrevious}
                //disabled={currentIndex === 0}
              >
                <Text style={styles.navButtonText}>Previous</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.navButton,
                  currentIndex === outfits.length - 1 && styles.disabledButton,
                ]}
                onPress={handleNext}
                disabled={currentIndex === outfits.length - 1}
              >
                <Text style={styles.navButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <Text style={styles.noOutfitsText}>No outfits created yet.</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  outfitContainer: {
    width: SCREEN_WIDTH - 40,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    marginBottom: 20,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    backgroundColor: "#f8f9fa",
  },
  errorContainer: {
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dee2e6",
    borderRadius: 12,
  },
  errorText: {
    color: "#dc3545",
    fontSize: 14,
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH - 40,
    padding: 20,
    position: "absolute",
    bottom: 20,
  },
  navButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    width: "45%",
  },
  navButtonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  noOutfitsText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});

export default OutfitCreationScreen;
