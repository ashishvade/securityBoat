const ticketModel = require("../models/ticketModel");
const apiResponse = require("../helpers/apiResponse");
const movieModel = require("../models/MovieModel");

const seat = require("../models/seatsModel")

class clsBook {

    async BookTicket(req, res) {

        try {

            let {
                seatNo,
                userId,
                movieId,
                // isPayment,
                showtime,
                screenNo
            } = req.body;

            let seatId = "Seat_" + seatNo + screenNo;
            const checkSeat = await seat.findOne({ seatId: { $in: seatId }, isBooked: true });

            if (checkSeat) {
                return apiResponse.alreadyExist(res, "Sorry seat ia unavailable", "", "", "");
            } else {

                let seatAdd = new seat({
                    seatId: seatId,
                    seatNo,
                    movieId,
                    screenNo,
                    showtime
                });
                console.log("seatAdded", seatAdd)
                let seatRes = await seatAdd.save();

                const seatBook = await seat.updateMany({ seatId: { $in: seatId } }, { isBooked: true })


                const movieData = await movieModel.findOne()


                let ticketId = "Tickt_" + seatNo + new Date().getTime();


                let ticketPost = new ticketModel({
                    ticketId: ticketId,
                    seatNo,
                    userId,
                    movieId,
                    totalPrice: movieData.moviePrice,
                    isPayment: true,
                    showtime,
                    screenNo
                });

                let ticketRes = await ticketPost.save();

                return apiResponse.successResponse(res, "ticket created successfully", ticketRes, "", "");

            }

        } catch (error) {

            console.log(error);

            return apiResponse.errorResponse(res, error.message, "", "", error);

        }

    }


}

module.exports = new clsBook();