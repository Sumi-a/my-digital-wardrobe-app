// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import { fetchWardrobe, saveOutfit } from "../outfitfirestore";
// import { useNavigation } from "@react-navigation/native";
// import { useRouter } from "expo-router";

// const { width, height } = Dimensions.get("window");
// const imageWidth = width * 0.65; // Reduce image width slightly for better layout
// const imageHeight = imageWidth * 1.1; // Maintain aspect ratio
// const buttonSize = width * 0.1; // Adjust button size to avoid overlap
// const MixAndMatchScreen = () => {
//   const navigation = useNavigation();
//   //const MixAndMatchScreen = ({ navigation }) => {
//   const [wardrobe, setWardrobe] = useState({ tops: [], bottoms: [] });
//   const [selectedTopIndex, setSelectedTopIndex] = useState(0);
//   const [selectedBottomIndex, setSelectedBottomIndex] = useState(0);
//   const [isSaving, setIsSaving] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const loadWardrobe = async () => {
//       try {
//         const data = await fetchWardrobe();
//         setWardrobe(data);
//       } catch (error) {
//         console.error("Error loading wardrobe:", error);
//         Alert.alert("Error", "Could not load wardrobe items");
//       }
//     };
//     loadWardrobe();
//   }, []);

//   // const handleSaveOutfit = async () => {
//   //   if (isSaving) return;
//   //   setIsSaving(true);

//   //   const selectedTop = wardrobe.tops[selectedTopIndex];
//   //   const selectedBottom = wardrobe.bottoms[selectedBottomIndex];

//   //   if (!selectedTop || !selectedBottom) {
//   //     Alert.alert("Error", "Please select a top and a bottom.");
//   //     setIsSaving(false);
//   //     return;
//   //   }

//   //   const newOutfit = {
//   //     name: "Custom Outfit",
//   //     category: "Mixed",
//   //     top: selectedTop.url,
//   //     bottom: selectedBottom.url,
//   //   };

//   //   try {
//   //     await saveOutfit(newOutfit);
//   //     Alert.alert("Success", "Your outfit has been saved!", [
//   //       { text: "OK", onPress: () => navigation.navigate("OutfitScreen") },
//   //     ]);
//   //   } catch (error) {
//   //     console.error("Error saving outfit:", error);
//   //     Alert.alert("Error", "Could not save outfit");
//   //   }
//   //   setIsSaving(false);
//   // };
//   const handleSaveOutfit = async () => {
//     if (isSaving) return;
//     setIsSaving(true);

//     const selectedTop = wardrobe.tops[selectedTopIndex];
//     const selectedBottom = wardrobe.bottoms[selectedBottomIndex];

//     if (!selectedTop || !selectedBottom) {
//       Alert.alert("Error", "Please select a top and a bottom.");
//       setIsSaving(false);
//       return;
//     }

//     const newOutfit = {
//       name: "Custom Outfit",
//       category: "Mixed",
//       top: selectedTop.url,
//       bottom: selectedBottom.url,
//     };

//     try {
//       await saveOutfit(newOutfit);
//       Alert.alert("Success", "Your outfit has been saved!", [
//         { text: "OK", onPress: () => router.push("/Screens/OutfitScreen") }, // Use router.push
//       ]);
//     } catch (error) {
//       console.error("Error saving outfit:", error);
//       Alert.alert("Error", "Could not save outfit");
//     }
//     setIsSaving(false);
//   };

//   const navigateItem = (array, currentIndex, direction) => {
//     return (currentIndex + direction + array.length) % array.length;
//   };

//   if (!wardrobe.tops.length || !wardrobe.bottoms.length) {
//     return (
//       <View style={styles.emptyContainer}>
//         <Text style={styles.emptyText}>
//           Add some tops and bottoms to your wardrobe first!
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       style={styles.container}
//       contentContainerStyle={styles.scrollViewContent}
//     >
//       <View style={styles.previewContainer}>
//         <Text style={styles.previewTitle}>Your Outfit Combination</Text>

