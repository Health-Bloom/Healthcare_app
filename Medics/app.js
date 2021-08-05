// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// }

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Contribute = require('./models/contributeSchema');
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

app.get('/', (req, res) => {
    res.render('home')
});

app.get('/register', (req, res) => {
    res.render('usersAuth/register')
});

app.get('/login', (req, res) => {
    res.render('usersAuth/login')
});

app.get('/logout', (req, res) => {
    res.render('home')
});

app.get('/Contributes', async (req, res) => {
    const Contributes = await Contribute.find({})
    res.render('Contributes/index', { Contributes })
});

app.get('/Contributes/new', (req, res) => {
    res.render('Contributes/new')
});

app.post('/Contributes', async (req, res) => {
    const newContribute = new Contribute(req.body);
    await newContribute.save();
    res.redirect(`/Contributes`)
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


const port = 3000;

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})