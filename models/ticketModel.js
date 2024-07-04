const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    ticketId: {
        type: String,
        trim: true
    },
    seatNo:{
        type: Number,  
    },
    seatId:{
        type:String,
        trim: true
    },
    userId:{
        type:String,
        trim: true
    },
    movieId:{
        type:String,
        trim: true
    },
    totalPrice:{
        type: Number,
        default: false
    },
    isPayment:{
        type: Boolean,
        default: false
    },
    showtime:{
        type:String,
        trim: true
    },
    isDelete: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("tickets", ticketSchema );