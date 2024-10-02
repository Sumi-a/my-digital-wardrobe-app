import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const HomeScreen = () => {
  const router = useRouter(); // Initialize router

  const handleLogout = () => {
    signOut(auth) // Call Firebase signOut
      .then(() => {
        // Sign-out successful, navigate to Login Screen
        router.replace("/LoginScreen");
      })
      .catch((error) => {
        console.error("Error signing out: ", error); // Handle error
      });
  };

  return (
    <View style={styles.container}>
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
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
