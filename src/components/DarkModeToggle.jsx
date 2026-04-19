import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const getCurrentMode = () =>
    document.documentElement.classList.contains("dark");
  const [darkMode, setDarkMode] = useState(getCurrentMode);

  useEffect(() => {
    const stored = localStorage.getItem("darkMode");
    const isDark = stored === null ? getCurrentMode() : stored === "true";
    document.documentElement.classList.toggle("dark", isDark);
    setDarkMode(isDark);

    const syncMode = () => setDarkMode(getCurrentMode());
    window.addEventListener("storage", syncMode);
    window.addEventListener("theme-changed", syncMode);

    return () => {
      window.removeEventListener("storage", syncMode);
      window.removeEventListener("theme-changed", syncMode);
    };
  }, []);

  const toggleDarkMode = () => {
    const newMode = !getCurrentMode();
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark", newMode);
    window.dispatchEvent(new Event("theme-changed"));
  };

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
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
