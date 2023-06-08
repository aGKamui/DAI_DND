const authenticationRepository = require("../repository/auth.repository");
const jwt = require('jsonwebtoken');

class AuthenticationService {
  async loginUser(user) {
    let auth = await authenticationRepository.loginUser(user);
    if (auth !== 401) {
      let token = await this.generateAuthToken(auth);
      console.log(user);
      auth = {username: auth[0],type: auth[1], token: token}
    }
    return auth;
  }

  async createUser(user) {
    return await authenticationRepository.createUser(user);
  }


  async generateAuthToken(username){
    const token = jwt.sign({username}, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
    return token;
  }

  async verifyToken(token){  
    try {        
      return jwt.verify(token, process.env.JWT_SECRET_KEY)      
    } catch (error) { return 401}    
  }
}

module.exports = new AuthenticationService();
