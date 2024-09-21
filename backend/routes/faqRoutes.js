const express = require('express');
const { getAllFAQs, addFAQ, updateFAQ, deleteFAQ } = require('../controllers/faqController');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

// Public Routes
router.get('/', getAllFAQs);

// Protected Routes
router.post('/', authenticateJWT, addFAQ);
router.put('/:id', authenticateJWT, updateFAQ);
router.delete('/:id', authenticateJWT, deleteFAQ);

module.exports = router;
