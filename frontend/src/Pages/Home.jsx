import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Teams from '../components/Teams';
import Footer from '../components/Footer';
import Schedule from '../components/schedule';
import PointsTable from '../components/pointable';
import ContactPage from '../components/contactus';
import StatsPage from '../components/playerstat';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderMainSection = () => {
    switch (currentPage) {
      case 'home':
  return <Hero onNavigate={setCurrentPage} />;

      case 'schedule':
        return <Schedule />;
      case 'teams':
        return <Teams />;
      case 'points':
        return <PointsTable />;
        case 'playerstats':
      return <StatsPage />;
      case 'contact':
        return <ContactPage />;
      default:
  return <Hero onNavigate={setCurrentPage} />;

    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100 text-gray-800 font-sans">
      {/* Top Navbar */}
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />

      {/* Dynamic Page Section */}
      <main className="flex-grow">
        {renderMainSection()}

        {/* Teams Section on Home Only */}
        {currentPage === 'home' && (
          <section className="bg-white py-12 px-4 sm:px-8">
            <Teams />
          </section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
