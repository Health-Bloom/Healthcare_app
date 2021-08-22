const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contributeSchema = new Schema({
    medname: {
        type: String,
        required: true
    },
    medAmount:{
        type: Number,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Contribute = mongoose.model('Contribute', contributeSchema);

module.exports = Contribute;