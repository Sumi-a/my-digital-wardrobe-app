//Swipe Based code
// import React, { useState, useRef } from "react";
// import {
//   View,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Alert,
//   Animated,
//   Dimensions,
//   PanResponder,
// } from "react-native";
// import { useRouter, useLocalSearchParams, Stack } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Ionicons } from "@expo/vector-icons";

// const SCREEN_WIDTH = Dimensions.get("window").width;

// const OutfitCreationScreen = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const { topImage, bottomImage } = params;
//   const [outfits, setOutfits] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const position = useRef(new Animated.ValueXY()).current;

//   React.useEffect(() => {
//     loadSavedOutfits();
//     if (!topImage || !bottomImage) {
//       Alert.alert(
//         "Missing Images",
//         "Please select both top and bottom images",
//         [
//           {
//             text: "Go Back",
//             onPress: () => router.back(),
//           },
//         ]
//       );
//     } else {
//       saveNewOutfit();
//     }
//   }, [topImage, bottomImage]);

//   const loadSavedOutfits = async () => {
//     try {
//       const savedOutfits = await AsyncStorage.getItem("savedOutfits");
//       if (savedOutfits) {
//         setOutfits(JSON.parse(savedOutfits));
//       }
//     } catch (error) {
//       console.error("Error loading outfits:", error);
//     }
//   };

