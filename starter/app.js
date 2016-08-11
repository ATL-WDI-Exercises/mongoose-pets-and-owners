var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var Owner = require('./models/owner');
var Pet = require('./models/pet');

// Connect to the database
mongoose.connect('mongodb://localhost/pets-and-owners');

// our app will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}

console.log('TODO: remove old pets and owners');

console.log('TODO: add new pets and owners');

console.log('TODO: print all owners and their pets');

console.log('TODO: print all pets and their owners');

quit();
