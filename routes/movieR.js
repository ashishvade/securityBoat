const router = require("express").Router()
const Movie = require("../controllers/movieController")
const authJwt = require("../middleware/token");

router.post("/addMovie", /* authJwt.verifyToken, */ Movie.addMovie);
router.post("/updateMovie", /* authJwt.verifyToken, */ Movie.updateMovie);
router.post("/getMovieById", /* authJwt.verifyToken, */ Movie.getMovieById);
router.post("/getAllMovie", /* authJwt.verifyToken, */ Movie.getAllMovie);

module.exports = router;