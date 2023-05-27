const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatDataSchema = new Schema({
    message:{
        type:String,
        require: [true, "Chat needs a message"]
    },
    dateOfMessage:{
        type: Date,
        require: [true, "Chat is sent at a specific date"]
    }
})

const chatData = mongoose.model("diceData", ChatDataSchema);

module.exports = chatData;