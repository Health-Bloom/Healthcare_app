const { medicineSchema,userSchema } = require('./joiSchema.js');
const ExpressError = require('./errorHandling/ExpressError');
const Contribute = require('./models/contributeSchema');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/Contributes');
    }
    next();
}

module.exports.validateMedicine = (req, res, next) => {
    const { error } = medicineSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateUser = (req, res, next) => {
    const { error } = req.body;
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const contribute = await Contribute.findById(id);
    if (!contribute.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/Contributes`);
    }
    next();
}