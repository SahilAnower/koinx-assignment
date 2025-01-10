import Coin from "../models/Coin.js";
import { getDeviation } from "../utils/deviation.js";
import CoinGeckoService from "./coingecko.js";

class CoinService {
  constructor() {
    this.coinGeckoService = new CoinGeckoService();
  }

  async getStats(coinId) {
    try {
      const coinDetails = await Coin.findOne({ coinId: coinId }).sort({
        createdAt: -1,
      });
      console.log("coinDetails response from db: ", coinDetails);
      if (coinDetails && Object.entries(coinDetails).length > 0) {
        return coinDetails.toPlainObject();
      }

      // if not found in db, get from third party and save in local

      const data = await this.coinGeckoService.getCoinDetailsByIds(
        coinId,
        "usd",
        {
          include_market_cap: true,
          include_24hr_change: true,
        }
      );

      console.log(data);

      if (data && Object.entries(data).length > 0) {
        const currDate = new Date();
        await this.saveCoinsInDb(data, currDate);
        return {
          coinId: coinId,
          price: data?.[coinId]?.usd,
          marketCap: data?.[coinId]?.usd_market_cap,
          dayChange: data?.[coinId]?.usd_24h_change,
          lastFetchedAt: currDate,
        };
      }

      return null;
    } catch (error) {
      console.error("Error fetching coin details:", error?.message);
    }
  }

  async getDeviation(coinId) {
    try {
      let coinArr = await Coin.find({ coinId: coinId })
        .sort({ createdAt: -1 })
        .limit(100)
        .select("price -_id");
      console.log("coinArr response from db: ", coinArr);

      if (coinArr && coinArr.length > 0) {
        coinArr = coinArr.map((coin) => coin.toPlainObject());

        const deviation = getDeviation(coinArr.map((coin) => coin.price));
        return deviation;
      }

      return null;
    } catch (error) {
      console.error("Error fetching deviation details:", error?.message);
    }
  }

  async saveCoinsInDb(data, currDate) {
    const coinDataArr = [];

    for (const [coinId, coinData] of Object.entries(data)) {
      coinDataArr.push({
        coinId: coinId,
        price: coinData.usd,
        marketCap: coinData.usd_market_cap,
        dayChange: coinData.usd_24h_change,
      });
    }

    await Coin.insertMany(coinDataArr);
  }
}

export default CoinService;
