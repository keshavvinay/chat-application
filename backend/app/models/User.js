'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let userSchema = new Schema({
    userId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    userName: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: 'passskdajakdjkadsj'
    },
    email: {
        type: String,
        default: ''
    },
    mobileNumber: {
        type: Number,
        default: 0
    },
    createdOn: {
        type: Date,
        default: ""
    },
    validationToken: { //will be used while resetting password
        type: String,
        default: ''
    }


})


mongoose.model('User', userSchema);