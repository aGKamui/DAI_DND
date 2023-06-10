const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    size: {
        type: Number,
        required: [true, "Token needs a size"]
    },
    x: {
        type: Number,
        required: [true, "Token needs a position"]
    },
    y: {
        type: Number,
        required: [true, "Token needs a position"]
    },
    image:{
        type: String
    }
})

const token = mongoose.model("token", TokenSchema);

module.exports = token;