const { connect } = require("../config/db.config");
const UserCredential = require("../model/userCredential.model");
const logger = require("../logger/api.logger");

class AuthenticationRepository {
  constructor() {
    connect();
  }

  async loginUser() {
    const user = await UserCredential.find({});
    console.log("users:::", user);
    return user;
  }

  async createUser(user) {
    let data = {};
    try {
      data = await UserCredential.create(user);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }
}

module.exports = new AuthenticationRepository();
