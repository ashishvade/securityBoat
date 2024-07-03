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
    seatBook:{
        type: Boolean,
        trim: false
    },
    totalPrice:{
        type: Boolean,
        default: false
    },
    isPayment:{
        type: Boolean,
        default: false
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