// characterController.js
const characterService = require('../service/character.service');
const logger = require("../logger/api.logger");

class CharacterController {

  async getCharacter(username, character_id) {
    return await characterService.getCharacter(username, character_id);

  };

  async createCharacter(user, character) {
    return await characterService.createCharacter(user, character);
  };

}
module.exports = new CharacterController();

