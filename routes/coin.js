import express from "express";
import CoinService from "../services/coin.js";

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const coinId = req.query.coin;
    const coinService = new CoinService();

    const coinDetails = await coinService.getStats(coinId);

    console.log("getStats coinDetails: ", coinDetails);

    if (coinDetails) {
      return res.status(200).json(coinDetails);
    }
    res.status(400).json({ message: "Coin not found" });
  } catch (error) {
    console.error("Error fetching coin details:", error?.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/deviation", async (req, res) => {
  try {
    const coinId = req.query.coin;
    const coinService = new CoinService();

    const deviation = await coinService.getDeviation(coinId);

    console.log("getDeviation details: ", deviation);

    if (deviation) {
      return res.status(200).json({ deviation });
    }
    res.status(400).json({ message: "Deviation can not be found" });
  } catch (error) {
    console.error("Error fetching deviation details:", error?.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
