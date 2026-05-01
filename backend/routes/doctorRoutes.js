const express = require('express');
const router = express.Router();
const { getDoctors, addDoctor, deleteDoctor } = require('../controllers/doctorController');

router.route('/')
  .get(getDoctors)
  .post(addDoctor);

router.route('/:id')
  .delete(deleteDoctor);

module.exports = router;
