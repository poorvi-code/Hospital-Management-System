const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Patient = require('./models/Patient');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    await Patient.deleteMany();
    await Doctor.deleteMany();
    await Appointment.deleteMany();

    const createdDoctors = await Doctor.insertMany([
      { name: 'Dr. Alice Smith', specialization: 'Cardiology', contact: '123-456-7890' },
      { name: 'Dr. Bob Jones', specialization: 'Neurology', contact: '098-765-4321' }
    ]);

    const createdPatients = await Patient.insertMany([
      { name: 'John Doe', age: 30, gender: 'Male', contact: '555-1234', address: '123 Main St' },
      { name: 'Jane Doe', age: 28, gender: 'Female', contact: '555-5678', address: '456 Oak St' }
    ]);

    await Appointment.insertMany([
      { patient: createdPatients[0]._id, doctor: createdDoctors[0]._id, date: new Date(Date.now() + 86400000), notes: 'Regular checkup' }
    ]);

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error with data seed: ${error.message}`);
    process.exit(1);
  }
};

seedData();
