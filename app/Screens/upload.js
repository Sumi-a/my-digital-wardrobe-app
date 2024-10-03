import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import { storage, db } from "../firebase";

const Upload = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const navigation = useNavigation();
  const [category, setCategory] = useState("tops");
  const [uploading, setUploading] = useState(false);

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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUploading(true);
      const uri = result.assets[0].uri;
      const response = await fetch(uri);
      const blob = await response.blob();

      try {
        const storageRef = ref(storage, `images/${Date.now()}`);
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);

        const newImages = [...images, downloadURL];
        setImages(newImages);

        const docRef = doc(db, "images", Date.now().toString());
        await setDoc(docRef, {
          url: downloadURL,
          category: category,
        });

        Alert.alert("Success", "Image uploaded successfully!");
        navigation.navigate("Gallery", { refresh: true });
      } catch (error) {
        console.error("Error uploading image to Firebase:", error);
        Alert.alert(
          "Upload Error",
          "There was an error uploading your image. Please try again."
        );
      } finally {
        setUploading(false);
      }
    } else {
      console.log("No image selected or image picker was canceled.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upload a Picture</Text>

      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Tops" value="tops" />
        <Picker.Item label="Bottoms" value="bottoms" />
      </Picker>

      <Button
        title="Pick an image from gallery"
        onPress={pickImage}
        disabled={uploading}
      />
      <Button
        title="Go Back"
        onPress={() => router.back()} // Back button
      />
      <Button
        title="Go to next screen"
        onPress={() => navigation.navigate("NextScreen")}
      />

      {uploading && <Text>Uploading...</Text>}

      <ScrollView>
        {images.length > 0 ? (
          images.map((imageUri, index) => (
            <Image
              key={index}
              source={{ uri: imageUri }}
              style={styles.image}
            />
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
});

export default Upload;
