//import
const express = require('express');
const { authCheck } = require('../middlewares/authCheck.js');
const router = express.Router();
//import controller
const { changeOrderStatus, getOrderAdmin } = require('../controllers/conAdmin');

router.put('/admin/order-status', authCheck, changeOrderStatus);
router.get('/admin/orders', authCheck, getOrderAdmin);

module.exports = router;