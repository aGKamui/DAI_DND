const userService = require("../service/user.service");

class UserController {
  async getUser(username) {
    let user = await userService.getUser(username);
    return user;
  }

  async changeType(username, type){
    let user = await userService.changeType(username, type);
    return user;
  }

  async createUser(user){
    let newUser = await userService.createUser(user);
    return newUser;
  }
}
module.exports = new UserController();