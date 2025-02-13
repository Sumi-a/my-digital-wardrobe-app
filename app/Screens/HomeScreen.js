// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
//   ScrollView,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { auth, db } from "../firebase";
// import { signOut } from "firebase/auth";
// import { MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import { getDocs, collection, doc, getDoc } from "firebase/firestore";

// const HomeScreen = () => {
//   const router = useRouter();
//   const [userProfile, setUserProfile] = useState(null);
//   const [itemsCount, setItemsCount] = useState(0);
//   const [outfitsCount, setOutfitsCount] = useState(0);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       if (auth.currentUser) {
//         const userRef = doc(db, "users", auth.currentUser.uid);
//         const userSnap = await getDoc(userRef);

//         if (userSnap.exists()) {
//           setUserProfile(userSnap.data());
//         } else {
//           console.warn("No user profile found in Firestore.");
//         }
//       }
//     };

//     const fetchCounts = async () => {
//       try {
//         const wardrobeSnapshot = await getDocs(collection(db, "wardrobeItems"));
//         setItemsCount(wardrobeSnapshot.size);

//         const outfitsSnapshot = await getDocs(collection(db, "outfits"));
//         setOutfitsCount(outfitsSnapshot.size);
//       } catch (error) {
//         console.error("Error fetching wardrobe and outfit counts:", error);
//       }
//     };

//     fetchUserProfile();
//     fetchCounts();
//   }, []);

//   const handleLogout = () => {
//     Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
//       { text: "Cancel", style: "cancel" },
//       {
//         text: "Logout",
//         onPress: () => {
//           signOut(auth)
//             .then(() => router.replace("Screens/LoginScreen"))
//             .catch((error) => Alert.alert("Logout Error", error.message));
//         },
//       },
//     ]);
//   };

//   const getUserName = () => {
//     if (userProfile && userProfile.userName) {
//       return userProfile.userName;
//     }
//     return "Guest";
//   };

//   const navItems = [
//     { icon: "photo-library", label: "Gallery", route: "Screens/GalleryScreen" },
//     { icon: "add-circle", label: "Add Item", route: "Screens/upload" },
//     { icon: "checkroom", label: "Outfits", route: "Screens/OutfitScreen" },
//     {
//       icon: "shuffle",
//       label: "Mix & Match",
//       route: "Screens/MixandMatchScreen",
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient colors={["#2196F3", "#1565C0"]} style={styles.header}>
//         <View style={styles.headerContent}>
//           {/* Navigate to ProfileScreen when clicking on profile icon */}
//           <TouchableOpacity
//             onPress={() => router.push("Screens/ProfileScreen")}
//           >
//             <MaterialIcons name="account-circle" size={40} color="white" />
//           </TouchableOpacity>
//           <Text style={styles.welcomeText}>
//             Welcome back, <Text style={styles.userName}>{getUserName()}</Text>
//           </Text>
//         </View>
//         <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//           <MaterialIcons name="logout" size={24} color="white" />
//         </TouchableOpacity>
//       </LinearGradient>

