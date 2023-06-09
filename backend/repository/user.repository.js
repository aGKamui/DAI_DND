const { connect } = require("../config/db.config");
const User = require("../model/user.model");

class UserRepository {
  constructor() {
    connect();
  }

  async getUser(username){
    return await User.find({username:username});
  }

  async update(username, toChange){
    return await User.findOneAndUpdate({username:username}, toChange);
  }

  async addCampaign(username, campaign){
    let user = await User.findOne({username: username});
    user.campaigns.push(campaign);
    await User.updateOne({username: username}, user);
    return user;
  }
  
  async deleteUser(username){
    return await User.deleteOne({username:username});
  }

  async exists(param){
    return await User.findOne(param);
  }
}

module.exports = new UserRepository();
