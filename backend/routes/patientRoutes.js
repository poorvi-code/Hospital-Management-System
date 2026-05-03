const express = require('express');
const router = express.Router();
const { getPatients, addPatient, updatePatient, deletePatient } = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All patient routes require login
router.use(protect);

router.route('/')
  .get(getPatients) // Doctors, Nurses, and Admins can view
  .post(authorize('admin', 'doctor', 'nurse'), addPatient);

router.route('/:id')
  .put(authorize('admin', 'doctor', 'nurse'), updatePatient)
  .delete(authorize('admin'), deletePatient); // Only Admins can delete

module.exports = router;
