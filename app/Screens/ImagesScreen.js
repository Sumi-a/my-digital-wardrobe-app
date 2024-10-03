// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   Picker,
// } from "react-native";
// import { collection, query, where, getDocs } from "firebase/firestore";
// import { db } from "./firebase"; // Import Firestore

// // Calculate the width of the screen and divide by the number of columns
// const screenWidth = Dimensions.get("window").width;
// const numColumns = 2; // Number of columns for the grid
// const imageSize = screenWidth / numColumns - 20; // Adjust the size of images to fit within the columns

// const ImagesScreen = () => {
//   const [images, setImages] = useState([]);
//   const [category, setCategory] = useState("tops"); // State to hold selected category

//   useEffect(() => {
//     fetchImages(); // Fetch images on component mount or when category changes
//   }, [category]);

//   // Function to fetch images based on category
//   const fetchImages = async () => {
//     try {
//       const q = query(
//         collection(db, "images"),
//         where("category", "==", category)
//       );
//       const querySnapshot = await getDocs(q);
//       const fetchedImages = [];
//       querySnapshot.forEach((doc) => {
//         fetchedImages.push(doc.data().url);
//       });
//       setImages(fetchedImages);
//     } catch (error) {
//       console.error("Error fetching images: ", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Uploaded Images</Text>

//       {/* Picker to change category */}
//       <Picker
//         selectedValue={category}
//         onValueChange={(itemValue) => setCategory(itemValue)}
//         style={styles.picker}
//       >
//         <Picker.Item label="Tops" value="tops" />
//         <Picker.Item label="Bottoms" value="bottoms" />
//       </Picker>

//       {images.length > 0 ? (
//         <FlatList
//           data={images}
//           keyExtractor={(item, index) => index.toString()}
//           numColumns={numColumns} // Set number of columns for grid view
//           renderItem={({ item }) => (
//             <Image source={{ uri: item }} style={styles.image} />
//           )}
//         />
//       ) : (
//         <Text>No images uploaded in this category.</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   picker: {
//     width: 200,
//     marginVertical: 10,
//   },
//   image: {
//     width: imageSize,
//     height: imageSize,
//     margin: 10,
//     borderRadius: 10,
//     borderColor: "#ddd",
//     borderWidth: 1,
//   },
// });

// export default ImagesScreen;
//  ImagesScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const imageSize = screenWidth / numColumns - 20;

const ImagesScreen = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("tops");
  const route = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params?.category) {
      setCategory(route.params.category);
    }
    fetchImages();
  }, [category, route.params?.category]);

  const fetchImages = async () => {
    try {
      const q = query(
        collection(db, "images"),
        where("category", "==", category)
      );
      const querySnapshot = await getDocs(q);
      const fetchedImages = [];
      querySnapshot.forEach((doc) => {
        fetchedImages.push(doc.data().url);
      });
      setImages(fetchedImages);
    } catch (error) {
      console.error("Error fetching images: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Uploaded Images</Text>
      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Tops" value="tops" />
        <Picker.Item label="Bottoms" value="bottoms" />
      </Picker>
      {images.length > 0 ? (
        <FlatList
          data={images}
          keyExtractor={(item, index) => index.toString()}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.image} />
          )}
        />
      ) : (
        <Text>No images uploaded in this category.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  picker: {
    width: 200,
    marginVertical: 10,
  },
  image: {
    width: imageSize,
    height: imageSize,
    margin: 10,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
});

export default ImagesScreen;
