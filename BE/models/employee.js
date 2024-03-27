const mongoose = require('mongoose');

const  employeeSchema = new mongoose.Schema({
    firstName: {
        type:String,
        unique: false,
        required: true
    },
    lastName: {
        type:String,
        unique: false,
        required: true
    },
    phone: {
        type:Number,
        unique: false,
        required: true
    },
    department: {
        type:String,
        unique: false,
        required: true
    },
    email: {
        type:String,
        unique: false,
        required: true
    },
    address: {
        type:String,
        unique: false,
        required: true

    },
    image: {
        type: String,
        unique: false,
        required: false,
    }
},{
    timestamps : true,
    versionKey: false
})

module.exports = mongoose.model('Employee', employeeSchema);
