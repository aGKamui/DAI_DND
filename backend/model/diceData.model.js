const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiceDataSchema = new Schema({
    dicetype:{
        type: Number,
        require: [true, "Roll need a dice type"]
    },
    modifiers:{
        type: Number,
        require: [true, "Roll needs a modifier"]
    },
    diceresult:{
        type:Number,
        require: [true, "Roll needs a result"]
    },
    finalresult:{
        type:Number,
        require: [true, "Roll needs a final result"]
    },
    dateOfRoll:{
        type: Date,
        require: [true, "Roll happens at a specific date"]
    },
    campaignID:{
        type: mongoose.Types.ObjectId
    },
    characterID:{
        type: mongoose.Types.ObjectId
    }
})

const diceData = mongoose.model("dicedata", DiceDataSchema);

module.exports = diceData;