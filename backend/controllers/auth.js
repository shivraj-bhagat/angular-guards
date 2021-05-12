const User = require("../models/user");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');


exports.signup = (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            err: errors.array()[0].msg
        })
    }

    const user = new User(req.body);
    try {
        user.save((err, user) => {
            if(err) {
                console.log(err)
                return res.status(400).json({
                    err: "Not able to save user in db"
                })
            }
            res.json({
                name: user.name,
                email: user.email,
                id: user._id
            })
        })
    } catch(err) {
        return res.json({
            message: err.message
        })
    }
}

exports.signin = (req,res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({
            err: errors.array()[0].msg
        })
    }

    try {
        User.findOne({email}, (err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    err: "User email does not exists"
                })
            }

            if(!user.authenticate(password)) {
                return res.status(401).json({
                    err: "Email and password do not match"
                })
            }

            const token = jwt.sign({_id: user._id}, process.env.SECERT);

            res.cookie("token", token, {expire: new Date() + 9999});

            const { _id, name, email } = user;
            return res.json({
                token,
                user: { _id, name, email}
            });
        })
    } catch(err) {
        return res.json({
            message: err.message
        })
    }
}

exports.signout = (req,res) => {
    res.clearCookie("token");
    res.json({
        message: "User signout successfully"
    });
}

// protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECERT,
    algorithms: ['HS256'],
    userProperty: "auth"
})

// custom middlewares
exports.isAuthenticated = (req,res,next) => {
    let checker = req.profile && req.auth && req.profile.id == req.auth.id;
    if(!checker){
        return res.status(403).json({
            err: "ACCESS DENIED"
        });
    }
    next();
}