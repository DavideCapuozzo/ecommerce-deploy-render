const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
            ref: 'User',
            unique: true,
            require: [true, "Name is required"],
            minlength: [2, "Name too short"],
            maxlength: [50, "Name too long"],
            match: [/^[a-zA-Z\s'-]+$/, 'Invalid name characters']
        },

        email:{
            type:String,
            unique: true,
            ref:'Mail',
            require: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, 'is invalid'],
        },

        password:{
            type: String,
            ref: 'Password',
            require: [true, "Password is required"],
        },

        role:{
            type: String,
            default: 'user'
        },
    }
)

module.exports = mongoose.model('User', UserSchema);