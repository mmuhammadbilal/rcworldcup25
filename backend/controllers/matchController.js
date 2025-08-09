import Match from '../models/Match.js';

export const createMatch = async (req, res) => {
  try {
    const match = new Match(req.body);
    await match.save();
    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getMatches = async (req, res) => {
  const matches = await Match.find().sort({ date: -1 });
  res.json(matches);
};
