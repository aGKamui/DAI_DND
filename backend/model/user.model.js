const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "User needs an username"],
        unique: true
    },
    usertype: {
        type: String,
        enum: ["Paid","Free"],
        required: [true, "User needs a type name"]
    }
})

const user = mongoose.model("user", UserSchema);

module.exports = user;