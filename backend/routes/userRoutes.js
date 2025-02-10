const express = require('express');
const { getUserCredits, rechargeCredits } = require('../controllers/userController');
const router = express.Router(); // Create the router instance


router.get('/:email/credits', getUserCredits);
router.post('/:email/recharge', rechargeCredits);

module.exports = router; 
