// import React from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   SafeAreaView,
// } from "react-native";
// import { useRouter } from "expo-router";
// import { auth } from "../firebase";
// import { signOut } from "firebase/auth";
// import { MaterialIcons } from "@expo/vector-icons";

// const HomeScreen = ({ user }) => {
//   const router = useRouter();

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         router.replace("Screens/LoginScreen");
//       })
//       .catch((error) => {
//         console.error("Error signing out: ", error);
//         Alert.alert("Logout Error", error.message);
//       });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <MaterialIcons name="account-circle" size={40} color="#4A90E2" />
//         <Text style={styles.welcomeText}>
//           Welcome back,{"\n"}
//           <Text style={styles.userName}>
//             {user ? user.displayName || user.email : "Guest"}
//           </Text>
//         </Text>
//       </View>

//       <View style={styles.mainContent}>
//         <View style={styles.card}>
//           <MaterialIcons name="style" size={32} color="#4A90E2" />
//           <Text style={styles.cardTitle}>Your Digital Wardrobe</Text>
//           <Text style={styles.cardSubtitle}>
//             Organize and manage your outfits with ease
//           </Text>
//         </View>
//       </View>

//       <View style={styles.bottomNav}>
//         <TouchableOpacity onPress={() => router.push("Screens/GalleryScreen")}>
//           <MaterialIcons name="photo-library" size={30} color="#4A90E2" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => router.push("Screens/upload")}>
//           <MaterialIcons name="add-circle" size={40} color="#4A90E2" />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => router.push("Screens/OutfitScreen")}>
//           <MaterialIcons name="checkroom" size={30} color="#4A90E2" />
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => router.push("Screens/MixandMatchScreen")}
//         >
//           <MaterialIcons name="shuffle" size={30} color="#4A90E2" />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F7FA",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E1E8ED",
//   },
//   welcomeText: {
//     marginLeft: 15,
//     fontSize: 16,
//     color: "#4A5568",
//     lineHeight: 24,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#2D3748",
//   },
//   mainContent: {
//     flex: 1,
//     padding: 20,
//     alignItems: "center",
//   },
//   card: {
//     width: "100%",
//     backgroundColor: "white",
//     borderRadius: 15,
//     padding: 20,
//     alignItems: "center",
//     marginVertical: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 15,
//     borderTopWidth: 1,
//     borderTopColor: "#E1E8ED",
//     backgroundColor: "white",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//     marginLeft: 10,
//   },
// });

// export default HomeScreen;

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

// const HomeScreen = ({ user }) => {
//   const router = useRouter();
//   const [showHelp, setShowHelp] = useState(false);

//   const handleLogout = () => {
//     Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
//       {
//         text: "Cancel",
//         style: "cancel",
//       },
//       {
//         text: "Logout",
//         onPress: () => {
//           signOut(auth)
//             .then(() => {
//               router.replace("Screens/LoginScreen");
//             })
//             .catch((error) => {
//               console.error("Error signing out: ", error);
//               Alert.alert("Logout Error", error.message);
//             });
//         },
//       },
//     ]);
//   };

//   const navItems = [
//     {
//       icon: "photo-library",
//       label: "Gallery",
//       route: "Screens/GalleryScreen",
//       description: "View all your saved clothing items",
//     },
//     {
//       icon: "add-circle",
//       label: "Add Item",
//       route: "Screens/upload",
//       description: "Add new clothing to your wardrobe",
//     },
//     {
//       icon: "checkroom",
//       label: "Outfits",
//       route: "Screens/OutfitScreen",
//       description: "Create and view saved outfits",
//     },
//     {
//       icon: "shuffle",
//       label: "Mix & Match",
//       route: "Screens/MixandMatchScreen",
//       description: "Get AI-powered outfit suggestions",
//     },
//   ];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <View style={styles.headerLeft}>
//           <MaterialIcons name="account-circle" size={40} color="#4A90E2" />
//           <Text style={styles.welcomeText}>
//             Welcome back,{"\n"}
//             <Text style={styles.userName}>
//               {user ? user.displayName || user.email : "Guest"}
//             </Text>
//           </Text>
//         </View>
//         <View style={styles.headerRight}>
//           <TouchableOpacity
//             onPress={() => setShowHelp(true)}
//             style={styles.helpButton}
//           >
//             <MaterialIcons name="help-outline" size={24} color="#4A90E2" />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
//             <MaterialIcons name="logout" size={24} color="#4A90E2" />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <ScrollView style={styles.mainContent}>
//         <View style={styles.card}>
//           <MaterialIcons name="style" size={32} color="#4A90E2" />
//           <Text style={styles.cardTitle}>Your Digital Wardrobe</Text>
//           <Text style={styles.cardSubtitle}>
//             Organize and manage your outfits with ease
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
//                 <MaterialIcons name={item.icon} size={24} color="#4A90E2" />
//                 <Text style={styles.actionButtonText}>{item.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </ScrollView>

