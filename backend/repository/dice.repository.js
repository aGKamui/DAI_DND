const { connect } = require("../config/db.config");
const Dice = require("../model/diceData.model");

class DiceRepository {
    constructor() {
      connect();
    }

    async saveRoll(rolldata){
        console.log(rolldata);
        return await Dice.create(rolldata);
    }
}

module.exports = new DiceRepository();