//import
const express = require('express');
const router = express.Router();
//import controller
const {register,login,currentUser} = require('../controllers/conAuth');

router.post('/register', register);
router.post('/login', login);
router.post('/current-user', currentUser);
router.post('/current-admin', currentUser);

module.exports = router;