//         {/* Top Image with Navigation Buttons */}
//         <View style={styles.imageRow}>
//           <TouchableOpacity
//             style={[
//               styles.navButton,
//               { width: buttonSize, height: buttonSize },
//             ]}
//             onPress={() =>
//               setSelectedTopIndex(
//                 navigateItem(wardrobe.tops, selectedTopIndex, -1)
//               )
//             }
//           >
//             <Text style={styles.navButtonText}>{"<"}</Text>
//           </TouchableOpacity>
//           <View style={styles.imageWrapper}>
//             <Image
//               source={{ uri: wardrobe.tops[selectedTopIndex]?.url }}
//               style={styles.previewImage}
//               resizeMode="cover"
//             />
//           </View>
//           <TouchableOpacity
//             style={[
//               styles.navButton,
//               { width: buttonSize, height: buttonSize },
//             ]}
//             onPress={() =>
//               setSelectedTopIndex(
//                 navigateItem(wardrobe.tops, selectedTopIndex, 1)
//               )
//             }
//           >
//             <Text style={styles.navButtonText}>{">"}</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Bottom Image with Navigation Buttons */}
//         <View style={styles.imageRow}>
//           <TouchableOpacity
//             style={[
//               styles.navButton,
//               { width: buttonSize, height: buttonSize },
//             ]}
//             onPress={() =>
//               setSelectedBottomIndex(
//                 navigateItem(wardrobe.bottoms, selectedBottomIndex, -1)
//               )
//             }
//           >
//             <Text style={styles.navButtonText}>{"<"}</Text>
//           </TouchableOpacity>
//           <View style={styles.imageWrapper}>
//             <Image
//               source={{ uri: wardrobe.bottoms[selectedBottomIndex]?.url }}
//               style={styles.previewImage}
//               resizeMode="cover"
//             />
//           </View>
//           <TouchableOpacity
//             style={[
//               styles.navButton,
//               { width: buttonSize, height: buttonSize },
//             ]}
//             onPress={() =>
//               setSelectedBottomIndex(
//                 navigateItem(wardrobe.bottoms, selectedBottomIndex, 1)
//               )
//             }
//           >
//             <Text style={styles.navButtonText}>{">"}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       {/* Save Outfit Button */}
//       <TouchableOpacity
//         style={styles.saveButton}
//         onPress={handleSaveOutfit}
//         disabled={isSaving}
//       >
//         <Text style={styles.saveButtonText}>
//           {isSaving ? "Saving..." : "Save Outfit"}
//         </Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFE6F0",
//   },
//   scrollViewContent: {
//     padding: 16,
//     flexGrow: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   previewContainer: {
//     alignItems: "center",
//     marginBottom: 10, // Reduced spacing to fit save button
//   },
//   previewTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     color: "#333",
//   },
//   imageRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10, // Slightly reduced margin to fit screen
//     width: "100%",
//   },
//   navButton: {
//     backgroundColor: "#FF1493",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     elevation: 3,
//   },
//   navButtonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   imageWrapper: {
//     width: imageWidth,
//     height: imageHeight,
//     borderRadius: 12,
//     overflow: "hidden",
//     backgroundColor: "#FFF",
//     elevation: 3,
//   },
//   previewImage: {
//     width: "100%",
//     height: "100%",
//   },
//   saveButton: {
//     backgroundColor: "#FF1493",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     width: "80%",
//     elevation: 3,
//     marginTop: 10, // Ensure it's visible even on smaller screens
//   },
//   saveButtonText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#FFE6F0",
//   },
//   emptyText: {
//     color: "#FF1493",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });

// export default MixAndMatchScreen;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   ScrollView,
//   Dimensions,
//   ActivityIndicator,
// } from "react-native";
// import { fetchWardrobe, saveOutfit } from "../outfitfirestore";
// import { useRouter } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";

// const { width } = Dimensions.get("window");
// const imageWidth = width * 0.7;
// const imageHeight = imageWidth * 1.2;
// const buttonSize = width * 0.12;

