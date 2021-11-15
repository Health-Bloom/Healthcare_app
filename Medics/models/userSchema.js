const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// const ImageSchema = new Schema({
//     url: String,
//     filename: String
// });

// ImageSchema.virtual('thumbnail').get(function () {
//     return this.url.replace('/upload', '/upload/w_200');
// });

const UserSchema = new Schema({
    images:[
        {
           url: String,
           filename: String
    }
],
    email: {
        type: String,
        required: true,
    },
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);