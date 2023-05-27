const mongoose = require("mongoose");

const authenticationSchema = new mongoose.Schema(
  {
    UserName: "string",
    Password: "string",
    Mail: "string",
  }
);

const Authentication = mongoose.model("userCredentials", authenticationSchema);

module.exports = {
    Authentication,
};