// const MixAndMatchScreen = () => {
//   const [wardrobe, setWardrobe] = useState({ tops: [], bottoms: [] });
//   const [selectedTopIndex, setSelectedTopIndex] = useState(0);
//   const [selectedBottomIndex, setSelectedBottomIndex] = useState(0);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const loadWardrobe = async () => {
//       try {
//         const data = await fetchWardrobe();
//         setWardrobe(data);
//       } catch (error) {
//         Alert.alert(
//           "Error",
//           "Failed to load wardrobe. Please try again later."
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadWardrobe();
//   }, []);

//   const handleSaveOutfit = async () => {
//     if (isSaving) return;
//     setIsSaving(true);

//     const selectedTop = wardrobe.tops[selectedTopIndex];
//     const selectedBottom = wardrobe.bottoms[selectedBottomIndex];

//     if (!selectedTop || !selectedBottom) {
//       Alert.alert("Selection Required", "Please select both a top and bottom.");
//       setIsSaving(false);
//       return;
//     }

//     const newOutfit = {
//       name: "Custom Outfit",
//       category: "Mixed",
//       top: selectedTop.url,
//       bottom: selectedBottom.url,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       await saveOutfit(newOutfit);
//       Alert.alert("Success", "Your outfit has been saved!", [
//         {
//           text: "View Outfits",
//           onPress: () => router.push("/Screens/OutfitScreen"),
//         },
//         { text: "Create Another", style: "cancel" },
//       ]);
//     } catch (error) {
//       Alert.alert("Error", "Could not save outfit. Try again.");
//     }
//     setIsSaving(false);
//   };

//   const navigateItem = (array, currentIndex, direction) => {
//     return (currentIndex + direction + array.length) % array.length;
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#FF1493" />
//         <Text style={styles.loadingText}>Loading wardrobe...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>
//         <Text style={styles.headerTitle}>Mix & Match</Text>

//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Top</Text>
//           <View style={styles.imageRow}>
//             <TouchableOpacity
//               style={styles.navButton}
//               onPress={() =>
//                 setSelectedTopIndex(
//                   navigateItem(wardrobe.tops, selectedTopIndex, -1)
//                 )
//               }
//             >
//               <Text style={styles.navButtonText}>←</Text>
//             </TouchableOpacity>
//             <Image
//               source={{ uri: wardrobe.tops[selectedTopIndex]?.url }}
//               style={styles.previewImage}
//               resizeMode="cover"
//             />
//             <TouchableOpacity
//               style={styles.navButton}
//               onPress={() =>
//                 setSelectedTopIndex(
//                   navigateItem(wardrobe.tops, selectedTopIndex, 1)
//                 )
//               }
//             >
//               <Text style={styles.navButtonText}>→</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Bottom</Text>
//           <View style={styles.imageRow}>
//             <TouchableOpacity
//               style={styles.navButton}
//               onPress={() =>
//                 setSelectedBottomIndex(
//                   navigateItem(wardrobe.bottoms, selectedBottomIndex, -1)
//                 )
//               }
//             >
//               <Text style={styles.navButtonText}>←</Text>
//             </TouchableOpacity>
//             <Image
//               source={{ uri: wardrobe.bottoms[selectedBottomIndex]?.url }}
//               style={styles.previewImage}
//               resizeMode="cover"
//             />
//             <TouchableOpacity
//               style={styles.navButton}
//               onPress={() =>
//                 setSelectedBottomIndex(
//                   navigateItem(wardrobe.bottoms, selectedBottomIndex, 1)
//                 )
//               }
//             >
//               <Text style={styles.navButtonText}>→</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TouchableOpacity
//           style={styles.saveButton}
//           onPress={handleSaveOutfit}
//           disabled={isSaving}
//         >
//           <Text style={styles.saveButtonText}>Save Outfit</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <View style={styles.bottomNav}>
//         {["Home", "Gallery", "Outfits", "Mix & Match"].map((label, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.navItem}
//             onPress={() =>
//               router.push(`/Screens/${label.replace(/ /g, "")}Screen`)
//             }
//           >
//             <MaterialIcons
//               name={label === "Mix & Match" ? "shuffle" : label.toLowerCase()}
//               size={24}
//               color="#4A5568"
//             />
//             <Text style={styles.navLabel}>{label}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFE6F0" },
//   scrollViewContent: { padding: 20, flexGrow: 1 },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#FF1493",
//     textAlign: "center",
//   },
//   sectionContainer: { marginVertical: 20, alignItems: "center" },
//   sectionTitle: { fontSize: 18, fontWeight: "600", color: "#333" },
//   imageRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   navButton: {
//     backgroundColor: "#FF1493",
//     width: buttonSize,
//     height: buttonSize,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 30,
//   },
//   navButtonText: { color: "white", fontSize: 20 },
//   previewImage: { width: imageWidth, height: imageHeight, borderRadius: 15 },
//   saveButton: {
//     backgroundColor: "#FF1493",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   saveButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     backgroundColor: "white",
//     paddingVertical: 10,
//   },
//   navItem: { alignItems: "center" },
//   navLabel: { fontSize: 12, marginTop: 4, color: "#4A5568" },
// });

