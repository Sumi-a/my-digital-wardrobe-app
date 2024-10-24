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

//   // Group images by category
//   const groupedImages = filteredImages.reduce((acc, img) => {
//     const cat = img.category || "Uncategorized"; // Default to 'Uncategorized' if no category
//     if (!acc[cat]) {
//       acc[cat] = [];
//     }
//     acc[cat].push(img);
//     return acc;
//   }, {});

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
//           data={Object.keys(groupedImages)}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <View style={styles.categoryContainer}>
//               <Text style={styles.categoryHeader}>{item}</Text>
//               <FlatList
//                 data={groupedImages[item]}
//                 keyExtractor={(imageItem) => imageItem.url} // Assuming URLs are unique
//                 numColumns={2}
//                 renderItem={({ item }) => (
//                   <Image source={{ uri: item.url }} style={styles.image} />
//                 )}
//                 contentContainerStyle={styles.imageContainer}
//               />
//             </View>
//           )}
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
//   categoryContainer: {
//     marginBottom: 20,
//   },
//   categoryHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
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
//         const imageData = querySnapshot.docs.map((doc) => {
//           const data = doc.data();
//           return {
//             ...data,
//             url: data.url || "https://via.placeholder.com/150", // Fallback for missing URL
//             category: data.category || "Uncategorized", // Fallback for missing category
//           };
//         });

//         const validImageData = imageData.filter((img) => img.url); // Only keep images with URLs
//         setImages(validImageData); // Set state with valid images
//         console.log("Fetched images:", validImageData); // Debugging log
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

//   // Group images by category
//   const groupedImages = filteredImages.reduce((acc, img) => {
//     const cat = img.category || "Uncategorized"; // Default to 'Uncategorized' if no category
//     if (!acc[cat]) {
//       acc[cat] = [];
//     }
//     acc[cat].push(img);
//     return acc;
//   }, {});

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
//           data={Object.keys(groupedImages)}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <View style={styles.categoryContainer}>
//               <Text style={styles.categoryHeader}>{item}</Text>
//               <FlatList
//                 data={groupedImages[item]}
//                 keyExtractor={(imageItem) => imageItem.url} // Assuming URLs are unique
//                 numColumns={2}
//                 renderItem={({ item }) => (
//                   <Image source={{ uri: item.url }} style={styles.image} />
//                 )}
//                 contentContainerStyle={styles.imageContainer}
//               />
//             </View>
//           )}
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
//   categoryContainer: {
//     marginBottom: 20,
//   },
//   categoryHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   imageContainer: {
//     justifyContent: "space-between",
//   },
//   image: {
//     width: "48%",
//     height: 200,
//     resizeMode: "cover", // Ensures proper image scaling
//     margin: "1%",
//     borderRadius: 10,
//   },
// });

// export default GalleryScreen;

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
//   TouchableOpacity,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase";
// import { useIsFocused } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import { getDownloadURL } from 'firebase/storage';

