const mongoose = require('mongoose');

const triageSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  symptoms: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ['Emergency', 'Urgent', 'Routine'], 
    default: 'Routine' 
  },
  recommendedDepartment: { type: String },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Triage', triageSchema);