// export default MixAndMatchScreen;
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
//   ActivityIndicator,
//   Dimensions,
// } from "react-native";
// import { fetchWardrobe, saveOutfit } from "../outfitfirestore";
// import { useRouter } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// const { width } = Dimensions.get("window");
// const imageWidth = width * 0.7;
// const imageHeight = imageWidth * 1.2;
// const buttonSize = width * 0.12;

// const MixAndMatchScreen = () => {
//   const [wardrobe, setWardrobe] = useState({ tops: [], bottoms: [] });
//   const [selectedTopIndex, setSelectedTopIndex] = useState(0);
//   const [selectedBottomIndex, setSelectedBottomIndex] = useState(0);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const loadWardrobe = async () => {
//       try {
//         const data = await fetchWardrobe();
//         setWardrobe(data);
//       } catch (error) {
//         Alert.alert(
//           "Error",
//           "Failed to load wardrobe. Please try again later."
//         );
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     loadWardrobe();
//   }, []);

//   const handleSaveOutfit = async () => {
//     if (isSaving) return;
//     setIsSaving(true);

//     const selectedTop = wardrobe.tops[selectedTopIndex];
//     const selectedBottom = wardrobe.bottoms[selectedBottomIndex];

//     if (!selectedTop || !selectedBottom) {
//       Alert.alert("Selection Required", "Please select both a top and bottom.");
//       setIsSaving(false);
//       return;
//     }

//     const newOutfit = {
//       name: "Custom Outfit",
//       category: "Mixed",
//       top: selectedTop.url,
//       bottom: selectedBottom.url,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       await saveOutfit(newOutfit);
//       Alert.alert("Success", "Your outfit has been saved!", [
//         {
//           text: "View Outfits",
//           onPress: () => router.push("/Screens/OutfitScreen"),
//         },
//         { text: "Create Another", style: "cancel" },
//       ]);
//     } catch (error) {
//       Alert.alert("Error", "Could not save outfit. Try again.");
//     }
//     setIsSaving(false);
//   };

//   const navigateItem = (array, currentIndex, direction) => {
//     return (currentIndex + direction + array.length) % array.length;
//   };

//   if (isLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#FF1493" />
//         <Text style={styles.loadingText}>Loading wardrobe...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <LinearGradient colors={["#FF69B4", "#D81B60"]} style={styles.header}>
//         <Text style={styles.headerTitle}>MIX & MATCH</Text>
//         <Text style={styles.headerSubtitle}>
//           Create new outfit combinations
//         </Text>
//       </LinearGradient>

