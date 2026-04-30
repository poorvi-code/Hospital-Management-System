const express = require('express');
const router = express.Router();
const { getPatients, addPatient, updatePatient, deletePatient } = require('../controllers/patientController');

router.route('/')
  .get(getPatients)
  .post(addPatient);

router.route('/:id')
  .put(updatePatient)
  .delete(deletePatient);

module.exports = router;
