# Mongoose Pets and Owners

Let's get some practice with *Mongoose associations*. For this lab we want to use *NodeJS* and *Mongoose* (no Express required) to create a simple JavaScript app that populates a MongoDB database with some owners and their pets.

We will want to create the following Mongoose Models:

                                                              Pet
               Owner                                 -----------------------
    --------------------------------                 | - name (String)     |
    | - name (String)              |    1       N    | - species (String)  |
    | - phone number (String)      |  <----------->  | - gender (String)   |
    | - array of pets [references] |                 | - age (Number)      |
    --------------------------------                 | - owner (reference) |
                                                     -----------------------

We will want to create the following files:

    .
    ├── app.js         # Our main app that populates MongoDB with some Owners and Pets
    ├── models
    │   ├── owner.js   # The Mongoose Model for an Owner
    │   └── pet.js     # The Mongoose Model for a Pet

In the `app.js` we will want to do the following:

* Remove all of the old pets and owners from the database
* Insert some new pets and owners
* Print all of the owners and their pets
* Print all of the pets and their owners

## Hints

1. When retrieving a Mongoose object from the database, you can use the Mongoose `populate` method to include any referenced document(s) in the retrieved object - otherwise you will only have the ObjectIds of the referenced document(s). See [Mongoose Population](http://mongoosejs.com/docs/populate.html) for more information.

2. There is starter code for this lab in the `starter` directory.
