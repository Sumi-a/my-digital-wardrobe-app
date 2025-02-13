// //
// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   Dimensions,
//   Alert,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { getOutfits, deleteOutfit } from "../outfitfirestore";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// const { width } = Dimensions.get("window");
// const cardWidth = width * 0.45;

// const navItems = [
//   { icon: "home", label: "Home", route: "Screens/HomeScreen" },
//   { icon: "photo-library", label: "Wardrobe", route: "Screens/GalleryScreen" },
//   { icon: "checkroom", label: "Outfits", route: "Screens/OutfitScreen" },
//   { icon: "shuffle", label: "Mix & Match", route: "Screens/MixandMatchScreen" },
// ];

// const OutfitScreen = () => {
//   const [outfits, setOutfits] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const router = useRouter();

//   const fetchOutfits = async () => {
//     try {
//       const fetchedOutfits = await getOutfits();
//       setOutfits(fetchedOutfits);
//     } catch (error) {
//       Alert.alert("Error", "Unable to load outfits. Please try again.", [
//         { text: "OK" },
//       ]);
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   useEffect(() => {
//     fetchOutfits();
//   }, []);

//   const handleRefresh = () => {
//     setRefreshing(true);
//     fetchOutfits();
//   };

//   const handleDeleteOutfit = async (id, name) => {
//     Alert.alert("Delete Outfit", `Are you sure you want to delete "${name}"?`, [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Delete",
//         style: "destructive",
//         onPress: async () => {
//           try {
//             await deleteOutfit(id);
//             setOutfits((prevOutfits) =>
//               prevOutfits.filter((outfit) => outfit.id !== id)
//             );
//             // Show success message
//             Alert.alert("Success", "Outfit deleted successfully");
//           } catch (error) {
//             Alert.alert("Error", "Failed to delete outfit. Please try again.");
//           }
//         },
//       },
//     ]);
//   };

//   const EmptyState = () => (
//     <View style={styles.emptyContainer}>
//       <MaterialIcons name="checkroom" size={64} color="#FF1493" />
//       <Text style={styles.emptyTitle}>No Outfits Yet</Text>
//       <Text style={styles.emptyText}>
//         Start creating your perfect combinations!
//       </Text>
//       <TouchableOpacity
//         style={styles.createButton}
//         onPress={() => router.push("Screens/GalleryScreen")}
//       >
//         <Text style={styles.createButtonText}>Create New Outfit</Text>
//       </TouchableOpacity>
//     </View>
//   );

//   const renderOutfitCard = ({ item }) => (
//     <TouchableOpacity
//       style={styles.outfitCard}
//       onPress={() => router.push(`Screens/OutfitDetailScreen?id=${item.id}`)}
//     >
//       <View style={styles.imageContainer}>
//         <View style={styles.imageWrapper}>
//           {item.top ? (
//             <Image
//               source={{ uri: item.top }}
//               style={styles.outfitImage}
//               resizeMode="cover"
//             />
//           ) : (
//             <View style={styles.placeholderImage}>
//               <MaterialIcons name="checkroom" size={32} color="#666" />
//               <Text style={styles.placeholderText}>No Top</Text>
//             </View>
//           )}
//         </View>

//         <View style={styles.imageWrapper}>
//           {item.bottom ? (
//             <Image
//               source={{ uri: item.bottom }}
//               style={styles.outfitImage}
//               resizeMode="cover"
//             />
//           ) : (
//             <View style={styles.placeholderImage}>
//               <MaterialIcons name="checkroom" size={32} color="#666" />
//               <Text style={styles.placeholderText}>No Bottom</Text>
//             </View>
//           )}
//         </View>
//       </View>

//       <View style={styles.outfitDetails}>
//         <Text style={styles.outfitName} numberOfLines={1}>
//           {item.name || "Untitled Outfit"}
//         </Text>
//         <Text style={styles.outfitCategory} numberOfLines={1}>
//           {item.category || "No Category"}
//         </Text>
//       </View>

//       <TouchableOpacity
//         style={styles.deleteButton}
//         onPress={() => handleDeleteOutfit(item.id, item.name)}
//       >
//         <MaterialIcons name="delete" size={20} color="white" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>My Outfits</Text>
//         {/* <TouchableOpacity
//           style={styles.addButton}
//           onPress={() => router.push("Screens/MixandMatchScreen")}
//         >
//           <MaterialIcons name="add" size={24} color="white" />
//         </TouchableOpacity> */}
//       </View>

//       {loading ? (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#FF1493" />
//           <Text style={styles.loadingText}>Loading your outfits...</Text>
//         </View>
//       ) : (
//         <FlatList
//           data={outfits}
//           renderItem={renderOutfitCard}
//           keyExtractor={(item) => item.id}
//           numColumns={2}
//           contentContainerStyle={styles.listContainer}
//           showsVerticalScrollIndicator={false}
//           ListEmptyComponent={EmptyState}
//           refreshing={refreshing}
//           onRefresh={handleRefresh}
//         />
//       )}

//       <View style={styles.bottomNav}>
//         {navItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.navItem,
//               item.label === "Outfits" && styles.activeNavItem,
//             ]}
//             onPress={() => router.push(item.route)}
//           >
//             <MaterialIcons
//               name={item.icon}
//               size={24}
//               color={item.label === "Outfits" ? "#FF1493" : "#1565C0"}
//             />
//             <Text
//               style={[
//                 styles.navLabel,
//                 item.label === "Outfits" && styles.activeNavLabel,
//               ]}
//             >
//               {item.label}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFE6F0",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E1E8ED",
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   addButton: {
//     backgroundColor: "#FF1493",
//     padding: 8,
//     borderRadius: 20,
//     elevation: 2,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   loadingText: {
//     marginTop: 12,
//     fontSize: 16,
//     color: "#1565C0",
//     fontWeight: "500",
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     marginTop: 40,
//   },
//   emptyTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#333",
//     marginTop: 16,
//   },
//   emptyText: {
//     fontSize: 16,
//     color: "#666",
//     marginTop: 8,
//     textAlign: "center",
//   },
//   createButton: {
//     backgroundColor: "#FF1493",
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 25,
//     marginTop: 20,
//     elevation: 2,
//   },
//   createButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   listContainer: {
//     padding: 8,
//     paddingBottom: 20,
//   },
//   imageContainer: {
//     width: "100%",
//   },
//   outfitCard: {
//     width: cardWidth,
//     margin: 8,
//     backgroundColor: "white",
//     borderRadius: 16,
//     padding: 12,
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   imageWrapper: {
//     width: "100%",
//     height: 160,
//     borderRadius: 12,
//     overflow: "hidden",
//     backgroundColor: "#FFF",
//     marginBottom: 8,
//     elevation: 2,
//   },
//   outfitImage: {
//     width: "100%",
//     height: "100%",
//   },
//   placeholderImage: {
//     width: "100%",
//     height: "100%",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F5F5F5",
//   },
//   placeholderText: {
//     color: "#666",
//     fontSize: 14,
//     marginTop: 8,
//   },
//   outfitDetails: {
//     padding: 4,
//     alignItems: "center",
//   },
//   outfitName: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 4,
//   },
//   outfitCategory: {
//     fontSize: 14,
//     color: "#666",
//   },
//   deleteButton: {
//     position: "absolute",
//     top: 8,
//     right: 8,
//     backgroundColor: "#E53935",
//     padding: 8,
//     borderRadius: 16,
//     elevation: 2,
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "white",
//     paddingVertical: 12,
//     borderTopWidth: 1,
//     borderTopColor: "#E1E8ED",
//     elevation: 8,
//   },
//   navItem: {
//     alignItems: "center",
//     paddingHorizontal: 16,
//   },
//   activeNavItem: {
//     transform: [{ scale: 1.1 }],
//   },
//   navLabel: {
//     fontSize: 12,
//     marginTop: 4,
//     color: "#4A5568",
//   },
//   activeNavLabel: {
//     color: "#FF1493",
//     fontWeight: "bold",
//   },
// });

// export default OutfitScreen;
