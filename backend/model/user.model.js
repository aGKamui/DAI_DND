const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "User needs an username"],
        unique: true
    },
    type: {
        type: String,
        enum: ["Paid","Free"],
        required: [true, "User needs a type (Paid or Free)"]
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

const user = mongoose.model("user", UserSchema);

module.exports = user;