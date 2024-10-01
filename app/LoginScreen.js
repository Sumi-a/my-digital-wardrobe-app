import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react"; // Make sure to import useState
import { signInWithEmailAndPassword } from "firebase/auth"; // Add Firebase imports as needed
import { auth } from "./firebase"; // Adjust the import to your firebase config

const LoginScreen = ({ isLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/HomeScreen"); // Ensure this is the correct path for your Home screen
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in:", user);
        router.push("/home"); // Ensure this is the correct path for your Home screen
      })
      .catch((error) => {
        // Provide a user-friendly error message
        if (error.code === "auth/user-not-found") {
          setError("No user found with this email.");
        } else if (error.code === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  const handleSignup = () => {
    router.push("/SignUpScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login or Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <Button title="Login" onPress={handleLogin} />
      <Button title="Signup" onPress={handleSignup} />
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
  input: {
    width: "80%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
  },
  error: {
    color: "red",
  },
});

export default LoginScreen;
