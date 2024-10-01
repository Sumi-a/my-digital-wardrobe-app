// import React, { useState } from "react";
// import { View, Text, TextInput, Button, StyleSheet } from "react-native";
// import { useRouter } from "expo-router";

// const LoginScreen = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleLogin = () => {
//     // Add logic to handle login
//     router.push("/HomeScreen"); // Redirect to home after login
//   };

//   const handleSignup = () => {
//     // Add logic to handle signup
//     router.push("/HomeScreen"); // Redirect to home after signup
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Login or Signup</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <Button title="Login" onPress={handleLogin} />
//       <Button title="Signup" onPress={handleSignup} />
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
//   input: {
//     width: "80%",
//     padding: 10,
//     borderColor: "#ccc",
//     borderWidth: 1,
//     marginBottom: 10,
//   },
// });

// export default LoginScreen;
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase"; // Ensure correct path

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = () => {
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in:", user);
        router.push("/HomeScreen"); // Redirect to home after login
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleSignup = () => {
    router.push("/SignUpScreen"); // Redirect to sign-up screen
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
