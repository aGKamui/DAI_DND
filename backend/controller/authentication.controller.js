const authenticationService = require("../service/authentication.service");
const logger = require("../logger/api.logger");

class AuthenticationController {
  async loginUser() {
    logger.info("Controller: loginUser");
    return await authenticationService.loginUser();
  }

  async createUser(user) {
    logger.info("Controller: createUser", user);
    return await authenticationService.createUser(user);
  }
}
module.exports = new AuthenticationController();
