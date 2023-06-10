const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
    type:{
        type: String,
        enum: ["Whale","Dolphin"],
        required: [true, "Purchase needs a type (Whale tier or Dolphin tier)"]
    },
    user:{
        type: mongoose.Types.ObjectId,
        required: [true, "Purchase must be made by someone"]
    },
    date:{
        type: Date,
        required: [true, "Purchase needs a date"]
    },
    value:{
        type: Number,
        required: [true, "Purchase needs a value"]
    }

})

const purchase = mongoose.model("purchase", PurchaseSchema);

module.exports = purchase;