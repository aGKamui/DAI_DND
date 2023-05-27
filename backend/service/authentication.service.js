const authenticationRepository = require("../repository/authentication.repository");

class AuthenticationService {
  constructor() {}

  async loginUser() {
    return await authenticationRepository.loginUser();
  }

  async createUser(user) {
    return await authenticationRepository.createUser(user);
  }
}

module.exports = new AuthenticationService();
