const { connect } = require("../config/db.config");
const Character = require("../model/character.model");
const User = require("../model/user.model");

class CharacterRepository {
  constructor() {
    connect();
  }

  async getCharacter(username, character_id){
    let character

    if (character_id != undefined){
        try{ character = await Character.findById(character_id); }
        catch(err){
            console.log("Character not found, id:", character_id)
            return 403
        }
    }

    let char_list_ids = await this.getUserCharacters(username);
    let char_list = [];
    let userOwns = false;
    if (char_list_ids.length > 0){
        for (let i = 0; i < char_list_ids.length; i++){
            let new_char = await Character.find({_id:char_list_ids[i]})
            char_list.push(new_char[0]);
            if (character_id != undefined) {
                if (new_char[0]["_id"].toString() == character["_id"].toString()) {
                    userOwns = true;
                }
            }
        }
    }
    if (!userOwns && character_id != undefined){ return 403; }
    else if (userOwns && character_id){ return character }
    return char_list;
  }

  async getUserCharacters(username){
    return (await User.find({username:username}))[0]["characters"];
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