const express = require('express');
const router = express.Router();
const passport = require('passport');
const multer = require('multer');
const { storage } = require('../userAvatar/avatar.js');
const upload = multer({ storage });

const catchAsync = require('../errorHandling/catchAsync');

const user = require('../controllers/userControllers');

router.route('/register')
    .get(user.registerForm)
    .post( upload.array('image'), catchAsync(user.newUser));

router.route('/login')
    .get(user.loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/' }), user.userLogin);

router.get('/logout', user.userLogout);

// USER PROFILE

router.get("/user/:id", user.userDetails);

router.get("/user/:id/edit", user.editUserDetails);

module.exports = router;