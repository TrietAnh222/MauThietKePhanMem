const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userOTPVerificationSchema = new Schema({
    userId: {type:String},
    otp: {type:String},
    createdAt: {type:Date},
    ExpireAt: {type:Date}
});

const userOTPVerification = mongoose.model(
    "userOTPVerification",
    userOTPVerificationSchema
);

module.exports = userOTPVerification;