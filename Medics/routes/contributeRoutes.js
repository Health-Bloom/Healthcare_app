const express = require('express');
const router = express.Router();
const { medicineSchema } = require('../joiSchema.js');
const catchAsync = require('../errorHandling/catchAsync');
const ExpressError = require('../errorHandling/ExpressError');
const Contribute = require('../models/contributeSchema');
const { isLoggedIn,validateMedicine,isAuthor } = require('../middleware');



router.get('/', catchAsync(async (req, res) => {
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');

        const Contributes = await Contribute.find({medname: regex}).populate('author');
        if(Contributes < 1) {
            noMatch = "No medicine found with the name : "+req.query.search;
        }
        res.render('Contributes/index', { Contributes , noMatch: noMatch})
    } else {
        const Contributes = await Contribute.find({}).populate('author');
        res.render('Contributes/index', { Contributes , noMatch: noMatch})
    }

}));

//search algorithm

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get('/new', isLoggedIn,(req, res) => {
    res.render('Contributes/new')
});

router.post('/', isLoggedIn,validateMedicine,catchAsync(async (req, res, next) => {
    // if (!req.body.Contribute) throw new ExpressError('Invalid Medicine Details', 400);
    const newContribute = new Contribute(req.body);
    newContribute.author = req.user._id;
    await newContribute.save();
    req.flash('success', 'New medicine added!');
    res.redirect(`/Contributes`)
}));

// router.delete('/', isLoggedIn,isAuthor, catchAsync(async (req, res) => {
//     // const med = req.body.id;
//     console.log(req.body);
//     // await Contribute.findByIdAndDelete(id);
//     req.flash('success', 'Medicine deleted')
//     // res.redirect('/Contributes');
//     res.send(req.body)
// }));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Contribute.findByIdAndDelete(id);
    req.flash('success', 'Medicine deleted')
    res.redirect('/Contributes');
}));

module.exports = router;