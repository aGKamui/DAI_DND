const userRepository = require("../repository/user.repository");

class UserService {
  constructor(){}

  async getUser(username){
    let user = await userRepository.getUser(username);
    return user[0];
  }

  async changeType(username, type){
    if(type.usertype === "Free" || type.usertype === "Paid"){
      let updatedUser = await userRepository.changeType(username, type);
      return updatedUser;
    }
    return 400;
  }

  async createUser(user){
    if(user.usertype === "Free" || user.usertype === "Paid"){
      let newUser = await userRepository.createUser(user);
      return newUser;
    }
    return 400;
  }
}

module.exports = new UserService();
