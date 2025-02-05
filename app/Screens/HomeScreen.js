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

//         <TouchableOpacity
//           style={styles.uploadButton}
//           onPress={() => router.push("Screens/upload")}
//         >
//           <MaterialIcons name="file-upload" size={24} color="white" />
//           <Text style={styles.buttonText}>Upload New Item</Text>
//         </TouchableOpacity>

//         {/* New Mix and Match Button */}
//         <TouchableOpacity
//           style={styles.mixMatchButton}
//           onPress={() => router.push("Screens/MixAndMatchScreen")}
//         >
//           <MaterialIcons name="shuffle" size={24} color="white" />
//           <Text style={styles.buttonText}>Mix & Match</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//           <MaterialIcons name="logout" size={24} color="#FF5252" />
//           <Text style={styles.logoutText}>Logout</Text>
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
//   cardTitle: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#2D3748",
//     marginTop: 10,
//   },
//   cardSubtitle: {
//     fontSize: 16,
//     color: "#718096",
//     textAlign: "center",
//     marginTop: 5,
//   },
//   uploadButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#4A90E2",
//     paddingVertical: 15,
//     paddingHorizontal: 30,
//     borderRadius: 25,
//     marginVertical: 20,
//     shadowColor: "#4A90E2",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 18,
//     fontWeight: "600",
//     marginLeft: 10,
//   },
//   logoutButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     padding: 15,
//     position: "absolute",
//     bottom: 30,
//   },
//   logoutText: {
//     color: "#FF5252",
//     fontSize: 16,
//     fontWeight: "500",
//     marginLeft: 8,
//   },
// });

// export default HomeScreen;
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

        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => router.push("Screens/upload")}
        >
          <MaterialIcons name="file-upload" size={24} color="white" />
          <Text style={styles.buttonText}>Upload New Item</Text>
        </TouchableOpacity>

        {/* New Mix and Match Button */}
        <TouchableOpacity
          style={styles.mixMatchButton}
          onPress={() => router.push("Screens/MixandMatchScreen")}
        >
          <MaterialIcons name="shuffle" size={24} color="white" />
          <Text style={styles.buttonText}>See existing outfits</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#FF5252" />
          <Text style={styles.logoutText}>Logout</Text>
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
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D3748",
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: "#718096",
    textAlign: "center",
    marginTop: 5,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4A90E2",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: "#4A90E2",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mixMatchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#50C878",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: "#50C878",
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
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    position: "absolute",
    bottom: 30,
  },
  logoutText: {
    color: "#FF5252",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});

export default HomeScreen;
