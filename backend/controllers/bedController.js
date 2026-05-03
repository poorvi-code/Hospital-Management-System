const Bed = require('../models/Bed');

exports.getBeds = async (req, res) => {
  try {
    const beds = await Bed.find().sort({ bedNumber: 1 });
    res.json(beds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBed = async (req, res) => {
  const { isOccupied, patientName } = req.body;
  try {
    const bed = await Bed.findById(req.params.id);
    if (bed) {
      bed.isOccupied = isOccupied;
      bed.patientName = isOccupied ? patientName : '';
      bed.lastUpdated = Date.now();
      const updatedBed = await bed.save();
      res.json(updatedBed);
    } else {
      res.status(404).json({ message: 'Bed not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a helper to seed some beds if the collection is empty
exports.seedBeds = async (req, res) => {
  try {
    const count = await Bed.countDocuments();
    if (count === 0) {
      const initialBeds = [
        { bedNumber: 'ICU-101', roomType: 'ICU' },
        { bedNumber: 'ICU-102', roomType: 'ICU' },
        { bedNumber: 'WARD-201', roomType: 'General Ward' },
        { bedNumber: 'WARD-202', roomType: 'General Ward' },
        { bedNumber: 'EMR-001', roomType: 'Emergency' },
        { bedNumber: 'PVT-301', roomType: 'Private' },
      ];
      await Bed.insertMany(initialBeds);
      return res.json({ message: 'Beds seeded successfully' });
    }
    res.json({ message: 'Beds already exist' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