//       <View style={styles.mainContent}>
//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Top</Text>
//           <View style={styles.imageRow}>
//             <TouchableOpacity
//               style={styles.navButton}
//               onPress={() =>
//                 setSelectedTopIndex(
//                   navigateItem(wardrobe.tops, selectedTopIndex, -1)
//                 )
//               }
//             >
//               <MaterialIcons name="chevron-left" size={30} color="#fff" />
//             </TouchableOpacity>
//             <View style={styles.imageCard}>
//               <Image
//                 source={{ uri: wardrobe.tops[selectedTopIndex]?.url }}
//                 style={styles.previewImage}
//                 resizeMode="cover"
//               />
//             </View>
//             <TouchableOpacity
//               style={styles.navButton}
//               onPress={() =>
//                 setSelectedTopIndex(
//                   navigateItem(wardrobe.tops, selectedTopIndex, 1)
//                 )
//               }
//             >
//               <MaterialIcons name="chevron-right" size={30} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.sectionContainer}>
//           <Text style={styles.sectionTitle}>Bottom</Text>
//           <View style={styles.imageRow}>
//             <TouchableOpacity
//               style={styles.navButton}
//               onPress={() =>
//                 setSelectedBottomIndex(
//                   navigateItem(wardrobe.bottoms, selectedBottomIndex, -1)
//                 )
//               }
//             >
//               <MaterialIcons name="chevron-left" size={30} color="#fff" />
//             </TouchableOpacity>
//             <View style={styles.imageCard}>
//               <Image
//                 source={{ uri: wardrobe.bottoms[selectedBottomIndex]?.url }}
//                 style={styles.previewImage}
//                 resizeMode="cover"
//               />
//             </View>
//             <TouchableOpacity
//               style={styles.navButton}
//               onPress={() =>
//                 setSelectedBottomIndex(
//                   navigateItem(wardrobe.bottoms, selectedBottomIndex, 1)
//                 )
//               }
//             >
//               <MaterialIcons name="chevron-right" size={30} color="#fff" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TouchableOpacity
//           style={styles.saveButton}
//           onPress={handleSaveOutfit}
//           disabled={isSaving}
//         >
//           {isSaving ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.saveButtonText}>Save Outfit</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#FFF0F5" },
//   header: { paddingTop: 50, paddingBottom: 20, alignItems: "center" },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "white",
//     letterSpacing: 2,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: "rgba(255,255,255,0.8)",
//     marginTop: 5,
//   },
//   mainContent: { flex: 1, padding: 20 },
//   sectionContainer: { marginBottom: 20, alignItems: "center" },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#D81B60",
//     marginBottom: 10,
//   },
//   imageRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   navButton: {
//     backgroundColor: "#D81B60",
//     width: buttonSize,
//     height: buttonSize,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 30,
//     elevation: 3,
//   },
//   imageCard: {
//     width: imageWidth,
//     height: imageHeight,
//     borderRadius: 15,
//     backgroundColor: "#fff",
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     alignItems: "center",
//     justifyContent: "center",
//     overflow: "hidden",
//   },
//   previewImage: { width: "80%", height: "100%" },
//   saveButton: {
//     backgroundColor: "#D81B60",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//     marginTop: 20,
//   },
//   saveButtonText: { color: "white", fontSize: 18, fontWeight: "bold" },
//   loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
//   loadingText: { marginTop: 10, color: "#D81B60", fontSize: 16 },
// });

// export default MixAndMatchScreen;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { fetchWardrobe, saveOutfit } from "../outfitfirestore";
import { useRouter } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width } = Dimensions.get("window");
const imageWidth = width * 0.65;
const imageHeight = imageWidth * 1.1;
const buttonSize = width * 0.1;

const navItems = [
  { icon: "home", label: "Home", route: "Screens/HomeScreen" },
  { icon: "photo-library", label: "Gallery", route: "Screens/GalleryScreen" },
  { icon: "checkroom", label: "Outfits", route: "Screens/OutfitScreen" },
  { icon: "shuffle", label: "Mix & Match", route: "Screens/MixandMatchScreen" },
];

