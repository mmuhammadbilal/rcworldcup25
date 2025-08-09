import mongoose from "mongoose";

const matchSchema = new mongoose.Schema({
teamA: { type: String, required: true },
teamB: { type: String, required: true },
winner: { type: String, required: true },

  teamAScore: {
    type: String, // Example: "145 (20 ov)"
    required: true
  },
  teamBScore: {
    type: String, // Example: "142 (19.5 ov)"
    required: true
  },

  

  result: {
    type: String // Example: "Won by 3 wickets"
  },

  playerOfTheMatch: {
    type: String
  },

  screenshots: [{
    type: String // Store filename or URL of uploaded image
  }],

  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

export default mongoose.model("Match", matchSchema);
