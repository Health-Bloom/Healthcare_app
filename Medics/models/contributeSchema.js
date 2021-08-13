const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contributeSchema = new Schema({
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
    },
    medAmount:{
        type: Number,
        required: true
    }
})

const Contribute = mongoose.model('Contribute', contributeSchema);

module.exports = Contribute;