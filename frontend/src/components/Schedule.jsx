import React, { useEffect, useState } from "react";

const Schedule = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/matches");
        if (!res.ok) throw new Error("Failed to fetch matches");
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMatches();
  }, []);

  return (
    <section className="relative min-h-screen py-16 px-8 sm:px-16 lg:px-32 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      {/* subtle background cricket ball */}
      <img
        src="https://chatgpt-image-store.s3.amazonaws.com/cricket-ball-pro-max.png"
        alt="Cricket Ball"
        className="pointer-events-none absolute bottom-10 right-10 w-48 opacity-10 rotate-[25deg]"
      />

      <h2 className="text-5xl font-extrabold text-center mb-16 tracking-tight
        bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 drop-shadow-2xl"
      >
        🏏 RC World Cup 2025 - Match Schedule
      </h2>

      <div className="flex flex-col gap-16 max-w-7xl mx-auto">
        {matches.map((match) => (
          <div
            key={match._id}
            className="flex flex-col md:flex-row bg-white/10 border border-white/20 rounded-3xl shadow-lg backdrop-blur-lg
              hover:shadow-[0_10px_40px_rgba(255,165,0,0.5)] transition-shadow duration-500 cursor-default"
          >
            {/* Text left */}
            <div className="md:w-1/2 p-12 flex flex-col justify-center space-y-6 text-yellow-50">
              <h3 className="text-4xl font-extrabold tracking-wide
                bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500"
              >
                {match.teamA} <span className="text-yellow-400 mx-3">vs</span> {match.teamB}
              </h3>

              <p className="text-lg font-semibold">
                <strong>Date:</strong>{" "}
                <time dateTime={match.date}>
                  {new Date(match.date).toLocaleDateString(undefined, {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </p>

              <div className="grid grid-cols-2 gap-10 text-lg font-semibold">
                {match.teamAScore && (
                  <p className="text-yellow-300">
                    {match.teamA} Score: <span className="font-normal text-yellow-100">{match.teamAScore}</span>
                  </p>
                )}
                {match.teamBScore && (
                  <p className="text-yellow-300">
                    {match.teamB} Score: <span className="font-normal text-yellow-100">{match.teamBScore}</span>
                  </p>
                )}
              </div>

              <p className="text-green-400 font-semibold text-xl">
                Winner: {match.winner}
              </p>

              {match.result && (
                <p className="italic text-yellow-200 text-lg max-w-md">{match.result}</p>
              )}

              <p className="text-yellow-400 font-semibold text-lg">
                Player of the Match: {match.playerOfTheMatch}
              </p>
            </div>

            {/* Image right */}
            {match.screenshots && match.screenshots.length > 0 && (
              <div className="md:w-1/2 p-8 flex justify-center items-center">
                <img
                  src={`/assets/${match.screenshots[0]}`}
                  alt="Match Screenshot"
                  className="rounded-3xl shadow-xl object-cover max-h-[450px] max-w-full"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Schedule;
