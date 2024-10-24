import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase"; // Adjust the import according to your project structure

// Function to add an image to Firestore
export const addImage = async (imageData) => {
  try {
    const docRef = await addDoc(collection(db, "wardrobeItems"), imageData);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Function to retrieve all images from Firestore
export const getImages = async () => {
  const images = [];
  try {
    const querySnapshot = await getDocs(collection(db, "wardrobeItems"));
    querySnapshot.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error("Error retrieving images: ", e);
  }
  return images;
};

// Function to retrieve images by category
export const getImagesByCategory = async (category) => {
  const images = [];
  try {
    const q = query(
      collection(db, "wardrobeItems"),
      where("category", "==", category)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });
  } catch (e) {
    console.error("Error retrieving images by category: ", e);
  }
  return images;
};
