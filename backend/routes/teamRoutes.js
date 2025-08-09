import express from "express";
import { getTeamByName,createTeam, getAllTeams } from "../controllers/teamController.js";

const router = express.Router();

router.post("/", createTeam);
router.get('/', (req, res) => {
  if (req.query.name) {
    return getTeamByName(req, res);
  }
  return getAllTeams(req, res);
});

export default router;
