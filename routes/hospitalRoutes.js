/**
 * Hospital Management API Routes
 * 
 * Created by: Ashna Paul and Aarya Savaliya
 * Date: October 23, 2024
 * 
 * Description: This module defines the API routes for the WellCare hospital management system.
 * It includes routes for managing patients and their medical tests, along with Swagger
 * documentation for each endpoint. The routes are organized into patient-related and
 * test-related operations.
 */

import express from 'express';
import { 
  addPatient, 
  getAllPatients, 
  getPatientById, 
  addTestForPatient, 
  getTestsForPatient, 
  getPatientHistory, 
  getCriticalPatients 
} from '../controller/hospitalController.js';

const router = express.Router();

// Patient-related routes

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Add a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Patient'
 *     responses:
 *       201:
 *         description: The patient was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 */
router.post('/patients', addPatient);

/**
 * @swagger
 * /api/patients:
 *   get:
 *     summary: Retrieve a list of all patients
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: A list of patients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */
router.get('/patients', getAllPatients);

/**
 * @swagger
 * /api/patients/critical:
 *   get:
 *     summary: Get all patients in critical condition
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: A list of patients in critical condition
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Patient'
 */
router.get('/patients/critical', getCriticalPatients);

/**
 * @swagger
 * /api/patients/{id}:
 *   get:
 *     summary: Get a patient by ID
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Patient'
 */
router.get('/patients/:id', getPatientById);

// Test-related routes

/**
 * @swagger
 * /api/patients/{id}/tests:
 *   post:
 *     summary: Add a new test for a patient
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Test'
 *     responses:
 *       201:
 *         description: The test was successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Test'
 */
router.post('/patients/:id/tests', addTestForPatient);

/**
 * @swagger
 * /api/patients/{id}/tests:
 *   get:
 *     summary: Get all tests for a patient
 *     tags: [Tests]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of tests for the patient
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Test'
 */
router.get('/patients/:id/tests', getTestsForPatient);

/**
 * @swagger
 * /api/patients/{id}/history:
 *   get:
 *     summary: Get patient's history including all tests
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Patient's history with all tests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 patient:
 *                   $ref: '#/components/schemas/Patient'
 *                 tests:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Test'
 */
router.get('/patients/:id/history', getPatientHistory);

export default router;