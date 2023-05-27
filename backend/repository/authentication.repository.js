const { connect } = require("../config/db.config");
const { Authentication } = require("../model/authentication.model");
const logger = require("../logger/api.logger");

class AuthenticationRepository {
  constructor() {
    connect();
  }

  async loginUser() {
    const user = await Authentication.find({});
    console.log("users:::", user);
    return user;
  }

  async createUser(user) {
    let data = {};
    try {
      data = await Authentication.create(user);
    } catch (err) {
      logger.error("Error::" + err);
    }
    return data;
  }
}

module.exports = new AuthenticationRepository();
