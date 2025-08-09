import React, {useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import TeamInfo from "./Teaminfo";
const Teams = () => {
   const [selectedTeamName, setSelectedTeamName] = useState(null);

  const teams = [
    {
      name: "INDIA",
      flag: "https://flagcdn.com/w320/in.png",
      color: "bg-blue-50",
      accent: "border-blue-200"
    },
    {
      name: "AUSTRALIA",
      flag: "https://flagcdn.com/w320/au.png",
      color: "bg-yellow-50",
      accent: "border-yellow-200"
    },
    {
      name: "ENGLAND",
      flag: "https://flagcdn.com/w320/gb-eng.png",
      color: "bg-red-50",
      accent: "border-red-200"
    },
    {
      name: "PAKISTAN",
      flag: "https://flagcdn.com/w320/pk.png",
      color: "bg-green-50",
      accent: "border-green-200"
    },
    {
      name: "NEWZELAND",
      flag: "https://flagcdn.com/w320/nz.png",
      color: "bg-gray-50",
      accent: "border-gray-200"
    },
    {
      name: "SOUTHAFRCA",
      flag: "https://flagcdn.com/w320/za.png",
      color: "bg-emerald-50",
      accent: "border-emerald-200"
    },
    {
      name: "WESTINDIES",
      flag: "https://static.vecteezy.com/system/resources/previews/024/289/394/original/illustration-of-west-indies-flag-design-vector.jpg",
      color: "bg-purple-50",
      accent: "border-purple-200"
    },
    {
      name: "BANGLADESH",
      flag: "https://flagcdn.com/w320/bd.png",
      color: "bg-teal-50",
      accent: "border-teal-200"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
if (selectedTeamName) {
    return (
      <TeamInfo
        teamName={selectedTeamName}
        onBack={() => setSelectedTeamName(null)}
      />
    );
  }
  return (
    <div id="teams" className="..."> 
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="min-h-[80px]">
  {/* Optional content */}
</div>

        <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Participating Teams
          <span className="block text-lg font-medium text-gray-600 mt-2">
            RC World Cup 2025
          </span>
        </h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {teams.map((team, index) => (
            <motion.div
              key={team.name}
              variants={cardVariants}
              className={`${team.color} rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden border-2 ${team.accent}`}
            >
              <div className="p-6 flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full overflow-hidden shadow-inner">
                  <img
                    src={team.flag}
                    alt={`${team.name} flag`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">{team.name}</h2>
               <button
  className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
  onClick={() => setSelectedTeamName(team.name)}
>
  <FaInfoCircle />
  <span>Team Info</span>
</button>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
    </div>
  );
};

export default Teams;