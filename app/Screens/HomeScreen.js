import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";

const HomeScreen = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState(null);
  const [itemsCount, setItemsCount] = useState(0);
  const [outfitsCount, setOutfitsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (auth.currentUser) {
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserProfile(userSnap.data());
          }

          const wardrobeSnapshot = await getDocs(
            collection(db, "wardrobeItems")
          );
          const outfitsSnapshot = await getDocs(collection(db, "outfits"));

          setItemsCount(wardrobeSnapshot.size);
          setOutfitsCount(outfitsSnapshot.size);
        }
      } catch (error) {
        Alert.alert(
          "Error",
          "Failed to load your wardrobe data. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout from your wardrobe?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => {
            signOut(auth)
              .then(() => router.replace("Screens/LoginScreen"))
              .catch((error) =>
                Alert.alert("Error", "Failed to logout. Please try again.")
              );
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient 
          colors={["#2196F3", "#1565C0"]} 
          style={styles.loadingGradient}
        >
          <ActivityIndicator size="large" color="#FFFFFF" />
          <Text style={styles.loadingText}>Loading your wardrobe...</Text>
        </LinearGradient>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient 
        colors={["#3a7bd5", "#00d2ff"]} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 1 }} 
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push("Screens/ProfileScreen")}
          >
            <View style={styles.avatarContainer}>
              <MaterialIcons name="account-circle" size={48} color="white" />
              {/* You could replace this with a real avatar image */}
              {/* <Image source={{uri: userProfile?.avatar}} style={styles.avatar} /> */}
            </View>
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>
                {userProfile?.userName || "Guest"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.mainContent} showsVerticalScrollIndicator={false}>
        {/* Wardrobe Overview Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Wardrobe Overview</Text>
          <View style={styles.statsContainer}>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => router.push("Screens/GalleryScreen")}
            >
              <View style={styles.statIconContainer}>
                <MaterialIcons name="checkroom" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.statNumber}>{itemsCount}</Text>
              <Text style={styles.statLabel}>Wardrobe Items</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => router.push("Screens/OutfitScreen")}
            >
              <View style={[styles.statIconContainer, { backgroundColor: "#8E24AA" }]}>
                <MaterialIcons name="style" size={32} color="#FFFFFF" />
              </View>
              <Text style={[styles.statNumber, { color: "#8E24AA" }]}>{outfitsCount}</Text>
              <Text style={styles.statLabel}>Saved Outfits</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Actions
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Quick Actions</Text>
          <View style={styles.quickActionsContainer}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push("Screens/HomeScreen")}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#4CAF50" }]}>
                <MaterialIcons name="add-circle" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>Add Item</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push("Screens/MixandMatchScreen")}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#FF9800" }]}>
                <MaterialIcons name="shuffle" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>Mix & Match</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push("Screens/OutfitScreen")}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#9C27B0" }]}>
                <MaterialIcons name="checkroom" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>Outfits</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => router.push("Screens/upload")}
            >
              <View style={[styles.actionIcon, { backgroundColor: "#F44336" }]}>
                <MaterialIcons name="photo-library" size={28} color="#FFFFFF" />
              </View>
              <Text style={styles.actionText}>Wardrobe</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Welcome Guide Section */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Getting Started</Text>
          <View style={styles.guideContainer}>
            <View style={styles.guideStep}>
              <View style={[styles.stepCircle, { backgroundColor: "#3a7bd5" }]}>
                <Text style={styles.stepNumber}>1</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Add Items</Text>
                <Text style={styles.stepDescription}>
                  Upload your clothing pieces to build your digital wardrobe
                </Text>
              </View>
            </View>
            
            <View style={styles.guideStep}>
              <View style={[styles.stepCircle, { backgroundColor: "#00d2ff" }]}>
                <Text style={styles.stepNumber}>2</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Mix & Match</Text>
                <Text style={styles.stepDescription}>
                  Create stylish outfit combinations from your wardrobe
                </Text>
              </View>
            </View>
            
            <View style={styles.guideStep}>
              <View style={[styles.stepCircle, { backgroundColor: "#8E24AA" }]}>
                <Text style={styles.stepNumber}>3</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Save Outfits</Text>
                <Text style={styles.stepDescription}>
                  Store your favorite combinations for quick access
                </Text>
              </View>
            </View>
            
            <View style={styles.guideStep}>
              <View style={[styles.stepCircle, { backgroundColor: "#FF9800" }]}>
                <Text style={styles.stepNumber}>4</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Browse & Style</Text>
                <Text style={styles.stepDescription}>
                  Explore your collection and get inspired
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.tipContainer}>
            <MaterialIcons name="lightbulb" size={24} color="#FFD700" />
            <Text style={styles.tipText}>
              <Text style={{ fontWeight: "bold" }}>Tip:</Text> Take photos with consistent lighting for better outfit matching
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, styles.activeNavItem]}
          onPress={() => router.push("Screens/HomeScreen")}
        >
          <MaterialIcons name="home" size={24} color="#3a7bd5" />
          <Text style={[styles.navLabel, styles.activeNavLabel]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/upload")}
        >
          <MaterialIcons name="add-circle" size={24} color="#757575" />
          <Text style={styles.navLabel}>Add Item</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/GalleryScreen")}
        >
          <MaterialIcons name="photo-library" size={24} color="#757575" />
          <Text style={styles.navLabel}>Wardrobe</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/MixandMatchScreen")}
        >
          <MaterialIcons name="shuffle" size={24} color="#757575" />
          <Text style={styles.navLabel}>Mix & Match</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/OutfitScreen")}
        >
          <MaterialIcons name="checkroom" size={24} color="#757575" />
          <Text style={styles.navLabel}>Outfits</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
  },
  loadingGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "500",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  welcomeText: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    marginBottom: 4,
  },
  userName: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  logoutButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
    padding: 10,
  },
  statIconContainer: {
    width: 64,
    height: 64,
    backgroundColor: "#3a7bd5",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3a7bd5",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#757575",
    marginTop: 4,
    textAlign: "center",
  },
  quickActionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  quickActionButton: {
    width: '48%',
    backgroundColor: '#F7F9FC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    flexDirection: 'row',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  guideContainer: {
    marginTop: 10,
  },
  guideStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumber: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#757575',
    lineHeight: 20,
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF9E6',
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    alignItems: 'center',
  },
  tipText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
  },
  activeNavItem: {
    backgroundColor: '#E3F2FD',
  },
  navLabel: {
    fontSize: 12,
    color: "#757575",
    marginTop: 4,
  },
  activeNavLabel: {
    color: "#3a7bd5",
    fontWeight: "bold",
  },
});

export default HomeScreen;