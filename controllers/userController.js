const userModel = require("../models/userModel");
const apiResponse = require("../helpers/apiResponse");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

class clsUser {

    async addUser(req, res) {

        try {

            let {
                name,
                mobile,
                gender,
                dateOfBirth,
                password,
                role,
                email
            } = req.body;

            let userId = "USER_" + mobile;

            let userFound = await userModel.findOne({ userId, isDelete: false }).lean();

            if (userFound) {

                return apiResponse.alreadyExist(res, "user already exists", "", "", "");

            }
            else {

                let Password = await bcrypt.hash(password, 12);
                let userPost = new userModel({
                    userId: userId,
                    name,
                    mobile,
                    gender,
                    dateOfBirth,
                    password: Password,
                    role,
                    email
                });

                let userRes = await userPost.save();

                return apiResponse.successResponse(res, "User added successfully", userRes, "", "");

            }

        } catch (error) {

            console.log(error);

            return apiResponse.errorResponse(res, error.message, "", "", error);

        }

    }

    async updateUser(req, res) {
        try {
            if (Object.keys(req.body).length) {
                let {
                    name,
                    mobile,
                    gender,
                    dateOfBirth,
                    role,
                    email
                } = req.body;

                const updatedUser = await userModel.findOneAndUpdate(
                    { userId, isDelete: false },
                    {
                        $set: {
                            name: String(name).trim(),
                            mobile: String(mobile).trim(),
                            gender: String(gender).trim(),
                            dateOfBirth,
                            role: String(role).trim(),
                            email: String(email).trim()
                        }
                    },
                    { new: true });

                if (updatedUser) {

                    return apiResponse.successResponse(res, "Updated Successfully", updatedUser, "", "");
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


    async getAllUserPGN(req, res) {

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

                let [userData, userCount] = await Promise.all(
                    [
                        userModel
                            .find(query)
                            .skip(skipDocs)
                            .limit(docPerPage)
                            .sort({ updatedAt: -1 })
                            .lean(),
                        userModel.countDocuments(query)
                    ]
                );

                if (userData.length > 0) {

                    let responses = {
                        data: userData,
                        count: userCount,
                        noOfPages: Math.ceil(userCount / docPerPage),
                    };

                    return apiResponse.paginateResponse(res, "Get all User Data with Pagination", responses, "", "");
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


    async getUserById(req, res) {
        try {
            if (Object.keys(req.body).length) {

                const { userId } = req.body;

                let query = {
                    isDelete: false
                }

                if (query) {
                    query.userId = userId
                }
                const User = await userModel.findOne(query);

                if (User) {

                    return apiResponse.successResponse(res, "Get User", User, "", "");

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


    async getAlluser(req, res) {

        try {

            let query = {
                isDelete: false
            }

            let userData = await userModel.find(query);

            if (userData.length > 0) {

                return apiResponse.successResponse(res, "Get All User", userData, "", "");
            }
            else {
                return apiResponse.successNoContentResponse(res, "Data Not Found", "", "", "");
            }
        } catch (error) {

            return apiResponse.errorResponse(res, error.message, "", "", error)

        }
    }

    async deleteUser(req, res) {
        try {

            if (Object.keys(req.body).length) {

                const deletedUser = await userModel.findOneAndUpdate(

                    { userId: req.body.userId, isDelete: false },

                    { $set: { isDelete: true } },

                    { new: true });

                if (deletedUser) {

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

    async updatePassword(req, res) {
        try {
            if (req.body) {
                let User = await userModel.findOne({ mobile: req.body.mobile, isDelete: false })
                if (!User) {
                    return apiResponse.successNoContentResponse(res, "User not found", "", "", "");
                } else {
                    bcrypt.compare(req.body.oldPassword, User.password, (err, isMatch) => {
                        if (err) { console.log(err) }
                        if (isMatch) {
                            bcrypt.hash(req.body.newPassword, 12, (err, newPasswd) => {
                                userModel.findOneAndUpdate(
                                    { mobile: req.body.mobile, isDelete: false },
                                    { $set: { password: newPasswd } },
                                    { new: true }
                                ).then((updateddata) => {
                                    let data = {
                                        user: updateddata
                                    }

                                    return apiResponse.successResponse(res, "Password updated successfully", data, "", "");

                                });

                            });

                        } else {

                            return apiResponse.successNoContentResponse(res, 'Old password not match', "", "", "");

                        }
                    });

                }

            } else {

                return apiResponse.bodyNotExist(res, "Body Empty", data = null, "", "");

            }

        } catch (error) {

            console.log("error", error);
            return apiResponse.errorResponse(res, error.message, "", "", error)

        }

    }

    async setPassword(req, res) {
        try {
            if (req.body) {
                let User = await userModel.findOne({ mobile: req.body.mobile, isDelete: false })
                if (!User) {
                    return apiResponse.successNoContentResponse(res, "User not found", "", "", "");
                }
                let Password = await bcrypt.hash(req.body.password, 12);
                const updateddata = await userModel.findOneAndUpdate(
                    { mobile: req.body.mobile },
                    { $set: { password: Password } },
                    { new: true }
                );
                let data = {
                    user: updateddata,
                    token: updateddata.token
                }

                return apiResponse.successResponse(res, "Updated successfully", data, "", "");
            } else {

                return apiResponse.bodyNotExist(res, "Body Empty", data = null, "", "");

            }

        } catch (error) {

            console.log("error", error);
            return apiResponse.errorResponse(res, error.message, "", "", error)

        }

    }




}

module.exports = clsUser;