const express = require('express');
const authController = require('./auth.controller');
const auth = require("../../middleware/auth"); 
const router = express.Router();

router.post('/login', authController.login);
router.post('/register', authController.register);
router.get('/me', auth, authController.me);


module.exports = router;