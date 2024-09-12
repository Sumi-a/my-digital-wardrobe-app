import { Stack } from "expo-router";
import Home from "./index";
import Upload from "./upload";
import ImagesScreen from "./ImagesScreen";
import GalleryScreen from "./GalleryScreen"; // New screen

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
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen name="ImagesScreen" component={ImagesScreen} />
      <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
    </Stack>
  );
};

export default Layout;
