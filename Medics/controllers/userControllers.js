const User = require('../models/userSchema');

module.exports.registerForm = (req, res) => {
    res.render('usersAuth/register')
}

module.exports.newUser = async(req, res) => {
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
}

module.exports.loginForm = (req, res) => {
    res.render('usersAuth/login')
}

module.exports.userLogin = (req, res) => {
    req.flash('success', 'You have logged in!');
    const redirectUrl = req.session.returnTo || '/Contributes';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
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
          Contribute.find().where('author.id').equals(foundUser._id).exec(function(err, Contributes) {
            if(err) {
              req.flash("error", "Something went wrong.");
              return res.redirect("/");
            }
            res.render("users/show", {user: foundUser, Contributes: Contributes});
        })
    });
}


module.exports.editUserDetails = (req, res) => {
        User.findById(req.params.id, function(err, foundUser) {
          if(err) {
            req.flash("error", "Something went wrong.");
            return res.redirect("/");
          }
          Contribute.find().where('author.id').equals(foundUser._id).exec(function(err, Contributes) {
            if(err) {
              req.flash("error", "Something went wrong.");
              return res.redirect("/");
            }
            res.render("users/show", {user: foundUser, Contributes: Contributes});
        })
    });
}

