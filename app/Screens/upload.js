import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { uploadImageToFirebase } from "./firebaseUpload";
import { MaterialIcons } from "@expo/vector-icons";

const Upload = () => {
  const router = useRouter();
  const [uploadedItems, setUploadedItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant access to your photo library to upload images."
      );
    }
  };

  const pickImages = async (category) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setLoading(true);

        const uploadedResults = [];
        for (const asset of result.assets) {
          try {
            const uploadResult = await uploadImageToFirebase(
              asset.uri,
              category
            );
            uploadedResults.push(uploadResult);
          } catch (error) {
            console.error(`Failed to upload image: ${error.message}`);
            Alert.alert(
              "Upload Error",
              `Failed to upload one or more images: ${error.message}`
            );
          }
        }

        setUploadedItems((prev) => [...prev, ...uploadedResults]);
        Alert.alert(
          "Success",
          `Successfully uploaded ${uploadedResults.length} ${category}`
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick or upload images: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const CategoryCard = ({ title, iconName, onPress, disabled }) => (
    <TouchableOpacity
      style={[styles.categoryCard, disabled && styles.categoryCardDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <MaterialIcons
        name={iconName}
        size={48}
        color={disabled ? "#ccc" : "#007AFF"}
      />
      <Text
        style={[styles.categoryTitle, disabled && styles.categoryTitleDisabled]}
      >
        {title}
      </Text>
      <Text style={[styles.uploadText, disabled && styles.uploadTextDisabled]}>
        Tap to Upload
      </Text>
    </TouchableOpacity>
  );

  const renderUploadedItems = () => {
    if (uploadedItems.length === 0) {
      return <Text style={styles.noImagesText}>No images uploaded yet</Text>;
    }

    return uploadedItems.map((item, index) => (
      <View key={`${item.id}-${index}`} style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.imageInfo}>
          <Text style={styles.categoryText}>Category: {item.category}</Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wardrobe Upload</Text>

      <View style={styles.categoriesContainer}>
        <CategoryCard
          title="Upload Tops"
          iconName="checkroom"
          onPress={() => pickImages("tops")}
          disabled={loading}
        />
        <CategoryCard
          title="Upload Bottoms"
          iconName="layers"
          onPress={() => pickImages("bottoms")}
          disabled={loading}
        />
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Uploading images...</Text>
        </View>
      )}

      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>Upload History</Text>
        <TouchableOpacity
          onPress={() => setUploadedItems([])}
          disabled={loading}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {renderUploadedItems()}
      </ScrollView>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("Screens/GalleryScreen")}
        >
          <Text style={styles.buttonText}>View Selections </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryCard: {
    flex: 0.48,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#e9ecef",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryCardDisabled: {
    backgroundColor: "#f5f5f5",
    borderColor: "#e0e0e0",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginTop: 12,
    textAlign: "center",
  },
  categoryTitleDisabled: {
    color: "#ccc",
  },
  uploadText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  uploadTextDisabled: {
    color: "#999",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: "#007AFF",
    fontSize: 14,
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 10,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  imageInfo: {
    padding: 10,
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  noImagesText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    flex: 0.48,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Upload;
