var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  userId: Number,
  name: String,
  username: {
    type: String,
  },
  password: {
    type: String
  },
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

  userSchema.methods.addItems = function(donationItems, userCount) {

    this.userId = userCount + 1;
    this.donations.clothes = donationItems.clothes;
    this.donations.food = donationItems.food;
    this.donations.toys = donationItems.toys;

    return this;
  };

// on every save, add the date
// userSchema.pre('save', function(next) {
//   // get the current date
//   var currentDate = new Date();

//   // change the updated_at field to current date
//   this.updated_at = currentDate;

//   // if created_at doesn't exist, add to that field
//   if (!this.created_at)
//     this.created_at = currentDate;

//   next();
// });

module.exports = mongoose.model('User', userSchema);
