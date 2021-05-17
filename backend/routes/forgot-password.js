const express = require('express')
const router = express.Router();
const User = require('../models/user');
const ForgetPassword = require('../models/forgot-password');
const { forgotpassword, updatedforgetpassword } = require("../controllers/forgot-password");
const { body, validationResult } = require('express-validator');

router.post("/forgot-password", [
  body("email").isEmail().withMessage('Email is required')
], forgotpassword);

router.post("/forgot-password/:forgotpasswordtoken", [
  body("password").isLength({min: 8}).withMessage('pasword should be atleast 8 char')
], updatedforgetpassword)

module.exports = router;