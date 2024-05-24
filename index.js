
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Coin } = require("./models/models");
const coinRoutes = require("./routes/coinRoutes");
const cmcRoutes = require('./routes/cmcRoutes');
require('dotenv').config();


//middleware
app.use(express.json());
app.use(express.static("public"));

// routes
app.use("/api/coin", coinRoutes);
app.use("/api/cmc", cmcRoutes)

const mongodbUri = process.env.MONGODB_URI;


mongoose
  .connect(
    mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
