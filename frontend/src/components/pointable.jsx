import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Map backend team names to country codes for flag URLs
const countryCodes = {
  INDIA: 'IN',
  AUSTRALIA: 'AU',
  PAKISTAN: 'PK',
  ENGLAND: 'GB',
  NEWZELAND: 'NZ',
  SOUTHAFRICA: 'ZA',
  BANGLADESH: 'BD',
  WESTINDIES: 'JM'
};

const PointsTable = () => {
  const [teams, setTeams] = useState([]);

  // Fetch points table from backend
  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/points');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setTeams(data);
      } catch (err) {
        console.error('Error fetching points table:', err);
      }
    };
    fetchPoints();
  }, []);

  return (
    <section className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-20 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] overflow-hidden">

      {/* 🏏 Background Cricket Touch */}
      <img
        src="https://chatgpt-image-store.s3.amazonaws.com/cricket-ball-pro-max.png"
        alt="Cricket Ball"
        className="absolute w-44 bottom-6 right-6 opacity-10 rotate-[35deg] z-0 pointer-events-none"
      />
      <img
        src="https://cdn-icons-png.flaticon.com/512/8094/8094517.png"
        alt="Cricket Bat"
        className="absolute w-28 top-10 left-10 opacity-10 rotate-[-20deg] z-0 pointer-events-none"
      />
      <div className="absolute inset-0 bg-[url('https://i.ibb.co/z6CgTnX/cricket-stadium-bg.png')] bg-cover bg-center opacity-5 mix-blend-lighten pointer-events-none"></div>
      <div className="min-h-[80px]"></div>

      {/* ✨ Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, scale: 0.85, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 drop-shadow-2xl mb-12 relative z-10"
      >
        🏆 RC World Cup 2025 - Points Table
      </motion.h2>

      {/* 📊 Table */}
      <div className="max-w-6xl mx-auto overflow-x-auto relative z-10">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-xl rounded-xl overflow-hidden">
          <table className="min-w-full text-white">
            <thead className="bg-white/10 border-b border-white/20">
              <tr>
                <th className="py-4 px-6 text-left">#</th>
                <th className="py-4 px-6 text-left">Team</th>
                <th className="py-4 px-6 text-center">P</th>
                <th className="py-4 px-6 text-center">W</th>
                <th className="py-4 px-6 text-center">L</th>
                <th className="py-4 px-6 text-center">Tie</th>
                <th className="py-4 px-6 text-center">NRR</th>
                <th className="py-4 px-6 text-center">Points</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, index) => (
                <tr key={team._id || index} className="hover:bg-white/5 transition-all duration-300">
                  <td className="py-4 px-6 font-bold text-pink-300">{index + 1}</td>
                  <td className="py-4 px-6 flex items-center gap-3 font-semibold">
                    <img
                      src={`https://flagsapi.com/${countryCodes[team.teamName] || 'UN'}/flat/32.png`}
                      alt={team.teamName}
                      className="w-6 h-6 rounded-full"
                    />
                    {team.teamName}
                  </td>
                  <td className="py-4 px-6 text-center">{team.matches}</td>
                  <td className="py-4 px-6 text-center text-green-400 font-bold">{team.win}</td>
                  <td className="py-4 px-6 text-center text-red-400 font-bold">{team.loss}</td>
                  <td className="py-4 px-6 text-center ">{team.tie}</td>
                <td className="py-4 px-6 text-center">
  {Number(team.runRate).toFixed(1)}
</td>

                  <td className="py-4 px-6 text-center text-yellow-400 font-extrabold">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default PointsTable;
