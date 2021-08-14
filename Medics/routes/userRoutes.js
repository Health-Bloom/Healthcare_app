const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../errorHandling/catchAsync');
const User = require('../models/userSchema');
// const ExpressError = require('../errorHandling/ExpressError');

router.get('/register', (req, res) => {
    res.render('usersAuth/register')
});

//----------------------CHANGES
// router.post('/register',async(req,res)=>{
//     try{
//     const hashedPassword=await bcrypt.hash(req.body.password,5);
//     users.push({
//         id:Date.now().toString(),
//         username:req.body.username,
//         email:req.body.email,
//         password:hashedPassword,
//       });
//       res.redirect('/login');//so that user can login with the email after registering
//     }
//     catch{
//         res.redirect('/register');//incase of failure of registration
//     }
// })
//------------------------
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

module.exports = router;