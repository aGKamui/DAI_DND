const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatDataSchema = new Schema({
    messages:{
        type:Array,
        require: [true, "Chat needs to exist"]
    }
})

const chatData = mongoose.model("chatData", ChatDataSchema);

module.exports = chatData;