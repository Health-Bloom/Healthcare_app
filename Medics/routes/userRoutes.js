const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const { storage } = require('../userAvatar/avatar.js');
const upload = multer({ storage });

const catchAsync = require('../errorHandling/catchAsync');

const user = require('../controllers/userControllers');

const { validateUser } = require('../middleware');

router.route('/register').post( validateUser, upload.array('image'), catchAsync(user.newUser));

router.route('/login').post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/' }), user.userLogin);

router.get('/logout', user.userLogout);

// USER PROFILE

router.get("/user/:id", user.userDetails);

module.exports = router;