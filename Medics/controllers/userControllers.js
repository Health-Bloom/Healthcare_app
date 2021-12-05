const User = require('../models/userSchema');

const Contribute = require('../models/contributeSchema');

module.exports.newUser = async(req, res) => {
    try {
        const { email, username, password } = req.body;
        images = req.files.map(f => ({ url: f.path, filename: f.filename }));
        const user = new User({ email, username, images });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'You are registered as ' + username);
            res.redirect('/');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/');
    }
}

module.exports.userLogin = (req, res) => {
    req.flash('success', 'You have logged in as ' + req.body.username);
    res.redirect('/');
}

module.exports.userLogout = (req, res) => {
    req.logout();
    req.flash('success', "You have logged out!");
    res.redirect('/')
}

// USER PROFILE

module.exports.userDetails = (req, res) => {
        User.findById(req.params.id, function(err, foundUser) {
          if(err) {
            req.flash("error", "Something went wrong.");
            return res.redirect("/");
          }
          Contribute.find().where('author').equals(foundUser._id).exec(function(err, Contributes) {
            if(err) {
              req.flash("error", "Something went wrong.");
              return res.redirect("/");
            }
            res.render("user/show", {user: foundUser, Contributes: Contributes});
          })
        });
    }