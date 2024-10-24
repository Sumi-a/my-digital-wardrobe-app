// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { collection, addDoc } from "firebase/firestore";
// import { storage, db } from "../firebase"; // Ensure the path to firebase.js is correct

// export const uploadImageToFirebase = async (imageUri) => {
//   try {
//     const imageName = imageUri.split("/").pop();
//     const storageRef = ref(storage, `wardrobe/${imageName}`);

//     const response = await fetch(imageUri);
//     const blob = await response.blob();

//     await uploadBytes(storageRef, blob);
//     const downloadUrl = await getDownloadURL(storageRef);

//     // Store the download URL in Firestore
//     await addDoc(collection(db, "wardrobeItems"), {
//       imageUrl: downloadUrl,
//       uploadedAt: new Date(),
//       itemType: "top", // Customize as needed
//     });

//     console.log("Image uploaded and saved to Firestore:", downloadUrl);
//     return downloadUrl;
//   } catch (error) {
//     console.error("Error uploading image to Firebase:", error);
//     throw error; // Rethrow error to handle it in the Upload component if needed
//   }
// };

// firebaseUpload.js
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../firebase";

export const uploadImageToFirebase = async (imageUri, category) => {
  try {
    if (!imageUri || !category) {
      throw new Error("Both imageUri and category are required");
    }

    const imageName = `${Date.now()}-${imageUri.split("/").pop()}`;
    const storageRef = ref(storage, `wardrobe/${category}/${imageName}`);

    const response = await fetch(imageUri);
    const blob = await response.blob();

    await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(storageRef);

    // Store in Firestore with category and timestamp
    const docRef = await addDoc(collection(db, "wardrobeItems"), {
      imageUrl: downloadUrl,
      category: category,
      uploadedAt: new Date().toISOString(),
      fileName: imageName,
    });

    console.log(`Image uploaded successfully as ${category}:`, downloadUrl);

    return {
      id: docRef.id,
      imageUrl: downloadUrl,
      category: category,
    };
  } catch (error) {
    console.error("Error uploading image to Firebase:", error);
    throw error;
  }
};
