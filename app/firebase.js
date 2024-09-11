// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import { Storage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
