import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <div className="flex min-h-screen text-black dark:text-white transition-colors duration-300">
      <Sidebar />

      <div className="flex flex-col flex-1 pt-16 md:pt-0 md:ml-64 dark:bg-black">
        <main className=" dark:bg-black">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
