const UserOTPVerification = require("./../models/UserOTPVerification")
const bcrypt = require("bcrypt")
const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

const sendOTPVerificationEmail = async({_id, email}, resolve) => {
    try {
        const otp = `${Math.floor(1000+Math.random()*9000)}`;
        const MailOptions ={
            from: process.env.MAIL_ACCOUNT,
            to: email,
            subject: "Verify your Email",
            html: `<p>nhập <b>${otp}</b> mã otp này để xác nhận danh tính của bạn<p>mã này sẽ hết hạn trong vòng1 giờ</p></p>`,
        };
        //mã hóa otp
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp,saltRounds);
        const newOTPVerification = await new UserOTPVerification({
            userId : _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            ExpireAt: Date.now() + 3600000,
        });
        //save OTP record 
       await newOTPVerification.save();
       await transporter.sendMail(MailOptions);
    resolve({
        status: "PENDING",
        message: "verification otp email sent",
        data:{
            userId:_id,
            email,
        },
       });
    } catch (error) {
        resolve({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = sendOTPVerificationEmail;