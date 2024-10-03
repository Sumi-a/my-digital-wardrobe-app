import { useEffect, useState } from "react";
import { View, Text } from "react-native"; // Import View and Text here
import { useRouter } from "expo-router";
import { auth } from "./firebase"; // Adjust the import to your Firebase configuration
import { onAuthStateChanged } from "firebase/auth";

const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to manage loading
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Stop loading once auth state is checked
      setUser(user);

      if (user) {
        // User is logged in, navigate to HomeScreen
        router.replace("/Screens/HomeScreen", { user }); // Use replace to prevent going back to login
      } else {
        // User is not logged in, navigate to LoginScreen
        router.replace("/Screens/LoginScreen");
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
// //import { useEffect } from "react";
// //import { useRouter } from "expo-router";

// import { useEffect, useState } from "react";
// import { View, Text } from "react-native"; // Import View and Text here
// import { useRouter } from "expo-router";
// import { auth } from "./firebase"; // Adjust the import to your Firebase configuration
// import { onAuthStateChanged } from "firebase/auth";
// import HomeScreen from "./HomeScreen";
// import { useUser } from "./userContext";
// import { UserProvider } from "./userContext";

// const Index = () => {
//   const router = useRouter();
//   const { user, loading } = useUser();

//   useEffect(() => {
//     if (!loading) {
//       if (user) {
//         router.replace("/HomeScreen");
//       } else {
//         router.replace("/LoginScreen");
//       }
//     }
//   }, [loading, user, router]);

//   if (loading) {
//     return <LoadingIndicator />;
//   }

//   return null;
// };

// const LoadingIndicator = () => (
//   <View style={styles.loadingContainer}>
//     <Text>Loading...</Text>
//   </View>
// );

// const styles = {
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// };

// export default Index;

// import React, { useEffect } from "react";
// import { View, Text } from "react-native"; // Import View and Text here
// import { useRouter } from "expo-router";
// import { useUser } from "./userContext";

// const Index = () => {
//   const router = useRouter();
//   const { user, loading } = useUser();

//   useEffect(() => {
//     if (!loading) {
//       if (user) {
//         router.replace("/HomeScreen");
//       } else {
//         router.replace("/LoginScreen");
//       }
//     }
//   }, [loading, user, router]);

//   if (loading) {
//     return <LoadingIndicator />;
//   }

//   return null; // This component doesn't render anything else
// };

// const LoadingIndicator = () => (
//   <View style={styles.loadingContainer}>
//     <Text>Loading...</Text>
//   </View>
// );

// const styles = {
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// };

// export default Index; // Export the component as Index
