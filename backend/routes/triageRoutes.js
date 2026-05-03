const express = require('express');
const router = express.Router();
const { processTriage, getTriageList } = require('../controllers/triageController');
const { protect } = require('../middleware/authMiddleware');

// Protect all triage routes
router.use(protect);

router.post('/assess', processTriage);
router.get('/list', getTriageList);

module.exports = router;
