var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var dbUtil = require('./db');
var Owner = require('./models/owner');
var Pet = require('./models/pet');

// Connect to the database
mongoose.connect('mongodb://localhost/pets-and-owners');

var owners = [
  { name: 'Mike Hopper',   phone: '770-456-7890' },
  { name: 'Marc Wright',   phone: '205-456-1234' },
  { name: 'Shawn Johnson', phone: '404-121-2222' }
];

var pets = [
  { name: 'Miko',   species: 'Dog', gender: 'Male',   age: 3 },
  { name: 'Meisha', species: 'Dog', gender: 'Female', age: 2 },
  { name: 'Deisel', species: 'Dog', gender: 'Male',   age: 1 },
  { name: 'Shadow', species: 'Dog', gender: 'Male',   age: 7 }
];

function associateOwnerAndPet(owner, pet, cb) {
  owner.pets.push(pet);
  pet.owner = owner;
  owner.save(function(err, savedOwner) {
    if (err) return dbUtil.handleError(err);
    pet.save(function(err, savedPet) {
      if (err) return dbUtil.handleError(err);
      if (cb) return cb(savedOwner, savedPet);
    });
  });
}

console.log('Removing old pets...');
Pet.remove({}, function(err) {
  if (err) return dbUtil.handleError(err);
  console.log('Pets removed.');
  console.log('Removing old owners...');
  Owner.remove({}, function(err) {
    if (err) return dbUtil.handleError(err);
    console.log('Creating new owners');
    Owner.create(owners, function(err, newOwners) {
      if (err) return dbUtil.handleError(err);
      console.log('newOwners:\n', newOwners.map(o => o.toString()));
      console.log('Creating new pets');

      Pet.create(pets, function(err, newPets) {
        if (err) return dbUtil.handleError(err);
        console.log('newPets:\n', newPets.map(p => p.toString()));
        console.log('\nmaking associations...');

        associateOwnerAndPet(newOwners[0], newPets[0], function() {
          associateOwnerAndPet(newOwners[0], newPets[1], function() {
            associateOwnerAndPet(newOwners[1], newPets[2], function() {
              associateOwnerAndPet(newOwners[2], newPets[3], function() {
                Owner.find({}, function(err, updatedOwners) {
                  console.log();
                  console.log('updatedOwners:\n', updatedOwners.map(owner => owner.toString()));
                  Pet.find({}, function(err, updatedPets) {
                    console.log('updatedPets:\n', updatedPets.map(pet => pet.toString()));
                    dbUtil.quit();
                  }).populate('owner');
                }).populate('pets');
              });
            });
          });
        });
      });         // newPets out of scope here
    });           // newOwners out of scope here
  });
});
