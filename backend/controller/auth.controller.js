const authService = require("../service/auth.service");
const logger = require("../logger/api.logger");

class AuthenticationController {
  async loginUser(user) {
    let auth = await authService.loginUser(user);
    logger.info("Authentication:", auth);
    return auth;
  }

  async createUser(user) {
    logger.info("Controller: createUser", user);
    return await authService.createUser(user);
  }
  async verifyUser(token){
    return await authService.verifyToken(token);
  }
}
module.exports = new AuthenticationController();
