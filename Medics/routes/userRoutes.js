const express = require('express');
const router = express.Router();
const passport = require('passport');

const catchAsync = require('../errorHandling/catchAsync');

const user = require('../controllers/userControllers');

router.route('/register')
    .get(user.registerForm)
    .post(catchAsync(user.newUser));

router.route('/login')
    .get(user.loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), user.userLogin);

router.get('/logout', user.userLogout);

// USER PROFILE

router.get("/users/:id", catchAsync(user.userDetails));

router.get("/users/:id/edit", catchAsync(user.editUserDetails));

module.exports = router;