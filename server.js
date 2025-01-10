import express from "express";
import schedule from "node-schedule";
import dotenv from "dotenv";

dotenv.config();

import dbConnect from "./configs/mongoConfig.js";
import { saveCryptoToDb } from "./jobs/fetchCoinDataJob.js";
import coinRoutes from "./routes/coin.js";

const init = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    const mongoDatabaseName = process.env.MONGO_DATABASE;

    await dbConnect(mongoUri, mongoDatabaseName);

    // on every 2 hours

    schedule.scheduleJob("0 */2 * * *", async () => {
      console.log("running a task every 2 hours");
      await saveCryptoToDb();
    });

    // on every 1 min - for dev testing

    // schedule.scheduleJob("*/1 * * * *", async () => {
    //   console.log("running a task every 1 min");
    //   await saveCryptoToDb();
    // });

    // await saveCryptoToDb();

    const app = express();
    app.use(express.json());

    app.use("/api/coins", coinRoutes);

    const PORT = process.env.PORT || 8080;

    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error("Error starting the app:", error.message);
  }
};

init();
