var express = require('express');
var router = express.Router();
// const course = require("../routes/courseRoute");
 const user = require("../routes/userRoutes");
 const movie=require("../routes/movieR")
 const book=require("../routes/bookRoutes")
// const question = require("../routes/questionRoute");

/* GET home page. */
router.get('/', (req, res) => {
  throw new Error();
})

// Link other routes here.
router.get('/route1', function (req, res, next) { 
  res.send("Hello Route1");
});

// router.use("/course", course);
 router.use("/user", user);
 router.use("/movie", movie);
 router.use("/book", book);
// router.use("/question", question);

module.exports = router;

