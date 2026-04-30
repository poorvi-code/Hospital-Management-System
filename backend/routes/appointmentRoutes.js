const express = require('express');
const router = express.Router();
const { getAppointments, bookAppointment, deleteAppointment } = require('../controllers/appointmentController');

router.route('/')
  .get(getAppointments)
  .post(bookAppointment);

router.route('/:id')
  .delete(deleteAppointment);

module.exports = router;
