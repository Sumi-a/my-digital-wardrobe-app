// import React, { useState, useEffect } from "react";
// import {
//   View,
//   FlatList,
//   Button,
//   Image,
//   TouchableOpacity,
//   Text,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
// import { deleteObject, ref } from "firebase/storage";
// import { useIsFocused, useNavigation } from "@react-navigation/native";
// import { db, storage } from "../firebase";
// import { Ionicons } from "@expo/vector-icons";
// import { useRouter } from "expo-router";

// const GalleryScreen = () => {
//   const router = useRouter();
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedTop, setSelectedTop] = useState(null);
//   const [selectedBottom, setSelectedBottom] = useState(null);
//   const isFocused = useIsFocused();
//   const navigation = useNavigation();

//   React.useLayoutEffect(() => {
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity
//           onPress={() => navigation.goBack()}
//           style={{ marginLeft: 16 }}
//         >
//           <Ionicons name="arrow-back" size={24} color="black" />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   const fetchImages = async () => {
//     setLoading(true);
//     try {
//       const querySnapshot = await getDocs(collection(db, "wardrobeItems"));

//       if (querySnapshot.empty) {
//         console.log("No images found in Firestore.");
//         setImages([]);
//         return;
//       }

//       const itemData = await Promise.all(
//         querySnapshot.docs.map(async (doc) => {
//           const data = doc.data();

//           // Debug log to check incoming data
//           console.log("Document data:", {
//             id: doc.id,
//             itemType: data.itemType,
//             category: data.category,
//           });

//           // More flexible category determination
//           let category;
//           const itemType = (data.itemType || "").toLowerCase();
//           const dataCategory = (data.category || "").toLowerCase();

//           // Check both itemType and category fields
//           if (itemType.includes("top") || dataCategory.includes("top")) {
//             category = "Tops";
//           } else if (
//             itemType.includes("bottom") ||
//             dataCategory.includes("bottom")
//           ) {
//             category = "Bottoms";
//           } else {
//             console.log(`Item with ID ${doc.id} has invalid category/type:`, {
//               itemType,
//               category: data.category,
//             });
//             return null;
//           }

//           const url = data.imageUrl || (await fetchImageUrl(data.storagePath));

//           return {
//             ...data,
//             url,
//             category,
//             id: doc.id,
//           };
//         })
//       );

//       // Filter out any null values and log the results
//       const validItems = itemData.filter((item) => item !== null);

//       // Debug log to check final categorized items
//       console.log("Categorized items:", {
//         totalItems: validItems.length,
//         tops: validItems.filter((item) => item.category === "Tops").length,
//         bottoms: validItems.filter((item) => item.category === "Bottoms")
//           .length,
//       });

//       setImages(validItems);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//       Alert.alert("Error", "Failed to load images. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isFocused) {
//       fetchImages();
//     }
//   }, [isFocused]);

//   const handleImageSelect = (item) => {
//     if (item.category === "Tops") {
//       setSelectedTop(selectedTop?.id === item.id ? null : item);
//     } else if (item.category === "Bottoms") {
//       setSelectedBottom(selectedBottom?.id === item.id ? null : item);
//     }
//   };

//   const handleDelete = async (item) => {
//     Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             await deleteDoc(doc(db, "wardrobeItems", item.id));

//             if (item.storagePath) {
//               const storageRef = ref(storage, item.storagePath);
//               await deleteObject(storageRef);
//             }

//             if (selectedTop?.id === item.id) setSelectedTop(null);
//             if (selectedBottom?.id === item.id) setSelectedBottom(null);

//             setImages((prevImages) =>
//               prevImages.filter((img) => img.id !== item.id)
//             );
//             Alert.alert("Success", "Item deleted successfully");
//           } catch (error) {
//             console.error("Error deleting item:", error);
//             Alert.alert("Error", "Failed to delete item. Please try again.");
//           }
//         },
//       },
//     ]);
//   };

//   const renderCategory = (category, items = []) => {
//     // Debug log for render
//     console.log(`Rendering ${category}:`, items.length);

//     return (
//       <View style={styles.categoryContainer}>
//         <Text style={styles.categoryHeader}>
//           {category} ({items.length})
//         </Text>
//         {items.length > 0 ? (
//           <FlatList
//             data={items}
//             keyExtractor={(item) => item.id}
//             horizontal={true}
//             renderItem={({ item }) => (
//               <View style={styles.imageWrapper}>
//                 <TouchableOpacity
//                   onPress={() => handleImageSelect(item)}
//                   style={styles.imageContainer}
//                 >
//                   <Image
//                     source={{ uri: item.url }}
//                     style={[
//                       styles.image,
//                       ((selectedTop?.id === item.id && category === "Tops") ||
//                         (selectedBottom?.id === item.id &&
//                           category === "Bottoms")) &&
//                         styles.selectedImage,
//                     ]}
//                   />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => handleDelete(item)}
//                   style={styles.deleteButton}
//                 >
//                   <Ionicons name="trash-outline" size={20} color="red" />
//                 </TouchableOpacity>
//               </View>
//             )}
//             showsHorizontalScrollIndicator={false}
//           />
//         ) : (
//           <Text style={styles.noItemsText}>No items in this category</Text>
//         )}
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   // Group images by category
//   const groupedImages = images.reduce((acc, item) => {
//     if (!acc[item.category]) {
//       acc[item.category] = [];
//     }
//     acc[item.category].push(item);
//     return acc;
//   }, {});

