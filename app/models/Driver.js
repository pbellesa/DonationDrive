var mongoose = require('mongoose');

var driverSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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

// on every save, add the date
driverSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

module.exports = mongoose.model('Driver', driverSchema);
