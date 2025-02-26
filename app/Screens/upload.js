// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   ActivityIndicator,
//   TouchableOpacity,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { useRouter } from "expo-router";
// import { uploadImageToFirebase } from "./firebaseUpload";
// import { MaterialIcons } from "@expo/vector-icons";

// const Upload = () => {
//   const router = useRouter();
//   const [uploadedItems, setUploadedItems] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     checkPermissions();
//   }, []);

//   const checkPermissions = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== "granted") {
//       Alert.alert(
//         "Permission Required",
//         "Please grant access to your photo library to upload images."
//       );
//     }
//   };

//   const pickImages = async (category) => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsMultipleSelection: true,
//         quality: 0.8,
//       });

//       if (!result.canceled && result.assets.length > 0) {
//         setLoading(true);

//         const uploadedResults = [];
//         for (const asset of result.assets) {
//           try {
//             const uploadResult = await uploadImageToFirebase(
//               asset.uri,
//               category
//             );
//             uploadedResults.push(uploadResult);
//           } catch (error) {
//             console.error(`Failed to upload image: ${error.message}`);
//             Alert.alert(
//               "Upload Error",
//               `Failed to upload one or more images: ${error.message}`
//             );
//           }
//         }

//         setUploadedItems((prev) => [...prev, ...uploadedResults]);
//         Alert.alert(
//           "Success",
//           `Successfully uploaded ${uploadedResults.length} ${category}`
//         );
//       }
//     } catch (error) {
//       Alert.alert("Error", "Failed to pick or upload images: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const CategoryCard = ({ title, iconName, onPress, disabled }) => (
//     <TouchableOpacity
//       style={[styles.categoryCard, disabled && styles.categoryCardDisabled]}
//       onPress={onPress}
//       disabled={disabled}
//     >
//       <MaterialIcons
//         name={iconName}
//         size={48}
//         color={disabled ? "#ccc" : "#007AFF"}
//       />
//       <Text
//         style={[styles.categoryTitle, disabled && styles.categoryTitleDisabled]}
//       >
//         {title}
//       </Text>
//       <Text style={[styles.uploadText, disabled && styles.uploadTextDisabled]}>
//         Tap to Upload
//       </Text>
//     </TouchableOpacity>
//   );

//   const renderUploadedItems = () => {
//     if (uploadedItems.length === 0) {
//       return <Text style={styles.noImagesText}>No images uploaded yet</Text>;
//     }

//     return uploadedItems.map((item, index) => (
//       <View key={`${item.id}-${index}`} style={styles.imageContainer}>
//         <Image source={{ uri: item.imageUrl }} style={styles.image} />
//         <View style={styles.imageInfo}>
//           <Text style={styles.categoryText}>Category: {item.category}</Text>
//         </View>
//       </View>
//     ));
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Wardrobe Upload</Text>

//       <View style={styles.categoriesContainer}>
//         <CategoryCard
//           title="Upload Tops"
//           iconName="checkroom"
//           onPress={() => pickImages("tops")}
//           disabled={loading}
//         />
//         <CategoryCard
//           title="Upload Bottoms"
//           iconName="layers"
//           onPress={() => pickImages("bottoms")}
//           disabled={loading}
//         />
//       </View>

//       {loading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#0000ff" />
//           <Text style={styles.loadingText}>Uploading images...</Text>
//         </View>
//       )}

//       <View style={styles.historyHeader}>
//         <Text style={styles.historyTitle}>Upload History</Text>
//         <TouchableOpacity
//           onPress={() => setUploadedItems([])}
//           disabled={loading}
//           style={styles.clearButton}
//         >
//           <Text style={styles.clearButtonText}>Clear</Text>
//         </TouchableOpacity>
//       </View>

//       <ScrollView
//         style={styles.scrollView}
//         contentContainerStyle={styles.scrollViewContent}
//       >
//         {renderUploadedItems()}
//       </ScrollView>

