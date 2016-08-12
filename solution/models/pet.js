var mongoose = require('mongoose');

var PetSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  species: { type: String, required: true },
  gender:  { type: String, required: true },
  age:     Number,
  owner:   {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Owner'
  }
});

PetSchema.methods.getOwnerString = function() {
  if (this.owner) {
    if (this.owner.name) {
      return this.owner.name;   // we have the name
    }
    else {
      return this.owner;        // it's an ID
    }
  }
  else {
    return '<null>';            // there is no owner
  }
};

PetSchema.methods.toString = function() {
  return this._id + ' : ' + this.name + ' is a ' +
         this.age + ' year old ' +
         this.gender + ' ' +
         this.species +
         ' owned by ' + this.getOwnerString();
};

module.exports = mongoose.model('Pet', PetSchema);
