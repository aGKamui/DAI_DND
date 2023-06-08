const characterService = require('../service/character.service');
const logger = require("../logger/api.logger");

class CharacterController {

  async getCharacter(username, character_id) {
    return await characterService.getCharacter(username, character_id);
  };

  async getCharacterValue(username, character_id, value) {
    return (await characterService.getCharacter(username, character_id))[value];
  };

  async createCharacter(username, character) {
    return await characterService.createCharacter(username, character);
  };

  async changeCharacter(username, changes, character_id) {
    return await characterService.changeCharacter(username, changes, character_id);
  };

  async delCharacter(username, character_id) {
    return await characterService.delCharacter(username, character_id);
  };

}
module.exports = new CharacterController();
