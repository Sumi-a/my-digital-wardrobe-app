import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import HomeScreen from "./Screens/HomeScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import Upload from "./Screens/upload";
import GalleryScreen from "./Screens//GalleryScreen";
import LoginScreen from "./Screens/LoginScreen";
import SignUpScreen from "./Screens/SignUpScreen";
import MixAndMatchScreen from "./Screens/MixandMatchScreen";
import OutfitScreen from "./Screens/OutfitScreen";
import Toast from "react-native-toast-message";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user); // Update login status
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
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
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="upload" component={Upload} />
            <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
            <Stack.Screen name="OutfitScreen" component={OutfitScreen} />
            <Stack.Screen
              name="MixAndMatchScreen"
              component={MixAndMatchScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          </>
        )}
      </Stack>

      <Toast ref={(ref) => Toast.setRef(ref)} />
    </>
  );
};
Toast.show({
  type: "success", // or 'error'
  text1: "Title",
  text2: "Description",
  position: "bottom", // Change position to 'top', 'bottom', or 'center'
  visibilityTime: 4000, // Duration for how long it will be visible
});

export default App;
