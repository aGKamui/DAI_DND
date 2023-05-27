const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Person needs a first name"]
    },
    lastName: {
        type: String,
        required: [true, "Person needs a last name"]
    },
    age: {
        type: Number,
        min: 0
    }
})

const Person = mongoose.model("person", PersonSchema);

module.exports = Person;