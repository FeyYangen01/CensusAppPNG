import React from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Import the logo image
import logo from "@/assets/images/logo.jpg"; // Adjust the path as necessary

const WelcomePage = () => {
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("input"); // Change to the correct route name if needed
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image source={logo} style={styles.logo} />

      {/* Name under the logo */}
      <Text style={styles.nameText}>CAPNG-CENSUS App PNG</Text>
      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}> Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Get Started </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#091A38", // Dark background color
  },
  logo: {
    width: 200, // Adjust width as needed
    height: 140, // Adjust height as needed
    marginBottom: 20, // Space between logo and name
  },
  nameText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff", // White color for text
    marginBottom: 160, // Space between name and button
    textAlign:"center",
    paddingHorizontal:48,
  },
  button: {
    backgroundColor: "#ea580c", // Green color for the button
    borderRadius:43,
    paddingVertical: 19,
    paddingHorizontal:34,
    shadowColor: "#7dd3fc",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 11, // Elevation for Android
    marginBottom:23
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
  imagename:{
    color:"#fff",
    paddingHorizontal:130,
    textAlign:"center",
  }
});

export default WelcomePage;
