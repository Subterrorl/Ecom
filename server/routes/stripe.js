//import
const express = require('express');
const { authCheck } = require('../middlewares/authCheck.js');
const { payment } = require('../controllers/conStripe.js');
const router = express.Router();
//import controller




router.post('/user/create-payment-intent', authCheck, payment);


module.exports = router;