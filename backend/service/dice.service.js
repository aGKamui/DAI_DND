const diceRepository = require("../repository/dice.repository");

class DiceService{
    async roll(rolldata){
        rolldata.diceresult = Math.floor(Math.random() * (rolldata.dicetype - 1) + 1);
        rolldata.finalresult = rolldata.diceresult + rolldata.modifiers;
        return await diceRepository.saveRoll(rolldata);
    }

    async saveRoll(rolldata){
        return await diceRepository.saveRoll(rolldata);
    }
}

module.exports = new DiceService();