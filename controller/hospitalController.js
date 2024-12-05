/** 
 * Hospital Controller
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This module contains controller functions for managing patients and their medical tests
 * in the WellCare hospital management system. It includes operations for adding patients, retrieving
 * patient information, adding and retrieving tests, and managing critical patient conditions.
 */

import Test from "../model/testsModel.js";
import Patient from "../model/patientModel.js";

// Add a new patient to the database
const addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all patients from the database
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a specific patient by their ID
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new test for a specific patient
const addTestForPatient = async (req, res) => {
  try {
    const test = new Test({
      patientId: req.params.id,
      type: req.body.type,
      value: req.body.value
    });
    await test.save();

    // Update the patient's critical condition based on the new test
    await updatePatientCriticalCondition(req.params.id);

    res.status(201).json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all tests for a specific patient
const getTestsForPatient = async (req, res) => {
  try {
    const tests = await Test.find({ patientId: req.params.id })
  .select('type value date createdAt updatedAt')
  .sort({ date: -1 });
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a patient's complete history (personal info and all tests)
const getPatientHistory = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    const tests = await Test.find({ patientId: req.params.id }).sort({ date: -1 });

    const history = {
      patient: patient,
      tests: tests
    };

    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve all patients in critical condition
const getCriticalPatients = async (req, res) => {
  try {
    const criticalPatients = await Patient.find({ criticalCondition: true });
    res.json(criticalPatients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to update a patient's critical condition based on their latest test
const updatePatientCriticalCondition = async (patientId) => {
  const recentTests = await Test.find({ patientId: patientId }).sort({ date: -1 }).limit(1);
  
  if (recentTests.length > 0) {
    const latestTest = recentTests[0];
    let isCritical = false;

    // Determine if the patient is in critical condition based on the test type and value
    switch (latestTest.type) {
      case 'Blood Pressure':
        const [systolic, diastolic] = latestTest.value.split('/').map(Number);
        isCritical = systolic > 180 || systolic < 90 || diastolic > 120 || diastolic < 60;
        break;
      case 'Respiratory Rate':
        const rate = Number(latestTest.value);
        isCritical = rate > 30 || rate < 12;
        break;
      case 'Blood Oxygen Level':
        const oxygenLevel = Number(latestTest.value);
        isCritical = oxygenLevel < 90;
        break;
      case 'Heartbeat Rate':
        const heartRate = Number(latestTest.value);
        isCritical = heartRate > 100 || heartRate < 60;
        break;
    }

    // Update the patient's critical condition in the database
    await Patient.findByIdAndUpdate(patientId, { criticalCondition: isCritical });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete patient by ID
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });
    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update test details by test ID
const updateTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndUpdate(req.params.testId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json(test);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete test by test ID
const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.testId);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json({ message: 'Test deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Fetch a specific test by ID
const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.testId);
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json(test);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { 
  addPatient, 
  getAllPatients, 
  getPatientById, 
  addTestForPatient, 
  getTestsForPatient, 
  getPatientHistory, 
  getCriticalPatients,
  updatePatient,
  deletePatient,
  updateTest,
  deleteTest,
  getTestById,
};
