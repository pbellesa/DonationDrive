module.exports = function(app, passport) {

 var mongoose = require('mongoose');
 var User = mongoose.model('User');
 var session = require('express-session');
 var cookieParser = require('cookie-parser');

  // server routes ===========================================================
  // handle things like api calls
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
    //var usr = new User();
    var userCount = 0;

    console.log("userid", req.body);

    var result = User.find({
      'userId' : req.body.userId
      }, function(err, usr) {
        if (err) throw err;

        // object of all the users
        console.log(usr);

        usr.userId = req.body.userId;
        usr.donations.clothes = req.body.clothes;
        usr.donations.food = req.body.food;
        usr.donations.toys = req.body.toys;

        console.log("user",usr);

        usr.save(function(err) {
          if(err) { console.log("Error with post request"); }
        });
    });

    // User.find({}, function(err, users) {
    //   if (err) throw err;

    //   // object of all the users
    //   console.log(users);
    // });

    // for(var key in result) {
    //   console.log("Key:",key,"Value:",result[key]);
    // }
    //console.log("result",result);

  });

  // authentication routes =========================================================
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      successRedirect : '/auth/userId',
      failureRedirect : '/reauthenticate'
    })
  //   function(req, res) {
  //   console.log("received");
  //   passport.authenticate('facebook');}
  );

  // // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect : '/',
        failureRedirect : '/reauthenticate'
    }), function(req, res) {
      res.json({ userId: req.user });
  });

  app.get('/auth/userId', function(req, res) {
    console.log("Auth Request received", req.user);
    res.sendfile('./currentSession.json');
  });

  // frontend routes =========================================================

  // route for showing the profile page
  // app.get('/profile', isLoggedIn, function(req, res) {
  //   // res.sendfile('profile.html', {
  //   //     user : req.user // get the user out of session and pass to template
  //   // });
  // });

  // route for logging out
  // app.get('/logout', function(req, res) {
  //   req.logout();
  //   res.redirect('/');
  // });

  app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
  });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
      return next();
  console.log("Request user", req.user);
  // if they aren't redirect them to the home page
  res.redirect('/');
}


