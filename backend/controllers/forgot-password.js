const User = require("../models/user");
const ForgotPasswordToken = require("../models/forgot-password");
const { validationResult } = require('express-validator');
const nodemailer = require("nodemailer");
const crypto = require("crypto");

exports.forgotpassword = (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            err: errors.array()[0].msg
        })
    }

    try {
        crypto.randomBytes(64, (err, buff) => {
            if(err) {
                console.log(err);
                throw err;
            }
            const token = buff.toString("hex");
            User.findOne({email: req.body.email})
            .then((user) => {
                if(!user) {
                    return res.status(422).json({
                        err: "Account with this email does not exists"
                    })
                }

                ForgotPasswordToken.find({_userId: user._id}, (err, existToken) => {
                    if(!err && existToken.length != 0) {
                        existToken.forEach(token => {
                            token.remove()
                        })
                    }
                })

                let forgotPasswordObj = new ForgotPasswordToken();
                forgotPasswordObj._userId = user._id;
                forgotPasswordObj.resettoken = token;

                forgotPasswordObj.save((err, tokenObj) => {
                    if(err) {
                        console.log(err)
                        return res.status(400).json({
                            err: "Not able to reset the password"
                        })
                    }

                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        secure: true, // use SSL
                        auth: {
                          user: process.env.EMAIL, // generated ethereal user
                          pass: process.env.PASSWORD, // generated ethereal password
                        },
                    });
                    
                    // send mail with defined transport object
                    let mailOptions = {
                        from: ` No reply ${process.env.EMAIL}`, // sender address
                        to: user.email, // list of receivers
                        subject: "Forget Password", // Subject line
                        html: `<p>If you are receiving this because you (or someone else) have requested the reset of the password for your account. <br><br>
                        Please <a href="http://localhost:4200/forgot-password/${tokenObj.resettoken}">click me</a> or paste this into your browser to complete the process:<br><br>
                        http://localhost:4200/forgot-password/${tokenObj.resettoken} <br><br>
                        If you did not request this, please ignore this email and your password will remain unchanged.<br></p>`
                    };
                    
                    transporter.sendMail(mailOptions, (err, info) => {
                        if(err) {
                            console.log(err);
                            throw err;
                        }

                        // console.log(info)
                        return res.json({
                            message: 'Please check your mail to reset password'
                        });
                    })
                })
            })
        })

    } catch(err) {
        return res.json({
            message: err.message
        })
    }
}

exports.updatedforgetpassword = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            err: errors.array()[0].msg
        })
    }

    try {
        ForgotPasswordToken.findOne({resettoken: req.params.forgotpasswordtoken}, (err, tokenObj) => {
            if(!tokenObj) {
                return res.status(422).json({
                    err: "Token is invalid, please generate email token again"
                })
            }
            
            User.findOne({_id: tokenObj._userId}, (err, user) => {
                if(!user) {
                    return res.status(409).json({
                        err: 'User does not exists'
                    })
                }
                user.password = req.body.password;
                user.save((err) => {
                    if(err) {
                        console.log(err)
                        return res.status(400).json({
                            err: "Not able to save user in db"
                        })
                    } else {
                        tokenObj.remove();
                        return res.json({
                            message: 'Password reset successfully'
                        })
                    }
                })
            })
        })

    } catch(err) {
        return res.json({
            message: err.message
        })
    }
}