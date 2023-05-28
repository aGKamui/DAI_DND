const { connect } = require("../config/db.config");
const UserCredential = require("../model/userCredential.model");
const logger = require("../logger/api.logger");

class AuthRepository {
  constructor() {
    connect();
  }

  async loginUser(user) {
    const userCredentials = await UserCredential.find({username:user.username});
    if (userCredentials[0] == null) { return 401; }
    if (user.password === userCredentials[0].password) { return userCredentials[0].username; }
    return 401
  }

  async createUser(user) {
    let data = {};
    try { data = await UserCredential.create(user); }
    catch (err) { logger.error("Error::" + err); }
    return data;
  }
}

module.exports = new AuthRepository();
