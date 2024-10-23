/**
 * Test Model
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This module defines the Mongoose schema and model for medical tests
 * in the WellCare hospital management system. It includes fields for storing
 * test details such as the associated patient, date of the test, type of test,
 * and the test value.
 */

import mongoose from "mongoose";

// Define the schema for a medical test
const testSchema = new mongoose.Schema({
  // Reference to the Patient model, linking each test to a specific patient
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  
  // Date when the test was conducted, defaults to the current date and time
  date: { type: Date, required: true, default: Date.now },
  
  // Type of the medical test
  // Restricted to predefined types using enum
  type: { 
    type: String, 
    required: true,
    enum: ['Blood Pressure', 'Respiratory Rate', 'Blood Oxygen Level', 'Heartbeat Rate']
  },
  
  // The result or value of the test
  // Stored as a string to accommodate different formats (e.g., "120/80" for blood pressure)
  value: { type: String, required: true }
});

// Export the Test model based on the schema
export default mongoose.model("Test", testSchema);