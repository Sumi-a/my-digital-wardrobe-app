import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const ImagesScreen = ({ route }) => {
  const images = route?.params?.images || [];

  console.log("Received images:", images);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Images</Text>
      {images.length > 0 ? (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            console.log("Rendering image with URI:", item);
            return <Image source={{ uri: item }} style={styles.image} />;
          }}
        />
      ) : (
        <Text>No images uploaded yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    margin: 10,
    resizeMode: "contain",
  },
});

export default ImagesScreen;