//       <ScrollView contentContainerStyle={styles.mainContent}>
//         <View style={styles.card}>
//           <MaterialIcons name="style" size={32} color="#4A90E2" />
//           <Text style={styles.cardTitle}>Your Digital Wardrobe</Text>
//           <Text style={styles.cardSubtitle}>
//             Organize and manage your outfits with ease.
//           </Text>
//           <View style={styles.statsContainer}>
//             <View style={styles.statItem}>
//               <Text style={styles.statNumber}>{itemsCount}</Text>
//               <Text style={styles.statLabel}>Items</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statNumber}>{outfitsCount}</Text>
//               <Text style={styles.statLabel}>Outfits</Text>
//             </View>
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.bottomNav}>
//         {navItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.navItem}
//             onPress={() => router.push(item.route)}
//           >
//             <MaterialIcons name={item.icon} size={24} color="#1565C0" />
//             <Text style={styles.navLabel}>{item.label}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#E3F2FD",
//   },
//   header: {
//     paddingTop: 50,
//     paddingBottom: 20,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 20,
//     alignItems: "center",
//   },
//   welcomeText: {
//     fontSize: 18,
//     color: "white",
//     fontWeight: "500",
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   mainContent: {
//     padding: 20,
//   },
//   card: {
//     backgroundColor: "white",
//     borderRadius: 12,
//     padding: 20,
//     alignItems: "center",
//     marginBottom: 20,
//     elevation: 3,
//   },
//   cardTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1565C0",
//     marginTop: 10,
//   },
//   cardSubtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//   },
//   statsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     width: "100%",
//     marginTop: 20,
//   },
//   statItem: {
//     alignItems: "center",
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#1565C0",
//   },
//   statLabel: {
//     fontSize: 16,
//     color: "#666",
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 10,
//     backgroundColor: "white",
//     borderTopWidth: 1,
//     borderTopColor: "#E1E8ED",
//   },
//   navItem: {
//     alignItems: "center",
//   },
//   navLabel: {
//     fontSize: 12,
//     color: "#1565C0",
//   },
// });

// export default HomeScreen;
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  Dimensions,
  ActivityIndicator,
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
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (auth.currentUser) {
          // Fetch user profile
          const userRef = doc(db, "users", auth.currentUser.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUserProfile(userSnap.data());
          }

          // Fetch counts
          const wardrobeSnapshot = await getDocs(
            collection(db, "wardrobeItems")
          );
          const outfitsSnapshot = await getDocs(collection(db, "outfits"));

          setItemsCount(wardrobeSnapshot.size);
          setOutfitsCount(outfitsSnapshot.size);

          // Simulate fetching recently viewed items (implement actual logic as needed)
          setRecentlyViewed([
            { type: "item", name: "Blue Jacket" },
            { type: "outfit", name: "Casual Friday" },
            { type: "item", name: "Black Jeans" },
          ]);
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

  const QuickActionButton = ({ icon, label, onPress, color = "#1565C0" }) => (
    <TouchableOpacity
      style={[styles.quickActionButton, { backgroundColor: color }]}
      onPress={onPress}
    >
      <MaterialIcons name={icon} size={28} color="white" />
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1565C0" />
        <Text style={styles.loadingText}>Loading your wardrobe...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#2196F3", "#1565C0"]} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => router.push("Screens/ProfileScreen")}
          >
            <MaterialIcons name="account-circle" size={40} color="white" />
            <View>
              <Text style={styles.welcomeText}>Welcome back,</Text>
              <Text style={styles.userName}>
                {userProfile?.userName || "Guest"}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView style={styles.mainContent}>
        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <QuickActionButton
            icon="add-circle"
            label="Add Item"
            onPress={() => router.push("Screens/upload")}
            color="#4CAF50"
          />
          <QuickActionButton
            icon="photo-library"
            label="Wardrobe"
            onPress={() => router.push("Screens/GalleryScreen")}
            color="#FF9800"
          />
        </View>

        {/* Stats Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Wardrobe Overview</Text>
          <View style={styles.statsContainer}>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => router.push("Screens/GalleryScreen")}
            >
              <MaterialIcons name="checkroom" size={32} color="#1565C0" />
              <Text style={styles.statNumber}>{itemsCount}</Text>
              <Text style={styles.statLabel}>Items in your Wardrobe</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => router.push("Screens/OutfitScreen")}
            >
              <MaterialIcons name="style" size={32} color="#1565C0" />
              <Text style={styles.statNumber}>{outfitsCount}</Text>
              <Text style={styles.statLabel}>Outfits Saved</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recently Viewed */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recently Viewed</Text>
          {recentlyViewed.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.recentItem}
              onPress={() =>
                router.push(
                  `Screens/${
                    item.type === "item" ? "GalleryScreen" : "OutfitScreen"
                  }`
                )
              }
            >
              <MaterialIcons
                name={item.type === "item" ? "checkroom" : "style"}
                size={24}
                color="#666"
              />
              <Text style={styles.recentItemText}>{item.name}</Text>
              <MaterialIcons name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/HomeScreen")}
        >
          <MaterialIcons name="home" size={24} color="#1565C0" />
          <Text style={styles.navLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/OutfitScreen")}
        >
          <MaterialIcons name="checkroom" size={24} color="#1565C0" />
          <Text style={styles.navLabel}>Outfits</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("Screens/MixandMatchScreen")}
        >
          <MaterialIcons name="shuffle" size={24} color="#1565C0" />
          <Text style={styles.navLabel}>Mix & Match</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    fontSize: 16,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
  },
  userName: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  mainContent: {
    flex: 1,
    padding: 16,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  quickActionButton: {
    flex: 1,
    margin: 4,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  quickActionLabel: {
    color: "white",
    marginTop: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565C0",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  recentItemText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
    elevation: 8,
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    color: "#1565C0",
    marginTop: 4,
  },
});

export default HomeScreen;
