const Doctor = require('../models/Doctor');

exports.getDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    next(error);
  }
};

exports.addDoctor = async (req, res, next) => {
  try {
    const doctor = new Doctor(req.body);
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    next(error);
  }
};
