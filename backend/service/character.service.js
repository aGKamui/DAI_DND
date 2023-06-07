const characterRepository = require("../repository/character.repository");

class CharacterService {
  async getCharacter(username, character_id){
    let character = await characterRepository.getCharacter(username, character_id);
    return character;
  }

  async createCharacter(username, character){
    let user = await characterRepository.createCharacter(username, character);
    return user;
  }

  async changeCharacter(username, changes, character_id){
    let user = await characterRepository.changeCharacter(username, changes, character_id);
    return user;
  }
}

module.exports = new CharacterService();