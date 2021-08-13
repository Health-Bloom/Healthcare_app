// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();

// const bcrypt = require('bcrypt');
// const users=[];
// // const passport=require('passport');
// // const initialisePassport=require('./views/usersAuth/passport-config')
// // initialisePassport(passport)


const express = require('express');
const app = express();
const path = require('path');
// const { medicineSchema } = require('./joiSchema.js');
// const catchAsync = require('./errorHandling/catchAsync');
const ExpressError = require('./errorHandling/ExpressError');
const mongoose = require('mongoose');
// const Contribute = require('./models/contributeSchema');

const contributeRoutes = require('./routes/contributeRoutes');
const userRoutes = require('./routes/userRoutes');

// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

mongoose.connect('mongodb://localhost:27017/Medics', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

//validating the medicines parameters

// const validateMedicine = (req, res, next) => {
//     const { error } = medicineSchema.validate(req.body);
//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }

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
    // var location = await geocoder.reverseGeocode({
    //     query: [88.302491, 22.504070]
    //   }).send()
    
    //   console.log(location.body.features);
        // .then(response => {
        //   // GeoJSON document with geocoding matches
        //   const match = response.body;
        // });
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