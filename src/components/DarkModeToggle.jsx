import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);

    document.documentElement.classList.toggle("dark", newMode);
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="relative flex items-center w-14 h-8 rounded-full p-1 
                 bg-gray-300 dark:bg-gray-800 transition-all duration-300 cursor-pointer"
    >
      <div
        className={`w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center
        transform transition-all duration-300 cursor-pointer
        ${darkMode ? "translate-x-6" : "translate-x-0"}`}
      >
        {darkMode ? (
          <Sun size={14} className="text-yellow-500" />
        ) : (
          <Moon size={14} className="text-gray-700" />
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;
