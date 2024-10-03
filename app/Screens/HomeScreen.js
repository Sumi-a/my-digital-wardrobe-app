// import { View, Text, Button, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";
// import { auth } from "./firebase";
// import { signOut } from "firebase/auth";

// const HomeScreen = () => {
//   const router = useRouter(); // Initialize router

//   const handleLogout = () => {
//     signOut(auth) // Call Firebase signOut
//       .then(() => {
//         // Sign-out successful, navigate to Login Screen
//         router.replace("/LoginScreen");
//       })
//       .catch((error) => {
//         console.error("Error signing out: ", error); // Handle error
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Your Digital Wardrobe</Text>
//       <Button
//         title="Upload here"
//         onPress={() => router.push("/upload")} // Use router to navigate
//       />
//       <Button
//         title="Logout" // Logout Button
//         onPress={handleLogout} // Call handleLogout on press
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
// });

// export default HomeScreen;
import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const HomeScreen = ({ user }) => {
  const router = useRouter(); // Initialize router

  const handleLogout = () => {
    signOut(auth) // Call Firebase signOut
      .then(() => {
        // Sign-out successful, navigate to Login Screen
        router.replace("/LoginScreen");
      })
      .catch((error) => {
        console.error("Error signing out: ", error); // Handle error
        Alert.alert("Logout Error", error.message); // Show alert for the error
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>
        Welcome to your digital wardrobe,{" "}
        {user ? user.displayName || user.email : "Guest"}!
      </Text>
      <Text style={styles.text}>Your Digital Wardrobe</Text>
      <Button
        title="Upload here"
        onPress={() => router.push("/upload")} // Use router to navigate
      />
      <Button
        title="Logout" // Logout Button
        onPress={handleLogout} // Call handleLogout on press
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;

// import React from "react";
// import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import { useRouter } from "expo-router";
// import { auth } from "./firebase"; // Adjust as necessary
// import { signOut } from "firebase/auth";
// import { useUser } from "./userContext"; // Adjust as necessary

// const HomeScreen = () => {
//   const router = useRouter();
//   const { user } = useUser(); // Get user from context

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         router.replace("/LoginScreen");
//       })
//       .catch((error) => {
//         console.error("Error signing out: ", error);
//         Alert.alert("Logout Error", error.message);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>
//         Welcome to your digital wardrobe,{" "}
//         {user ? user.displayName || user.email : "Guest"}!
//       </Text>
//       <Text style={styles.text}>Your Digital Wardrobe</Text>
//       <Button title="Upload here" onPress={() => router.push("/upload")} />
//       <Button title="Logout" onPress={handleLogout} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   welcomeText: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
// });

// export default HomeScreen;
// import React from "react";
// import { View, Text, Button, StyleSheet, Alert } from "react-native";
// import { useRouter } from "expo-router";
// import { auth } from "./firebase";
// import { signOut } from "firebase/auth";
// import { useUser } from "./userContext";

// const HomeScreen = () => {
//   const router = useRouter();
//   const { user } = useUser();

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         router.replace("/LoginScreen");
//       })
//       .catch((error) => {
//         console.error("Error signing out: ", error);
//         Alert.alert("Logout Error", error.message);
//       });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.welcomeText}>
//         Welcome to your digital wardrobe,{" "}
//         {user ? user.displayName || user.email : "Guest"}!
//       </Text>
//       <Text style={styles.text}>Your Digital Wardrobe</Text>
//       <Button title="Upload here" onPress={() => router.push("/upload")} />
//       <Button title="Logout" onPress={handleLogout} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   welcomeText: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   },
// });

// export default HomeScreen;
