import mongoose from 'mongoose';

const PointsTableSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  matches: { type: Number, default: 0 },
  win: { type: Number, default: 0 },
  loss: { type: Number, default: 0 },
  tie: { type: Number, default: 0 },
  runRate: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  result: { type: String, default: 'Pending' }
}, { timestamps: true });

const PointsTable = mongoose.model('PointsTable', PointsTableSchema);

export default PointsTable; // ✅ this line fixes the import error
