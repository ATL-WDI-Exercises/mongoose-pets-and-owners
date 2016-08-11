var mongoose = require('mongoose');

var PetSchema = new mongoose.Schema({
  name: { type: String, required: true }
  // TODO: add species, gender, age, and owner to the schema
});

// TODO: add a nice toString method to the PetSchema

module.exports = mongoose.model('Pet', PetSchema);
