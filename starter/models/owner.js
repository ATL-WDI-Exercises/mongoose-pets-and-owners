var mongoose = require('mongoose');

var OwnerSchema = new mongoose.Schema({
  name: { type: String, required: true }
  // TODO: add phoneNumber and an array of pets (using references) to the schema
});

// TODO: add a nice toString method to the OwnerSchema

module.exports = mongoose.model('Owner', OwnerSchema);