const MixAndMatchScreen = () => {
  const [wardrobe, setWardrobe] = useState({ tops: [], bottoms: [] });
  const [selectedTopIndex, setSelectedTopIndex] = useState(0);
  const [selectedBottomIndex, setSelectedBottomIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadWardrobe = async () => {
      try {
        const data = await fetchWardrobe();
        setWardrobe(data);
      } catch (error) {
        console.error("Error loading wardrobe:", error);
        Alert.alert("Error", "Could not load wardrobe items");
      }
    };
    loadWardrobe();
  }, []);

  const handleSaveOutfit = async () => {
    if (isSaving) return;
    setIsSaving(true);

    const selectedTop = wardrobe.tops[selectedTopIndex];
    const selectedBottom = wardrobe.bottoms[selectedBottomIndex];

    if (!selectedTop || !selectedBottom) {
      Alert.alert("Error", "Please select a top and a bottom.");
      setIsSaving(false);
      return;
    }

    const newOutfit = {
      name: "Custom Outfit",
      category: "Mixed",
      top: selectedTop.url,
      bottom: selectedBottom.url,
    };

    try {
      await saveOutfit(newOutfit);
      Alert.alert("Success", "Your outfit has been saved!", [
        { text: "OK", onPress: () => router.push("Screens/OutfitScreen") },
      ]);
    } catch (error) {
      console.error("Error saving outfit:", error);
      Alert.alert("Error", "Could not save outfit");
    }
    setIsSaving(false);
  };

  const navigateItem = (array, currentIndex, direction) => {
    return (currentIndex + direction + array.length) % array.length;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.previewContainer}>
          <Text style={styles.previewTitle}>Your Outfit Combination</Text>

          <View style={styles.imageRow}>
            <TouchableOpacity
              style={[
                styles.navButton,
                { width: buttonSize, height: buttonSize },
              ]}
              onPress={() =>
                setSelectedTopIndex(
                  navigateItem(wardrobe.tops, selectedTopIndex, -1)
                )
              }
            >
              <Text style={styles.navButtonText}>{"<"}</Text>
            </TouchableOpacity>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: wardrobe.tops[selectedTopIndex]?.url }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity
              style={[
                styles.navButton,
                { width: buttonSize, height: buttonSize },
              ]}
              onPress={() =>
                setSelectedTopIndex(
                  navigateItem(wardrobe.tops, selectedTopIndex, 1)
                )
              }
            >
              <Text style={styles.navButtonText}>{">"}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageRow}>
            <TouchableOpacity
              style={[
                styles.navButton,
                { width: buttonSize, height: buttonSize },
              ]}
              onPress={() =>
                setSelectedBottomIndex(
                  navigateItem(wardrobe.bottoms, selectedBottomIndex, -1)
                )
              }
            >
              <Text style={styles.navButtonText}>{"<"}</Text>
            </TouchableOpacity>
            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: wardrobe.bottoms[selectedBottomIndex]?.url }}
                style={styles.previewImage}
                resizeMode="cover"
              />
            </View>
            <TouchableOpacity
              style={[
                styles.navButton,
                { width: buttonSize, height: buttonSize },
              ]}
              onPress={() =>
                setSelectedBottomIndex(
                  navigateItem(wardrobe.bottoms, selectedBottomIndex, 1)
                )
              }
            >
              <Text style={styles.navButtonText}>{">"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSaveOutfit}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? "Saving..." : "Save Outfit"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => router.push(item.route)}
          >
            <MaterialIcons name={item.icon} size={24} color="#1565C0" />
            <Text style={styles.navLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF0F5",
  },
  scrollViewContent: {
    padding: 16,
    alignItems: "center",
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  previewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1565C0",
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    width: "100%",
  },
  navButton: {
    backgroundColor: "#FF1493",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  navButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageWrapper: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: 12,
    backgroundColor: "#FFF",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  saveButton: {
    backgroundColor: "#FF1493",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#4A5568",
  },
});

export default MixAndMatchScreen;
