const mongoose = require('mongoose');


const forgottokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    resettoken: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 900 },
});


module.exports = mongoose.model('ForgotPasswordToken', forgottokenSchema);