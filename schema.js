import { Schema, model } from "mongoose";

// Define the schema for cryptocurrency data
const cryptoSchema = new Schema({
  coin: {
    type: String,
    required: true,
    enum: ["bitcoin", "ethereum", "polygon"], // Restrict to these values
  },
  price: {
    type: Number,
    required: true,
  },
  marketCap: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Crypto = model("Crypto", cryptoSchema);

export default Crypto;
