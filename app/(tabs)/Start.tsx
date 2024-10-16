// import React from "react";
// import {
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   View,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";

// // Import the logo image
// import logo from "@/assets/images/logo.jpg"; // Adjust the path as necessary
// import graph from "@/assets/images/graph.png";

// const WelcomePage = () => {
//   const navigation = useNavigation();

//   const handleRegister = () => {
//     navigation.navigate("login"); // Change to the correct route name if needed
//   };

//   return (
//     <View style={styles.container}>
//       {/* Logo Image */}
//       <Image source={logo} style={styles.logo} />

//       {/* Name under the logo */}
//       <Text style={styles.nameText}>CAPNG-CENSUS App PNG</Text>
//       <Image source={graph} style={styles.graph}/>
//       {/* Register Button */}
//       <TouchableOpacity style={styles.button} onPress={handleRegister}>
//         <Text style={styles.buttonText}>Click to GO </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#091A38", // Dark background color
//   },
//   logo: {
//     width: 200, // Adjust width as needed
//     height: 140, // Adjust height as needed
//     marginBottom: 20, // Space between logo and name
//   },
//   graph: {
//     width: 200, // Adjust width as needed
//     height: 140, // Adjust height as needed
//     marginBottom: 28, // Space between logo and name
//     paddingTop:200
//   },
//   nameText: {
//     fontSize: 42,
//     fontWeight: "bold",
//     color: "#fafaf9", // White color for text
//     marginBottom: 130, // Space between name and button
//     textAlign:"center",
//     paddingHorizontal:56,
//   },
//   button: {
//     backgroundColor: "#ea580c", // Green color for the button
//     borderRadius: 50,
//     paddingVertical: 21,
//     paddingHorizontal:-1,
//     shadowColor: "#fafaf9",
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     elevation: 5, // Elevation for Android
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 15,
//     fontWeight: "600",
//     textAlign: "center",
//   },
// });

// export default WelcomePage;
