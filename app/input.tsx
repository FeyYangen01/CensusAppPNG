import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import logo from "@/assets/images/logo.jpg"; // Adjust the path as necessary

const InputForm = () => {
  const navigation = useNavigation(); // Initialize useNavigation
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = () => {
    // Basic validation
    if (!email || !phoneNumber || !password) {
      setErrorMessage('All fields are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    // Clear error message if all validations pass
    setErrorMessage('');

    // Handle the form submission here
    console.log('Email:', email);
    console.log('Phone Number:', phoneNumber);
    console.log('Password:', password);

    // Navigate to the CensusForm component
    navigation.navigate('censusform');

    // Optionally show a success message
    Alert.alert('Success', 'Login successfully!');
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} accessibilityLabel="Logo" />
      <Text style={styles.nameText}>CAPNG</Text>
      <Text style={styles.censusText}>Fill in the following fields for continue:</Text>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholder="Enter your email"
        placeholderTextColor="#fff" 
      />

      <Text style={styles.label}>Phone Number:</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholder="Enter your phone number"
        placeholderTextColor="#fff"
      />

      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="Enter your password"
        placeholderTextColor="#fff"
      />

      <Button title="Sign Up" onPress={handleSubmit} color="#ea580c" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: "#091A38",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: '#fca5a5',
  },
  input: {
    height: 40,
    borderColor: '#fca5a5',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: '#fff',
    backgroundColor: '#1C2A4B',
  },
  nameText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff", // White color for text
    marginBottom: 50, // Space between name and button
    textAlign: "center",
    paddingHorizontal: 56,
  },
  censusText: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#f8fafc", // White color for text
    marginBottom: 16, // Space between name and button
    textAlign: "left",
    paddingHorizontal: 0,
  },
  logo: {
    width: 200,
    height: 140,
    marginBottom: 20,
    alignSelf: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default InputForm;
