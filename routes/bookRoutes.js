const router = require("express").Router()
const book = require("../controllers/ticketController")
const authJwt = require("../middleware/token");

router.post("/BookTicket", /* authJwt.verifyToken, */ book.BookTicket);


module.exports = router;