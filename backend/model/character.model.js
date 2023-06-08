const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    hitpoints: {
        type: [Number],
        required: [true, "Character must have hitpoints"]
    },
    equipment:{
        type: Array
    },
    senses:{
        type: Array,
        required: [true, "Character must have senses"]
    },
    speedtypes:{
        type: Map,
        of: Number,
        required: [true, "Character must have speed types"]
    },
    abilityscores:{
        type: Map,
        of: Number,
        required: [true, "Character must have ability scores"]
    },
    ancestryfeatures:{
        type: Array
    },
    classfeatures:{
        type: Array
    },
    coreskills:{
        type: Map,
        required: [true, "Character must have coreskills"]
    },
    information:{
        type: Map,
        required: [true, "Character must have information"]
    },
    inventory:{
        type: Array
    },
    spells:{
        type: Array
    },
    weaknesses:{
        type: Map,
        of: Number
    },
    resistances:{
        type: Map,
        of: Number
    },
    immunities:{
        type: Array
    }
    
})

const character = mongoose.model("character", CharacterSchema);

module.exports = character;