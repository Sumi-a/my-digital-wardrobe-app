// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   Button,
//   Image,
//   StyleSheet,
//   Alert,
//   ScrollView,
// } from "react-native";
// import * as ImagePicker from "expo-image-picker";
// import { Picker } from "@react-native-picker/picker";
// import { useNavigation } from "@react-navigation/native";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { useRouter } from "expo-router";
// import { storage, db } from "../firebase";

// const Upload = () => {
//   const router = useRouter();
//   const [images, setImages] = useState([]);
//   const navigation = useNavigation();
//   const [category, setCategory] = useState("tops");
//   const [uploading, setUploading] = useState(false);

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

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled && result.assets && result.assets.length > 0) {
//       setUploading(true);
//       const uri = result.assets[0].uri;
//       const response = await fetch(uri);
//       const blob = await response.blob();

//       try {
//         const storageRef = ref(storage, `images/${Date.now()}`);
//         const snapshot = await uploadBytes(storageRef, blob);
//         const downloadURL = await getDownloadURL(snapshot.ref);

//         const newImages = [...images, downloadURL];
//         setImages(newImages);

//         const docRef = doc(db, "images", Date.now().toString());
//         await setDoc(docRef, {
//           url: downloadURL,
//           category: category,
//         });

//         Alert.alert("Success", "Image uploaded successfully!");
//         navigation.navigate("Gallery", { refresh: true });
//       } catch (error) {
//         console.error("Error uploading image to Firebase:", error);
//         Alert.alert(
//           "Upload Error",
//           "There was an error uploading your image. Please try again."
//         );
//       } finally {
//         setUploading(false);
//       }
//     } else {
//       console.log("No image selected or image picker was canceled.");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Upload a Picture</Text>

//       <Picker
//         selectedValue={category}
//         onValueChange={(itemValue) => setCategory(itemValue)}
//         style={styles.picker}
//       >
//         <Picker.Item label="Tops" value="tops" />
//         <Picker.Item label="Bottoms" value="bottoms" />
//       </Picker>

//       <Button title="Pick an image" onPress={pickImage} disabled={uploading} />
//       <Button
//         title="Go Back"
//         onPress={() => router.back()} // Back button
//       />
//       <Button
//         title="Go to next screen"
//         onPress={() => router.push("Screens/GalleryScreen")}
//       />

//       {uploading && <Text>Uploading...</Text>}

//       <ScrollView>
//         {images.length > 0 ? (
//           images.map((imageUri, index) => (
//             <Image
//               key={index}
//               source={{ uri: imageUri }}
//               style={styles.image}
//             />
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
// });

// export default Upload;

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
// import { useNavigation } from "@react-navigation/native";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { doc, setDoc } from "firebase/firestore";
// import { useRouter } from "expo-router";
// import { storage, db } from "../firebase";

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
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true, // Allow multiple selection
//       // Remove allowsEditing to avoid warning
//       quality: 1,
//     });

//     if (result.selected) {
//       const selectedImages = await Promise.all(
//         result.selected.map(async (asset) => {
//           const uri = asset.uri;
//           const response = await fetch(uri);
//           const blob = await response.blob();

//           // Upload each image and get its URL
//           const storageRef = ref(storage, `images/${Date.now()}_${asset.id}`);
//           const snapshot = await uploadBytes(storageRef, blob);
//           const downloadURL = await getDownloadURL(snapshot.ref);

//           return downloadURL;
//         })
//       );

//       setImages((prevImages) => [...prevImages, ...selectedImages]);
//       Alert.alert("Success", "Images uploaded successfully!");
//     } else {
//       console.log("No images selected or image picker was canceled.");
//     }
//   };

//   const uploadImages = async () => {
//     setUploading(true);
//     setLoading(true);
//     try {
//       for (const imageUrl of images) {
//         const docRef = doc(db, "images", Date.now().toString());
//         await setDoc(docRef, {
//           url: imageUrl,
//           category: category,
//         });
//       }
//       Alert.alert("Success", "All images uploaded successfully!");
//       router.push("Screens/GalleryScreen");
//     } catch (error) {
//       console.error("Error uploading images to Firebase:", error);
//       Alert.alert(
//         "Upload Error",
//         "There was an error uploading your images. Please try again."
//       );
//     } finally {
//       setUploading(false);
//       setLoading(false);
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
//         onValueChange={(itemValue) => setCategory(itemValue)}
//         style={styles.picker}
//       >
//         <Picker.Item label="Tops" value="tops" />
//         <Picker.Item label="Bottoms" value="bottoms" />
//       </Picker>

//       <Button title="Pick Images" onPress={pickImages} disabled={uploading} />
//       <Button
//         title="Upload Images"
//         onPress={uploadImages}
//         disabled={uploading || images.length === 0}
//       />
//       <Button
//         title="Clear Selected Images"
//         onPress={clearImages}
//         disabled={uploading || images.length === 0}
//       />
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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../firebase";

const Upload = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState("tops");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "We need access to your camera roll to make this work!"
        );
      }
    })();
  }, []);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true, // Allow multiple selection
      quality: 1,
    });

    // Check if assets were selected
    if (result.assets) {
      const selectedImages = await Promise.all(
        result.assets.map(async (asset) => {
          const uri = asset.uri;
          const response = await fetch(uri);
          const blob = await response.blob();

          // Upload each image and get its URL
          const storageRef = ref(storage, `images/${Date.now()}_${asset.id}`);
          const snapshot = await uploadBytes(storageRef, blob);
          const downloadURL = await getDownloadURL(snapshot.ref);

          return downloadURL;
        })
      );

      setImages((prevImages) => [...prevImages, ...selectedImages]);
      Alert.alert("Success", "Images uploaded successfully!");
    } else {
      console.log("No images selected or image picker was canceled.");
    }
  };

  const uploadImages = async () => {
    setUploading(true);
    setLoading(true);
    try {
      for (const imageUrl of images) {
        const docRef = doc(db, "images", Date.now().toString());
        await setDoc(docRef, {
          url: imageUrl,
          category: category,
        });
      }
      Alert.alert("Success", "All images uploaded successfully!");

      // Navigate to GalleryScreen after successful upload
      router.push("Screens/GalleryScreen");
    } catch (error) {
      console.error("Error uploading images to Firebase:", error);
      Alert.alert(
        "Upload Error",
        "There was an error uploading your images. Please try again."
      );
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };

  const clearImages = () => {
    setImages([]);
    Alert.alert("Cleared", "All selected images have been cleared.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Upload Pictures</Text>

      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Tops" value="tops" />
        <Picker.Item label="Bottoms" value="bottoms" />
      </Picker>

      <Button title="Pick Images" onPress={pickImages} disabled={uploading} />
      <Button title="Go Back" onPress={() => router.back()} />
      <Button
        title="Go to Gallery"
        onPress={() => router.push("Screens/GalleryScreen")}
      />

      {uploading && <Text>Uploading...</Text>}
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <ScrollView>
        {images.length > 0 ? (
          images.map((imageUri, index) => (
            <View key={index}>
              <Image source={{ uri: imageUri }} style={styles.image} />
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          ))
        ) : (
          <Text>No images uploaded yet.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  picker: {
    width: 200,
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  categoryText: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 5,
  },
});

export default Upload;
