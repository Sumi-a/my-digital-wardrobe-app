import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDZvCwVTst42HcIdoxfcY0rHqJG5SIzV68",
  authDomain: "digital-wardrobe-c2247.firebaseapp.com",
  projectId: "digital-wardrobe-c2247",
  storageBucket: "digital-wardrobe-c2247.appspot.com",
  messagingSenderId: "413344460341",
  appId: "1:413344460341:web:0b3ed0c44a1ec6f5d20b7c",
  measurementId: "G-C5S3NCZZKW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const db = getFirestore(app);
const storage = getStorage(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage), // Set persistence
});

// Only initialize Analytics if the environment supports it
isSupported().then((supported) => {
  if (supported) {
    const analytics = getAnalytics(app);
  } else {
    console.log("Firebase Analytics is not supported in this environment");
  }
});

export { db, storage, auth };
export default app;
