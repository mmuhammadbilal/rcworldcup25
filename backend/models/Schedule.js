import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
});

export default mongoose.model("Schedule", scheduleSchema);
