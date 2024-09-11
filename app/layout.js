import { Stack } from "expo-router";
import Home from "./index";
import Upload from "./upload";
import ImagesScreen from "./ImagesScreen";

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
    </Stack>
  );
};

export default Layout;
