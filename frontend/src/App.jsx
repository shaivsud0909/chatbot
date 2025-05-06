import React, { useState } from "react";
import Chatbot from "./components/Chatbot";
import History from "./components/History";
import { FiMenu, FiX } from "react-icons/fi";
import { RiRobot2Line } from "react-icons/ri";
import { BsJournalBookmark } from "react-icons/bs";

const App = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleHistory = () => {
    setShowHistory(!showHistory);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center w-full px-4 py-3 sticky top-0 z-10 bg-white shadow-md">
        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 rounded-md"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500">
            <RiRobot2Line className="text-xl text-white" />
          </div>
          <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            AI Chatbot
          </h1>
        </div>

        <div className="flex gap-2 items-center">
          {/* History Toggle Button (desktop only) */}
          <button
            onClick={toggleHistory}
            className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            <BsJournalBookmark />
            <span>{showHistory ? "Hide" : "History"}</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden p-4 bg-white shadow-sm">
          <button
            onClick={toggleHistory}
            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            <div className="flex items-center gap-2">
              <BsJournalBookmark />
              <span>{showHistory ? "Hide History" : "Show History"}</span>
            </div>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Chatbot Area */}
        <div className={`flex flex-col h-full transition-all duration-300 relative bg-white ${
          showHistory ? "lg:w-[65%]" : "w-full"
        }`}>
          <Chatbot />
        </div>

        {/* History Panel */}
        {showHistory && (
          <div className="lg:w-[35%] w-full h-full border-l bg-white border-gray-200">
            <History />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;