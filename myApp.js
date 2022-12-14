const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = done => {
  const newPerson = new Person({
    name: "Chris",
    age: 31,
    favoriteFoods: ["Chocolate", "Queso Dip", "Obesity"]
  });
  newPerson.save(done);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, done);
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, done);
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, done);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, done);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, function(err, foundPerson) {
    foundPerson.favoriteFoods.push(foodToAdd);
    foundPerson.save(done);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { returnNewDocument: true },
    done
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId, done);
};

const removeManyPeople = done => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, done);
};

const queryChain = done => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select({ age: 0 })
    .exec(done);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
