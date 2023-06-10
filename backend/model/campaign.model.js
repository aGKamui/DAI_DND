const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema({
    title: {
        type: String,
        required: [true, "Campaign needs a title"]
    },
    system: {
        type: String,
        required: [true, "Campaign needs a game system"]
    },
    characters: {
        type: Array
    },
    scenes:{
        type: Array
    },
    image:{
        type: String
    },
    bio:{
        type: String
    },
    chatId:{
        type: mongoose.Types.ObjectId
    }
})

const campaign = mongoose.model("campaign", CampaignSchema);

module.exports = campaign;