// import React, { useState, useEffect } from "react";
// import { View, FlatList, Image, StyleSheet, Picker } from "react-native";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "./firebase";

// const GalleryScreen = () => {
//   const [images, setImages] = useState([]);
//   const [category, setCategory] = useState("all");

//   useEffect(() => {
//     const fetchImages = async () => {
//       const querySnapshot = await getDocs(collection(db, "images"));
//       const imageData = [];
//       querySnapshot.forEach((doc) => imageData.push(doc.data()));
//       setImages(imageData);
//     };
//     fetchImages();
//   }, []);

//   const filteredImages =
//     category === "all"
//       ? images
//       : images.filter((img) => img.category === category);

//   return (
//     <View>
//       <Picker
//         selectedValue={category}
//         onValueChange={(itemValue) => setCategory(itemValue)}
//       >
//         <Picker.Item label="All" value="all" />
//         <Picker.Item label="Tops" value="tops" />
//         <Picker.Item label="Bottoms" value="bottoms" />
//       </Picker>

//       <FlatList
//         data={filteredImages}
//         keyExtractor={(item, index) => index.toString()}
//         numColumns={2} // For grid layout
//         renderItem={({ item }) => (
//           <Image source={{ uri: item.url }} style={styles.image} />
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   image: {
//     width: 100,
//     height: 100,
//     margin: 10,
//   },
// });

// export default GalleryScreen;

// GalleryScreen.js
import React, { useState, useEffect } from "react";
import { View, FlatList, Image, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useIsFocused } from '@react-navigation/native';

const GalleryScreen = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "images"));
        const imageData = querySnapshot.docs.map(doc => doc.data());
        setImages(imageData);
      } catch (error) {
        console.error("Error fetching images:", error);
        Alert.alert("Error", "Failed to load images. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (isFocused) {
      fetchImages();
    }
  }, [isFocused]);

  const filteredImages =
    category === "all"
      ? images
      : images.filter((img) => img.category === category);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All" value="all" />
        <Picker.Item label="Tops" value="tops" />
        <Picker.Item label="Bottoms" value="bottoms" />
      </Picker>
      {loading ? (
        <Text>Loading images...</Text>
      ) : (
        <FlatList
          data={filteredImages}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <Image source={{ uri: item.url }} style={styles.image} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  picker: {
    marginBottom: 10,
  },
  image: {
    width: '48%',
    aspectRatio: 1,
    margin: '1%',
    borderRadius: 10,
  },
});

export default GalleryScreen;

