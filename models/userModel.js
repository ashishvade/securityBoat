const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, trim: true },
    email: { type: String, trim: true },
    mobile: { type: String, required: true, unique: true },
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dateOfBirth: {
        type: Date
    },
    password: { type: String },
    token: { type: String, default: null, trim: true },
    isDelete: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ["admin", "users"]
    },

}, { timestamps: true });

module.exports = mongoose.model("users", UserModelSchema);
