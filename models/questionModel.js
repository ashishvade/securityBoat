// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const testSchema = new Schema({
//     questionId: {
//         type: String,
//         trim: true
//     },
//     courseId: {
//         type: String,
//         trim: true
//     },
//     courseTitle: {
//         type: String,
//         trim: true
//     },
//     question: {
//         type: String,
//         trim: true
//     },
//     questionKey: {
//         type: String,
//         trim: true
//     },
//     questionType: {
//         type: String,
//         trim: true,
//         enum: ["mcq", "truefalse"]
//     },
//     options: {
//         type: Array
//     },
//     rightAnswer: {
//         type: String,
//         trim: true
//     },
//     order: {
//         type: Number
//     },
//     isDelete: {
//         type: Boolean,
//         default: false
//     }
// },
//     {
//         timestamps: true
//     }
// );

// module.exports = mongoose.model("tests", testSchema);