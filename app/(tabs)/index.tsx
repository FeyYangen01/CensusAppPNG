// import {
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   View,
//   TextInput,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import React, { useState } from "react";

// // Import the logo image
// import logo from "@/assets/images/graph.png"; // Adjust the path as necessary

// export default function HomeScreen() {
//   const navigation = useNavigation();

//   // State for username and password
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     // Check for hardcoded username and password
//     if (username.trim() === "POPPY" && password === "1234567") {
//       navigation.navigate("instruction"); // Navigate to instruction page
//     } else {
//       // Handle error (e.g., show an alert)
//       alert("Invalid username or password");
//     }
//   };

//   const handleDashboard = () => {
//     (navigation as any).navigate("dashboard");
//   };

//   const handleSignIn = () => {
//     (navigation as any).navigate("auth");
//   };

//   return (
//     <View style={styles.container}>
//       {/* Logo Image */}
//       <Image source={logo} style={styles.logo} />

//       {/* Header Text */}
//       <Text style={styles.imagename}>Papua New Guinea National Statistical Office</Text>
//       <Text style={styles.headerText}>Welcome to 2024 CENSUS</Text>
//       <Text style={styles.subText}>
//         Explore and manage your content with ease.
//       </Text>

//       {/* Username Input */}
//       <TextInput
//         style={styles.input}
//         placeholder="Username"
//         placeholderTextColor="#ddd" // Placeholder color
//         value={username}
//         onChangeText={setUsername}
//       />

//       {/* Password Input */}
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         placeholderTextColor="#ddd" // Placeholder color
//         secureTextEntry={true} // Hides the password text
//         value={password}
//         onChangeText={setPassword}
//       />

//       <TouchableOpacity style={styles.button} onPress={() => handleDashboard()}>
//         <Text style={styles.buttonText}>Data Entry</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.buttonSecondary}
//         onPress={handleLogin} // Call the login handler
//       >
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.buttonSecondary}
//         onPress={() => handleSignIn()}
//       >
//         <Text style={styles.buttonText}>Sign In</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// // Styling for a modern, attractive layout
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 20,
//     backgroundColor: "#091A38", // Dark background for contrast against buttons
//   },
//   logo: {
//     width: 200, // Adjust width as needed
//     height: 140, // Adjust height as needed
//     marginBottom: 20, // Space between logo and header text
//   },
//   headerText: {
//     fontSize: 42,
//     fontWeight: "bold",
//     color: "#fff", // Changed to white for contrast against dark background
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   subText: {
//     fontSize: 16,
//     color: "#ddd", // Light gray for better contrast
//     textAlign: "center",
//     marginBottom: 20, // Adjust space between text and input fields
//   },
//   input: {
//     height: 50,
//     width: '80%', // Width of the input fields
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginBottom: 20, // Space between input fields and buttons
//     color: "#fff", // Text color
//   },
//   button: {
//     backgroundColor: "#4CAF50", // Modern green color
//     borderRadius: 12,
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5, // Elevation for Android
//   },
//   buttonSecondary: {
//     backgroundColor: "#2196F3", // Stylish blue for Sign In/Sign Up buttons
//     borderRadius: 12,
//     paddingVertical: 15,
//     paddingHorizontal: 50,
//     marginBottom: 20,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5, // Elevation for Android
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//     fontWeight: "600",
//     textAlign: "center",
//   },
//   imagename: {
//     color: "#fff",
//     paddingHorizontal: 110,
//     textAlign: "center",
//     marginBottom: 10,
//   },
// });
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
import graph from "@/assets/images/graph.png";

const WelcomePage = () => {
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("login"); // Change to the correct route name if needed
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image source={logo} style={styles.logo} />

      {/* Name under the logo */}
      <Text style={styles.nameText}>CAPNG-CENSUS App PNG</Text>
      <Image source={graph} style={styles.graph}/>
      {/* Register Button */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Click to GO </Text>
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
    marginBottom: 6, // Space between logo and name
  },
  graph: {
    width: 200, // Adjust width as needed
    height: 140, // Adjust height as needed
    marginBottom: 28, // Space between logo and name
    paddingTop:200
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fafaf9", // White color for text
    marginBottom: 130, // Space between name and button
    textAlign:"center",
    paddingHorizontal:56,
  },
  button: {
    backgroundColor: "#ea580c", // Green color for the button
    borderRadius: 50,
    paddingVertical: 21,
    paddingHorizontal:-1,
    shadowColor: "#fafaf9",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 12  ,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default WelcomePage;
