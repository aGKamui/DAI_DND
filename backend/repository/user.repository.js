const { connect } = require("../config/db.config");
const User = require("../model/user.model");

class UserRepository {
  constructor() {
    connect();
  }

  async getUser(username){
    return await User.findOne({username:username});
  }

  async update(username, toChange){
    return await User.findOneAndUpdate({username:username}, toChange);
  }

  async addCampaign(username, campaign){
    console.log(username);
    let user = await User.findOne({username: username});
    console.log(user);
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

  async deleteCampaign(username, campaignId){
    let user = await User.findOne({username: username});
    user.campaigns.splice(user.campaigns.indexOf(campaignId), 1);
    await User.updateOne({username: username}, user);
  }
}

module.exports = new UserRepository();
