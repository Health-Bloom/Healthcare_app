const mongoose = require('mongoose');

const contributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true,
        min: 0
    },
    medname: {
        type: String,
        required: true
    }
})

const Contribute = mongoose.model('Contribute', contributeSchema);

module.exports = Contribute;