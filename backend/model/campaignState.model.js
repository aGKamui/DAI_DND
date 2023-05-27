const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SceneSchema = new Schema({
    width: {
        type: Integer,
        required: [true, "Scene needs a width"]
    },
    height: {
        type: Integer,
        required: [true, "Scene needs a height"]
    },
    image:{
        type: String
    }
})

const scene = mongoose.model("scene", SceneSchema);

module.exports = scene;