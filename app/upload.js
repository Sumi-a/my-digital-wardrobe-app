import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

const Upload = () => {
  const [images, setImages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
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

    console.log("ImagePicker result:", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImages([...images, uri]);
      console.log("Uploaded image:", uri);
    } else {
      console.log("No image selected or image picker was canceled.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upload a Picture</Text>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {}
      {images.length > 0 && (
        <Button
          title="View Uploaded Images"
          onPress={() => {
            console.log("Navigating with images:", images);

            //router.push({ pathname: "/ImagesScreen", params: { images } });
            router.push({ name: "ImagesScreen", params: { images } });
            console.log("Navigation to ImagesScreen attempted");
          }}
        />
      )}
      {}
      {images.length > 0 && (
        <Image
          source={{ uri: images[images.length - 1] }}
          style={styles.image}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default Upload;
