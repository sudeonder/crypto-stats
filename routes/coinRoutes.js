const express = require("express");
const { Coin } = require("../models/models");
const router = express.Router();
const mongoose = require("mongoose");
const {
  getCoins,
  addCoin,
  deleteCoin,
} = require("../controllers/coinController");

router.get("/", getCoins);

router.post("/", addCoin);

router.delete("/:id", deleteCoin);

module.exports = router;
