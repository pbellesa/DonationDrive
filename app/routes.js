module.exports = function(app) {

 var mongoose = require('mongoose');

 var User = mongoose.model('User');

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

  app.post('/submitItems/:userId', function(req, res) {
    console.log("Request Received");
    var usr = new User();
    var userCount = 0;

    for(var key in req.body) {
      console.log("Key:",key,"Value:",req.body[key]);
    }

    var result = User.find({}, function(err, users) {
      if (err) throw err;

      // object of all the users
      console.log(users);

      usr.addItems(req.body, users.length);

      console.log("users",users.length);

      usr.save(function(err, usr) {
        if(err) { console.log("Error with post request"); }
      //res.json(post);
      });
    });


  });

  // route for showing the profile page
  // app.get('/profile', isLoggedIn, function(req, res) {
  //   // res.sendfile('profile.html', {
  //   //     user : req.user // get the user out of session and pass to template
  //   // });
  // });

  // app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

  // // handle the callback after facebook has authenticated the user
  // app.get('/auth/facebook/callback',
  //   passport.authenticate('facebook', {
  //       successRedirect : '/profile',
  //       failureRedirect : '/'
  //   }));

  // // route for logging out
  // app.get('/logout', function(req, res) {
  //   req.logout();
  //   res.redirect('/');
  // });

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });

};

// route middleware to make sure a user is logged in
// function isLoggedIn(req, res, next) {

//   // if user is authenticated in the session, carry on
//   if (req.isAuthenticated())
//       return next();

//   // if they aren't redirect them to the home page
//   res.redirect('/');
// }
