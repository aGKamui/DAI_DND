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
  async getUserValue(username, value){
    return (await userService.getUser(username))[value];
  }
}
module.exports = new UserController();