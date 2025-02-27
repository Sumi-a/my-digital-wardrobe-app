import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { MaterialIcons } from "@expo/vector-icons";

const LoginScreen = ({ isLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("Screens/HomeScreen");
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError(null);
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in:", user);
        router.push("Screens/HomeScreen");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError("No user found with this email.");
        } else if (error.code === "auth/wrong-password") {
          setError("Incorrect password. Please try again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignup = () => {
    router.push("Screens/SignUpScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <View style={styles.headerContainer}>
          <MaterialIcons name="style" size={48} color="#4A90E2" />
          <Text style={styles.headerText}>THE VAULT</Text>
          <Text style={styles.subHeaderText}>Welcome back!</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="email"
              size={24}
              color="#4A90E2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#A0AEC0"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons
              name="lock"
              size={24}
              color="#4A90E2"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#A0AEC0"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color="#A0AEC0"
              />
            </TouchableOpacity>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={20} color="#FF5252" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <MaterialIcons name="login" size={24} color="white" />
                <Text style={styles.buttonText}>Login</Text>
              </>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <MaterialIcons name="person-add" size={24} color="#4A90E2" />
            <Text style={styles.signupButtonText}>Create an Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  keyboardView: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 16,
  },
  subHeaderText: {
    fontSize: 18,
    color: "#718096",
    marginTop: 8,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#2D3748",
  },
  eyeIcon: {
    padding: 8,
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  errorText: {
    color: "#FF5252",
    marginLeft: 8,
    fontSize: 14,
  },
  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A90E2",
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    shadowColor: "#4A90E2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E2E8F0",
  },
  dividerText: {
    color: "#718096",
    paddingHorizontal: 16,
    fontSize: 14,
  },
  signupButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: "#4A90E2",
  },
  signupButtonText: {
    color: "#4A90E2",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default LoginScreen;
