const express = require('express');
const router = express.Router();
// const { medicineSchema } = require('../joiSchema.js');
const catchAsync = require('../errorHandling/catchAsync');
const ExpressError = require('../errorHandling/ExpressError');
const Contribute = require('../models/contributeSchema');
const { isLoggedIn } = require('../middleware');

// const validateMedicine = (req, res, next) => {
//     const { error } = medicineSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

router.get('/', catchAsync(async (req, res) => {
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');

        const Contributes = await Contribute.find({medname: regex})
        if(Contributes < 1) {
            noMatch = "No medicine found with the name : "+req.query.search;
        }
        res.render('Contributes/index', { Contributes , noMatch: noMatch})
    } else {
        const Contributes = await Contribute.find({})
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

router.post('/', isLoggedIn,catchAsync(async (req, res, next) => {
    // if (!req.body.Contribute) throw new ExpressError('Invalid Medicine Details', 400);
    const newContribute = new Contribute(req.body);
    await newContribute.save();
    req.flash('success', 'New medicine added!');
    res.redirect(`/Contributes`)
}));

module.exports = router;