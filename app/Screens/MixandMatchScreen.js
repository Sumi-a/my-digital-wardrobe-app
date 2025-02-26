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
// import { useRouter } from "expo-router";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";

// const { width } = Dimensions.get("window");
// const imageWidth = width * 0.65;
// const imageHeight = imageWidth * 1.1;
// const buttonSize = width * 0.1;

// const navItems = [
//   { icon: "home", label: "Home", route: "Screens/HomeScreen" },
//   { icon: "photo-library", label: "Gallery", route: "Screens/GalleryScreen" },
//   { icon: "checkroom", label: "Outfits", route: "Screens/OutfitScreen" },
//   //{ icon: "shuffle", label: "Mix & Match", route: "Screens/MixandMatchScreen" },
// ];

// const MixAndMatchScreen = () => {
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
//         { text: "OK", onPress: () => router.push("Screens/OutfitScreen") },
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

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         contentContainerStyle={styles.scrollViewContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <View style={styles.previewContainer}>
//           <Text style={styles.previewTitle}>Your Outfit Combination</Text>

//           <View style={styles.imageRow}>
//             <TouchableOpacity
//               style={[
//                 styles.navButton,
//                 { width: buttonSize, height: buttonSize },
//               ]}
//               onPress={() =>
//                 setSelectedTopIndex(
//                   navigateItem(wardrobe.tops, selectedTopIndex, -1)
//                 )
//               }
//             >
//               <Text style={styles.navButtonText}>{"<"}</Text>
//             </TouchableOpacity>
//             <View style={styles.imageWrapper}>
//               <Image
//                 source={{ uri: wardrobe.tops[selectedTopIndex]?.url }}
//                 style={styles.previewImage}
//                 resizeMode="cover"
//               />
//             </View>
//             <TouchableOpacity
//               style={[
//                 styles.navButton,
//                 { width: buttonSize, height: buttonSize },
//               ]}
//               onPress={() =>
//                 setSelectedTopIndex(
//                   navigateItem(wardrobe.tops, selectedTopIndex, 1)
//                 )
//               }
//             >
//               <Text style={styles.navButtonText}>{">"}</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.imageRow}>
//             <TouchableOpacity
//               style={[
//                 styles.navButton,
//                 { width: buttonSize, height: buttonSize },
//               ]}
//               onPress={() =>
//                 setSelectedBottomIndex(
//                   navigateItem(wardrobe.bottoms, selectedBottomIndex, -1)
//                 )
//               }
//             >
//               <Text style={styles.navButtonText}>{"<"}</Text>
//             </TouchableOpacity>
//             <View style={styles.imageWrapper}>
//               <Image
//                 source={{ uri: wardrobe.bottoms[selectedBottomIndex]?.url }}
//                 style={styles.previewImage}
//                 resizeMode="cover"
//               />
//             </View>
//             <TouchableOpacity
//               style={[
//                 styles.navButton,
//                 { width: buttonSize, height: buttonSize },
//               ]}
//               onPress={() =>
//                 setSelectedBottomIndex(
//                   navigateItem(wardrobe.bottoms, selectedBottomIndex, 1)
//                 )
//               }
//             >
//               <Text style={styles.navButtonText}>{">"}</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TouchableOpacity
//           style={styles.saveButton}
//           onPress={handleSaveOutfit}
//           disabled={isSaving}
//         >
//           <Text style={styles.saveButtonText}>
//             {isSaving ? "Saving..." : "Save Outfit"}
//           </Text>
//         </TouchableOpacity>
//       </ScrollView>

//       {/* Bottom Navigation Bar */}
//       <View style={styles.bottomNav}>
//         {navItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.navItem}
//             onPress={() => router.push(item.route)}
//           >
//             <MaterialIcons name={item.icon} size={24} color="#1565C0" />
//             <Text style={styles.navLabel}>{item.label}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF0F5",
//   },
//   scrollViewContent: {
//     padding: 16,
//     alignItems: "center",
//   },
//   previewContainer: {
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   previewTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#1565C0",
//   },
//   imageRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//     width: "100%",
//   },
//   navButton: {
//     backgroundColor: "#FF1493",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
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
//     backgroundColor: "#FFF",
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
//   },
//   saveButtonText: {
//     color: "white",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     backgroundColor: "white",
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#E1E8ED",
//   },
//   navItem: {
//     alignItems: "center",
//   },
//   navLabel: {
//     fontSize: 12,
//     marginTop: 4,
//     color: "#4A5568",
//   },
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
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { fetchWardrobe, saveOutfit } from "../outfitfirestore";
import { useRouter } from "expo-router";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const { width, height } = Dimensions.get("window");
const imageWidth = width * 0.4;
const imageHeight = imageWidth * 1.2;

const MixAndMatchScreen = () => {
  const [wardrobe, setWardrobe] = useState({ tops: [], bottoms: [] });
  const [selectedTopIndex, setSelectedTopIndex] = useState(0);
  const [selectedBottomIndex, setSelectedBottomIndex] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadWardrobe();
  }, []);

  const loadWardrobe = async () => {
    try {
      const data = await fetchWardrobe();
      setWardrobe(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading wardrobe:", error);
      Alert.alert(
        "Error",
        "Could not load your wardrobe. Please check your connection and try again.",
        [{ text: "Retry", onPress: loadWardrobe }]
      );
    }
  };

  const handleSaveOutfit = async () => {
    if (isSaving) return;
    setIsSaving(true);

    const selectedTop = wardrobe.tops[selectedTopIndex];
    const selectedBottom = wardrobe.bottoms[selectedBottomIndex];

    if (!selectedTop || !selectedBottom) {
      Alert.alert(
        "Oops!",
        "Please make sure both top and bottom are selected."
      );
      setIsSaving(false);
      return;
    }

    const newOutfit = {
      name: "Custom Outfit",
      category: "Mixed",
      top: selectedTop.url,
      bottom: selectedBottom.url,
      createdAt: new Date().toISOString(),
    };

    try {
      await saveOutfit(newOutfit);
      Alert.alert(
        "Success!",
        "Your outfit has been saved to your collection.",
        [
          {
            text: "View Outfits",
            onPress: () => router.push("Screens/OutfitScreen"),
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Unable to save outfit. Please try again.");
    }
    setIsSaving(false);
  };

  const handleRandomize = () => {
    setSelectedTopIndex(Math.floor(Math.random() * wardrobe.tops.length));
    setSelectedBottomIndex(Math.floor(Math.random() * wardrobe.bottoms.length));
  };

  const navigateItem = (array, currentIndex, direction) => {
    return (currentIndex + direction + array.length) % array.length;
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF1493" />
        <Text style={styles.loadingText}>Loading your wardrobe...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Create Your Outfit</Text>
        <Text style={styles.subtitle}>
          Mix and match to find your perfect combination
        </Text>

        {/* Tops Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Top</Text>
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() =>
                setSelectedTopIndex(
                  navigateItem(wardrobe.tops, selectedTopIndex, -1)
                )
              }
            >
              <MaterialIcons name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: wardrobe.tops[selectedTopIndex]?.url }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() =>
                setSelectedTopIndex(
                  navigateItem(wardrobe.tops, selectedTopIndex, 1)
                )
              }
            >
              <MaterialIcons name="chevron-right" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottoms Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bottom</Text>
          <View style={styles.itemContainer}>
            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() =>
                setSelectedBottomIndex(
                  navigateItem(wardrobe.bottoms, selectedBottomIndex, -1)
                )
              }
            >
              <MaterialIcons name="chevron-left" size={30} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
              <Image
                source={{ uri: wardrobe.bottoms[selectedBottomIndex]?.url }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>

            <TouchableOpacity
              style={styles.navigationButton}
              onPress={() =>
                setSelectedBottomIndex(
                  navigateItem(wardrobe.bottoms, selectedBottomIndex, 1)
                )
              }
            >
              <MaterialIcons name="chevron-right" size={30} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.randomizeButton]}
            onPress={handleRandomize}
          >
            <MaterialIcons name="shuffle" size={24} color="#FFF" />
            <Text style={styles.buttonText}>Random Match</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSaveOutfit}
            disabled={isSaving}
          >
            <MaterialIcons name="save" size={24} color="#FFF" />
            <Text style={styles.buttonText}>
              {isSaving ? "Saving..." : "Save Outfit"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/HomeScreen")}
        >
          <MaterialIcons name="home" size={24} color="#757575" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/upload")}
        >
          <MaterialIcons name="add-circle" size={24} color="#757575" />
          <Text style={styles.navLabel}>Add Item</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/GalleryScreen")}
        >
          <MaterialIcons name="photo-library" size={24} color="#757575" />
          <Text style={styles.navLabel}>Wardrobe</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, styles.activeNavItem]}
          onPress={() => router.push("Screens/MixandMatchScreen")}
        >
          <MaterialIcons name="shuffle" size={24} color="#3a7bd5" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Mix & Match</Text>
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
    backgroundColor: "#F5F7FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFF0F5",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  scrollContent: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565C0",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 24,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    paddingLeft: 4,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navigationButton: {
    backgroundColor: "#FF1493",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageContainer: {
    width: imageWidth,
    height: imageHeight,
    borderRadius: 12,
    backgroundColor: "#FFF",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 30,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    minWidth: width * 0.4,
    justifyContent: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  randomizeButton: {
    backgroundColor: "#1565C0",
  },
  saveButton: {
    backgroundColor: "#FF1493",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
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

export default MixAndMatchScreen;
