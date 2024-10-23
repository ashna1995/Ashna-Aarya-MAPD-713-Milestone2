/**
 * Patient Model
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This module defines the Mongoose schema and model for patients
 * in the WellCare hospital management system. It includes fields for storing
 * patient details such as name, age, gender, address, phone number, medical history,
 * and critical condition status.
 */

import mongoose from "mongoose";

// Define the schema for a patient
const patientSchema = new mongoose.Schema({
  // Patient's full name
  name: { type: String, required: true },
  
  // Patient's age
  age: { type: Number, required: true },
  
  // Patient's gender (e.g., male, female, other)
  gender: { type: String, required: true },
  
  // Optional field for patient's address
  address: { type: String },
  
  // Optional field for patient's phone number
  phoneNumber: { type: String },
  
  // Array to store patient's medical history as strings
  medicalHistory: [{ type: String }],
  
  // Boolean flag to indicate if the patient is in a critical condition
  criticalCondition: { type: Boolean, default: false }
});

// Export the Patient model based on the schema
export default mongoose.model("Patient", patientSchema);