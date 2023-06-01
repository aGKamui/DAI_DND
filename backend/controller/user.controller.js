const userService = require("../service/user.service");

class UserController {
  async getUser(username) {
    let user = await userService.getUser(username);
    return user;
  }

  async changeType(username, type){
    return await userService.changeType(username, type);
  }

  async deleteUser(user){
    return await userService.deleteUser(user);
  }
}
module.exports = new UserController();