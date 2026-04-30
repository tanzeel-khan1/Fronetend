import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const getCurrentMode = () =>
    document.documentElement.classList.contains("dark");
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("darkMode");
    const isDark = stored === null ? getCurrentMode() : stored === "true";
    document.documentElement.classList.toggle("dark", isDark);
    return isDark;
  });

  useEffect(() => {
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
      className="relative flex h-8 w-14 items-center rounded-full bg-slate-200 p-1 shadow-inner transition-all duration-300 dark:bg-white/10"
    >
      <div
        className={`flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md transition-all duration-300
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
