const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Contribute = require('./models/contributeSchema');

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

app.get('/RuralHospitality', (req, res) => {
    res.render('RuralHospitality')
});

const port = 3000;

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})