//   const saveNewOutfit = async () => {
//     try {
//       const newOutfit = { topImage, bottomImage, id: Date.now() };
//       const updatedOutfits = [...outfits, newOutfit];
//       await AsyncStorage.setItem(
//         "savedOutfits",
//         JSON.stringify(updatedOutfits)
//       );
//       setOutfits(updatedOutfits);
//     } catch (error) {
//       console.error("Error saving outfit:", error);
//     }
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, { dx }) => {
//         position.setValue({ x: dx, y: 0 });
//       },
//       onPanResponderRelease: (_, { dx }) => {
//         if (Math.abs(dx) > SCREEN_WIDTH * 0.4) {
//           const direction = dx > 0 ? -1 : 1;
//           const newIndex = Math.min(
//             Math.max(currentIndex + direction, 0),
//             outfits.length - 1
//           );

//           Animated.timing(position, {
//             toValue: { x: direction * SCREEN_WIDTH, y: 0 },
//             duration: 250,
//             useNativeDriver: true,
//           }).start(() => {
//             setCurrentIndex(newIndex);
//             position.setValue({ x: 0, y: 0 });
//           });
//         } else {
//           Animated.spring(position, {
//             toValue: { x: 0, y: 0 },
//             useNativeDriver: true,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   const renderOutfit = (outfit, index) => {
//     const isCurrentOutfit = index === currentIndex;
//     const rotate = position.x.interpolate({
//       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
//       outputRange: ["-10deg", "0deg", "10deg"],
//       extrapolate: "clamp",
//     });

//     const opacity = position.x.interpolate({
//       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
//       outputRange: [0.5, 1, 0.5],
//     });

//     const animatedCardStyle = {
//       transform: [{ rotate }],
//       opacity,
//     };

//     return isCurrentOutfit ? (
//       <Animated.View
//         key={outfit.id}
//         style={[styles.outfitContainer, animatedCardStyle]}
//         {...panResponder.panHandlers}
//       >
//         <View style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>Top</Text>
//           <Image
//             source={{ uri: outfit.topImage }}
//             style={styles.image}
//             onError={() => Alert.alert("Error loading top image")}
//           />
//         </View>
//         <View style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>Bottom</Text>
//           <Image
//             source={{ uri: outfit.bottomImage }}
//             style={styles.image}
//             onError={() => Alert.alert("Error loading bottom image")}
//           />
//         </View>
//       </Animated.View>
//     ) : null;
//   };

//   return (
//     <>
//       <Stack.Screen
//         options={{
//           title: "Your Created Outfits",
//           headerShown: true,
//         }}
//       />
//       <View style={styles.container}>
//         {outfits.map((outfit, index) => renderOutfit(outfit, index))}

//         <View style={styles.pagination}>
//           <Text style={styles.paginationText}>
//             {outfits.length > 0
//               ? `${currentIndex + 1}/${outfits.length}`
//               : "0/0"}
//           </Text>
//         </View>

//         <View style={styles.controls}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => router.push("/")}
//           >
//             <Text style={styles.buttonText}>Create Another Outfit</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   outfitContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   imageContainer: {
//     marginBottom: 30,
//   },
//   imageLabel: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//     color: "#333",
//   },
//   image: {
//     width: "100%",
//     height: 250,
//     resizeMode: "cover",
//     borderRadius: 12,
//   },
//   controls: {
//     padding: 20,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//   },
//   button: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   pagination: {
//     position: "absolute",
//     bottom: 100,
//     width: "100%",
//     alignItems: "center",
//   },
//   paginationText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
// });

// export default OutfitCreationScreen;

// import React, { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Image,
//   StyleSheet,
//   Text,
//   Alert,
//   Animated,
//   Dimensions,
//   PanResponder,
//   TouchableOpacity,
// } from "react-native";
// import { useRouter } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const SCREEN_WIDTH = Dimensions.get("window").width;

// const OutfitScreen = () => {
//   const router = useRouter();
//   const [outfits, setOutfits] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const position = useRef(new Animated.ValueXY()).current;

//   useEffect(() => {
//     const loadSavedOutfits = async () => {
//       try {
//         const savedOutfits = await AsyncStorage.getItem("savedOutfits");
//         if (savedOutfits) {
//           setOutfits(JSON.parse(savedOutfits));
//         }
//       } catch (error) {
//         console.error("Error loading outfits:", error);
//       }
//     };

//     loadSavedOutfits();
//   }, []);

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, { dx }) => {
//         position.setValue({ x: dx, y: 0 });
//       },
//       onPanResponderRelease: (_, { dx }) => {
//         const threshold = SCREEN_WIDTH * 0.4;
//         const direction = dx > threshold ? -1 : dx < -threshold ? 1 : 0;

//         if (direction !== 0) {
//           const newIndex = Math.min(
//             Math.max(currentIndex + direction, 0),
//             outfits.length - 1
//           );
//           Animated.timing(position, {
//             toValue: { x: direction * SCREEN_WIDTH, y: 0 },
//             duration: 250,
//             useNativeDriver: true,
//           }).start(() => {
//             setCurrentIndex(newIndex);
//             position.setValue({ x: 0, y: 0 });
//           });
//         } else {
//           Animated.spring(position, {
//             toValue: { x: 0, y: 0 },
//             useNativeDriver: true,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   const deleteOutfit = async (index) => {
//     const updatedOutfits = outfits.filter((_, i) => i !== index);
//     await AsyncStorage.setItem("savedOutfits", JSON.stringify(updatedOutfits));
//     setOutfits(updatedOutfits);
//     Alert.alert("Outfit Deleted", "Your outfit has been deleted.");
//   };

//   const renderOutfit = (outfit, index) => {
//     const isCurrentOutfit = index === currentIndex;
//     const rotate = position.x.interpolate({
//       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
//       outputRange: ["-10deg", "0deg", "10deg"],
//       extrapolate: "clamp",
//     });

//     const animatedCardStyle = {
//       transform: [{ rotate }],
//       opacity: isCurrentOutfit ? 1 : 0.5,
//     };

//     return (
//       <Animated.View
//         key={outfit.id}
//         style={[styles.outfitContainer, animatedCardStyle]}
//         {...panResponder.panHandlers}
//       >
//         <View style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>Top</Text>
//           <Image source={{ uri: outfit.topImage }} style={styles.image} />
//         </View>
//         <View style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>Bottom</Text>
//           <Image source={{ uri: outfit.bottomImage }} style={styles.image} />
//         </View>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => deleteOutfit(index)}
//         >
//           <Text style={styles.deleteButtonText}>Delete Outfit</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       {outfits.length > 0 ? (
//         renderOutfit(outfits[currentIndex], currentIndex)
//       ) : (
//         <Text style={styles.noOutfitsText}>No outfits saved.</Text>
//       )}
//       <View style={styles.navigationButtons}>
//         <TouchableOpacity
//           disabled={currentIndex === 0}
//           onPress={() => setCurrentIndex(currentIndex - 1)}
//           style={[
//             styles.navButton,
//             currentIndex === 0 && styles.disabledButton,
//           ]}
//         >
//           <Text style={styles.navButtonText}>Previous</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           disabled={currentIndex === outfits.length - 1}
//           onPress={() => setCurrentIndex(currentIndex + 1)}
//           style={[
//             styles.navButton,
//             currentIndex === outfits.length - 1 && styles.disabledButton,
//           ]}
//         >
//           <Text style={styles.navButtonText}>Next</Text>
//         </TouchableOpacity>
//       </View>
//       <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
//         <Text style={styles.backButtonText}>Go Back</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   outfitContainer: {
//     width: SCREEN_WIDTH,
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   imageContainer: {
//     marginBottom: 10,
//   },
//   imageLabel: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//   },
//   noOutfitsText: {
//     fontSize: 18,
//     color: "#666",
//     textAlign: "center",
//   },
//   deleteButton: {
//     backgroundColor: "#ff3b30",
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 10,
//   },
//   deleteButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   navigationButtons: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "80%",
//     marginTop: 20,
//   },
//   navButton: {
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: "#007AFF",
//     flex: 1,
//     marginHorizontal: 5,
//     alignItems: "center",
//   },
//   navButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   disabledButton: {
//     backgroundColor: "#ccc",
//   },
//   backButton: {
//     marginTop: 20,
//     padding: 10,
//     borderRadius: 8,
//     backgroundColor: "#007AFF",
//     alignItems: "center",
//   },
//   backButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default OutfitScreen;

// import React, { useState, useRef, useEffect } from "react";
// import {
//   View,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Alert,
//   Animated,
//   Dimensions,
//   PanResponder,
// } from "react-native";
// import { useRouter, useLocalSearchParams, Stack } from "expo-router";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const SCREEN_WIDTH = Dimensions.get("window").width;

// const OutfitCreationScreen = () => {
//   const router = useRouter();
//   const params = useLocalSearchParams();
//   const { topImage, bottomImage } = params;

//   const [outfits, setOutfits] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const position = useRef(new Animated.ValueXY()).current;

//   useEffect(() => {
//     const checkImages = () => {
//       if (!topImage || !bottomImage) {
//         Alert.alert(
//           "Missing Images",
//           "Please select both top and bottom images",
//           [{ text: "Go Back", onPress: () => router.back() }]
//         );
//       } else {
//         saveNewOutfit();
//       }
//     };

//     const loadSavedOutfits = async () => {
//       try {
//         const savedOutfits = await AsyncStorage.getItem("savedOutfits");
//         if (savedOutfits) {
//           setOutfits(JSON.parse(savedOutfits));
//         }
//       } catch (error) {
//         console.error("Error loading outfits:", error);
//       }
//     };

//     checkImages();
//     loadSavedOutfits();
//   }, [topImage, bottomImage]);

//   const saveNewOutfit = async () => {
//     try {
//       const newOutfit = { topImage, bottomImage, id: Date.now() };
//       const updatedOutfits = [...outfits, newOutfit];
//       await AsyncStorage.setItem(
//         "savedOutfits",
//         JSON.stringify(updatedOutfits)
//       );
//       setOutfits(updatedOutfits);
//     } catch (error) {
//       console.error("Error saving outfit:", error);
//     }
//   };

//   const panResponder = useRef(
//     PanResponder.create({
//       onStartShouldSetPanResponder: () => true,
//       onPanResponderMove: (_, { dx }) => {
//         position.setValue({ x: dx, y: 0 });
//       },
//       onPanResponderRelease: (_, { dx }) => {
//         const threshold = SCREEN_WIDTH * 0.4;
//         const direction = dx > threshold ? -1 : dx < -threshold ? 1 : 0;

//         if (direction !== 0) {
//           const newIndex = Math.min(
//             Math.max(currentIndex + direction, 0),
//             outfits.length - 1
//           );
//           Animated.timing(position, {
//             toValue: { x: direction * SCREEN_WIDTH, y: 0 },
//             duration: 250,
//             useNativeDriver: true,
//           }).start(() => {
//             setCurrentIndex(newIndex);
//             position.setValue({ x: 0, y: 0 });
//           });
//         } else {
//           Animated.spring(position, {
//             toValue: { x: 0, y: 0 },
//             useNativeDriver: true,
//           }).start();
//         }
//       },
//     })
//   ).current;

//   const renderOutfit = (outfit, index) => {
//     const isCurrentOutfit = index === currentIndex;
//     const rotate = position.x.interpolate({
//       inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
//       outputRange: ["-10deg", "0deg", "10deg"],
//       extrapolate: "clamp",
//     });

//     const animatedCardStyle = {
//       transform: [{ rotate }],
//       opacity: isCurrentOutfit ? 1 : 0.5,
//     };

//     return isCurrentOutfit ? (
//       <Animated.View
//         key={outfit.id}
//         style={[styles.outfitContainer, animatedCardStyle]}
//         {...panResponder.panHandlers}
//       >
//         <View style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>Top</Text>
//           <Image
//             source={{ uri: outfit.top }}
//             style={styles.image}
//             onError={() => Alert.alert("Error loading top image")}
//           />
//         </View>
//         <View style={styles.imageContainer}>
//           <Text style={styles.imageLabel}>Bottom</Text>
//           <Image
//             source={{ uri: outfit.bottom }}
//             style={styles.image}
//             onError={() => Alert.alert("Error loading bottom image")}
//           />
//         </View>
//       </Animated.View>
//     ) : null;
//   };

//   return (
//     <>
//       <Stack.Screen
//         options={{
//           title: "Your Created Outfits",
//           headerShown: true,
//         }}
//       />
//       <View style={styles.container}>
//         {outfits.length > 0 ? (
//           outfits.map((outfit, index) => renderOutfit(outfit, index))
//         ) : (
//           <Text style={styles.noOutfitsText}>No outfits created yet.</Text>
//         )}
//         <View style={styles.pagination}>
//           <Text style={styles.paginationText}>
//             {outfits.length > 0
//               ? `${currentIndex + 1}/${outfits.length}`
//               : "0/0"}
//           </Text>
//         </View>
//         <View style={styles.controls}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => router.push("/")}
//           >
//             <Text style={styles.buttonText}>Create Another Outfit</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   outfitContainer: {
//     flex: 1,
//     padding: 20,
//   },
//   imageContainer: {
//     marginBottom: 30,
//   },
//   imageLabel: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//     color: "#333",
//   },
//   image: {
//     width: "100%",
//     height: 250,
//     resizeMode: "cover",
//     borderRadius: 12,
//   },
//   noOutfitsText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   controls: {
//     padding: 20,
//     borderTopWidth: 1,
//     borderTopColor: "#eee",
//   },
//   button: {
//     backgroundColor: "#007AFF",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   pagination: {
//     position: "absolute",
//     bottom: 100,
//     width: "100%",
//     alignItems: "center",
//   },
//   paginationText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#333",
//   },
// });

// export default OutfitCreationScreen;
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Animated,
  Dimensions,
  PanResponder,
} from "react-native";
import { useRouter, useLocalSearchParams, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_WIDTH = Dimensions.get("window").width;

const OutfitCreationScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { topImage, bottomImage } = params;

  const [outfits, setOutfits] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    const checkImages = () => {
      if (!topImage || !bottomImage) {
        Alert.alert(
          "Missing Images",
          "Please select both top and bottom images",
          [{ text: "Go Back", onPress: () => router.back() }]
        );
      } else {
        saveNewOutfit();
      }
    };

    const loadSavedOutfits = async () => {
      try {
        const savedOutfits = await AsyncStorage.getItem("savedOutfits");
        if (savedOutfits) {
          setOutfits(JSON.parse(savedOutfits));
        }
      } catch (error) {
        console.error("Error loading outfits:", error);
      }
    };

    checkImages();
    loadSavedOutfits();
  }, [topImage, bottomImage]);

  const saveNewOutfit = async () => {
    try {
      const newOutfit = { topImage, bottomImage, id: Date.now() };
      const updatedOutfits = [...outfits, newOutfit];
      await AsyncStorage.setItem(
        "savedOutfits",
        JSON.stringify(updatedOutfits)
      );
      setOutfits(updatedOutfits);
    } catch (error) {
      console.error("Error saving outfit:", error);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, { dx }) => {
        position.setValue({ x: dx, y: 0 });
      },
      onPanResponderRelease: (_, { dx }) => {
        const threshold = SCREEN_WIDTH * 0.4;
        const direction = dx > threshold ? -1 : dx < -threshold ? 1 : 0;

        if (direction !== 0) {
          const newIndex = Math.min(
            Math.max(currentIndex + direction, 0),
            outfits.length - 1
          );
          Animated.timing(position, {
            toValue: { x: direction * SCREEN_WIDTH, y: 0 },
            duration: 250,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex(newIndex);
            position.setValue({ x: 0, y: 0 });
          });
        } else {
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  const renderOutfit = (outfit, index) => {
    const isCurrentOutfit = index === currentIndex;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ["-10deg", "0deg", "10deg"],
      extrapolate: "clamp",
    });

    const animatedCardStyle = {
      transform: [{ rotate }],
      opacity: isCurrentOutfit ? 1 : 0.5,
    };

    return isCurrentOutfit ? (
      <Animated.View
        key={outfit.id}
        style={[styles.outfitContainer, animatedCardStyle]}
        {...panResponder.panHandlers}
      >
        <View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>Top</Text>
          <Image
            source={{ uri: outfit.top }}
            style={styles.image}
            onError={() => Alert.alert("Error loading top image")}
          />
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.imageLabel}>Bottom</Text>
          <Image
            source={{ uri: outfit.bottom }}
            style={styles.image}
            onError={() => Alert.alert("Error loading bottom image")}
          />
        </View>
      </Animated.View>
    ) : null;
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Your Created Outfits",
          headerShown: true,
        }}
      />
      <View style={styles.container}>
        {outfits.length > 0 ? (
          outfits.map((outfit, index) => renderOutfit(outfit, index))
        ) : (
          <Text style={styles.noOutfitsText}>No outfits created yet.</Text>
        )}
        <View style={styles.pagination}>
          <Text style={styles.paginationText}>
            {outfits.length > 0
              ? `${currentIndex + 1}/${outfits.length}`
              : "0/0"}
          </Text>
        </View>
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/")}
          >
            <Text style={styles.buttonText}>Create Another Outfit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  outfitContainer: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    marginBottom: 30,
  },
  imageLabel: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
    borderRadius: 12,
  },
  noOutfitsText: {
    fontSize: 16,
    color: "#333",
  },
  controls: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  pagination: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    alignItems: "center",
  },
  paginationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});

export default OutfitCreationScreen;
