const userService = require("../service/user.service");

class UserController {
  async getUser(username) {
    return await userService.getUser(username);
  }

  async update(username, toChange){
    return await userService.update(username, toChange);
  }

  async deleteUser(user){
    return await userService.deleteUser(user);
  }
}
module.exports = new UserController();