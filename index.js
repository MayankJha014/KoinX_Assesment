import express from "express";
import axios from "axios";
import mongoose from "mongoose";
import Crypto from "./schema.js";
import cron from "node-cron";
import { std } from "mathjs";

const app = express();

const DB =
  "mongodb+srv://mayankjha0330:mayank@cluster0.3tm9t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let cryptoCronJob;

const headers = {
  accept: "application/json",
  "x-cg-demo-api-key": "CG-4Pi25Lvw76zCuRM19e78UVrr", // Replace with your actual API key
};

const fetchAndSaveCryptoData = async (coin) => {
  try {
    const apiurl = `https://api.coingecko.com/api/v3/coins/${coin}`;

    // Fetch data from CoinGecko API
    const response = await axios.get(apiurl, { headers });
    const data = response.data;

    const price = data.market_data.current_price.usd;
    const marketCap = data.market_data.market_cap.usd;
    const priceChange24H = data.market_data.price_change_percentage_24h;
    const cryptoData = new Crypto({
      coin: coin,
      price,
      marketCap,
      change24h: priceChange24H,
    });

    const savedData = await cryptoData.save();
    console.log(`Data for ${coin} saved: `, savedData);
  } catch (error) {
    console.error(`Error fetching or saving data for ${coin}: `, error.message);
  }
};

app.get("/stats", async (req, res) => {
  try {
    const { coin } = req.query;

    const apiurl = `https://api.coingecko.com/api/v3/coins/${coin}`;
    const headers = {
      accept: "application/json",
      "x-cg-demo-api-key": "CG-4Pi25Lvw76zCuRM19e78UVrr", // Use your actual API key here
    };
    const response = await axios.get(apiurl, { headers });
    const data = response.data;

    const price = data.market_data.current_price.usd;
    const marketCap = data.market_data.market_cap.usd;
    const priceChange24H = data.market_data.price_change_percentage_24h;

    res.json({
      price,
      marketCap,
      priceChange24H,
    });
  } catch (error) {
    console.error("Error fetching data:", error.message);
    res.status(500).json({ error: "Failed to fetch crypto data" });
  }
});

app.get("/start-cron", (req, res) => {
  if (cryptoCronJob) {
    return res.status(400).json({ message: "Cron job is already running." });
  }

  cryptoCronJob = cron.schedule("*/10 * * * * *", () => {
    console.log("Running cron job to fetch Bitcoin and Ethereum data...");

    fetchAndSaveCryptoData("bitcoin");
    fetchAndSaveCryptoData("ethereum");
    fetchAndSaveCryptoData("matic-network");
  });

  res.status(200).json({ message: "Cron job started successfully." });
});

app.get("/stop-cron", (req, res) => {
  if (!cryptoCronJob) {
    return res.status(400).json({ message: "No cron job is running." });
  }

  cryptoCronJob.stop(); // Stop the cron job
  cryptoCronJob = null; // Clear the cron job variable

  res.status(200).json({ message: "Cron job stopped successfully." });
});

app.get("/deviation", async (req, res) => {
  const coin = req.query.coin;
  if (!coin) {
    return res.status(400).json({ message: "Coin parameter is required." });
  }
  try {
    const records = await Crypto.find({ coin })
      .sort({ createdAt: -1 })
      .limit(100);

    if (records.length === 0) {
      return res.status(404).json({ message: `No records found for ${coin}.` });
    }

    const prices = records.map((record) => record.price);

    const standardDeviation = std(prices);

    res.json({ coin, standardDeviation });
  } catch (error) {
    console.error("Error fetching records:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

mongoose
  .connect(DB)
  .then(() => {
    app.listen(3000, () => {
      console.log(`Sever is running on ${3000}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
