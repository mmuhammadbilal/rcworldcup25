import React, { useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    teamA: '',
    teamAScore: '',
    teamAOvers: '',
    teamB: '',
    teamBScore: '',
    teamBOvers: '',
    winner: '',
    result: '',
    date: '',
    playerOfTheMatch: '',
    screenshots: null,

    bestBatters: Array.from({ length: 4 }, () => ({ name: '', runs: '', team: '' })),
    bestBowlers: Array.from({ length: 4 }, () => ({ name: '', wickets: '', runsGiven: '', team: '' })),
    bestAllrounders: Array.from({ length: 4 }, () => ({ name: '', runs: '', wickets: '', team: '' })),
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (index, field, subfield, value) => {
    const updated = [...formData[field]];
    updated[index][subfield] = value;
    setFormData({ ...formData, [field]: updated });
  };

  const handleScreenshotChange = (e) => {
    setFormData({ ...formData, screenshots: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append('teamA', formData.teamA);
    submissionData.append('teamAScore', formData.teamAScore);
    submissionData.append('teamAOvers', formData.teamAOvers);
    submissionData.append('teamB', formData.teamB);
    submissionData.append('teamBScore', formData.teamBScore);
    submissionData.append('teamBOvers', formData.teamBOvers);
    submissionData.append('winner', formData.winner);
    submissionData.append('result', formData.result);
    submissionData.append('date', formData.date);
    submissionData.append('playerOfTheMatch', formData.playerOfTheMatch);
    submissionData.append('screenshots', formData.screenshots);

    submissionData.append('bestBatters', JSON.stringify(formData.bestBatters));
    submissionData.append('bestBowlers', JSON.stringify(formData.bestBowlers));
    submissionData.append('bestAllrounders', JSON.stringify(formData.bestAllrounders));

    try {
      await axios.post('http://localhost:5000/api/match/full', submissionData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Match submitted successfully!');
    } catch (error) {
      console.error(error);
      alert('Error submitting match.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4 max-w-2xl mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold">Submit Match Details</h2>

      {/* Match Info */}
      <input type="text" name="teamA" placeholder="Team A" value={formData.teamA} onChange={handleChange} required />
      <input type="text" name="teamAScore" placeholder="Team A Score" value={formData.teamAScore} onChange={handleChange} />
      <input type="text" name="teamAOvers" placeholder="Team A Overs" value={formData.teamAOvers} onChange={handleChange} />

      <input type="text" name="teamB" placeholder="Team B" value={formData.teamB} onChange={handleChange} required />
      <input type="text" name="teamBScore" placeholder="Team B Score" value={formData.teamBScore} onChange={handleChange} />
      <input type="text" name="teamBOvers" placeholder="Team B Overs" value={formData.teamBOvers} onChange={handleChange} />

      <input type="text" name="winner" placeholder="Winner" value={formData.winner} onChange={handleChange} required />
      <input type="text" name="result" placeholder="Result (Win by X runs/wickets)" value={formData.result} onChange={handleChange} />
      <input type="text" name="playerOfTheMatch" placeholder="Player of the Match" value={formData.playerOfTheMatch} onChange={handleChange} />
      <input type="date" name="date" value={formData.date} onChange={handleChange} />

      <div>
        <label>Screenshot:</label>
        <input type="file" onChange={handleScreenshotChange} />
      </div>

      {/* Best Batters */}
      <h3 className="font-semibold">Best Batters</h3>
      {formData.bestBatters.map((batter, index) => (
        <div key={index} className="space-x-2">
          <input type="text" placeholder={`Batter ${index + 1} Name`} value={batter.name} onChange={(e) => handleNestedChange(index, 'bestBatters', 'name', e.target.value)} />
          <input type="number" placeholder="Runs" value={batter.runs} onChange={(e) => handleNestedChange(index, 'bestBatters', 'runs', e.target.value)} />
          <input type="text" placeholder="Team Name" value={batter.team} onChange={(e) => handleNestedChange(index, 'bestBatters', 'team', e.target.value)} />
        </div>
      ))}

      {/* Best Bowlers */}
      <h3 className="font-semibold">Best Bowlers</h3>
      {formData.bestBowlers.map((bowler, index) => (
        <div key={index} className="space-x-2">
          <input type="text" placeholder={`Bowler ${index + 1} Name`} value={bowler.name} onChange={(e) => handleNestedChange(index, 'bestBowlers', 'name', e.target.value)} />
          <input type="number" placeholder="Wickets" value={bowler.wickets} onChange={(e) => handleNestedChange(index, 'bestBowlers', 'wickets', e.target.value)} />
          <input type="number" placeholder="Runs Given" value={bowler.runsGiven} onChange={(e) => handleNestedChange(index, 'bestBowlers', 'runsGiven', e.target.value)} />
          <input type="text" placeholder="Team Name" value={bowler.team} onChange={(e) => handleNestedChange(index, 'bestBowlers', 'team', e.target.value)} />
        </div>
      ))}

      {/* Best Allrounders */}
      <h3 className="font-semibold">Best Allrounders</h3>
      {formData.bestAllrounders.map((player, index) => (
        <div key={index} className="space-x-2">
          <input type="text" placeholder={`Allrounder ${index + 1} Name`} value={player.name} onChange={(e) => handleNestedChange(index, 'bestAllrounders', 'name', e.target.value)} />
          <input type="number" placeholder="Runs" value={player.runs} onChange={(e) => handleNestedChange(index, 'bestAllrounders', 'runs', e.target.value)} />
          <input type="number" placeholder="Wickets" value={player.wickets} onChange={(e) => handleNestedChange(index, 'bestAllrounders', 'wickets', e.target.value)} />
          <input type="text" placeholder="Team Name" value={player.team} onChange={(e) => handleNestedChange(index, 'bestAllrounders', 'team', e.target.value)} />
        </div>
      ))}

      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit Match</button>
    </form>
  );
};

export default AdminDashboard;
