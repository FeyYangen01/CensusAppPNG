import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Platform,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  addPerson,
  getPersons,
  updatePerson,
  deletePerson,
  initializeDB,
  Person,
} from "@/database";

const RadioButton = ({ value, selectedValue, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.radioContainer}>
    <View style={styles.radioCircle}>
      {selectedValue === value && <View style={styles.selectedRb} />}
    </View>
    <Text>{value}</Text>
  </TouchableOpacity>
);

const Dashboard = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [localLevelGovernment, setLocalLevelGovernment] = useState("");
  const [ward, setWard] = useState("");
  const [censusUnitType, setCensusUnitType] = useState("");
  const [workloadNo, setWorkloadNo] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [persons, setPersons] = useState<Person[]>([]);
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);

  // Household member information
  const [householdMembers, setHouseholdMembers] = useState<number>(1);
  const [givenName, setGivenName] = useState("");
  const [surname, setSurname] = useState("");
  const [relationship, setRelationship] = useState("");
  const [sex, setSex] = useState("");
  const [dob, setDob] = useState(new Date());
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [age, setAge] = useState<number | undefined>(undefined);
  const [maritalStatus, setMaritalStatus] = useState("");
  const [citizenship, setCitizenship] = useState("PNG Citizen");
  const [nonPngCitizenship, setNonPngCitizenship] = useState("");

  const [above20, setAbove20] = useState("");
  const [forgot, setForgot] = useState("");
  const [comments, setComments] = useState("");

  const onChangeDate = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const onChangeDob = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || dob;
    setShowDobPicker(Platform.OS === "ios");
    setDob(currentDate);
  };

  const fetchPersons = async () => {
    const allPersons = await getPersons();
    setPersons(allPersons);
  };

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDB();
      fetchPersons();
    };

    setupDatabase();
  }, []);

  const handleSubmit = async () => {
    if (
      !province ||
      !district ||
      !localLevelGovernment ||
      !ward ||
      !censusUnitType ||
      !workloadNo ||
      !givenName ||
      !surname ||
      !relationship ||
      !sex ||
      !dob ||
      age === undefined ||
      !maritalStatus
    ) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    try {
      if (editingPersonId) {
        await updatePerson(
          editingPersonId,
          province,
          district,
          localLevelGovernment,
          ward,
          censusUnitType,
          workloadNo,
          date.toISOString(),
          householdMembers,
          givenName,
          surname,
          relationship,
          sex,
          dob.toISOString(),
          age,
          maritalStatus,
          citizenship,
          nonPngCitizenship,
          above20,
          forgot,
          comments
        );
        console.log("Entry updated successfully");
      } else {
        const id = await addPerson(
          province,
          district,
          localLevelGovernment,
          ward,
          censusUnitType,
          workloadNo,
          date.toISOString(),
          householdMembers,
          givenName,
          surname,
          relationship,
          sex,
          dob.toISOString(),
          age,
          maritalStatus,
          citizenship,
          nonPngCitizenship,
          above20,
          forgot,
          comments
        );
        console.log("Entry created successfully with ID:", id);
      }
      resetForm();
      fetchPersons();
    } catch (error) {
      console.error("Error submitting entry:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deletePerson(id);
      console.log("Entry deleted successfully");
      fetchPersons();
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleUpdateClick = (person: Person) => {
    setProvince(person.province);
    setDistrict(person.district);
    setLocalLevelGovernment(person.localLevelGovernment);
    setWard(person.ward);
    setCensusUnitType(person.censusUnitType);
    setWorkloadNo(person.workloadNo);
    setDate(new Date(person.date));
    setHouseholdMembers(person.householdMembers);
    setGivenName(person.givenName);
    setSurname(person.surname);
    setRelationship(person.relationship);
    setSex(person.sex);
    setDob(new Date(person.dob));
    setAge(person.age);
    setMaritalStatus(person.maritalStatus);
    setCitizenship(person.citizenship);
    setNonPngCitizenship(person.nonPngCitizenship || "");
    setAbove20(person.above20 || "");
    setForgot(person.forgot || "");
    setComments(person.comments || "");
    setEditingPersonId(person.id);
  };

  const resetForm = () => {
    setProvince("");
    setDistrict("");
    setLocalLevelGovernment("");
    setWard("");
    setCensusUnitType("");
    setWorkloadNo("");
    setDate(new Date());
    setHouseholdMembers(1);
    setGivenName("");
    setSurname("");
    setRelationship("");
    setSex("");
    setDob(new Date());
    setAge(undefined);
    setMaritalStatus("");
    setCitizenship("PNG Citizen");
    setNonPngCitizenship("");
    setAbove20("");
    setForgot("");
    setComments("");
    setEditingPersonId(null);
  };

  const renderForm = () => (
    <ScrollView style={styles.formContainer}>
      <Text style={styles.subheader}>Indicative Information</Text>
      <Text style={styles.subheaders}>Provincial Information:</Text>

      <Text style={styles.fieldtext}>Province:</Text>
      <TextInput
        style={styles.input}
        placeholder="Province"
        value={province}
        onChangeText={setProvince}
        placeholderTextColor="#888"
      />
      <Text style={styles.fieldtext}>District:</Text>
      <TextInput
        style={styles.input}
        placeholder="District"
        value={district}
        onChangeText={setDistrict}
        placeholderTextColor="#888"
      />
      <Text style={styles.fieldtext}>Local Level Government (LLG):</Text>
      <TextInput
        style={styles.input}
        placeholder="Local Level Government (LLG)"
        value={localLevelGovernment}
        onChangeText={setLocalLevelGovernment}
        placeholderTextColor="#888"
      />
      <Text style={styles.fieldtext}>Ward:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ward"
        value={ward}
        onChangeText={setWard}
        placeholderTextColor="#888"
      />
      <Text style={styles.fieldtext}>Census Unit Type:</Text>
      <TextInput
        style={styles.input}
        placeholder="Census Unit Type"
        value={censusUnitType}
        onChangeText={setCensusUnitType}
        placeholderTextColor="#888"
      />
      <Text style={styles.fieldtext}>Workload No./Enumeration Area:</Text>
      <TextInput
        style={styles.input}
        placeholder="Workload No./Enumeration Area"
        value={workloadNo}
        onChangeText={setWorkloadNo}
        placeholderTextColor="#888"
      />

      <Text style={styles.subheaders}>Household Information:</Text>
      <Text style={styles.persontext}>Person 1:</Text>
      <Text style={styles.pertext}>How many people slept in your house on the night of Sunday 12th June 2024:</Text>
      <Text style={styles.fieldtext}>Total number of household members:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(householdMembers)}
        onChangeText={(value) => setHouseholdMembers(Number(value))}
      />

      <Text style={styles.fieldtext}>Given Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Given Name"
        value={givenName}
        onChangeText={setGivenName}
      />
      <Text style={styles.fieldtext}>Surname:</Text>
      <TextInput
        style={styles.input}
        placeholder="Surname"
        value={surname}
        onChangeText={setSurname}
      />

      <Text style={styles.fieldtext}>Relationship:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={relationship}
          onValueChange={setRelationship}
          style={styles.picker}
        >
          <Picker.Item label="Select Relationship" value="" />
          <Picker.Item label="Head of Household" value="Head of Household" />
          <Picker.Item label="Husband/Wife" value="Husband/Wife" />
          <Picker.Item label="Own Son" value="Own Son" />
          <Picker.Item label="Own Daughter" value="Own Daughter" />
          <Picker.Item label="Step Son/Step Daughter" value="Step Son/Step Daughter" />
          <Picker.Item label="Grandson/Granddaughter" value="Grandson/Granddaughter" />
          <Picker.Item label="Other Relative" value="Other Relative" />
          <Picker.Item label="Non-Relative" value="Non-Relative" />
        </Picker>
      </View>

      <Text style={styles.fieldtext}>Sex:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sex}
          onValueChange={setSex}
          style={styles.picker}
        >
          <Picker.Item label="Select Sex" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <Text style={styles.fieldtext}>Date of Birth:</Text>
      <TouchableOpacity onPress={() => setShowDobPicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={dob.toLocaleDateString()}
          editable={false}
        />
      </TouchableOpacity>
      {showDobPicker && (
        <DateTimePicker
          value={dob}
          mode="date"
          display="default"
          onChange={onChangeDob}
        />
      )}

      <Text style={styles.fieldtext}>Age in Years:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age !== undefined ? String(age) : ""}
        onChangeText={(value) => {
          const numValue = Number(value);
          setAge(isNaN(numValue) ? undefined : numValue);
        }}
      />

      <Text style={styles.fieldtext}>Marital Status:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={maritalStatus}
          onValueChange={setMaritalStatus}
          style={styles.picker}
        >
          <Picker.Item label="Select Marital Status" value="" />
          <Picker.Item label="Single" value="Single" />
          <Picker.Item label="Married" value="Married" />
          <Picker.Item label="Divorced" value="Divorced" />
          <Picker.Item label="Widowed" value="Widowed" />
        </Picker>
      </View>

      <Text style={styles.fieldtext}>Citizenship:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={citizenship}
          onValueChange={setCitizenship}
          style={styles.picker}
        >
          <Picker.Item label="PNG Citizen" value="PNG Citizen" />
          <Picker.Item label="Non-PNG Citizen" value="Non-PNG Citizen" />
        </Picker>
      </View>

      {citizenship === "Non-PNG Citizen" && (
        <TextInput
          style={styles.input}
          placeholder="Non-PNG Citizenship"
          value={nonPngCitizenship}
          onChangeText={setNonPngCitizenship}
        />
      )}

      <Text style={styles.fieldtext}>Above 20:</Text>
      <View style={styles.radioGroup}>
        <RadioButton
          value="Yes"
          selectedValue={above20}
          onPress={() => setAbove20("Yes")}
        />
        <RadioButton
          value="No"
          selectedValue={above20}
          onPress={() => setAbove20("No")}
        />
      </View>

      <Text style={styles.fieldtext}>Forgot:</Text>
      <View style={styles.radioGroup}>
        <RadioButton
          value="Yes"
          selectedValue={forgot}
          onPress={() => setForgot("Yes")}
        />
        <RadioButton
          value="No"
          selectedValue={forgot}
          onPress={() => setForgot("No")}
        />
      </View>

      <Text style={styles.fieldtext}>Comments:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter comments"
        value={comments}
        onChangeText={setComments}
      />

      <Button title={editingPersonId ? "Update" : "Submit"} onPress={handleSubmit} />
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.jpg")} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.headerText}>Papua New Guinea National Statistical Office</Text>
      </View>
      <FlatList
        data={persons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.personItem}>
            <Text style={styles.personName}>{item.givenName} {item.surname}</Text>
            <Text>Relationship: {item.relationship}</Text>
            <Text>Date of Birth: {new Date(item.dob).toLocaleDateString()}</Text>
            <Text>Sex: {item.sex}</Text>
            <Text>Age: {item.age}</Text>
            <Text>Marital Status: {item.maritalStatus}</Text>
            <Text>Citizenship: {item.citizenship}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => handleUpdateClick(item)} />
              <Button title="Delete" onPress={() => {
                Alert.alert(
                  "Confirm Delete",
                  "Are you sure you want to delete this person?",
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Delete", onPress: () => handleDelete(item.id) },
                  ]
                );
              }} />
            </View>
          </View>
        )}
        ListHeaderComponent={renderForm}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#218484",
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 60,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 5,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  fieldtext: {
    fontSize: 16,
    marginVertical: 8,
  },
  pertext: {
    fontSize: 16,
    marginVertical: 12,
  },
  persontext: {
    fontSize: 16,
    marginVertical: 12,
    fontWeight: "bold",
    paddingBottom: 14,
    textAlign: "right",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  subheader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subheaders: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textDecorationLine: "underline",
  },
  personItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  personName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 120,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  selectedRb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  radioGroup: {
    marginVertical: 10,
  },
});

export default Dashboard;
