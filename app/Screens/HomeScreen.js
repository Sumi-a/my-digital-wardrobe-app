// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
//   Modal,
//   ScrollView,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { auth } from "../firebase";
// import { signOut } from "firebase/auth";
// import { MaterialIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";

// const HomeScreen = ({ user }) => {
//   const router = useRouter();
//   const [showHelp, setShowHelp] = useState(false);

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

//   const navItems = [
//     { icon: "photo-library", label: "Gallery", route: "Screens/GalleryScreen" },
//     { icon: "add-circle", label: "Add Item", route: "Screens/upload" },
//     { icon: "checkroom", label: "Outfits", route: "Screens/OutfitScreen" },
//     { icon: "shuffle", label: "Mix & Match", route: "Screens/MixandMatchScreen" },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <LinearGradient colors={["#2196F3", "#1565C0"]} style={styles.header}>
//         <View style={styles.headerContent}>
//           <MaterialIcons name="account-circle" size={40} color="white" />
//           <Text style={styles.welcomeText}>
//             Welcome back,{"\n"}
//             <Text style={styles.userName}>
//               {user ? user.displayName || user.email : "Guest"}
//             </Text>
//           </Text>
//         </View>
//         <View style={styles.headerButtons}>
//           <TouchableOpacity onPress={() => setShowHelp(true)}>
//             <MaterialIcons name="help-outline" size={24} color="white" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//             <MaterialIcons name="logout" size={24} color="white" />
//           </TouchableOpacity>
//         </View>
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
//               <Text style={styles.statNumber}>0</Text>
//               <Text style={styles.statLabel}>Items</Text>
//             </View>
//             <View style={styles.statItem}>
//               <Text style={styles.statNumber}>0</Text>
//               <Text style={styles.statLabel}>Outfits</Text>
//             </View>
//           </View>
//         </View>

//         <View style={styles.quickActions}>
//           <Text style={styles.sectionTitle}>Quick Actions</Text>
//           <View style={styles.actionButtons}>
//             {navItems.map((item, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.actionButton}
//                 onPress={() => router.push(item.route)}
//               >
//                 <MaterialIcons name={item.icon} size={24} color="#1565C0" />
//                 <Text style={styles.actionButtonText}>{item.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </ScrollView>

//       <View style={styles.bottomNav}>
//         {navItems.map((item, index) => (
//           <TouchableOpacity key={index} style={styles.navItem} onPress={() => router.push(item.route)}>
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
//     fontSize: 16,
//     color: "white",
//     lineHeight: 24,
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
//   quickActions: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#1565C0",
//     marginBottom: 15,
//   },
//   actionButtons: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },
//   actionButton: {
//     width: "48%",
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 15,
//     alignItems: "center",
//     marginBottom: 15,
//     elevation: 3,
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
//   closeButton: {
//     backgroundColor: "#4A90E2",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   closeButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
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

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserProfile(userSnap.data()); // Set user profile data
        } else {
          console.warn("No user profile found in Firestore.");
        }
      }
    };

    const fetchCounts = async () => {
      try {
        const wardrobeSnapshot = await getDocs(collection(db, "wardrobeItems"));
        setItemsCount(wardrobeSnapshot.size);

        const outfitsSnapshot = await getDocs(collection(db, "outfits"));
        setOutfitsCount(outfitsSnapshot.size);
      } catch (error) {
        console.error("Error fetching wardrobe and outfit counts:", error);
      }
    };

    fetchUserProfile();
    fetchCounts();
  }, []);

  const handleLogout = () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: () => {
          signOut(auth)
            .then(() => router.replace("Screens/LoginScreen"))
            .catch((error) => Alert.alert("Logout Error", error.message));
        },
      },
    ]);
  };

  // Get user's display name from Firestore profile
  // const getUserName = () => {
  //   if (userProfile) {
  //     return `${userProfile.firstName} ${userProfile.lastName}`;
  //   }
  //   return "Guest";
  // };
  const getUserName = () => {
    if (userProfile && userProfile.firstName) {
      return userProfile.firstName; // Display only first name
    }
    return "Guest";
  };

  const navItems = [
    { icon: "photo-library", label: "Gallery", route: "Screens/GalleryScreen" },
    { icon: "add-circle", label: "Add Item", route: "Screens/upload" },
    { icon: "checkroom", label: "Outfits", route: "Screens/OutfitScreen" },
    {
      icon: "shuffle",
      label: "Mix & Match",
      route: "Screens/MixandMatchScreen",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#2196F3", "#1565C0"]} style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialIcons name="account-circle" size={40} color="white" />
          <Text style={styles.welcomeText}>
            Welcome back, <Text style={styles.userName}>{getUserName()}</Text>
          </Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.mainContent}>
        <View style={styles.card}>
          <MaterialIcons name="style" size={32} color="#4A90E2" />
          <Text style={styles.cardTitle}>Your Digital Wardrobe</Text>
          <Text style={styles.cardSubtitle}>
            Organize and manage your outfits with ease.
          </Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{itemsCount}</Text>
              <Text style={styles.statLabel}>Items</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{outfitsCount}</Text>
              <Text style={styles.statLabel}>Outfits</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => router.push(item.route)}
          >
            <MaterialIcons name={item.icon} size={24} color="#1565C0" />
            <Text style={styles.navLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
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
    paddingTop: 50,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  mainContent: {
    padding: 20,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565C0",
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1565C0",
  },
  statLabel: {
    fontSize: 16,
    color: "#666",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E1E8ED",
  },
  navItem: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 12,
    color: "#1565C0",
  },
});

export default HomeScreen;
