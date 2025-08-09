import mongoose from "mongoose";

const playerStatsSchema = new mongoose.Schema({
  playerName: { type: String, required: true },
  team: { type: String, required: true },
  runs: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  economy: { type: Number, default: 0 }, // optional
  average: { type: Number, default: 0 }, // optional
  role: { type: String, enum: ['Batsman', 'Bowler', 'Allrounder'], required: true }
});

export default mongoose.model("PlayerStats", playerStatsSchema);
