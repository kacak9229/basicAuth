var express = require('express');
var path = require('path');
// var favicon = require('server-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var engine = require('ejs-locals');
var passport = require('passport');
var session  = require('express-session');
var database = require('./config/database');
var routes = require('./routes/index');

var app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "bla bla bla",
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

database.connect();

app.use('/', routes);


app.listen(8000, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Port is running on 8000");
  }
});
