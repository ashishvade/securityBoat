const ticketModel = require("../models/ticketModel");
const apiResponse = require("../helpers/apiResponse");
const movieModel = require("../models/MovieModel");

const seat = require("../models/seatsModel")

class clsBook {

    async BookTicket(req, res) {

        try {

            let {
                seatNos,
                userId,
                movieId,
                showtime,
                screenNo
            } = req.body;

            let response = [];

            let allSeatsAvailable = true;
            
             
            for (let i = 0; i < seatNos.length; i++) {
                let seatNo = seatNos[i];
                let seatId = "Seat_" + seatNo + screenNo;

                const checkSeat = await seat.findOne({ seatId: seatId, isBooked: true });

                if (checkSeat) {
                    allSeatsAvailable = false;
                    response.push({ seatNo: seatNo, message: `Sorry, seat ${seatNo} is already booked.` });
                   
                }else{

                }
            }

            if (!allSeatsAvailable) {

                return apiResponse.alreadyExist(res, "Some seats are not available", "", "", response);
            }

            for (let i = 0; i <seatNos.length; i++) {

                let seatNo=seatNos[i];

                let seatId = "Seat_" + seatNo + screenNo;
                const checkSeat = await seat.findOne({  seatId:seatId , isBooked: true });

                if (checkSeat) {
                    return apiResponse.alreadyExist(res, `Sorry seat no ${seatNo} is not unavailable  `, "", "", "");
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


                    
                    let ticketId = "Tickt_" + seatNos + new Date().getTime();

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

                    response.push({ seatNo: seatNo, message: "Ticket for Seat " + seatNo + " created successfully.",ticketRes });

                }
            }
          
            return apiResponse.successResponse(res, "ticket created successfully", response, "", "");
        } catch (error) {

            console.log(error);

            return apiResponse.errorResponse(res, error.message, "", "", error);

        }

    }


}

module.exports = new clsBook();