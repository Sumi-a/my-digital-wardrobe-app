import React from "react";
import { View, Image, StyleSheet, Button, Text } from "react-native";
import { useRouter, useSearchParams } from "expo-router";

const OutfitCreationScreen = () => {
  const { topImage, bottomImage } = useSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Outfit</Text>
      <Image source={{ uri: topImage }} style={styles.image} />
      <Image source={{ uri: bottomImage }} style={styles.image} />
      <Button title="Go Back" onPress={() => router.back()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  image: {
    width: "80%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 20,
  },
});

export default OutfitCreationScreen;
