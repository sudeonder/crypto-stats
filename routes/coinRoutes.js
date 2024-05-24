const express = require("express");
const router = express.Router();

const {
  getCoins,
  addCoin,
  deleteCoin,
} = require("../controllers/coinController");

router.get("/", getCoins);

router.post("/", addCoin);

router.delete("/:id", deleteCoin);

module.exports = router;
