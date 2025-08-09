import PointsTable from '../models/PointsTable.js';

export const updatePoints = async (req, res) => {
  const { teamName, matches, wins, losses, ties, runRate, points, result } = req.body;
  try {
    const team = await PointsTable.findOneAndUpdate(
      { teamName },
      { matches, wins, losses, ties, runRate, points, result },
      { upsert: true, new: true }
    );
    res.json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPointsTable = async (req, res) => {
  const table = await PointsTable.find().sort({ points: -1, runRate: -1 });
  res.json(table);
};
