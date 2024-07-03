const ticketModel = require("../models/ticketModel");
const apiResponse = require("../helpers/apiResponse");

class clsMovie {

    async createTicket(req, res) {

        try {

            let {
                seatNo,
                seatBook,
                totalPrice,
                isPayment,
                isDelete,
            } = req.body;

            let ticketId= "Tickt_" + seatNo +new Date().getTime();

            let ticketFound = await ticketModel.findOne({ ticketId: ticketId, isDelete: false }).lean();

            if (ticketFound) {

                return apiResponse.alreadyExist(res, "ticket already exists  ", "", "", "");

            }
            else {

                let ticketPost = new ticketModel({
                    ticketId:ticketId,
                    seatNo,
                    seatBook,
                    totalPrice,
                    isPayment,
                    isDelete,
                });

                let ticketRes = await ticketPost.save();

                return apiResponse.successResponse(res, "ticket created successfully",  ticketRes, "", "");
            }

        } catch (error) {

            console.log(error);

            return apiResponse.errorResponse(res, error.message, "", "", error);

        }

    }

    async updateMovie(req, res) {
        try {
            if (Object.keys(req.body).length) {
                let {
                    movieId,
                    movieTitle,
                    movieHr,
                    moviePrice,
                    movieBannerImg,
                    showtime,
                } = req.body;

                const updatedMovie = await movieModel.findOneAndUpdate(
                    { movieId, isDelete: false },
                    {
                        $set: {
                            movieTitle:String(movieTitle).trim(),
                            movieHr:String(movieHr).trim(),
                            moviePrice:String(moviePrice).trim(),
                            movieBannerImg:String(movieBannerImg).trim(),
                            showtime:String(showtime).trim(),
                        }
                    },
                    { new: true });

                if (updatedMovie) {

                    return apiResponse.successResponse(res, "Updated Successfully", updatedMovie, "", "");
                }
                else {

                    return apiResponse.successNoContentResponse(res, "Data Not Found", "", "", "");
                }
            }
            else {
                return apiResponse.bodyNotExist(res, "Body Empty", data = null, "", "")
            }
        } catch (error) {

            return apiResponse.errorResponse(res, error.message, "", "", error)
        }
    }

    async getAllMovieDashboard(req, res) {

        try {

            if (Object.keys(req.body).length) {

                let {

                    documentsPerPage = 10,
                    page = 1

                } = req.body

                let query = {

                    isDelete: false
                }

                const docPerPage = parseInt(documentsPerPage);
                let pageNo = parseInt(page);
                const skipDocs = (pageNo - 1) * docPerPage;

                let [movieData, movieCount] = await Promise.all(
                    [
                        movieModel
                            .find(query)
                            .skip(skipDocs)
                            .limit(docPerPage)
                            .lean(),
                            movieModel.countDocuments(query)
                    ]
                );

                if (movieData.length > 0) {

                    let responses = {
                        data: movieData,
                        count: movieCount,
                        noOfPages: Math.ceil(movieCount / docPerPage),
                    };

                    return apiResponse.paginateResponse(res, "Get all Movie Data with Pagination", responses, "", "");
                }
                else {
                    return apiResponse.successNoContentResponse(res, "Data Not Found", "", "", "");
                }
            }
            else {
                return apiResponse.bodyNotExist(res, "Body Empty", data = null, "", "")
            }
        } catch (error) {

            return apiResponse.errorResponse(res, error.message, "", "", error)
        }
    }

    async getMovieById(req, res) {
        try {
            if (Object.keys(req.body).length) {

                const movie = await movieModel.findOne({ movieId: req.body.movieId, isDelete: false });

                if (movie) {

                    return apiResponse.successResponse(res, "Get movie", movie, "", "");

                } else {

                    return apiResponse.successNoContentResponse(res, "Data Not Found", "", "", "");
                }
            } else {

                return apiResponse.bodyNotExist(res, "Body Empty", data = null, "", "")
            }


        } catch (error) {

            return apiResponse.errorResponse(res, error.message, "", "", error)
        }
    }

    async getAllMovie(req, res) {

        try {
            let query = {

                isDelete: false
            }
            let MovieData = await movieModel.find(query)

            if (MovieData.length > 0) {

                let responses = {

                    data:MovieData ,

                    count: MovieData.length,
                };

                return apiResponse.successResponse(res, "Get All Movie", responses, "", "");
            }
            else {
                return apiResponse.successNoContentResponse(res, "Data Not Found", "", "", "");
            }
        } catch (error) {

            return apiResponse.errorResponse(res, error.message, "", "", error)

        }
    }

    async deleteCourse(req, res) {
        try {

            if (Object.keys(req.body).length) {

                const deletedmovieModel = await movieModel.findOneAndUpdate(

                    { movieId: req.body.movieId, isDelete: false },

                    { $set: { isDelete: true } },

                    { new: true });

                if (deletedmovieModel) {

                    return apiResponse.successResponse(res, "Data deleted succussfully", "", "", "");

                } else {

                    return apiResponse.successNoContentResponse(res, "Data Not Found", "", "", "");
                }
            }
            else {

                return apiResponse.bodyNotExist(res, "Body Empty", data = null, "", "")

            }
        } catch (error) {

            return apiResponse.errorResponse(res, error.message, "", "", error)

        }
    }

}

module.exports = clsMovie;