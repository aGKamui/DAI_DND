const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiceDataSchema = new Schema({
    diceType:{
        type: String,
        require: [true, "Roll need a dice type"]
    },
    modifiers:{
        type: Number,
        require: [true, "Roll needs a modifier"]
    },
    diceResult:{
        type:Number,
        require: [true, "Roll needs a result"]
    },
    dateOfRoll:{
        type: Date,
        require: [true, "Roll happens at a specific date"]
    }
})

const diceData = mongoose.model("diceData", DiceDataSchema);

module.exports = diceData;