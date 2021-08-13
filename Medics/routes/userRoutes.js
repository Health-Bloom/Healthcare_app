const express = require('express');
const router = express.Router();
// const catchAsync = require('../errorHandling/catchAsync');
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
router.post('/register', (req, res) => {
    res.send(req.body)
});

router.get('/login', (req, res) => {
    res.render('usersAuth/login')
});

router.post('/login', (req, res) => {
    res.send(req.body)
});

router.get('/logout', (req, res) => {
    res.render('home')
});

module.exports = router;