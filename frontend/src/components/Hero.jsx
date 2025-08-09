import React from "react";
import { motion } from "framer-motion";
import { FaTrophy, FaChartLine, FaUserFriends, FaChartBar } from "react-icons/fa";

const Hero = ({ onNavigate, scrollToSection }) => {
  const features = [

  { icon: <FaChartLine />, text: "Team Rankings", page: "points" },       // was: pointable
  { icon: <FaUserFriends />, text: "Match Results", page: "schedule"},
  { icon: <FaChartBar />, text: "Player Stats", page: "playerstats" },    // you can add 'playerstats' to router


  ];

  const handleClick = (page) => {
    if (onNavigate) onNavigate(page);
    if (scrollToSection) scrollToSection(); // Scroll to target section
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(26, 95, 122, 0.85), rgba(26, 95, 122, 0.95)), url(https://images.unsplash.com/photo-1531415074968-036ba1b575da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80)`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 drop-shadow"
        >
          🏏 Welcome to the RC World Cup 2025
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto"
        >
          Experience the thrill, stats, and results of the Real Cricket Game Event
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <button
            onClick={() => handleClick("schedule")}
            className="bg-[#FFD700] hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
           Results
          </button>

          <button
            onClick={() => handleClick("teams")}
            className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Explore Teams
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleClick(feature.page)}
              className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-6 text-white hover:bg-opacity-20 transition-all duration-300 text-center"
            >
              <div className="text-3xl mb-3 text-[#FFD700] flex justify-center">
                {feature.icon}
              </div>
              <h3 className="font-semibold">{feature.text}</h3>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
