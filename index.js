"use strict"

require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const personRoutes = require("./routes/person");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB,{useNewUrlParser: true}).then(() => console.log('Database connected successfully'))
        .catch((err) => console.log(err))

app.use(bodyParser.json());
app.use("/person", personRoutes);

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log("Server running on port ${port}");
})