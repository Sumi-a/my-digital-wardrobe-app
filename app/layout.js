// import { Stack } from "expo-router";
// import HomeScreen from "./HomeScreen";
// import Upload from "./upload";
// import ImagesScreen from "./ImagesScreen";
// import GalleryScreen from "./GalleryScreen"; // New screen
// import SignUpScreen from "./SignUpScreen";
// import LoginScreen from "./LoginScreen";

// const Layout = () => {
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
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="LoginScreen" component={LoginScreen} />
//       <Stack.Screen name="HomeScreen" component={HomeScreen} />
//       <Stack.Screen name="Upload" component={Upload} />
//       <Stack.Screen name="ImagesScreen" component={ImagesScreen} />
//       <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
//       <Stack.Screen name="SignUp" component={SignUpScreen} />
//     </Stack>
//   );
// };

// export default Layout;
import { Stack } from "expo-router";
import HomeScreen from "./HomeScreen";
import Upload from "./upload";
import ImagesScreen from "./ImagesScreen";
import GalleryScreen from "./GalleryScreen";
import SignUpScreen from "./SignUpScreen";
import LoginScreen from "./LoginScreen";

const Layout = () => {
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
      <Stack.Screen name="HomeScreen" component={HomeScreen} />{" "}
      {/* Corrected */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name="ImagesScreen" component={ImagesScreen} />
      <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />{" "}
      {/* Consistent name */}
    </Stack>
  );
};

export default Layout;
