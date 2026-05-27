const express = require('express');
const authController = require('./auth.controller');
const auth = require("../../middleware/auth"); 
const role = require('../../middleware/role');
const router = express.Router();

router.post('/login', authController.login);
// router.post('/register',auth , role('admin') ,  authController.register);
router.get('/me', auth, authController.me);


module.exports = router;