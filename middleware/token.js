
// const jwt = require('jsonwebtoken');
// const userModel = require("../models/userModel");
// const apiResponse = require('../helpers/apiResponse');

// function verifyToken(req, res, next) {
//   // Get auth header value
//   const bearerHeader = req.headers['authorization'];
//   // Check if bearer is undefined
//   if (typeof bearerHeader !== 'undefined') {
//     let headerToknesData = bearerHeader.split(' ')[1];
//     const decodedToken = jwt.decode(headerToknesData, { complete: true });
//     // console.log("--headerToknesData-response--1-",headerToknesData);
//     userModel.findOne({ mobile: decodedToken.payload.tokenData.mobile }).then((response) => {
//       // console.log("--headerToknesData-response--2-",response.token);
//       const decodedToken2 = jwt.decode(response.token, { complete: true });
//       // Compare decoded payloads of both tokens
//       let data = JSON.stringify(decodedToken) === JSON.stringify(decodedToken2);
//       // console.log("---toke check====",data)
//       if (data) {
//         jwt.verify(headerToknesData, "DAH88E3UWQ", (err, decoded) => {
//           if (err) {
//             return apiResponse.serverErrorRes(res, 'Fail to Authentication. Error -> ' + err, "", "", err)
//           }
//           req.userData = decoded;
//           next();
//         });
//       } else {
//         return apiResponse.authorizationFailed(res, "Authorization failed / Forbidden", "", "", "");
//       }
//     })


//   } else {
//     // Forbidden
//     return apiResponse.authorizationFailed(res, "Authorization failed / Forbidden", "", "", "");
//   }

// }
// const authJwt = {};
// authJwt.verifyToken = verifyToken;
// module.exports = authJwt;
