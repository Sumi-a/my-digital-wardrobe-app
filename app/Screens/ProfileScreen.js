import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "../firebase";
import { updateProfile, updatePassword } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setUserName(userData.userName || "");
          setEmail(auth.currentUser.email || "");
        } else {
          console.warn("User profile not found in Firestore.");
        }
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    if (!userName.trim()) {
      Alert.alert("Error", "Username cannot be empty.");
      return;
    }

    try {
      setLoading(true);
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { userName });

      await updateProfile(auth.currentUser, { displayName: userName });

      Alert.alert("Success", "Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);
      Alert.alert("Error", "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      await updatePassword(auth.currentUser, newPassword);
      setNewPassword("");
      Alert.alert("Success", "Password updated successfully!");
    } catch (error) {
      console.error("Password update error:", error);
      Alert.alert("Error", "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />

        <Text style={styles.label}>Email (cannot be changed)</Text>
        <TextInput style={styles.input} value={email} editable={false} />

        <TouchableOpacity
          style={styles.updateButton}
          onPress={handleUpdateProfile}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Updating..." : "Update Profile"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Change Password</Text>
        <TextInput
          style={styles.input}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          placeholder="New Password"
        />

        <TouchableOpacity
          style={styles.passwordButton}
          onPress={handleChangePassword}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Updating..." : "Update Password"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
  },
  header: {
    backgroundColor: "#1565C0",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    color: "#1565C0",
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#1565C0",
    marginBottom: 15,
    fontSize: 16,
  },
  updateButton: {
    backgroundColor: "#1565C0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  passwordButton: {
    backgroundColor: "#4A90E2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
