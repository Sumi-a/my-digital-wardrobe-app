import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const validateInputs = () => {
    if (!firstName.trim()) return "First name is required";
    if (!lastName.trim()) return "Last name is required";
    if (!email.trim()) return "Email is required";
    if (!password) return "Password is required";
    if (password !== confirmPassword) return "Passwords don't match";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSignUp = () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User created:", user);
        router.push("Screens/HomeScreen");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError(
              "This email is already registered. Please use a different email or try logging in."
            );
            break;
          case "auth/invalid-email":
            setError("Please enter a valid email address.");
            break;
          case "auth/operation-not-allowed":
            setError("Unable to create account. Please try again later.");
            break;
          case "auth/weak-password":
            setError("Please choose a stronger password.");
            break;
          default:
            setError("An error occurred during sign up. Please try again.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#4A90E2" />
          </TouchableOpacity>

          <View style={styles.headerContainer}>
            <MaterialIcons name="person-add" size={48} color="#4A90E2" />
            <Text style={styles.headerText}>Create Account</Text>
            <Text style={styles.subHeaderText}>
              Join our digital wardrobe community
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.nameContainer}>
              <View
                style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}
              >
                <MaterialIcons
                  name="person"
                  size={24}
                  color="#4A90E2"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  placeholderTextColor="#A0AEC0"
                />
              </View>

              <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                <MaterialIcons
                  name="person"
                  size={24}
                  color="#4A90E2"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  placeholderTextColor="#A0AEC0"
                />
              </View>
            </View>

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
                keyboardType="email-address"
                autoCapitalize="none"
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

            <View style={styles.inputContainer}>
              <MaterialIcons
                name="lock"
                size={24}
                color="#4A90E2"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#A0AEC0"
              />
            </View>

            {error && (
              <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={20} color="#FF5252" />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <>
                  <MaterialIcons name="person-add" size={24} color="white" />
                  <Text style={styles.buttonText}>Create Account</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => router.back()}
            >
              <Text style={styles.loginLinkText}>
                Already have an account?{" "}
                <Text style={styles.loginLinkTextBold}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 1,
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
    fontSize: 16,
    color: "#718096",
    marginTop: 8,
  },
  formContainer: {
    paddingHorizontal: 24,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
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
  signupButton: {
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
  loginLink: {
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  loginLinkText: {
    fontSize: 16,
    color: "#718096",
  },
  loginLinkTextBold: {
    color: "#4A90E2",
    fontWeight: "600",
  },
});

export default SignUpScreen;
