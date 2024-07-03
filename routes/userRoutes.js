const express = require('express');
const userModel = require('../models/userModel.js');
const apiResponse = require("../helpers/apiResponse.js");
const authJwt = require("../middleware/token");

const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const passport = require("passport"), LocalStrategy = require("passport-local").Strategy;
const router = express.Router()
// const JWT = require("../middleware/token.js")


const clsUser = require("../controllers/userController.js")
const userObj = new clsUser();

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {

    userModel.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField: 'mobile', passReqToCallback: true }, (req, mobile, password, done) => {

    userModel.findOne({ mobile: mobile }).select('-token').then(user => {
        if (user == null) {
            return done(null, false, { message: 'User not found' });
        }
        let userData = [];

        bcrypt.compare(password, user.password, async (err, isMatch) => {

            if (err) { console.log(err); }

            if (isMatch) {

                userData = user;

                const expiresIn = 15000 * 24 * 60 * 60;
                let tokenData = {
                    _id: user._id,
                    // userId: user.userId,
                    // empCode: user.empCode

                    name: user.name,
                    mobile: user.mobile,
                    gender: user.gender,
                    dateOfBirth: user.dateOfBirth,
                    role: user.role,
                    email: user.email
                }

                jwt.sign({ tokenData }, 'DAH88E3UWQ', { expiresIn }, async (err, token) => {

                    let data = {
                        user: userData,
                        token: token
                    }

                    await userModel.findOneAndUpdate(
                        { mobile: mobile },
                        { $set: { token: token, /* fireBaseToken: req.body.fireBaseToken  */ } },
                        { new: true }
                    );

                    return done(null, data, { message: "Login Successful" });

                });
            } else {

                console.log("Password Not Matched", user.password);
                return done(null, false, { message: 'Password incorrect' })

            }
        });
    })
        .catch(err => {
            console.log(err);
            return err;
        });

}));



router.post("/login", async (req, res, next) => {

    passport.authenticate("local", function (err, user, info) {

        if (err) {
            return apiResponse.errorResponse(res, err.message, "", "", err);
        }

        if (info.message === 'User not found') {
            console.log("User not found");
            return apiResponse.successNoContentResponse(res, "No user found", "", "", "");
        }
        else if (info.message === 'Password incorrect') {
            console.log("Password incorrect");
            return apiResponse.successNoContentResponse(res, "Password incorrect", "", "", "");
        }
        else {

            console.log("Login Successful");
            req.logIn(user, function (err) {
                if (user) {
                    return apiResponse.successResponse(res, "Login Successful", user, "", "");
                }
            });
        }
    })(req, res, next);
});

router.post("/addUser", authJwt.verifyToken, userObj.addUser);
router.post("/updateUser", authJwt.verifyToken, userObj.updateUser);
router.post("/getAllUserPGN", authJwt.verifyToken, userObj.getAllUserPGN);
router.post("/getUserById", authJwt.verifyToken, userObj.getUserById);
router.post("/getAlluser", authJwt.verifyToken, userObj.getAlluser);
router.post("/deleteUser", authJwt.verifyToken, userObj.deleteUser);
router.post("/updatePassword",  authJwt.verifyToken,  userObj.updatePassword);
// router.post("/setPassword",  authJwt.verifyToken,  userObj.setPassword);

module.exports = router;