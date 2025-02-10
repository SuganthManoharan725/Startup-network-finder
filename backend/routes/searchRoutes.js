const express = require('express');
const router = express.Router();
const { handleSearchQuery } = require('../controllers/searchController');

// Handle search requests
router.post('/', handleSearchQuery);

module.exports = router;
