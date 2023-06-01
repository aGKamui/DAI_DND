const diceService = require("../service/dice.service")

class DiceController{
    async roll(rolldata){
        return await diceService.roll(rolldata);
    }

    async saveRoll(rolldata){
        return await diceService.saveRoll(rolldata);
    }
}

module.exports = new DiceController();