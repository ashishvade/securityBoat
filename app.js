// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// require('dotenv').config();
//   var indexRouter = require('./routes/index');
// var mongo = require("./config/mongo.utility");
// const cors = require("cors");

// var app = express();
// mongo.connect();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

// // app.use('/v1', indexRouter);
// app.use(function (req, res, next) {
//   res.status(404).json({
//     status: 404, message: "Not Found",
//     route: req.originalUrl,
//     description: "The requested URL was not found on the server"
//   })
// })

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
var indexRouter = require('./routes/index');
var mongo = require("./config/mongo.utility");
const cors = require("cors");

var app = express();
mongo.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors());

app.use(cors({
  origin: ['https://kairosmovies.netlify.app',"http://localhost:3000","http://43.205.140.194" ],// or your specific origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],
  credentials: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
}));

app.use('/v1', indexRouter);
app.use(function (req, res, next) {
  res.status(404).json({
    status: 404, message: "Not Found",
    route: req.originalUrl,
    description: "The requested URL was not found on the server"
  })
})


app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

 
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

