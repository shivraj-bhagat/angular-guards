const express = require('express')
const router = express.Router();
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserByToken } = require('../controllers/user');


router.get("/user", isSignedIn, getUserByToken, isAuthenticated, (req,res) => {
  res.json(req.profile)
})

module.exports = router;