const Contribute = require('../models/contributeSchema');

module.exports.index = async (req, res) => {
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

}

//SEARCH ALGORITHM

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//

module.exports.contributeMeds = (req, res) => {
    res.render('Contributes/new')
}

module.exports.newMedicine = async (req, res, next) => {
    const newContribute = new Contribute(req.body);
    newContribute.author = req.user._id;
    await newContribute.save();
    req.flash('success', 'New medicine added!');
    res.redirect(`/Contributes`)
}

module.exports.deleteMedicine = async (req, res) => {
    const { id } = req.params;
    await Contribute.findByIdAndDelete(id);
    req.flash('success', 'Medicine deleted')
    res.redirect('/Contributes');
}