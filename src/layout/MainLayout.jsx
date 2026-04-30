import React, { useEffect } from "react";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  return (
    <div className="min-h-screen text-slate-950 dark:text-slate-100 transition-colors duration-300">
      <Sidebar />

      <div className="flex min-h-screen flex-col pt-16 md:pt-0 md:ml-72">
        <main className="min-h-screen">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
