const mongoose = require("mongoose")

const Schema = mongoose.Schema;
// this my user schema
const UserSchema = new Schema({
    name : {
        type:String,
       default:"Sparkle Noob 101"
    },
    username : {
        type:String,
        required:true,
        match: /^[a-zA-Z0-9]+$/, 
    },
    bio : {
        type:String,
       default:"Busy Sparkling! ttyl"
    },
    pfp :{
        type:String,
    },
    password:String,
});

module.exports = mongoose.model('User',UserSchema);