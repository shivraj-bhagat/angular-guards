const User = require("../models/user");

exports.getUserByToken = (req, res, next) => {
    try {
        User.findOne({_id: req.auth._id}, (err, user) => {
            if(err || !user) {
                return res.status(400).json({
                    err: "User does not exists"
                })
            }
            const { _id, name, email } = user;

            req.profile = {
                _id, name, email
            }

            next();
        })  
    } catch(err) {
        return res.json({
            message: err.message
        })
    }
};