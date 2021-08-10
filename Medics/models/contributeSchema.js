const mongoose = require('mongoose');

const contributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    emailEntry: {
        type: String,
        required: true
    },
    medname: {
        type: String,
        required: true
    }
})

const Contribute = mongoose.model('Contribute', contributeSchema);

module.exports = Contribute;