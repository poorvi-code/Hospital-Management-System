const express = require('express');
const router = express.Router();
const { getBeds, updateBed, seedBeds } = require('../controllers/bedController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/', getBeds);
router.post('/seed', seedBeds);
router.put('/:id', updateBed);

module.exports = router;
