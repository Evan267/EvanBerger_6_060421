const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

const logInLimiter = rateLimit({
    windowMs : 3 * 60 * 1000, 
    max : 3,
    message : "trop de tentative de connexion à la suite."
})

const checkPassword = require('../middleware/checkPassword');

const authCtrl = require('../controllers/auth');

router.post('/signup', checkPassword, authCtrl.signUp);
router.post('/login', logInLimiter, authCtrl.logIn);

module.exports = router;