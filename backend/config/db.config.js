const mongoose = require("mongoose");
const logger = require("../logger/api.logger");

const connect = () => {
  const url =
    process.env.MONGO_CONNECTION_STRING || "mongodb+srv://jchrystellouk:CBy6SAP3iZpR4mnr@dai.ophvst2.mongodb.net/DAI?retryWrites=true&w=majority";

  mongoose.connect(url);

  mongoose.connection.once("open", async () => {
    logger.info("Connected to database");
  });

  mongoose.connection.on("error", (err) => {
    logger.error("Error connecting to database  ", err);
  });
};

const disconnect = () => {
  if (!mongoose.connection) {
    return;
  }

  mongoose.disconnect();

  mongoose.once("close", async () => {
    console.log("Diconnected  to database");
  });
};

module.exports = {
  connect,
  disconnect,
};
