const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const authenticationRoutes = require("./route/auth.route");
const userRoutes = require("./route/user.route");
const diceRoutes = require("./route/dice.route");
const logger = require("./logger/api.logger");
const characterRoutes = require("./route/character.route");
const purchaseRoutes = require("./route/purchase.route");
const campaignRoutes = require("./route/campaign.route");
const sceneRoutes = require("./route/scene.route");
const chatRoutes = require("./route/chat.route");



const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');


app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use(bodyParser.json());


app.use(cors({
  origin : ["http://localhost:3000","http://127.0.0.1:3000"],
  credentials: true, // <= Accept credentials (cookies) sent by the client
}));


app.use(express.static('public'))

app.use("/api/auth", authenticationRoutes);

app.use("/api/user", userRoutes);

app.use("/api/dice", diceRoutes);

app.use("/api/character", characterRoutes);

app.use("/api/purchase", purchaseRoutes);

app.use("/api/campaign", campaignRoutes);

app.use("/api/scene", sceneRoutes);

app.use("/api/chat", chatRoutes);

app.get("/random", (req, res) => {
  res.status = 418;
  res.send("Teapot!");
});

app.listen(port, () => {
  logger.info(`Server listening on the port  ${port}`);
});
