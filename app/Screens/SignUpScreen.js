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
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase"; // Ensure Firestore is imported
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; // Date Picker
import { Picker } from "@react-native-picker/picker";

const SignUpScreen = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  //const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const router = useRouter();

  const validateInputs = () => {
    if (!fullName.trim()) return "First name is required";
    if (!userName.trim()) return "Last name is required";
    if (!email.trim()) return "Email is required";
    //if (!phoneNumber.trim()) return "Phone number is required";
    if (!password) return "Password is required";
    if (password !== confirmPassword) return "Passwords don't match";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSignUp = async () => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        birthday: birthday.toISOString().split("T")[0],
        phoneNumber,
        gender,
        createdAt: new Date().toISOString(),
      });

      console.log("User profile saved in Firestore");
      router.push("Screens/HomeScreen");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("This email is already registered. Try logging in.");
          break;
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/weak-password":
          setError("Please choose a stronger password.");
          break;
        default:
          setError("An error occurred during sign-up. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
            <Text style={styles.headerText}>Create Profile</Text>
            <Text style={styles.subHeaderText}>
              Set up your account details
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="User Name"
                value={userName}
                onChangeText={setUserName}
              />
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />
            </View>
            <TouchableOpacity
              style={styles.inputContainer}
              onPress={() => setShowDatePicker(true)}
            >
              <MaterialIcons name="calendar-today" size={24} color="#4A90E2" />
              <Text style={styles.input}>{birthday.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={birthday}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) setBirthday(selectedDate);
                }}
              />
            )}

            {/* <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
              />
            </View> */}

            <View style={styles.inputContainer}>
              <Picker
                selectedValue={gender}
                onValueChange={(value) => setGender(value)}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
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
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry={!showPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            {error && (
              <View style={styles.errorContainer}>
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
                <Text style={styles.buttonText}>Create Account</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  keyboardView: { flex: 1 },
  backButton: { marginTop: 20, marginLeft: 20 },
  headerContainer: { alignItems: "center", marginTop: 40, marginBottom: 20 },
  headerText: { fontSize: 24, fontWeight: "bold" },
  subHeaderText: { fontSize: 16, color: "#718096" },
  formContainer: { paddingHorizontal: 24 },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 12,
    padding: 12,
    elevation: 3,
  },
  input: { fontSize: 16 },
  eyeIcon: { position: "absolute", right: 10, top: 15 },
  errorContainer: { marginBottom: 12 },
  errorText: { color: "red", fontSize: 14 },
  signupButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});

export default SignUpScreen;
// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Platform,
//   ActivityIndicator,
//   ScrollView,
//   Alert,
// } from "react-native";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from "firebase/firestore";
// import { auth, db } from "../firebase"; // Ensure Firestore is imported
// import { useRouter } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";

// const SignUpScreen = () => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [birthday, setBirthday] = useState(""); // YYYY-MM-DD
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [gender, setGender] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const router = useRouter();

//   const validateInputs = () => {
//     if (!firstName.trim()) return "First name is required";
//     if (!lastName.trim()) return "Last name is required";
//     if (!userName.trim()) return "Last name is required";
//     if (!email.trim()) return "Email is required";
//     if (!birthday.trim()) return "Birthday is required";
//     if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday))
//       return "Enter birthday in YYYY-MM-DD format";
//     if (!phoneNumber.trim()) return "Phone number is required";
//     if (!password) return "Password is required";
//     if (password !== confirmPassword) return "Passwords don't match";
//     if (password.length < 6) return "Password must be at least 6 characters";
//     return null;
//   };

//   const handleSignUp = async () => {
//     const validationError = validateInputs();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Store user info in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         firstName,
//         lastName,
//         userName,
//         email,
//         birthday,
//         phoneNumber,
//         gender,
//         createdAt: new Date().toISOString(),
//       });

//       console.log("User profile saved in Firestore");
//       router.push("Screens/HomeScreen");
//     } catch (error) {
//       switch (error.code) {
//         case "auth/email-already-in-use":
//           setError("This email is already registered. Try logging in.");
//           break;
//         case "auth/invalid-email":
//           setError("Please enter a valid email address.");
//           break;
//         case "auth/weak-password":
//           setError("Please choose a stronger password.");
//           break;
//         default:
//           setError("An error occurred during sign-up. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.keyboardView}
//       >
//         <ScrollView showsVerticalScrollIndicator={false}>
//           <TouchableOpacity
//             style={styles.backButton}
//             onPress={() => router.back()}
//           >
//             <MaterialIcons name="arrow-back" size={24} color="#4A90E2" />
//           </TouchableOpacity>

//           <View style={styles.headerContainer}>
//             <MaterialIcons name="person-add" size={48} color="#4A90E2" />
//             <Text style={styles.headerText}>Create Profile</Text>
//             <Text style={styles.subHeaderText}>
//               Set up your account details
//             </Text>
//           </View>

//           <View style={styles.formContainer}>
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="First Name"
//                 value={firstName}
//                 onChangeText={setFirstName}
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Last Name"
//                 value={lastName}
//                 onChangeText={setLastName}
//               />
//             </View>
//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="User Name"
//                 value={userName}
//                 onChangeText={setUserName}
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Birthday (YYYY-MM-DD)"
//                 value={birthday}
//                 onChangeText={setBirthday}
//                 keyboardType="numeric"
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Phone Number"
//                 value={phoneNumber}
//                 onChangeText={setPhoneNumber}
//                 keyboardType="phone-pad"
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Gender (Optional)"
//                 value={gender}
//                 onChangeText={setGender}
//               />
//             </View>

//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Password"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={setPassword}
//               />
//               <TouchableOpacity
//                 onPress={() => setShowPassword(!showPassword)}
//                 style={styles.eyeIcon}
//               >
//                 <MaterialIcons
//                   name={showPassword ? "visibility" : "visibility-off"}
//                   size={24}
//                   color="#A0AEC0"
//                 />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Confirm Password"
//                 secureTextEntry={!showPassword}
//                 value={confirmPassword}
//                 onChangeText={setConfirmPassword}
//               />
//             </View>

//             {error && (
//               <View style={styles.errorContainer}>
//                 <Text style={styles.errorText}>{error}</Text>
//               </View>
//             )}

//             <TouchableOpacity
//               style={styles.signupButton}
//               onPress={handleSignUp}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="white" />
//               ) : (
//                 <Text style={styles.buttonText}>Create Account</Text>
//               )}
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#F5F7FA" },
//   keyboardView: { flex: 1 },
//   backButton: { marginTop: 20, marginLeft: 20 },
//   headerContainer: { alignItems: "center", marginTop: 40, marginBottom: 20 },
//   headerText: { fontSize: 24, fontWeight: "bold" },
//   subHeaderText: { fontSize: 16, color: "#718096" },
//   formContainer: { paddingHorizontal: 24 },
//   inputContainer: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     marginBottom: 12,
//     padding: 12,
//     elevation: 3,
//   },
//   input: { fontSize: 16 },
//   eyeIcon: { position: "absolute", right: 10, top: 15 },
//   errorContainer: { marginBottom: 12 },
//   errorText: { color: "red", fontSize: 14 },
//   signupButton: {
//     backgroundColor: "#4A90E2",
//     padding: 15,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
// });

// export default SignUpScreen;