//   return (
//     <View style={styles.container}>
//       {renderCategory("Tops", groupedImages["Tops"])}
//       {renderCategory("Bottoms", groupedImages["Bottoms"])}
//       <Button title="Go Back" onPress={() => router.back()} />
//     </View>
//   );
// };

// const styles = {
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingVertical: 10,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   categoryContainer: {
//     marginVertical: 10,
//   },
//   categoryHeader: {
//     fontSize: 18,
//     fontWeight: "bold",
//     padding: 10,
//     marginLeft: 10,
//   },
//   imageWrapper: {
//     marginHorizontal: 5,
//     position: "relative",
//   },
//   imageContainer: {
//     padding: 5,
//   },
//   image: {
//     width: 150,
//     height: 150,
//     borderRadius: 8,
//   },
//   selectedImage: {
//     borderWidth: 3,
//     borderColor: "#007AFF",
//   },
//   deleteButton: {
//     position: "absolute",
//     top: 10,
//     right: 10,
//     backgroundColor: "rgba(255, 255, 255, 0.8)",
//     borderRadius: 12,
//     padding: 4,
//     zIndex: 1,
//   },
//   noItemsText: {
//     padding: 20,
//     textAlign: "center",
//     color: "#666",
//     fontStyle: "italic",
//   },
// };

// export default GalleryScreen;

// GalleryScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Button,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { db, storage } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const GalleryScreen = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTop, setSelectedTop] = useState(null);
  const [selectedBottom, setSelectedBottom] = useState(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ marginLeft: 16 }}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "wardrobeItems"));
      const itemData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        url: doc.data().imageUrl,
        category: doc.data().category?.toLowerCase().includes("top")
          ? "Tops"
          : "Bottoms",
      }));
      setImages(itemData);
    } catch (error) {
      console.error("Error fetching images:", error);
      Alert.alert("Error", "Failed to load images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchImages();
    }
  }, [isFocused]);

  const handleImageSelect = (item) => {
    if (item.category === "Tops") {
      setSelectedTop(selectedTop?.id === item.id ? null : item);
    } else if (item.category === "Bottoms") {
      setSelectedBottom(selectedBottom?.id === item.id ? null : item);
    }
  };

  const handleCreateOutfit = () => {
    if (!selectedTop || !selectedBottom) {
      Alert.alert(
        "Selection Required",
        "Please select both a top and bottom to create an outfit."
      );
      return;
    }

    router.push({
      pathname: "Screens/OutfitScreen",
      params: {
        topImage: selectedTop.url,
        bottomImage: selectedBottom.url,
      },
    });
  };

  const handleDelete = async (item) => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            await deleteDoc(doc(db, "wardrobeItems", item.id));
            if (item.storagePath) {
              const storageRef = ref(storage, item.storagePath);
              await deleteObject(storageRef);
            }
            if (selectedTop?.id === item.id) setSelectedTop(null);
            if (selectedBottom?.id === item.id) setSelectedBottom(null);
            setImages((prevImages) =>
              prevImages.filter((img) => img.id !== item.id)
            );
            Alert.alert("Success", "Item deleted successfully");
          } catch (error) {
            console.error("Error deleting item:", error);
            Alert.alert("Error", "Failed to delete item. Please try again.");
          }
        },
      },
    ]);
  };

  const renderCategory = (category, items = []) => {
    return (
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryHeader}>
          {category} ({items.length})
          {category === "Tops" && selectedTop && " - Top Selected"}
          {category === "Bottoms" && selectedBottom && " - Bottom Selected"}
        </Text>
        {items.length > 0 ? (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            horizontal={true}
            renderItem={({ item }) => (
              <View style={styles.imageWrapper}>
                <TouchableOpacity
                  onPress={() => handleImageSelect(item)}
                  style={styles.imageContainer}
                >
                  <Image
                    source={{ uri: item.url }}
                    style={[
                      styles.image,
                      ((selectedTop?.id === item.id && category === "Tops") ||
                        (selectedBottom?.id === item.id &&
                          category === "Bottoms")) &&
                        styles.selectedImage,
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
          />
        ) : (
          <Text style={styles.noItemsText}>No items in this category</Text>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Group images by category
  const groupedImages = images.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {renderCategory("Tops", groupedImages["Tops"])}
      {renderCategory("Bottoms", groupedImages["Bottoms"])}
      <Button title="Go Back" onPress={() => router.back()} />

      <View style={styles.outfitControls}>
        <TouchableOpacity
          style={[
            styles.createOutfitButton,
            (!selectedTop || !selectedBottom) &&
              styles.createOutfitButtonDisabled,
          ]}
          onPress={handleCreateOutfit}
          disabled={!selectedTop || !selectedBottom}
        >
          <Text style={styles.createOutfitButtonText}>Create Outfit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.clearSelectionsButton}
          onPress={() => {
            setSelectedTop(null);
            setSelectedBottom(null);
          }}
        >
          <Text style={styles.clearSelectionsButtonText}>Clear Selections</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  categoryContainer: {
    marginVertical: 10,
  },
  categoryHeader: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    marginLeft: 10,
  },
  imageWrapper: {
    marginHorizontal: 5,
    position: "relative",
  },
  imageContainer: {
    padding: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  selectedImage: {
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  deleteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    padding: 4,
    zIndex: 1,
  },
  noItemsText: {
    padding: 20,
    textAlign: "center",
    color: "#666",
    fontStyle: "italic",
  },
  outfitControls: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  createOutfitButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  createOutfitButtonDisabled: {
    backgroundColor: "#ccc",
  },
  createOutfitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  clearSelectionsButton: {
    backgroundColor: "#ff3b30",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  clearSelectionsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
export default GalleryScreen;
