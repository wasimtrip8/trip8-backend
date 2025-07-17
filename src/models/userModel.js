const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const UserSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    role: { type: String, enum: ['admin', 'customer','vendor', 'influencer'], default: 'customer' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);