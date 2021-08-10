// if (process.env.NODE_ENV !== "production") {
//     require('dotenv').config();
// 

// const bcrypt = require('bcrypt');
// const users=[];
// // const passport=require('passport');
// // const initialisePassport=require('./views/usersAuth/passport-config')
// // initialisePassport(passport)


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

//----------------------CHANGES
// app.post('/register',async(req,res)=>{
//     try{
//     const hashedPassword=await bcrypt.hash(req.body.password,5);
//     users.push({
//         id:Date.now().toString(),
//         username:req.body.username,
//         email:req.body.email,
//         password:hashedPassword,
//       });
//       res.redirect('/login');//so that user can login with the email after registering
//     }
//     catch{
//         res.redirect('/register');//incase of failure of registration
//     }
// })
//------------------------
app.post('/register', (req, res) => {
    res.send(req.body)
});

app.get('/login', (req, res) => {
    res.render('usersAuth/login')
});

app.post('/login', (req, res) => {
    res.send(req.body)
});

app.get('/logout', (req, res) => {
    res.render('home')
});

app.get('/Contributes', async (req, res) => {
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

app.get('/Hospital',(req, res) => {
    res.render('Hospital')
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const port = 3000;

app.listen(port, () => {
    console.log(`Serving on port ${port}`)
})