if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const ExpressError = require('./errorHandling/ExpressError');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/userSchema');

const contributeRoutes = require('./routes/contributeRoutes');
const userRoutes = require('./routes/userRoutes');

mongoose.connect('mongodb://localhost:27017/HealthCare', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database connected")
    })
    .catch(err => {
        console.log("Database connection error!!")
        console.log(err)
    })

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
    secret: 'none',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

//API routes start

app.use('/Contributes', contributeRoutes)

app.use('/', userRoutes)

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/HealthCheckup', (req, res) => {
    res.render('HealthCheckup')
});

app.get('/Pollution',async (req, res) => {
    res.render('Pollution')
});

app.get('/earthquakes',(req, res) => {
    res.render('earthquakes')
});

//error handling for all the routes

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

//error handling template display

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Looks like you are lost!'
    res.status(statusCode).render('error', { err ,statusCode})
})

//port listening 3000

const port = 3000;

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})