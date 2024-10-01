import { useEffect, useState } from "react";
import { View, Text } from "react-native"; // Import View and Text here
import { useRouter } from "expo-router";
import { auth } from "./firebase"; // Adjust the import to your Firebase configuration
import { onAuthStateChanged } from "firebase/auth";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Stop loading once auth state is checked

      if (user) {
        // User is logged in, navigate to HomeScreen
        router.replace("/HomeScreen"); // Use replace to prevent going back to login
      } else {
        // User is not logged in, navigate to LoginScreen
        router.replace("/LoginScreen");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  // Show loading indicator while checking auth state
  if (loading) {
    return <LoadingIndicator />; // Placeholder component, create as needed
  }

  return null; // No UI is needed here as navigation logic is handled
};

// Placeholder loading indicator component
const LoadingIndicator = () => (
  <View style={styles.loadingContainer}>
    <Text>Loading...</Text>
  </View>
);

const styles = {
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Index;
