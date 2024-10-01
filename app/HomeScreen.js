import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router"; // Import useRouter
import { auth } from "./firebase"; // Adjust the path to your firebase config
import { signOut } from "firebase/auth"; // Import signOut function

const HomeScreen = () => {
  const router = useRouter(); // Initialize router

  const handleLogout = () => {
    signOut(auth) // Call Firebase signOut
      .then(() => {
        // Sign-out successful, navigate to Login or Welcome Screen
        router.replace("/LoginScreen"); // Or "/WelcomeScreen" if you want to redirect there
      })
      .catch((error) => {
        console.error("Error signing out: ", error); // Handle error
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Digital Wardrobe</Text>
      <Button
        title="Go to Upload Screen"
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
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
