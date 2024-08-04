const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const authController = require('../controllers/authController')

const router = express.Router();

router.post('/signup', authController.signupUser);

router.post('/signin', authController.signinUser);

router.get('/verify-token', verifyToken, authController.verifyToken)

module.exports = router;
