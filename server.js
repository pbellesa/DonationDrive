// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var passport       = require('passport');

// configuration ===========================================
// get all data/stuff of the body (POST) parameters
  app.use(bodyParser.json()); // parse application/json
  app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
  app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
  app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
  app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
  app.use(passport.initialize());
  app.use(passport.session());



// config files
var db = require('./config/db');

var port = process.env.PORT || 8080; // set our port

// Establish MongoDb connection
mongoose.connect(db.url);

require('./app/models/User');
require('./app/facebookAuth')(passport);

// routes ==================================================
var result = require('./app/routes')(app, passport); // pass our application into our routes
console.log("result",result);
// start app ===============================================
app.listen(port);

console.log('Magic happens on port ' + port); 			// shoutout to the user

exports = module.exports = app; 						// expose app
