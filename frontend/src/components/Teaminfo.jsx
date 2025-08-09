import React, { useEffect, useState } from "react";

const countryCodes = {
  INDIA: "IN",
  AUSTRALIA: "AU",
  PAKISTAN: "PK",
  ENGLAND: "GB",
  NEWZEALAND: "NZ",
  SOUTHAFRICA: "ZA",
  BANGLADESH: "BD",
  WESTINDIES: "JM",
};

const TeamInfo = ({ teamName, onBack }) => {
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!teamName) return;

    const fetchTeam = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `http://localhost:5000/api/teams?name=${encodeURIComponent(teamName)}`
        );
        if (!res.ok) throw new Error("Failed to fetch team data");
        const data = await res.json();
        const teamData = Array.isArray(data) ? data[0] : data;
        if (!teamData) throw new Error("Team not found");
        setTeam(teamData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-yellow-200">
        <p className="text-xl">Loading team data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-yellow-200 p-8">
        <p className="text-xl mb-6">Error: {error}</p>
        <button
          onClick={onBack}
          className="px-6 py-2 bg-yellow-400 text-[#0f2027] rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Back
        </button>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-yellow-200 p-8">
        <p className="text-xl">No team data available.</p>
        <button
          onClick={onBack}
          className="mt-4 px-6 py-2 bg-yellow-400 text-[#0f2027] rounded-lg font-semibold hover:bg-yellow-300 transition"
        >
          Back
        </button>
      </div>
    );
  }

  const normalizedName = team.name.toUpperCase().replace(/\s+/g, "");
  const flagCode = countryCodes[normalizedName] || "UN";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-yellow-200 p-8 flex flex-col max-w-6xl mx-auto">
      
      {/* Flag centered with margin-top */}
      <div className="w-40 h-24 mx-auto mt-[50px] overflow-hidden rounded-xl shadow-lg">
        <img
          src={`https://flagcdn.com/w320/${flagCode.toLowerCase()}.png`}
          alt={`${team.name} flag`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Team name centered below flag */}
      <h1 className="text-4xl font-extrabold mt-4 text-yellow-400 text-center">
        {team.name} <span className="text-yellow-300 text-xl">({team.shortName})</span>
      </h1>

      {/* Back button aligned left below team name */}
      <button
        onClick={onBack}
        className="mt-6 self-start px-6 py-3 bg-yellow-400 text-[#0f2027] rounded-lg font-semibold hover:bg-yellow-300 transition shadow-lg"
      >
        ← Back to Teams
      </button>

      {/* Team info container */}
      <div className="bg-white/10 rounded-3xl p-8 shadow-lg backdrop-blur-lg border border-yellow-400 mt-10">
        <div className="space-y-3 text-lg max-w-xl mx-auto text-yellow-100">
          <p>
            <strong className="text-yellow-300">Owner:</strong> {team.ownerName}
          </p>
          <p>
            <strong className="text-yellow-300">Captain:</strong> {team.captain}
          </p>
          <p>
            <strong className="text-yellow-300">Tournament Wins :</strong> {team.wins}
          </p>
        </div>

        <div className="mt-10 max-w-xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 border-b border-yellow-400 pb-2 text-center">
            Squad Members (15)
          </h2>
          <ul
            className="grid grid-cols-2 gap-x-6 gap-y-2 text-yellow-200 text-lg"
            style={{ columnGap: "3rem" }}
          >
            {team.squad.map((player, index) => (
              <li key={index} className="hover:text-yellow-400 transition">
                {player}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TeamInfo;
