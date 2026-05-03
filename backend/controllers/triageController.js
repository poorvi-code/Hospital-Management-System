const Triage = require('../models/Triage');

// Simple AI logic to categorize urgency
const analyzeSymptoms = (symptoms) => {
  const s = symptoms.toLowerCase();
  
  const emergencyKeywords = ['chest pain', 'breathing', 'bleeding', 'unconscious', 'stroke', 'heart attack'];
  const urgentKeywords = ['fever', 'fracture', 'severe pain', 'vomiting', 'headache'];

  if (emergencyKeywords.some(key => s.includes(key))) {
    return { priority: 'Emergency', dept: 'ER / Cardiology' };
  } else if (urgentKeywords.some(key => s.includes(key))) {
    return { priority: 'Urgent', dept: 'Urgent Care' };
  }
  
  return { priority: 'Routine', dept: 'General Medicine' };
};

exports.processTriage = async (req, res) => {
  const { patientName, symptoms } = req.body;

  try {
    const { priority, dept } = analyzeSymptoms(symptoms);
    
    const assessment = await Triage.create({
      patientName,
      symptoms,
      priority,
      recommendedDepartment: dept
    });
    
    res.status(201).json(assessment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTriageList = async (req, res) => {
  try {
    const list = await Triage.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