// const GalleryScreen = () => {
//   console.log("GalleryScreen mounted");
//   const router = useRouter();
//   const [images, setImages] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [selectedTop, setSelectedTop] = useState(null);
//   const [selectedBottom, setSelectedBottom] = useState(null);
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     const fetchImages = async () => {
//       setLoading(true);
//       try {
//         const querySnapshot = await getDocs(collection(db, "wardrobeItems")); // Use wrdrobeItems here
//         console.log("Query snapshot:", querySnapshot); // Check query snapshot

//         if (querySnapshot.empty) {
//           console.log("No documents found in the 'wardrobeItems' collection.");
//           setImages([]); // Set empty items
//           return;
//         }

//         const itemData = querySnapshot.docs.map((doc) => {
//           const data = doc.data();
//           console.log("Document data:", data); // Log each document's data
//           return {
//             ...data,
//             url: data.url || "https://via.placeholder.com/150", // Fallback image
//             category: data.category || "Uncategorized", // Fallback category
//           };
//         });

//         setImages(itemData);
//         console.log("Fetched items:", itemData);
//       } catch (error) {
//         console.error("Error fetching items:", error);
//         Alert.alert("Error", "Failed to load items. Please try again.");
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

//   // Group images by category
//   const groupedImages = filteredImages.reduce((acc, img) => {
//     const cat = img.category || "Uncategorized"; // Default to 'Uncategorized' if no category
//     if (!acc[cat]) {
//       acc[cat] = [];
//     }
//     acc[cat].push(img);
//     return acc;
//   }, {});

//   const handleImageSelect = (img) => {
//     if (category === "tops") {
//       setSelectedTop(img); // Select top if category is "tops"
//     } else if (category === "bottoms") {
//       setSelectedBottom(img); // Select bottom if category is "bottoms"
//     }
//   };

//   const createOutfit = () => {
//     if (selectedTop && selectedBottom) {
//       router.push({
//         pathname: "/OutfitScreen",
//         params: {
//           topImage: selectedTop.url,
//           bottomImage: selectedBottom.url,
//         },
//       });
//     } else {
//       Alert.alert("Error", "Please select both a top and a bottom.");
//     }
//   };

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
//           data={Object.keys(groupedImages)}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <View style={styles.categoryContainer}>
//               <Text style={styles.categoryHeader}>{item}</Text>
//               <FlatList
//                 data={groupedImages[item]}
//                 keyExtractor={(imageItem) => imageItem.url} // Assuming URLs are unique
//                 numColumns={2}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity onPress={() => handleImageSelect(item)}>
//                     <Image
//                       source={{ uri: item.url }}
//                       style={[
//                         styles.image,
//                         (selectedTop?.url === item.url ||
//                           selectedBottom?.url === item.url) &&
//                           styles.selectedImage, // Highlight selected image
//                       ]}
//                     />
//                   </TouchableOpacity>
//                 )}
//                 contentContainerStyle={styles.imageContainer}
//               />
//             </View>
//           )}
//         />
//       )}

//       <Button title="Create Outfit" onPress={createOutfit} />
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
//   categoryContainer: {
//     marginBottom: 20,
//   },
//   categoryHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   imageContainer: {
//     justifyContent: "space-between",
//   },
//   image: {
//     width: "48%",
//     height: 200,
//     resizeMode: "cover",
//     margin: "1%",
//     borderRadius: 10,
//   },
//   selectedImage: {
//     borderColor: "blue",
//     borderWidth: 3,
//   },
// });

// export default GalleryScreen;

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
//   TouchableOpacity,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import { collection, getDocs } from "firebase/firestore";
// import { db, storage } from "../firebase"; // Ensure storage is imported from firebase config
// import { useIsFocused } from "@react-navigation/native";
// import { useRouter } from "expo-router";
// import { getDownloadURL, ref } from "firebase/storage"; // Import getDownloadURL to fetch image URLs

// const GalleryScreen = () => {
//   const router = useRouter();
//   const [images, setImages] = useState([]);
//   const [category, setCategory] = useState("all");
//   const [loading, setLoading] = useState(true);
//   const [selectedTop, setSelectedTop] = useState(null);
//   const [selectedBottom, setSelectedBottom] = useState(null);
//   const isFocused = useIsFocused();

//   useEffect(() => {
//     const fetchImages = async () => {
//       setLoading(true);
//       try {
//         const querySnapshot = await getDocs(collection(db, "wardrobeItems")); // Assuming wardrobeItems stores image metadata

//         if (querySnapshot.empty) {
//           setImages([]);
//           return;
//         }

//         const itemData = await Promise.all(
//           querySnapshot.docs.map(async (doc) => {
//             const data = doc.data();
//             const storageRef = ref(storage, data.storagePath); // Assuming storagePath holds the path to the image in Firebase Storage
//             const url = await getDownloadURL(storageRef); // Fetch the URL from storage

//             return {
//               ...data,
//               url, // Use the URL fetched from Firebase Storage
//               category: data.category || "Uncategorized", // Fallback category
//             };
//           })
//         );

//         setImages(itemData);
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

//   // Group images by category
//   const groupedImages = filteredImages.reduce((acc, img) => {
//     const cat = img.category || "Uncategorized";
//     if (!acc[cat]) {
//       acc[cat] = [];
//     }
//     acc[cat].push(img);
//     return acc;
//   }, {});

//   const handleImageSelect = (img) => {
//     if (category === "tops") {
//       setSelectedTop(img);
//     } else if (category === "bottoms") {
//       setSelectedBottom(img);
//     }
//   };

//   const createOutfit = () => {
//     if (selectedTop && selectedBottom) {
//       router.push({
//         pathname: "/OutfitScreen",
//         params: {
//           topImage: selectedTop.url,
//           bottomImage: selectedBottom.url,
//         },
//       });
//     } else {
//       Alert.alert("Error", "Please select both a top and a bottom.");
//     }
//   };

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
//           data={Object.keys(groupedImages)}
//           keyExtractor={(item) => item}
//           renderItem={({ item }) => (
//             <View style={styles.categoryContainer}>
//               <Text style={styles.categoryHeader}>{item}</Text>
//               <FlatList
//                 data={groupedImages[item]}
//                 keyExtractor={(imageItem) => imageItem.url}
//                 numColumns={2}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity onPress={() => handleImageSelect(item)}>
//                     <Image
//                       source={{ uri: item.url }}
//                       style={[
//                         styles.image,
//                         (selectedTop?.url === item.url ||
//                           selectedBottom?.url === item.url) &&
//                           styles.selectedImage, // Highlight selected image
//                       ]}
//                     />
//                   </TouchableOpacity>
//                 )}
//                 contentContainerStyle={styles.imageContainer}
//               />
//             </View>
//           )}
//         />
//       )}

//       <Button title="Create Outfit" onPress={createOutfit} />
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
//   categoryContainer: {
//     marginBottom: 20,
//   },
//   categoryHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   imageContainer: {
//     justifyContent: "space-between",
//   },
//   image: {
//     width: "48%",
//     height: 200,
//     resizeMode: "cover",
//     margin: "1%",
//     borderRadius: 10,
//   },
//   selectedImage: {
//     borderColor: "blue",
//     borderWidth: 3,
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
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../firebase"; // Ensure storage is imported from firebase config
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { getDownloadURL, ref } from "firebase/storage";

const GalleryScreen = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchImages();
    }
  }, [isFocused]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "wardrobeItems"));
      const itemData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          const url = await fetchImageUrl(data.storagePath); // Fetch the URL
          return { ...data, url }; // Return the data with the URL
        })
      );
      setImages(itemData);
    } catch (error) {
      console.error("Error fetching images:", error);
      Alert.alert("Error", "Failed to load images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchImageUrl = async (storagePath) => {
    if (!storagePath) return null; // Return null if no storage path is provided
    const storageRef = ref(storage, storagePath); // Create a reference
    try {
      return await getDownloadURL(storageRef); // Fetch and return the download URL
    } catch (error) {
      console.error("Error getting download URL:", error);
      return null; // Handle errors while fetching the URL
    }
  };

  const filteredImages =
    category === "all"
      ? images
      : images.filter((img) => img.category === category);

  const groupedImages = filteredImages.reduce((acc, img) => {
    const cat = img.category || "Uncategorized";
    if (!acc[cat]) {
      acc[cat] = [];
    }
    acc[cat].push(img);
    return acc;
  }, {});

  const handleImageSelect = (img) => {
    if (category === "tops") {
      setSelectedTop(img);
    } else if (category === "bottoms") {
      setSelectedBottom(img);
    }
  };

  const createOutfit = () => {
    if (selectedTop && selectedBottom) {
      router.push({
        pathname: "/OutfitScreen",
        params: {
          topImage: selectedTop.url,
          bottomImage: selectedBottom.url,
        },
      });
    } else {
      Alert.alert("Error", "Please select both a top and a bottom.");
    }
  };

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
                keyExtractor={(imageItem) => imageItem.url}
                numColumns={2}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleImageSelect(item)}>
                    <Image
                      source={{ uri: item.url }}
                      style={[
                        styles.image,
                        (selectedTop?.url === item.url ||
                          selectedBottom?.url === item.url) &&
                          styles.selectedImage,
                      ]}
                    />
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.imageContainer}
              />
            </View>
          )}
        />
      )}

      <Button title="Create Outfit" onPress={createOutfit} />
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
    resizeMode: "cover",
    margin: "1%",
    borderRadius: 10,
  },
  selectedImage: {
    borderColor: "blue",
    borderWidth: 3,
  },
});

export default GalleryScreen;
