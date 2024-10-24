// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   Image,
//   StyleSheet,
//   Alert,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";
// import { useRouter } from "expo-router";
// import { uploadImageToFirebase } from "./firebaseUpload";

// const Upload = () => {
//   const router = useRouter();
//   const [images, setImages] = useState([]);
//   const [category, setCategory] = useState("tops");
//   const [uploading, setUploading] = useState(false);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     (async () => {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert(
//           "Permission Denied",
//           "We need access to your camera roll to make this work!"
//         );
//       }
//     })();
//   }, []);

//   const pickImages = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 1,
//     });

//     if (result.assets && result.assets.length > 0) {
//       setLoading(true);
//       try {
//         const selectedImages = await Promise.all(
//           result.assets.map(async (asset) => {
//             // Ensure the URI is a string before passing to the upload function
//             const imageUri = asset.uri;
//             if (typeof imageUri === "string") {
//               return await uploadImageToFirebase(imageUri);
//             } else {
//               console.error("Image URI is not a string:", imageUri);
//               throw new Error("Invalid image URI");
//             }
//           })
//         );
//         setImages((prevImages) => [...prevImages, ...selectedImages]);
//         Alert.alert("Success", "Images uploaded successfully!");
//       } catch (error) {
//         Alert.alert("Upload Failed", error.message);
//       } finally {
//         setLoading(false);
//       }
//     } else {
//       Alert.alert(
//         "No images selected",
//         "Please select images from your gallery."
//       );
//     }
//   };

//   const clearImages = () => {
//     setImages([]);
//     Alert.alert("Cleared", "All selected images have been cleared.");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Upload Pictures</Text>

//       <Picker
//         selectedValue={category}
//         onValueChange={setCategory}
//         style={styles.picker}
//       >
//         <Picker.Item label="Tops" value="tops" />
//         <Picker.Item label="Bottoms" value="bottoms" />
//       </Picker>

//       <Button title="Pick Images" onPress={pickImages} disabled={uploading} />
//       <Button title="Clear Images" onPress={clearImages} />
//       <Button title="Go Back" onPress={() => router.back()} />
//       <Button
//         title="Go to Gallery"
//         onPress={() => router.push("Screens/GalleryScreen")}
//       />

//       {uploading && <Text>Uploading...</Text>}
//       {loading && <ActivityIndicator size="large" color="#0000ff" />}

//       <ScrollView>
//         {images.length > 0 ? (
//           images.map((imageUri, index) => (
//             <View key={index}>
//               <Image source={{ uri: imageUri }} style={styles.image} />
//               <Text style={styles.categoryText}>{category}</Text>
//             </View>
//           ))
//         ) : (
//           <Text>No images uploaded yet.</Text>
//         )}
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
//   picker: {
//     width: 200,
//     marginVertical: 10,
//   },
//   image: {
//     width: 200,
//     height: 200,
//     marginTop: 20,
//     borderRadius: 20,
//     borderWidth: 2,
//     borderColor: "#ccc",
//   },
//   categoryText: {
//     textAlign: "center",
//     fontSize: 14,
//     marginTop: 5,
//   },
// });

// export default Upload;
// Upload.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { uploadImageToFirebase } from "./firebaseUpload";

const Upload = () => {
  const router = useRouter();
  const [uploadedItems, setUploadedItems] = useState([]);
  const [category, setCategory] = useState("tops");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please grant access to your photo library to upload images."
      );
    }
  };

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
      });

      if (!result.canceled && result.assets.length > 0) {
        setLoading(true);

        // Upload images sequentially to avoid overwhelming the server
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
          `Successfully uploaded ${uploadedResults.length} images`
        );
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick or upload images: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const clearImages = () => {
    setUploadedItems([]);
    Alert.alert("Cleared", "Upload history has been cleared");
  };

  const renderUploadedItems = () => {
    if (uploadedItems.length === 0) {
      return <Text style={styles.noImagesText}>No images uploaded yet</Text>;
    }

    return uploadedItems.map((item, index) => (
      <View key={`${item.id}-${index}`} style={styles.imageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <View style={styles.imageInfo}>
          <Text style={styles.categoryText}>Category: {item.category}</Text>
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wardrobe Upload</Text>

      <View style={styles.controls}>
        <Picker
          selectedValue={category}
          onValueChange={setCategory}
          style={styles.picker}
          enabled={!loading}
        >
          <Picker.Item label="Tops" value="tops" />
          <Picker.Item label="Bottoms" value="bottoms" />
        </Picker>

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={pickImages}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Uploading..." : "Pick Images"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={clearImages}
          disabled={loading}
        >
          <Text style={styles.buttonText}>Clear History</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Uploading images...</Text>
        </View>
      )}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
      >
        {renderUploadedItems()}
      </ScrollView>

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => router.push("Screens/GalleryScreen")}
        >
          <Text style={styles.buttonText}>View Gallery</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  controls: {
    marginBottom: 20,
  },
  picker: {
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 10,
  },
  imageContainer: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: "#f5f5f5",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  imageInfo: {
    padding: 10,
  },
  categoryText: {
    fontSize: 16,
    color: "#333",
  },
  noImagesText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  navButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    flex: 0.48,
    alignItems: "center",
  },
});

export default Upload;
