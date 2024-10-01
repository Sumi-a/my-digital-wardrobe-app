import { View, Text, Button, StyleSheet } from "react-native";
//import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Your Digital Wardrobe</Text>
      <Button
        title="Go to Upload Screen"
        onPress={() => router.push("/upload")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default HomeScreen;
