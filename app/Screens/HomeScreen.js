import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";

const HomeScreen = ({ user }) => {
  const router = useRouter();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.replace("Screens/LoginScreen");
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
        Alert.alert("Logout Error", error.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="account-circle" size={40} color="#4A90E2" />
        <Text style={styles.welcomeText}>
          Welcome back,{"\n"}
          <Text style={styles.userName}>
            {user ? user.displayName || user.email : "Guest"}
          </Text>
        </Text>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.card}>
          <MaterialIcons name="style" size={32} color="#4A90E2" />
          <Text style={styles.cardTitle}>Your Digital Wardrobe</Text>
          <Text style={styles.cardSubtitle}>
            Organize and manage your outfits with ease
          </Text>
        </View>
      </View>

      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => router.push("Screens/GalleryScreen")}>
          <MaterialIcons name="photo-library" size={30} color="#4A90E2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("Screens/upload")}>
          <MaterialIcons name="add-circle" size={40} color="#4A90E2" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("Screens/OutfitScreen")}>
          <MaterialIcons name="checkroom" size={30} color="#4A90E2" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("Screens/MixandMatchScreen")}
        >
          <MaterialIcons name="shuffle" size={30} color="#4A90E2" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E1E8ED",
  },
  welcomeText: {
    marginLeft: 15,
    fontSize: 16,
    color: "#4A5568",
    lineHeight: 24,
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2D3748",
  },
  mainContent: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginVertical: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
    backgroundColor: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
});

export default HomeScreen;
