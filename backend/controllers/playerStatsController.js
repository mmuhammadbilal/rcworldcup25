import PlayerStats from '../models/PlayerStats.js';

// Add or Update Player Stats
export const addOrUpdatePlayer = async (req, res) => {
  const { name, team, runs, wickets, bestBowling, type } = req.body;
  try {
    const player = await PlayerStats.findOneAndUpdate(
      { name, team }, // Match by name and team
      { runs, wickets, bestBowling, type },
      { upsert: true, new: true } // Create if not exists
    );
    res.json({ success: true, player });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
export const getTopPlayers = async (req, res) => {
  try {
    const { type } = req.query; // expected values: Batsman, Bowler, Allrounder

    if (!type) {
      return res.status(400).json({ success: false, message: 'type query param required' });
    }

    let players = [];

    if (type === 'Batsman') {
      players = await PlayerStats.find({ role: 'Batsman' }).sort({ runs: -1 }).limit(3);
    } else if (type === 'Bowler') {
      players = await PlayerStats.find({ role: 'Bowler' }).sort({ wickets: -1 }).limit(3);
    } else if (type === 'Allrounder') {
      const WICKET_WEIGHT = 10; // adjust this as you see fit

players = await PlayerStats.aggregate([
  { $match: { role: 'Allrounder' } },
  {
    $addFields: {
      performanceScore: { 
        $add: [
          "$runs",
          { $multiply: [ "$wickets", WICKET_WEIGHT ] }
        ]
      }
    }
  },
  { $sort: { performanceScore: -1 } },
  { $limit: 3 }
]);

    } else {
      return res.status(400).json({ success: false, message: 'Invalid type query param' });
    }

    res.json(players);  // Return the array directly, not wrapped in an object
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

