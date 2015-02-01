module.exports = function(passport) {
  var config = require('./auth.js');
  var User = require('./models/User');
  var FacebookStrategy = require('passport-facebook').Strategy;
  var LocalStrategy    = require('passport-local').Strategy;
  var fs = require('fs');
  // Needed for session authentication
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      console.log("Request to deserializeUser", user.userId);
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
      clientID: config.clientID,
      clientSecret:config.clientSecret,
      callbackURL: config.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {

        //Check whether the User exists or not using profile.id
        User.findOne({
         'userId' : profile.id
          },
          function(err, user) {
            if(err) return done(err);

            // We found user
            if(user) {
              console.log("Found User:", user);
            }
            else {
              var newUser = new User();
              console.log("New User:", user);
              // Add user info to instance
              newUser.setFaceBookLoginCreditentials(profile);

              console.log("Name:",profile.name.givenName);
              console.log("Saving user:", newUser);

              // Save to DB
              newUser.save(function(err) {
                if(err) throw err;
                //return done(null, user);
              });

              user = newUser;
            }

            fs.writeFile("./currentSession.json", JSON.stringify(user), function(err) {
              if(err) {
                  console.log(err);
              } else {
                  console.log("The file was saved!");
              }
            });

            return done(null, user);
        });
      });
    }
  ));
};
