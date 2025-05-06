import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const DarkModeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`p-2 rounded-lg transition-colors duration-300
        ${darkMode 
          ? "bg-gray-700 text-yellow-300 hover:bg-gray-600" 
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {darkMode ? (
        <FiSun className="text-lg" />
      ) : (
        <FiMoon className="text-lg" />
      )}
    </button>
  );
};

export default DarkModeToggle;