const express = require('express');
const router = express.Router();
const {authCheck} = require('../middlewares/authCheck');
const {getAllUsers} = require('../controllers/conUser');


router.get('/users', authCheck, getAllUsers);
// router.post('/change-status');
// router.post('/change-role');

// router.post('/user/cart');
// router.get('/user/cart');
// router.delete('/user/cart');

// router.post('/user/address');

// router.post('/user/order');
// router.get('/user/order');

module.exports = router;