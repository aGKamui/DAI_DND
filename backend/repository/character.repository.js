const { connect } = require("../config/db.config");
const Character = require("../model/character.model");
const User = require("../model/user.model");

class CharacterRepository {
  constructor() {
    connect();
  }

  async getCharacter(username, character_id){
    if (character_id != undefined){
      if(!(await this.userOwnsCharacter(username, character_id))){ return 403; }
      return await Character.findById(character_id);
    }

    let char_list_ids = await this.getUserCharacters(username);
    let char_list = []
    for (let i = 0; i < char_list_ids.length; i++){
      let char = await Character.findById(char_list_ids[i])
      char_list.push(char);
    }
    return char_list;
  }

  async getUserCharacters(username){
    let user_object_ids = (await User.find({username:username}))[0]["characters"]
    let user_ids = []
    user_object_ids.forEach(user_object => {
      user_ids.push(user_object.toString());
    });
    return user_ids;
  }

  async delCharacter(username, character_id){
    if(!(await this.userOwnsCharacter(username, character_id))){ return 403; }

    //deleting the character from the user character list
    let user = (await User.find({username:username}))[0];
    let user_characters = user["characters"]
    user_characters = user_characters.filter(e => e.toString() !== character_id);
    user["characters"] = user_characters;
    user.save();

    //deleting the character from the db
    let character;
    try{ character = await Character.findByIdAndDelete(character_id); }
    catch(err){
      console.log("Error deleting character, id: ", character_id)
      return 403
    }
    return character;
  }

  async userOwnsCharacter(username, character_id){
    let owned_characters_id = await this.getUserCharacters(username);
    return owned_characters_id.includes(character_id);
  }


  async createCharacter(username, character){
    let result = await Character.create(character);
    let new_id = result["_id"];
    await this.addCharacterUser(username, new_id)
    return result;
  }

  async addCharacterUser(username, new_id) {
    const user = (await User.find({username:username}))[0];
    user.characters.push(new_id);
    await user.save();
    return user;
  }


  async changeCharacter(username, changes, character_id){
    let character;
    try { character = await Character.findById(character_id); } 
    catch (error) { console.log("Character not found, id:", character_id); }
    if (character == undefined) { return 403 }
    for (const type in changes) {
      if (character[type] == undefined) { return 400 }
      character[type] = changes[type]
    }
    let result = await character.save();
    return result;
  }
}


module.exports = new CharacterRepository();