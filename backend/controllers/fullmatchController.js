import Match from '../models/Match.js';
import PlayerStats from '../models/PlayerStats.js';
import PointsTable from '../models/PointsTable.js';
import Schedule from '../models/Schedule.js';
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

export const submitFullMatch = async (req, res) => {
  try {
    console.log('📥 Incoming Request Body:', req.body);
    console.log('📸 Screenshot:', req.file);

    const {
      teamA,
      teamB,
      teamAScore,
      teamBScore,
      teamAOvers,
      teamBOvers,
      winner,
      result,
      playerOfTheMatch,
      date,
    } = req.body;

    const screenshot = req.file;

    // Parse all players arrays (with team info from frontend)
    const bestBatters = JSON.parse(req.body.bestBatters || '[]');
    const bestBowlers = JSON.parse(req.body.bestBowlers || '[]');
    const bestAllrounders = JSON.parse(req.body.bestAllrounders || '[]');

    // Save match
    const match = new Match({
      teamA,
      teamB,
      teamAScore: `${teamAScore} (${teamAOvers} ov)`,
      teamBScore: `${teamBScore} (${teamBOvers} ov)`,
      winner,
      playerOfTheMatch,
      screenshots: screenshot ? [screenshot.originalname] : [],
      result,
      date: new Date(date)
    });
    await match.save();

    // Save ALL 4 players instead of only top 3
    const updatePlayers = async (players, role) => {
      for (let p of players) {
        if (!p.name) continue; // skip empty rows
        await PlayerStats.findOneAndUpdate(
          { playerName: p.name, role },
          {
            playerName: p.name,
            team: p.team || null, // comes from frontend
            role,
            $inc: {
              runs: Number(p.runs) || 0,
              wickets: Number(p.wickets) || 0,
              runsGiven: Number(p.runsGiven) || 0
            }
          },
          { upsert: true, new: true }
        );
      }
    };

    await updatePlayers(bestBatters, "Batsman");
    await updatePlayers(bestBowlers, "Bowler");
    await updatePlayers(bestAllrounders, "Allrounder");

    // Run rate difference
    const calculateRunRateDiff = (runsFor, oversFor, runsAgainst, oversAgainst) => {
      const rrFor = runsFor / oversFor;
      const rrAgainst = runsAgainst / oversAgainst;
      return rrFor - rrAgainst;
    };

    // Points table update
    const updateTeamPoints = async (teamName, isWinner, isTie, rrDiff) => {
      const existing = await PointsTable.findOne({ teamName });
      const updated = {
        matches: (existing?.matches || 0) + 1,
        win: (existing?.win || 0) + (isWinner ? 1 : 0),
        loss: (existing?.loss || 0) + (!isWinner && !isTie ? 1 : 0),
        tie: (existing?.tie || 0) + (isTie ? 1 : 0),
        points: (existing?.points || 0) + (isWinner ? 2 : isTie ? 1 : 0),
        runRate: (existing?.runRate || 0) + rrDiff,
      };
      await PointsTable.findOneAndUpdate({ teamName }, updated, { upsert: true });
    };

    const isTie = winner?.toLowerCase() === 'tie';

    if (!isTie) {
      const rrDiffTeamA = calculateRunRateDiff(
        parseInt(teamAScore),
        parseFloat(teamAOvers),
        parseInt(teamBScore),
        parseFloat(teamBOvers)
      );

      const rrDiffTeamB = calculateRunRateDiff(
        parseInt(teamBScore),
        parseFloat(teamBOvers),
        parseInt(teamAScore),
        parseFloat(teamAOvers)
      );

      if (teamA === winner) {
        await updateTeamPoints(teamA, true, false, rrDiffTeamA);
        await updateTeamPoints(teamB, false, false, rrDiffTeamB);
      } else {
        await updateTeamPoints(teamA, false, false, rrDiffTeamA);
        await updateTeamPoints(teamB, true, false, rrDiffTeamB);
      }
    } else {
      await updateTeamPoints(teamA, false, true, 0);
      await updateTeamPoints(teamB, false, true, 0);
    }

    // Mark schedule as completed
    await Schedule.findOneAndUpdate({ match: match._id }, { status: 'Completed' });

    res.status(201).json({ msg: 'Match recorded successfully.' });
  } catch (err) {
    console.error('❌ Match Submission Error:', err);
    res.status(500).json({ error: err.message });
  }
};