//       <View style={styles.navigationButtons}>
//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => router.back()}
//         >
//           <Text style={styles.buttonText}>Back</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => router.push("Screens/GalleryScreen")}
//         >
//           <Text style={styles.buttonText}>View Selections </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginVertical: 20,
//   },
//   categoriesContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   categoryCard: {
//     flex: 0.48,
//     backgroundColor: "#f8f9fa",
//     borderRadius: 12,
//     padding: 20,
//     alignItems: "center",
//     justifyContent: "center",
//     borderWidth: 2,
//     borderColor: "#e9ecef",
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   categoryCardDisabled: {
//     backgroundColor: "#f5f5f5",
//     borderColor: "#e0e0e0",
//   },
//   categoryTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#007AFF",
//     marginTop: 12,
//     textAlign: "center",
//   },
//   categoryTitleDisabled: {
//     color: "#ccc",
//   },
//   uploadText: {
//     fontSize: 14,
//     color: "#666",
//     marginTop: 4,
//   },
//   uploadTextDisabled: {
//     color: "#999",
//   },
//   historyHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   historyTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#333",
//   },
//   clearButton: {
//     padding: 8,
//   },
//   clearButtonText: {
//     color: "#007AFF",
//     fontSize: 14,
//   },
//   loadingContainer: {
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   loadingText: {
//     marginTop: 10,
//     color: "#666",
//   },
//   scrollView: {
//     flex: 1,
//   },
//   scrollViewContent: {
//     padding: 10,
//   },
//   imageContainer: {
//     marginBottom: 20,
//     borderRadius: 12,
//     backgroundColor: "#f5f5f5",
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     borderRadius: 8,
//   },
//   imageInfo: {
//     padding: 10,
//   },
//   categoryText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   noImagesText: {
//     textAlign: "center",
//     color: "#666",
//     marginTop: 20,
//   },
//   navigationButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   navButton: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     borderRadius: 8,
//     flex: 0.48,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default Upload;

// // import React, { useState, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   Image,
// //   StyleSheet,
// //   Alert,
// //   ScrollView,
// //   ActivityIndicator,
// //   TouchableOpacity,
// // } from "react-native";
// // import * as ImagePicker from "expo-image-picker";
// // import { useRouter } from "expo-router";
// // import { uploadImageToFirebase } from "./firebaseUpload";
// // import { MaterialIcons } from "@expo/vector-icons";
// // import { LinearGradient } from "expo-linear-gradient";

// // const Upload = () => {
// //   const router = useRouter();
// //   const [uploadedItems, setUploadedItems] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [showTutorial, setShowTutorial] = useState(true);

// //   useEffect(() => {
// //     checkPermissions();
// //   }, []);

// //   const checkPermissions = async () => {
// //     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
// //     if (status !== "granted") {
// //       Alert.alert(
// //         "Photo Access Needed",
// //         "We need access to your photo library to add items to your wardrobe. Please enable this in your device settings.",
// //         [
// //           { text: "Not Now", style: "cancel" },
// //           { text: "Open Settings", onPress: () => Linking.openSettings() },
// //         ]
// //       );
// //     }
// //   };

// //   const pickImages = async (category) => {
// //     try {
// //       const result = await ImagePicker.launchImageLibraryAsync({
// //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //         allowsMultipleSelection: true,
// //         quality: 0.8,
// //       });

// //       if (!result.canceled && result.assets.length > 0) {
// //         setLoading(true);
// //         const uploadPromises = result.assets.map((asset) =>
// //           uploadImageToFirebase(asset.uri, category).then((uploadResult) => {
// //             setUploadedItems((prev) => [...prev, uploadResult]);
// //             return uploadResult;
// //           })
// //         );

// //         const results = await Promise.allSettled(uploadPromises);
// //         const successful = results.filter(
// //           (r) => r.status === "fulfilled"
// //         ).length;
// //         const failed = results.filter((r) => r.status === "rejected").length;

// //         let message = `Successfully uploaded ${successful} ${category}`;
// //         if (failed > 0) {
// //           message += `\n${failed} items failed to upload`;
// //         }
// //         Alert.alert("Upload Complete", message);
// //       }
// //     } catch (error) {
// //       Alert.alert("Upload Error", "Failed to upload images. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const CategoryCard = ({ title, iconName, onPress, disabled }) => (
// //     <TouchableOpacity
// //       style={[styles.categoryCard, disabled && styles.categoryCardDisabled]}
// //       onPress={onPress}
// //       disabled={disabled}
// //     >
// //       <LinearGradient
// //         colors={disabled ? ["#e0e0e0", "#f5f5f5"] : ["#2196F3", "#1565C0"]}
// //         style={styles.cardGradient}
// //       >
// //         <MaterialIcons
// //           name={iconName}
// //           size={48}
// //           color={disabled ? "#ccc" : "#fff"}
// //         />
// //         <Text
// //           style={[
// //             styles.categoryTitle,
// //             disabled && styles.categoryTitleDisabled,
// //           ]}
// //         >
// //           {title}
// //         </Text>
// //         <Text
// //           style={[styles.uploadText, disabled && styles.uploadTextDisabled]}
// //         >
// //           Tap to select from gallery
// //         </Text>
// //       </LinearGradient>
// //     </TouchableOpacity>
// //   );

// //   const navItems = [
// //     {
// //       icon: "home",
// //       label: "Home",
// //       route: "Screens/HomeScreen",
// //     },
// //     {
// //       icon: "photo-library",
// //       label: "Gallery",
// //       route: "Screens/GalleryScreen",
// //     },
// //     {
// //       icon: "checkroom",
// //       label: "Outfits",
// //       route: "Screens/OutfitScreen",
// //     },
// //     {
// //       icon: "shuffle",
// //       label: "Mix & Match",
// //       route: "Screens/MixandMatchScreen",
// //     },
// //   ];

// //   return (
// //     <View style={styles.container}>
// //       <LinearGradient colors={["#2196F3", "#1565C0"]} style={styles.header}>
// //         <Text style={styles.headerTitle}>ADD TO WARDROBE</Text>
// //         <Text style={styles.headerSubtitle}>
// //           Upload your clothing items here
// //         </Text>
// //       </LinearGradient>

// //       {showTutorial && (
// //         <View style={styles.tutorialContainer}>
// //           <Text style={styles.tutorialText}>
// //             Select a category below and choose photos from your gallery to add
// //             items to your wardrobe. You can select multiple items at once!
// //           </Text>
// //           <TouchableOpacity
// //             style={styles.tutorialButton}
// //             onPress={() => setShowTutorial(false)}
// //           >
// //             <Text style={styles.tutorialButtonText}>Got it!</Text>
// //           </TouchableOpacity>
// //         </View>
// //       )}

// //       <ScrollView style={styles.mainContent}>
// //         <View style={styles.categoriesContainer}>
// //           <CategoryCard
// //             title="Upload Tops"
// //             iconName="checkroom"
// //             onPress={() => pickImages("tops")}
// //             disabled={loading}
// //           />
// //           <CategoryCard
// //             title="Upload Bottoms"
// //             iconName="layers"
// //             onPress={() => pickImages("bottoms")}
// //             disabled={loading}
// //           />
// //         </View>

// //         {loading && (
// //           <View style={styles.loadingContainer}>
// //             <ActivityIndicator size="large" color="#2196F3" />
// //             <Text style={styles.loadingText}>Uploading your items...</Text>
// //           </View>
// //         )}

// //         {uploadedItems.length > 0 && (
// //           <>
// //             <View style={styles.historyHeader}>
// //               <Text style={styles.historyTitle}>Recently Uploaded</Text>
// //               <TouchableOpacity
// //                 onPress={() => setUploadedItems([])}
// //                 disabled={loading}
// //                 style={styles.clearButton}
// //               >
// //                 <Text style={styles.clearButtonText}>Clear History</Text>
// //               </TouchableOpacity>
// //             </View>

// //             <View style={styles.uploadedItemsGrid}>
// //               {uploadedItems.map((item, index) => (
// //                 <View key={`${item.id}-${index}`} style={styles.imageContainer}>
// //                   <Image source={{ uri: item.imageUrl }} style={styles.image} />
// //                   <View style={styles.imageInfo}>
// //                     <Text style={styles.categoryText}>
// //                       {item.category.charAt(0).toUpperCase() +
// //                         item.category.slice(1)}
// //                     </Text>
// //                   </View>
// //                 </View>
// //               ))}
// //             </View>
// //           </>
// //         )}

// //         {!loading && uploadedItems.length === 0 && (
// //           <View style={styles.emptyStateContainer}>
// //             <MaterialIcons name="cloud-upload" size={64} color="#2196F3" />
// //             <Text style={styles.emptyStateText}>
// //               No items uploaded yet{"\n"}
// //               Select a category above to get started
// //             </Text>
// //           </View>
// //         )}
// //       </ScrollView>

// //       <View style={styles.bottomNav}>
// //         {navItems.map((item, index) => (
// //           <TouchableOpacity
// //             key={index}
// //             style={styles.navItem}
// //             onPress={() => router.push(item.route)}
// //           >
// //             <MaterialIcons
// //               name={item.icon}
// //               size={24}
// //               color={item.label === "Add Item" ? "#1565C0" : "#4A5568"}
// //             />
// //             <Text
// //               style={[
// //                 styles.navLabel,
// //                 item.label === "Add Item" && styles.activeNavLabel,
// //               ]}
// //             >
// //               {item.label}
// //             </Text>
// //           </TouchableOpacity>
// //         ))}
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: "#FFF0F5",
// //   },
// //   header: {
// //     paddingTop: 50,
// //     paddingBottom: 15,
// //     alignItems: "center",
// //   },
// //   headerTitle: {
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     color: "white",
// //     letterSpacing: 2,
// //   },
// //   headerSubtitle: {
// //     fontSize: 16,
// //     color: "rgba(255,255,255,0.8)",
// //     marginTop: 5,
// //   },
// //   tutorialContainer: {
// //     margin: 15,
// //     padding: 15,
// //     backgroundColor: "#E3F2FD",
// //     borderRadius: 10,
// //   },
// //   tutorialText: {
// //     fontSize: 14,
// //     color: "#1565C0",
// //     textAlign: "center",
// //     lineHeight: 20,
// //   },
// //   tutorialButton: {
// //     marginTop: 10,
// //     alignSelf: "center",
// //   },
// //   tutorialButtonText: {
// //     color: "#1565C0",
// //     fontWeight: "bold",
// //   },
// //   mainContent: {
// //     flex: 1,
// //     padding: 15,
// //   },
// //   categoriesContainer: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     marginBottom: 20,
// //   },
// //   categoryCard: {
// //     flex: 0.48,
// //     borderRadius: 12,
// //     overflow: "hidden",
// //     elevation: 3,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.1,
// //     shadowRadius: 4,
// //   },
// //   cardGradient: {
// //     padding: 20,
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   categoryTitle: {
// //     fontSize: 16,
// //     fontWeight: "600",
// //     color: "#fff",
// //     marginTop: 12,
// //     textAlign: "center",
// //   },
// //   categoryTitleDisabled: {
// //     color: "#999",
// //   },
// //   uploadText: {
// //     fontSize: 14,
// //     color: "rgba(255,255,255,0.8)",
// //     marginTop: 4,
// //   },
// //   uploadTextDisabled: {
// //     color: "#999",
// //   },
// //   loadingContainer: {
// //     alignItems: "center",
// //     marginVertical: 20,
// //   },
// //   loadingText: {
// //     marginTop: 10,
// //     color: "#1565C0",
// //     fontSize: 16,
// //   },
// //   historyHeader: {
// //     flexDirection: "row",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     marginVertical: 15,
// //   },
// //   historyTitle: {
// //     fontSize: 18,
// //     fontWeight: "600",
// //     color: "#1565C0",
// //   },
// //   clearButton: {
// //     padding: 8,
// //   },
// //   clearButtonText: {
// //     color: "#FF1493",
// //     fontSize: 14,
// //     fontWeight: "500",
// //   },
// //   uploadedItemsGrid: {
// //     flexDirection: "row",
// //     flexWrap: "wrap",
// //     justifyContent: "space-between",
// //   },
// //   imageContainer: {
// //     width: "48%",
// //     marginBottom: 15,
// //     borderRadius: 12,
// //     backgroundColor: "white",
// //     overflow: "hidden",
// //     elevation: 2,
// //     shadowColor: "#000",
// //     shadowOffset: { width: 0, height: 1 },
// //     shadowOpacity: 0.2,
// //     shadowRadius: 2,
// //   },
// //   image: {
// //     width: "100%",
// //     height: 150,
// //     borderTopLeftRadius: 12,
// //     borderTopRightRadius: 12,
// //   },
// //   imageInfo: {
// //     padding: 10,
// //     backgroundColor: "white",
// //   },
// //   categoryText: {
// //     fontSize: 14,
// //     color: "#1565C0",
// //     textAlign: "center",
// //     fontWeight: "500",
// //   },
// //   emptyStateContainer: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //     marginTop: 50,
// //     padding: 20,
// //   },
// //   emptyStateText: {
// //     marginTop: 15,
// //     fontSize: 16,
// //     color: "#666",
// //     textAlign: "center",
// //     lineHeight: 24,
// //   },
// //   bottomNav: {
// //     flexDirection: "row",
// //     justifyContent: "space-around",
// //     alignItems: "center",
// //     backgroundColor: "white",
// //     paddingVertical: 10,
// //     borderTopWidth: 1,
// //     borderTopColor: "#E1E8ED",
// //   },
// //   navItem: {
// //     alignItems: "center",
// //     justifyContent: "center",
// //     paddingHorizontal: 15,
// //   },
// //   navLabel: {
// //     fontSize: 12,
// //     marginTop: 4,
// //     color: "#4A5568",
// //   },
// //   activeNavLabel: {
// //     color: "#1565C0",
// //     fontWeight: "bold",
// //   },
// // });

// // export default Upload;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { uploadImageToFirebase } from "./firebaseUpload";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Upload = () => {
  const router = useRouter();
  const [uploadedItems, setUploadedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant access to your photo library to upload images.",
        [
          { text: "Not Now", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() },
        ]
      );
    }
  };

  const pickImages = async (category) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setLoading(true);

        const uploadedResults = [];
        for (const asset of result.assets) {
          try {
            const uploadResult = await uploadImageToFirebase(
              asset.uri,
              category
            );
            uploadedResults.push(uploadResult);
          } catch (error) {
            console.error(`Failed to upload image: ${error.message}`);
            Alert.alert(
              "Upload Error",
              `Failed to upload one or more images: ${error.message}`
            );
          }
        }

        setUploadedItems((prev) => [...prev, ...uploadedResults]);
        Alert.alert(
          "Success",
          `Successfully uploaded ${uploadedResults.length} ${category}`
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick or upload images: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const CategoryCard = ({ title, iconName, onPress, disabled }) => (
    <TouchableOpacity
      style={[styles.categoryCard, disabled && styles.categoryCardDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <LinearGradient
        colors={disabled ? ["#e0e0e0", "#f5f5f5"] : ["#3a7bd5", "#3a6073"]}
        style={styles.cardGradient}
      >
        <MaterialIcons
          name={iconName}
          size={48}
          color={disabled ? "#ccc" : "#fff"}
        />
        <Text
          style={[
            styles.categoryTitle,
            disabled && styles.categoryTitleDisabled,
          ]}
        >
          {title}
        </Text>
        <Text
          style={[styles.uploadText, disabled && styles.uploadTextDisabled]}
        >
          Tap to select from gallery
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderUploadedItems = () => {
    if (uploadedItems.length === 0) {
      return (
        <View style={styles.emptyStateContainer}>
          <MaterialIcons name="cloud-upload" size={64} color="#3a7bd5" />
          <Text style={styles.emptyStateText}>
            No items uploaded yet{"\n"}
            Select a category above to get started
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.uploadedItemsGrid}>
        {uploadedItems.map((item, index) => (
          <View key={`${item.id}-${index}`} style={styles.imageContainer}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.imageInfo}>
              <Text style={styles.categoryText}>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#3a7bd5", "#3a6073"]} style={styles.header}>
        <Text style={styles.headerTitle}>ADD TO WARDROBE</Text>
        <Text style={styles.headerSubtitle}>
          Upload your clothing items here
        </Text>
      </LinearGradient>

      {showTutorial && (
        <View style={styles.tutorialContainer}>
          <Text style={styles.tutorialText}>
            Select a category below and choose photos from your gallery to add
            items to your wardrobe. You can select multiple items at once!
          </Text>
          <TouchableOpacity
            style={styles.tutorialButton}
            onPress={() => setShowTutorial(false)}
          >
            <Text style={styles.tutorialButtonText}>Got it!</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.mainContent}>
        <View style={styles.categoriesContainer}>
          <CategoryCard
            title="Upload Tops"
            iconName="checkroom"
            onPress={() => pickImages("tops")}
            disabled={loading}
          />
          <CategoryCard
            title="Upload Bottoms"
            iconName="layers"
            onPress={() => pickImages("bottoms")}
            disabled={loading}
          />
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3a7bd5" />
            <Text style={styles.loadingText}>Uploading your items...</Text>
          </View>
        )}

        {uploadedItems.length > 0 && (
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Recently Uploaded</Text>
            <TouchableOpacity
              onPress={() => setUploadedItems([])}
              disabled={loading}
              style={styles.clearButton}
            >
              <Text style={styles.clearButtonText}>Clear History</Text>
            </TouchableOpacity>
          </View>
        )}

        {renderUploadedItems()}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem]}
          onPress={() => router.push("Screens/HomeScreen")}
        >
          <MaterialIcons name="home" size={24} color="#757575" />
          <Text style={[styles.navLabel]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, styles.activeNavItem]}
          onPress={() => router.push("Screens/upload")}
        >
          <MaterialIcons name="add-circle" size={24} color="#3a7bd5" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Add Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/GalleryScreen")}
        >
          <MaterialIcons name="photo-library" size={24} color="#757575" />
          <Text style={styles.navLabel}>Wardrobe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/MixandMatchScreen")}
        >
          <MaterialIcons name="shuffle" size={24} color="#757575" />
          <Text style={styles.navLabel}>Mix & Match</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/OutfitScreen")}
        >
          <MaterialIcons name="checkroom" size={24} color="#757575" />
          <Text style={styles.navLabel}>Outfits</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.8)",
    marginTop: 5,
  },
  tutorialContainer: {
    margin: 15,
    padding: 15,
    backgroundColor: "#e3f2fd",
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#3a7bd5",
  },
  tutorialText: {
    fontSize: 14,
    color: "#455a64",
    lineHeight: 20,
  },
  tutorialButton: {
    marginTop: 10,
    alignSelf: "flex-end",
    backgroundColor: "#3a7bd5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  tutorialButtonText: {
    color: "white",
    fontWeight: "500",
  },
  mainContent: {
    flex: 1,
    padding: 15,
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  categoryCard: {
    flex: 0.48,
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryCardDisabled: {
    opacity: 0.7,
  },
  cardGradient: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 160,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginTop: 12,
    textAlign: "center",
  },
  categoryTitleDisabled: {
    color: "#999",
  },
  uploadText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginTop: 4,
  },
  uploadTextDisabled: {
    color: "#999",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#3a7bd5",
    fontSize: 16,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#455a64",
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: "#f50057",
    fontSize: 14,
    fontWeight: "500",
  },
  uploadedItemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "48%",
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: "white",
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  imageInfo: {
    padding: 10,
    backgroundColor: "white",
  },
  categoryText: {
    fontSize: 14,
    color: "#3a7bd5",
    textAlign: "center",
    fontWeight: "500",
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
  },
  emptyStateText: {
    marginTop: 15,
    fontSize: 16,
    color: "#78909c",
    textAlign: "center",
    lineHeight: 24,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
  },
  activeNavItem: {
    backgroundColor: "#E3F2FD",
  },
  navLabel: {
    fontSize: 12,
    color: "#757575",
    marginTop: 4,
  },
  activeNavLabel: {
    color: "#3a7bd5",
    fontWeight: "bold",
  },
});

export default Upload;
