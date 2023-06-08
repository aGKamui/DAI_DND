const userService = require("../service/user.service");

class UserController {
  async getUser(username) {
    return await userService.getUser(username);
  }

  async changeType(username, type){
    return await userService.changeType(username, type);
  }

  async deleteUser(user){
    return await userService.deleteUser(user);
  }
}
module.exports = new UserController();