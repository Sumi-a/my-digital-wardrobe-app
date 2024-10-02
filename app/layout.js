// import { Stack } from "expo-router";
// //import { useEffect } from "react";
// import React, { useEffect } from "react";
// import { View, Text } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// const Layout = () => {
//   // Logic to check if the user is logged in
//   const isLoggedIn = false; // Replace this with actual logic to check login status

//   useEffect(() => {
//     // You can perform any side effects here if necessary
//   }, []);

//   return (
//     <Stack
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "#f4511e",
//         },
//         headerTintColor: "#fff",
//         headerTitleStyle: {
//           fontWeight: "bold",
//         },
//       }}
//     >
//       {isLoggedIn ? (
//         <>
//           <Stack.Screen name="HomeScreen" component={HomeScreen} />
//           <Stack.Screen name="Upload" component={Upload} />
//           <Stack.Screen name="ImagesScreen" component={ImagesScreen} />
//           <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
//         </>
//       ) : (
//         <>
//           <Stack.Screen name="LoginScreen" component={LoginScreen} />
//           <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
//         </>
//       )}
//     </Stack>
//   );
// };

// export default Layout;

import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./HomeScreen";
import Upload from "./upload";
import ImagesScreen from "./ImagesScreen";
import GalleryScreen from "./GalleryScreen";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";

const Layout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Set login status based on user existence
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {isLoggedIn ? (
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="upload" component={Upload} />
          <Stack.Screen name="ImagesScreen" component={ImagesScreen} />
          <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </>
      )}
    </Stack>
  );
};

export default Layout;
