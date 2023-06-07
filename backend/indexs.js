require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const authRoutes = require("./routes/auth");
const gemRoutes = require("./routes/gem");

const app = express();
const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/gem", gemRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
