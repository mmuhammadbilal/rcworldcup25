import Team from "../models/team.js";

// Helper function to validate squad length
const validateSquad = (squad) => Array.isArray(squad) && squad.length === 15;

export const createTeam = async (req, res) => {
  try {
    const { name, ownerName, wins, captain, squad, shortName, logoUrl } = req.body;

    // Validate required fields
    if (!name || !ownerName || !captain) {
      return res.status(400).json({ error: "Name, ownerName and captain are required." });
    }

    // Validate squad length
    if (!validateSquad(squad)) {
      return res.status(400).json({ error: "Squad must be an array of exactly 15 members." });
    }

    // Create team
    const team = new Team({
      name,
      ownerName,
      wins: wins || 0,
      captain,
      squad,
      shortName,
      logoUrl
    });

    await team.save();
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getTeamByName = async (req, res) => {
  const { name } = req.query;
  if (!name) return res.status(400).json({ error: "Team name is required" });

  try {
    // Find the team by exact name or case-insensitive regex
    const team = await Team.findOne({ name: { $regex: `^${name}$`, $options: "i" } });
    if (!team) return res.status(404).json({ error: "Team not found" });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
