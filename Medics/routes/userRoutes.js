const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../errorHandling/catchAsync');
const User = require('../models/userSchema');
// const Contribute = require('../models/contributeSchema');

router.get('/register', (req, res) => {
    res.render('usersAuth/register')
});

router.post('/register', catchAsync(async(req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'You are registered!');
            res.redirect('/Contributes');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}));

router.get('/login', (req, res) => {
    res.render('usersAuth/login')
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'You have logged in!');
    const redirectUrl = req.session.returnTo || '/Contributes';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', "You have logged out!");
    res.redirect('/home')
});

// USER PROFILE

// router.get("/users/:id", function(req, res) {
//     User.findById(req.params.id, function(err, foundUser) {
//       if(err) {
//         req.flash("error", "Something went wrong.");
//         return res.redirect("/");
//       }
//       Contribute.find().where('author.id').equals(foundUser._id).exec(function(err, Contributes) {
//         if(err) {
//           req.flash("error", "Something went wrong.");
//           return res.redirect("/");
//         }
//         res.render("users/show", {user: foundUser, Contributes: Contributes});
//       })
//     });
//   });

module.exports = router;