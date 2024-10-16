import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('census');

export interface Person {
  comments?: string;
  forgot?: string;
  above20?: string;
  id: number;
  province: string;
  district: string;
  localLevelGovernment: string;
  ward: string;
  censusUnitType: string;
  workloadNo: string;
  date: string; // Date of census
  householdMembers: number; // Number of household members
  givenName: string; // Given name
  surname: string; // Surname
  relationship: string; // Relationship
  sex: string; // Sex
  dob: string; // Date of birth
  age: number; // Age
  maritalStatus: string; // Marital status
  citizenship: string; // Citizenship
  nonPngCitizenship?: string; // Optional field for non-PNG citizenship
}

// Option 1 - Drop and Recreate Table (If data is not critical)
export const initializeDB = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    DROP TABLE IF EXISTS person;  -- Drops the existing table
    CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      province TEXT NOT NULL,
      district TEXT NOT NULL,
      localLevelGovernment TEXT NOT NULL,
      ward TEXT NOT NULL,
      censusUnitType TEXT NOT NULL,
      workloadNo TEXT NOT NULL,
      date TEXT NOT NULL,
      householdMembers INTEGER NOT NULL,
      givenName TEXT NOT NULL,
      surname TEXT NOT NULL,
      relationship TEXT NOT NULL,
      sex TEXT NOT NULL,
      dob TEXT NOT NULL,
      age INTEGER NOT NULL,
      maritalStatus TEXT NOT NULL,
      citizenship TEXT NOT NULL,
      nonPngCitizenship TEXT,
      comments TEXT,
      forgot TEXT,
      above20 TEXT
    );
  `);
};

// Option 2 - Alter Table (If you want to keep existing data)
export const alterTable = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS person (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      province TEXT NOT NULL,
      district TEXT NOT NULL,
      localLevelGovernment TEXT NOT NULL,
      ward TEXT NOT NULL,
      censusUnitType TEXT NOT NULL,
      workloadNo TEXT NOT NULL,
      date TEXT NOT NULL,
      householdMembers INTEGER NOT NULL,
      givenName TEXT NOT NULL,
      surname TEXT NOT NULL,
      relationship TEXT NOT NULL,
      sex TEXT NOT NULL,
      dob TEXT NOT NULL,
      age INTEGER NOT NULL,
      maritalStatus TEXT NOT NULL,
      citizenship TEXT NOT NULL,
      nonPngCitizenship TEXT,
      comments TEXT,
      forgot TEXT,
      above20 TEXT
    );
  `);

  // Add missing columns
  try {
    await db.execAsync(`ALTER TABLE person ADD COLUMN province TEXT;`);
  } catch (error) {
    console.log('Province column might already exist or failed to add:', error);
  }

  try {
    await db.execAsync(`ALTER TABLE person ADD COLUMN district TEXT;`);
  } catch (error) {
    console.log('District column might already exist or failed to add:', error);
  }

  // Repeat similar ALTER TABLE statements for other missing columns as necessary
};

// Function to add a person
export const addPerson = async (
  province: string,
  district: string,
  localLevelGovernment: string,
  ward: string,
  censusUnitType: string,
  workloadNo: string,
  date: string,
  householdMembers: number,
  givenName: string,
  surname: string,
  relationship: string,
  sex: string,
  dob: string,
  age: number,
  maritalStatus: string,
  citizenship: string,
  nonPngCitizenship?: string,
  above20?: string,
  forgot?: string,
  comments?: string
) => {
  try {
    const result = await db.runAsync(
      `INSERT INTO person 
        (province, district, localLevelGovernment, ward, censusUnitType, workloadNo, date, householdMembers, 
        givenName, surname, relationship, sex, dob, age, maritalStatus, citizenship, nonPngCitizenship, comments, forgot, above20) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        province, district, localLevelGovernment, ward, censusUnitType, workloadNo, date, householdMembers,
        givenName, surname, relationship, sex, dob, age, maritalStatus, citizenship,
        nonPngCitizenship || null, comments || null, forgot || null, above20 || null
      ]
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error adding person:', error);
  }
};

// Function to update a person's details
export const updatePerson = async (
  id: number,
  province: string,
  district: string,
  localLevelGovernment: string,
  ward: string,
  censusUnitType: string,
  workloadNo: string,
  date: string,
  householdMembers: number,
  givenName: string,
  surname: string,
  relationship: string,
  sex: string,
  dob: string,
  age: number,
  maritalStatus: string,
  citizenship: string,
  nonPngCitizenship?: string,
  above20?: string,
  forgot?: string,
  comments?: string
) => {
  try {
    await db.runAsync(
      `UPDATE person 
       SET province = ?, district = ?, localLevelGovernment = ?, ward = ?, censusUnitType = ?, workloadNo = ?, date = ?, householdMembers = ?, 
           givenName = ?, surname = ?, relationship = ?, sex = ?, dob = ?, age = ?, maritalStatus = ?, citizenship = ?, 
           nonPngCitizenship = ?, comments = ?, forgot = ?, above20 = ? 
       WHERE id = ?`,
      [
        province, district, localLevelGovernment, ward, censusUnitType, workloadNo, date, householdMembers,
        givenName, surname, relationship, sex, dob, age, maritalStatus, citizenship,
        nonPngCitizenship || null, comments || null, forgot || null, above20 || null, id
      ]
    );
  } catch (error) {
    console.error('Error updating person:', error);
  }
};

// Function to delete a person
export const deletePerson = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM person WHERE id = ?', [id]);
  } catch (error) {
    console.error('Error deleting person:', error);
  }
};

// Function to fetch all persons
export const getPersons = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM person') as Person[];
    return allRows;
  } catch (error) {
    console.error('Error getting persons:', error);
    return [];
  }
};
