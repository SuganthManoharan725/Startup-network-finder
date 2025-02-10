const express = require('express');
const {handleRechargeEmail}  = require('../controllers/emailController')
const router = express.Router();
// Route to handle the recharge email
router.post('/recharge', handleRechargeEmail);

module.exports = router