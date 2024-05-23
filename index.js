
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { Coin } = require("./models/models");
const coinRoutes = require("./routes/coinRoutes");
const cmcRoutes = require('./routes/cmcRoutes');


//middleware
app.use(express.json());

// routes
app.use("/api/coin", coinRoutes);
app.use("/api/cmc", cmcRoutes)


mongoose
  .connect(
    "mongodb+srv://admin:olimp@backenddb.niosxkb.mongodb.net/Crypto-Stats?retryWrites=true&w=majority&appName=backendDB",
    { useNewUrlParser: true, useUnifiedTopology: true }
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
