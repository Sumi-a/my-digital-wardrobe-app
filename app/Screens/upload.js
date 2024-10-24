import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { uploadImageToFirebase } from "./firebaseUpload";

const Upload = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("tops");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need access to your camera roll to make this work!"
        );
      }
    })();
  }, []);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (result.assets && result.assets.length > 0) {
      setLoading(true);
      try {
        const selectedImages = await Promise.all(
          result.assets.map(async (asset) => {
            // Ensure the URI is a string before passing to the upload function
            const imageUri = asset.uri;
            if (typeof imageUri === "string") {
              return await uploadImageToFirebase(imageUri);
            } else {
              console.error("Image URI is not a string:", imageUri);
              throw new Error("Invalid image URI");
            }
          })
        );
        setImages((prevImages) => [...prevImages, ...selectedImages]);
        Alert.alert("Success", "Images uploaded successfully!");
      } catch (error) {
        Alert.alert("Upload Failed", error.message);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert(
        "No images selected",
        "Please select images from your gallery."
      );
    }
  };

  const clearImages = () => {
    setImages([]);
    Alert.alert("Cleared", "All selected images have been cleared.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upload Pictures</Text>

      <Picker
        selectedValue={category}
        onValueChange={setCategory}
        style={styles.picker}
      >
        <Picker.Item label="Tops" value="tops" />
        <Picker.Item label="Bottoms" value="bottoms" />
      </Picker>

      <Button title="Pick Images" onPress={pickImages} disabled={uploading} />
      <Button title="Clear Images" onPress={clearImages} />
      <Button title="Go Back" onPress={() => router.back()} />
      <Button
        title="Go to Gallery"
        onPress={() => router.push("Screens/GalleryScreen")}
      />

      {uploading && <Text>Uploading...</Text>}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <ScrollView>
        {images.length > 0 ? (
          images.map((imageUri, index) => (
            <View key={index}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))
        ) : (
          <Text>No images uploaded yet.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  picker: {
    width: 200,
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  categoryText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 5,
  },
});

export default Upload;
