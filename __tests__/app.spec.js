import { 
    addPatient, 
    getAllPatients, 
    getPatientById, 
    addTestForPatient,
    getTestsForPatient,
    updatePatient,
    deletePatient,
    updateTest,
    deleteTest,
    getTestById
  } from '../controller/hospitalController.js';
  import Patient from '../model/patientModel.js';
  import Test from '../model/testsModel.js';
  
  // Mock the Patient and Test models
  jest.mock('../model/patientModel.js');
  jest.mock('../model/testsModel.js');
  
  describe('Hospital Controller', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        body: {},
        params: {}
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
    });
  
    describe('Patient-related functions', () => {
      describe('addPatient', () => {
        it('should add a new patient successfully', async () => {
            const mockPatient = { _id: '123', name: 'John Doe', age: 30 };
            Patient.mockImplementation(() => ({
              save: jest.fn().mockResolvedValue(mockPatient)
            }));
  
          req.body = { name: 'John Doe', age: 30 };
          await addPatient(req, res);
  
          expect(res.status).toHaveBeenCalledWith(201);
          expect(res.json).toHaveBeenCalledWith(mockPatient);
        });
      });
  
      describe('getAllPatients', () => {
        it('should retrieve all patients', async () => {
          const mockPatients = [{ _id: '123', name: 'John Doe' }, { _id: '456', name: 'Jane Doe' }];
          Patient.find = jest.fn().mockResolvedValue(mockPatients);
  
          await getAllPatients(req, res);
  
          expect(res.json).toHaveBeenCalledWith(mockPatients);
        });
      });
  
      describe('getPatientById', () => {
        it('should retrieve a patient by ID', async () => {
          const mockPatient = { _id: '123', name: 'John Doe' };
          Patient.findById = jest.fn().mockResolvedValue(mockPatient);
  
          req.params.id = '123';
          await getPatientById(req, res);
  
          expect(res.json).toHaveBeenCalledWith(mockPatient);
        });
      });
  
      describe('updatePatient', () => {
        it('should update a patient successfully', async () => {
          const mockUpdatedPatient = { _id: '123', name: 'John Updated', age: 31 };
          Patient.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedPatient);
  
          req.params.id = '123';
          req.body = { name: 'John Updated', age: 31 };
          await updatePatient(req, res);
  
          expect(res.json).toHaveBeenCalledWith(mockUpdatedPatient);
        });
      });
  
      describe('deletePatient', () => {
        it('should delete a patient successfully', async () => {
          Patient.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: '123' });
  
          req.params.id = '123';
          await deletePatient(req, res);
  
          expect(res.json).toHaveBeenCalledWith({ message: 'Patient deleted successfully' });
        });
      });
    });
  
    describe('Test-related functions', () => {
      describe('getTestsForPatient', () => {
        it('should retrieve all tests for a patient', async () => {
          const mockTests = [
            { _id: '456', type: 'Blood Pressure', value: '120/80' },
            { _id: '789', type: 'Heart Rate', value: '72' }
          ];
          Test.find = jest.fn().mockReturnThis();
          Test.select = jest.fn().mockReturnThis();
          Test.sort = jest.fn().mockResolvedValue(mockTests);
  
          req.params.id = '123';
          await getTestsForPatient(req, res);
  
          expect(res.json).toHaveBeenCalledWith(mockTests);
        });
      });
  
      describe('updateTest', () => {
        it('should update a test successfully', async () => {
          const mockUpdatedTest = { _id: '456', type: 'Blood Pressure', value: '130/85' };
          Test.findByIdAndUpdate = jest.fn().mockResolvedValue(mockUpdatedTest);
  
          req.params.testId = '456';
          req.body = { value: '130/85' };
          await updateTest(req, res);
  
          expect(res.json).toHaveBeenCalledWith(mockUpdatedTest);
        });
      });
  
      describe('deleteTest', () => {
        it('should delete a test successfully', async () => {
          Test.findByIdAndDelete = jest.fn().mockResolvedValue({ _id: '456' });
  
          req.params.testId = '456';
          await deleteTest(req, res);
  
          expect(res.json).toHaveBeenCalledWith({ message: 'Test deleted successfully' });
        });
  
      });
  
      describe('getTestById', () => {
        it('should retrieve a test by ID', async () => {
          const mockTest = { _id: '456', type: 'Blood Pressure', value: '120/80' };
          Test.findById = jest.fn().mockResolvedValue(mockTest);
  
          req.params.testId = '456';
          await getTestById(req, res);
  
          expect(res.json).toHaveBeenCalledWith(mockTest);
        });
  
      });
    });
  });