var mongoose = require('mongoose');

  var userSchema = new mongoose.Schema({
    userId: Number,
    fullName: String,
    username: String,
    location: {
        lat: Number,
        lng: Number
    },
    address: String,
    donations: {
        clothes: Number,
        food: Number,
        toys: Number
    },
    reliability: String,
    created_at: Date,
    updated_at: Date
  });

  userSchema.methods.addItems = function(donationItems) {
    console.log("this", this);
    this.userId = donationItems.userId;
    this.donations.clothes = donationItems.clothes;
    this.donations.food = donationItems.food;
    this.donations.toys = donationItems.toys;

    // return this;
  };

  userSchema.methods.setFaceBookLoginCreditentials = function(profile) {
    // for(var key in profile) {
    //     console.log("Key:",key,"VALUE:",profile[key]);
    // }
    //console.log("Profile name", profile['first_name']);

    this.userId = profile.id;
    this.fullName = profile.name.givenName + " " + profile.name.familyName;
    this.username = profile.name.givenName;

  };

  // on every save, add the date
  userSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
      this.created_at = currentDate;

    next();
  });

module.exports = mongoose.model('User', userSchema);
