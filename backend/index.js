const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./route/task.route");
const logger = require("./logger/api.logger");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use(bodyParser.json());

app.use("/api/task", taskRoutes);

app.get("/random", (req, res) => {
  res.status = 418;
  res.send("Teapot!");
});

app.listen(port, () => {
  logger.info(`Server listening on the port  ${port}`);
});
