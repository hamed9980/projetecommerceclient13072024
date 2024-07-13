const mongoose = require('mongoose');
// Schema for users of app
const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name:{
        type:String,
        required:true
    },
    user_email: {
        type: String,
        required: true,
        unique: true,
    },
    user_password:{
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports=UserSchema;
