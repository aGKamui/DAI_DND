const userRepository = require("../repository/user.repository");

class UserService {
  async getUser(username){
    let user = await userRepository.getUser(username);
    return user[0];
  }

  async changeType(username, type){
    if(type.type === "Free" || type.type === "Paid"){
      let updatedUser = await userRepository.changeType(username, type);
      return updatedUser;
    }
    return 400;
  }

  async deleteUser(user){
    try{return await userRepository.deleteUser(user);}
    catch(error) { return 400;}
  }
}

module.exports = new UserService();
