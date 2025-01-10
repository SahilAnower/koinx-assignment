import CoinGeckoService from "../services/coingecko.js";
import CoinService from "../services/coin.js";

export const saveCryptoToDb = async () => {
  try {
    const coinGeckoService = new CoinGeckoService();
    const coinService = new CoinService();

    const data = await coinGeckoService.getCoinDetailsByIds(
      "bitcoin,matic-network,ethereum",
      "usd",
      {
        include_market_cap: true,
        include_24hr_change: true,
      }
    );

    console.log({ data });

    if (Object.entries(data).length > 0) {
      await coinService.saveCoinsInDb(data, new Date());
    }
  } catch (error) {
    console.error("Error fetching coin details:", error.message);
  }
};
