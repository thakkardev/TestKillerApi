const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 2
    },
    active: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        default: 'student'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    batch: {
        type: String
    },
    collegeName: {
        type: String
    },
    contactNo: {
        type: String 
    }
})
module.exports=mongoose.model("user",userSchema)