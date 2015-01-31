module.exports = function(app) {

	var mongoose = require('mongoose');

 var Driver = mongoose.model('Driver');
 var Donor = mongoose.model('Donor');
  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // frontend routes =========================================================
  // route to handle all angular requests
  // app.get('/', function(req, res) {
  //   res.sendfile('./public/index.html');
  // });

   //res.json({ message: 'hooray! welcome to our api!' });

  app.post('/add/driver/:driverId', function(req, res, next) {
    //var post = new Driver(req.body);
    console.log("Received: " + req);
    // post.save(function(err, post) {
    //   if(err) {
    //     console.log("Error handling post request");
    //   }

    //   res.json(post);
    // });

  });

  app.post('/add/donor/:quantity', function(req, res) {
    console.log("Received: " + req);
  });

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

};
