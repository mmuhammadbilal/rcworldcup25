import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },       // team name
  ownerName: { type: String, required: true },  // owner of the team
  wins: { type: Number, default: 0 },            // how many times won tournament
  captain: { type: String, required: true },    // captain name
  squad: {
    type: [String],                              // array of strings for 15 member squad names
    validate: [arrayLimit, '{PATH} must have 15 members'],
    required: true
  },
  shortName: String,
  logoUrl: String
});

// Validator for exactly 15 members in squad
function arrayLimit(val) {
  return val.length === 15;
}

export default mongoose.model("Team", teamSchema);
