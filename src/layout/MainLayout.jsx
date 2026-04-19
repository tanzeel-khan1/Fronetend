import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen text-black dark:text-white transition-colors duration-300">
        <Sidebar />

        <div className="flex flex-col flex-1 pt-16 md:pt-0 md:ml-64 dark:bg-black">
          <main className=" dark:bg-black">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
