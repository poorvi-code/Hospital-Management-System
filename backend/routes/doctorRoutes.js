const express = require('express');
const router = express.Router();
const { getDoctors, addDoctor, deleteDoctor } = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All doctor routes require login
router.use(protect);

router.route('/')
  .get(getDoctors)
  .post(authorize('admin'), addDoctor); // Only Admin can add doctors

router.route('/:id')
  .delete(authorize('admin'), deleteDoctor); // Only Admin can remove doctors

module.exports = router;
