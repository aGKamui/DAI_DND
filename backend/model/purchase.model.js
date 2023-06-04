const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PurchaseSchema = new Schema({
    type:{
        type: String,
        enum: ["Whale","Dophin"],
        required: [true, "Purchase needs a type (Whale tier or Dolphin tier)"]
    },
    user:{
        type: mongoose.Types.ObjectId,
        required: [true, "Purchase must be made by someone"]
    },
    date:{
        type: date,
        required: [true, "Purchase needs a date"]
    },
    value:{
        type: number,
        required: [true, "Purchase needs a value"]
    }

})

const user = mongoose.model("user", UserSchema);

module.exports = user;