const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserCredentialSchema = new Schema({
    username: {
        type: String,
        required: [true, "User needs an username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "User needs a password"]
    },
    email: {
        type: String,
        required: [true, "User needs an email to log in"],
        unique: true
    }
})

const userCredential = mongoose.model("userCredential", UserCredentialSchema);

module.exports = userCredential;