//       <Modal
//         visible={showHelp}
//         transparent={true}
//         animationType="slide"
//         onRequestClose={() => setShowHelp(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>
//               How to Use Your Digital Wardrobe
//             </Text>
//             {navItems.map((item, index) => (
//               <View key={index} style={styles.helpItem}>
//                 <MaterialIcons name={item.icon} size={24} color="#4A90E2" />
//                 <View style={styles.helpTextContainer}>
//                   <Text style={styles.helpTitle}>{item.label}</Text>
//                   <Text style={styles.helpDescription}>{item.description}</Text>
//                 </View>
//               </View>
//             ))}
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setShowHelp(false)}
//             >
//               <Text style={styles.closeButtonText}>Got it!</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       <View style={styles.bottomNav}>
//         {navItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             style={styles.navItem}
//             onPress={() => router.push(item.route)}
//           >
//             <MaterialIcons
//               name={item.icon}
//               size={index === 1 ? 40 : 30}
//               color="#4A90E2"
//             />
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
//     backgroundColor: "#F5F7FA",
//   },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "white",
//     borderBottomWidth: 1,
//     borderBottomColor: "#E1E8ED",
//   },
//   headerLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   headerRight: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   helpButton: {
//     marginRight: 15,
//   },
//   welcomeText: {
//     marginLeft: 15,
//     fontSize: 16,
//     color: "#4A5568",
//     lineHeight: 24,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#2D3748",
//   },
//   mainContent: {
//     flex: 1,
//     padding: 20,
//   },
//   card: {
//     width: "100%",
//     backgroundColor: "white",
//     borderRadius: 15,
//     padding: 20,
//     alignItems: "center",
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   cardTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#2D3748",
//     marginTop: 10,
//   },
//   cardSubtitle: {
//     fontSize: 16,
//     color: "#4A5568",
//     textAlign: "center",
//     marginTop: 5,
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
//     color: "#4A90E2",
//   },
//   statLabel: {
//     fontSize: 14,
//     color: "#4A5568",
//   },
//   quickActions: {
//     marginTop: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "600",
//     color: "#2D3748",
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
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   actionButtonText: {
//     marginTop: 5,
//     fontSize: 14,
//     color: "#4A5568",
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     paddingVertical: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#E1E8ED",
//     backgroundColor: "white",
//   },
//   navItem: {
//     alignItems: "center",
//   },
//   navLabel: {
//     fontSize: 12,
//     marginTop: 2,
//     color: "#4A5568",
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     justifyContent: "flex-end",
//   },
//   modalContent: {
//     backgroundColor: "white",
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     padding: 20,
//     maxHeight: "80%",
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#2D3748",
//     marginBottom: 20,
//     textAlign: "center",
//   },
//   helpItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   helpTextContainer: {
//     marginLeft: 15,
//     flex: 1,
//   },
//   helpTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#2D3748",
//   },
//   helpDescription: {
//     fontSize: 14,
//     color: "#4A5568",
//     marginTop: 2,
//   },
//   closeButton: {
//     backgroundColor: "#4A90E2",
//     borderRadius: 10,
//     padding: 15,
//     alignItems: "center",
//     marginTop: 10,
//   },
//   closeButtonText: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "600",
//   },
// });

// export default HomeScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Modal,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const HomeScreen = ({ user }) => {
  const router = useRouter();
  const [showHelp, setShowHelp] = useState(false);

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

  const navItems = [
    { icon: "photo-library", label: "Gallery", route: "Screens/GalleryScreen" },
    { icon: "add-circle", label: "Add Item", route: "Screens/upload" },
    { icon: "checkroom", label: "Outfits", route: "Screens/OutfitScreen" },
    { icon: "shuffle", label: "Mix & Match", route: "Screens/MixandMatchScreen" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#2196F3", "#1565C0"]} style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialIcons name="account-circle" size={40} color="white" />
          <Text style={styles.welcomeText}>
            Welcome back,{"\n"}
            <Text style={styles.userName}>
              {user ? user.displayName || user.email : "Guest"}
            </Text>
          </Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => setShowHelp(true)}>
            <MaterialIcons name="help-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <MaterialIcons name="logout" size={24} color="white" />
          </TouchableOpacity>
        </View>
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
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Items</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Outfits</Text>
            </View>
          </View>
        </View>

        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionButtons}>
            {navItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionButton}
                onPress={() => router.push(item.route)}
              >
                <MaterialIcons name={item.icon} size={24} color="#1565C0" />
                <Text style={styles.actionButtonText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomNav}>
        {navItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.navItem} onPress={() => router.push(item.route)}>
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
    fontSize: 16,
    color: "white",
    lineHeight: 24,
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
  quickActions: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1565C0",
    marginBottom: 15,
  },
  actionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionButton: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
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
  closeButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
