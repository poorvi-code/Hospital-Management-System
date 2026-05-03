const express = require('express');
const router = express.Router();
const { getAppointments, bookAppointment, deleteAppointment } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// All appointment routes require login
router.use(protect);

router.route('/')
  .get(getAppointments)
  .post(bookAppointment); // Everyone logged in can book (Patient/Nurse/Receptionist)

router.route('/:id')
  .delete(deleteAppointment);

module.exports = router;
