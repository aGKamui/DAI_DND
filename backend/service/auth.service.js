const authenticationRepository = require("../repository/auth.repository");
const jwt = require('jsonwebtoken');

class AuthenticationService {
  constructor() {}

  async loginUser(user) {
    let auth = await authenticationRepository.loginUser(user);
    if (auth !== 401) {
      let token = await this.generateAuthToken(auth);
      auth = {username: auth, token: token}
    }
    return auth;
  }

  async createUser(user) {
    return await authenticationRepository.createUser(user);
  }


  async generateAuthToken(username){
    const token = jwt.sign({username}, 'qjF36qhSdXYYzfgnG9Z8sFSDaFYSPXym', { expiresIn: '7d' });
    return token;
  }

  async verifyToken(token){
    try {
      const decoded = jwt.verify(token, 'qjF36qhSdXYYzfgnG9Z8sFSDaFYSPXym');
      return decoded;
    } catch (error) { return 401 }
  }
}

module.exports = new AuthenticationService();
