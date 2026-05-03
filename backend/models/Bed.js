const mongoose = require('mongoose');

const bedSchema = new mongoose.Schema({
  bedNumber: { type: String, required: true, unique: true },
  roomType: { 
    type: String, 
    enum: ['General Ward', 'ICU', 'Emergency', 'Private'], 
    default: 'General Ward' 
  },
  isOccupied: { type: Boolean, default: false },
  patientName: { type: String, default: '' },
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Bed', bedSchema);
