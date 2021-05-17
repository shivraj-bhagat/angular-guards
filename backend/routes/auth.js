const express = require('express')
const router = express.Router();
const User = require("../models/user"); 
const { signout, signup, signin, isSignedIn, isAuthenticated } = require('../controllers/auth');
const { body, validationResult } = require('express-validator');

router.post("/signup", [
    body("name").isLength({ min: 3 }).withMessage('name should be atleast 3 char'),
    body("email").isEmail().withMessage('Email is required').custom(value => {
        return User.findOne({email: value}).then(user => {
          if (user) {
            return Promise.reject('E-mail already in use');
          }
        });
      }),
    body("password").isLength({min: 8}).withMessage('pasword should be atleast 8 char'),
], signup);

router.post("/signin", [
  body("email").isEmail().withMessage('email is required'),
  body("password").isLength({min: 8}).withMessage('pasword should be atleast 8 char'),
], signin);

router.get("/signout", signout);

module.exports = router;