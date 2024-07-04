const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seatsSchema = new Schema({

    seatId: {
        type: String,
        trim: true
    },
    seatNo:{
        type: Number,  
    },
    movieId:{
        type: String,
        trim: true
    },
    showtimes:{
        type: String,
        trim: true
    },
  screenNo: { type:Number, required: true },

    isDelete: {
        type: Boolean,
        default: false
    },

    isBooked: { type: Boolean, default: false },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("seats", seatsSchema );