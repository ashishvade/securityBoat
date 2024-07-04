const seatModel = require("../models/seatsModel");
const apiResponse = require("../helpers/apiResponse");

class clsseat {

    async addseat(req, res) {

        try {

            let {
                seatTitle,
                seatHr,
                seatPrice,
                seatBannerImg,
                showtime,
            } = req.body;

            let seatId = "seat_" + new Date().getTime();

            let seatFound = await seatModel.findOne({   seatId: seatId, isDelete: false }).lean();

            if (seatFound) {

                return apiResponse.alreadyExist(res, "seat already exists", "", "", "");

            }
            else {

                let seatPost = new seatModel({
                 seatId:seatId,
                seatTitle,
                seatHr,
                seatPrice,
                seatBannerImg,
                showtime,
                });

                let seatRes = await seatPost.save();

                return apiResponse.successResponse(res, "seat added successfully",  seatRes, "", "");

            }

        } catch (error) {

            console.log(error);

            return apiResponse.errorResponse(res, error.message, "", "", error);

        }

    }

    async updateseat(req, res) {
        try {
            if (Object.keys(req.body).length) {
                let {
                    seatId,
                    seatTitle,
                    seatHr,
                    seatPrice,
                    seatBannerImg,
                    showtime,
                } = req.body;

                const updatedseat = await seatModel.findOneAndUpdate(
                    { seatId, isDelete: false },
                    {
                        $set: {
                            seatTitle:String(seatTitle).trim(),
                            seatHr:String(seatHr).trim(),
                            seatPrice:String(seatPrice).trim(),
                            seatBannerImg:String(seatBannerImg).trim(),
                            showtime:String(showtime).trim(),
                        }
                    },
                    { new: true });

                if (updatedseat) {

                    return apiResponse.successResponse(res, "Updated Successfully", updatedseat, "", "");
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

    
    async getseatById(req, res) {
        try {
            if (Object.keys(req.body).length) {

                const seat = await seatModel.findOne({  screenId: req.body.screenId, isDelete: false });

                if (seat) {

                    return apiResponse.successResponse(res, "Get seat", seat, "", "");

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

    async getAllseat(req, res) {

        try {
            let query = {

                isDelete: false
            }
            let seatData = await seatModel.find(query)

            if (seatData.length > 0) {

                let responses = {

                    data:seatData ,

                    count: seatData.length,
                };

                return apiResponse.successResponse(res, "Get All seat", responses, "", "");
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

                const deletedseatModel = await seatModel.findOneAndUpdate(

                    { seatId: req.body.seatId, isDelete: false },

                    { $set: { isDelete: true } },

                    { new: true });

                if (deletedseatModel) {

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

module.exports = clsseat;