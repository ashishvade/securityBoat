const router = require("express").Router()
const Seat = require("../controllers/seatController")
const authJwt = require("../middleware/token");

router.post("/getseatById", /* authJwt.verifyToken, */ Seat.getseatById);
router.post("/getAllseat", /* authJwt.verifyToken, */ Seat.getAllseat);
module.exports = router;