var mongoose = require('mongoose');

var OwnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: String,
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet'
    }
  ]
});

OwnerSchema.methods.toString = function() {
  if (this.pets && this.pets.length > 0 && this.pets[0].name) {
    return this._id + ' : ' + this.name + ' : ' +
         this.phone +
         ' has pets ' + this.pets.map(function(pet) { return pet.name; } ).join(', ');
  }
  else {
    return this._id + ' : ' + this.name + ' : ' +
           this.phone +
           ' has ' + this.pets.length + ' pet(s).';
   }
}

module.exports = mongoose.model('Owner', OwnerSchema);
