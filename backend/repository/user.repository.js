const { connect } = require("../config/db.config");
const User = require("../model/user.model");

class UserRepository {
  constructor() {
    connect();
  }

  async createUser(user){
    let data = {}
    try { data = await User.create(user) }
    catch(err){ logger.error("Error::" + err); }
    return data;
  }

  async getUser(username){
    return await User.find({username:username});
  }

  async changeType(username, type){
    console.log(username);
    console.log(type);
    return await User.findOneAndUpdate({username:username}, type);
  }
}

module.exports = new UserRepository();
