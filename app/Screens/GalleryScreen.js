// import React, { useState, useEffect } from "react";
// import {
//   View,
//   FlatList,
//   Image,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   Button,
//   Text,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
// import { useIsFocused } from "@react-navigation/native";
// import { useRouter } from "expo-router";

// const GalleryScreen = () => {
//   const router = useRouter();
//   const [images, setImages] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     const fetchImages = async () => {
//       setLoading(true);
//       try {
//         const querySnapshot = await getDocs(collection(db, "images"));
//         const imageData = querySnapshot.docs.map((doc) => doc.data());

//         // Ensure imageData has the expected structure
//         setImages(imageData);
//       } catch (error) {
//         console.error("Error fetching images:", error);
//         Alert.alert("Error", "Failed to load images. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isFocused) {
//       fetchImages();
//     }
//   }, [isFocused]);

//   // Filter images based on selected category
//   const filteredImages =
//     category === "all"
//       ? images
//       : images.filter((img) => img.category === category);

//   return (
//     <View style={styles.container}>
//       <Button title="Go Back" onPress={() => router.back()} />
//       <Picker
//         selectedValue={category}
//         onValueChange={(itemValue) => setCategory(itemValue)}
//         style={styles.picker}
//       >
//         <Picker.Item label="All" value="all" />
//         <Picker.Item label="Tops" value="tops" />
//         <Picker.Item label="Bottoms" value="bottoms" />
//       </Picker>

//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <FlatList
//           data={filteredImages}
//           keyExtractor={(item, index) => index.toString()}
//           numColumns={2}
//           renderItem={({ item }) => (
//             <Image source={{ uri: item.url }} style={styles.image} />
//           )}
//           // Add content container style for better alignment
//           contentContainerStyle={styles.imageContainer}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   picker: {
//     marginBottom: 10,
//   },
//   imageContainer: {
//     justifyContent: "space-between",
//   },
//   image: {
//     width: "48%",
//     height: 200,
//     aspectRatio: 1,
//     margin: "1%",
//     borderRadius: 10,
//   },
// });

// export default GalleryScreen;
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Button,
  Text,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";

const GalleryScreen = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "images"));
        const imageData = querySnapshot.docs.map((doc) => doc.data());

        // Ensure imageData has the expected structure
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

  // Filter images based on selected category
  const filteredImages =
    category === "all"
      ? images
      : images.filter((img) => img.category === category);

  // Group images by category
  const groupedImages = filteredImages.reduce((acc, img) => {
    const cat = img.category || "Uncategorized"; // Default to 'Uncategorized' if no category
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(img);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <Button title="Go Back" onPress={() => router.back()} />
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
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={Object.keys(groupedImages)}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryHeader}>{item}</Text>
              <FlatList
                data={groupedImages[item]}
                keyExtractor={(imageItem) => imageItem.url} // Assuming URLs are unique
                numColumns={2}
                renderItem={({ item }) => (
                  <Image source={{ uri: item.url }} style={styles.image} />
                )}
                contentContainerStyle={styles.imageContainer}
              />
            </View>
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
  categoryContainer: {
    marginBottom: 20,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  imageContainer: {
    justifyContent: "space-between",
  },
  image: {
    width: "48%",
    height: 200,
    aspectRatio: 1,
    margin: "1%",
    borderRadius: 10,
  },
});

export default GalleryScreen;
