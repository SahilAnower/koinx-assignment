import axios from "axios";

class CoinGeckoService {
  constructor() {
    this.httpClient = axios.create({
      baseURL: process.env.COINGECKO_BASE_URL,
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
      },
    });
  }

  async getCoinDetailsByIds(ids, currency, paramConfigObject = {}) {
    try {
      const response = await this.httpClient.get("/simple/price", {
        params: {
          ids,
          vs_currencies: currency,
          ...paramConfigObject,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching coin details:", error.message);
      throw error;
    }

    // sample response for above function call
    //     {
    //   bitcoin: {
    //     usd: 94958,
    //     usd_market_cap: 1881221916366.6587,
    //     usd_24h_change: 1.5460560909190189
    //   },
    //   ethereum: {
    //     usd: 3310.86,
    //     usd_market_cap: 398939123491.1414,
    //     usd_24h_change: -0.09833396447821725
    //   },
    //   'matic-network': {
    //     usd: 0.46303,
    //     usd_market_cap: 889076614.8196999,
    //     usd_24h_change: 0.6721960187911719
    //   }
    // }
  }
}

export default CoinGeckoService;
