const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    movieId: {
        type: String,
        trim: true
    },
    showtime:{
        type: String,
        enum: ["11", "1", "10"],
        trim: true
    },
    movieTitle:{
        type: String,
        trim: true
    },
    movieHr:{
        type: String,
        trim: true
    },
    movieBannerImg:{
        type: String,
        trim: true
    },
    moviePrice:{
        type: String,
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

module.exports = mongoose.model("movies", MovieSchema );