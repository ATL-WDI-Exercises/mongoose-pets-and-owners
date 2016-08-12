var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

var dbUtil = require('./db');
var Owner = require('./models/owner');
var Pet = require('./models/pet');

// Connect to the database
mongoose.connect('mongodb://localhost/pets-and-owners');

const owners = [
  { name: 'Mike Hopper',   phone: '770-456-7890' },
  { name: 'Marc Wright',   phone: '205-456-1234' },
  { name: 'Shawn Johnson', phone: '404-121-2222' }
];

const pets = [
  { name: 'Miko',   species: 'Dog', gender: 'Male',   age: 3  },
  { name: 'Meisha', species: 'Dog', gender: 'Female', age: 2  },
  { name: 'Deisel', species: 'Dog', gender: 'Male',   age: 1  },
  { name: 'Shadow', species: 'Dog', gender: 'Male',   age: 7  }
];

function associateOwnerAndPet(owner, pet) {
  owner.pets.push(pet);
  pet.owner = owner;
}

console.log('Removing old pets...');
Pet.remove({})
.then(function() {
  console.log('Pets removed.');
  console.log('Removing old owners...');
  return Owner.remove({});
})
.then(function() {
  console.log('Creating new owners and new pets...');
  return [
    Owner.create(owners),
    Pet.create(pets)
  ];
})
.spread(function(newOwners, newPets) {
  console.log('newOwners:\n', newOwners.map(o => o.toString()));
  console.log('newPets:\n', newPets.map(o => o.toString()));
  console.log('\nFinished creating owners and Pets - now making associations...');

  associateOwnerAndPet(newOwners[0], newPets[0]);
  associateOwnerAndPet(newOwners[0], newPets[1]);
  associateOwnerAndPet(newOwners[1], newPets[2]);
  associateOwnerAndPet(newOwners[2], newPets[3]);

  var savedOwnerPromises = newOwners.map(function(owner) { return owner.save(); } );
  var savedPetPromises = newPets.map(function(pet) { return pet.save(); } );
  return savedOwnerPromises.concat(savedPetPromises);
})
.spread(function() {
  return [
    Owner.find({}).populate('pets'),
    Pet.find({}).populate('owner')
  ];
})
.spread(function(allOwners, allPets) {
  console.log();
  console.log('allOwners:\n', allOwners.map(owner => owner.toString()));
  console.log('allPets:\n', allPets.map(pet => pet.toString()));
  dbUtil.quit();
}, err => {
  return dbUtil.handleError(err);
});
