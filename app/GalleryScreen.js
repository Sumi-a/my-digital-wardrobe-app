import React, { useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Picker } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const GalleryScreen = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchImages = async () => {
      const querySnapshot = await getDocs(collection(db, "images"));
      const imageData = [];
      querySnapshot.forEach((doc) => imageData.push(doc.data()));
      setImages(imageData);
    };
    fetchImages();
  }, []);

  const filteredImages =
    category === "all"
      ? images
      : images.filter((img) => img.category === category);

  return (
    <View>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Tops" value="tops" />
        <Picker.Item label="Bottoms" value="bottoms" />
      </Picker>

      <FlatList
        data={filteredImages}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // For grid layout
        renderItem={({ item }) => (
          <Image source={{ uri: item.url }} style={styles.image} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

export default GalleryScreen;
