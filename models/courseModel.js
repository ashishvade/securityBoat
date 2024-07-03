// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const courseSchema = new Schema({
//     courseId: {
//         type: String,
//         trim: true
//     },
//     title: {
//         type: String,
//         trim: true
//     },
//     titleKey: {
//         type: String,
//         trim: true
//     },
//     description: {
//         type: String,
//         trim: true
//     },
//     shortDescription: {
//         type: String,
//         trim: true
//     },
//     titleHeader: {
//         type: String,
//         trim: true
//     },
//     rating:{
//         type: String,
//         trim: true
//     },
//     imageURL: {
//         type: Array
//     },
//     videoURL: {
//         type: Array
//     },
//     priorityNo: {
//         type: Number
//     },
//     category: {
//         type: String,
//         trim: true
//     },
//     keyConcepts: {
//         type: Array
//     },
//     themeColor: {
//         type: String,
//         trim: true
//     },
//     isDelete: {
//         type: Boolean,
//         default: false
//     },
// },
//     {
//         timestamps: true
//     }
// );

// module.exports = mongoose.model("courses", courseSchema);