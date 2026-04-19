import { useState, useEffect } from "react";
import { Settings, Pencil } from "lucide-react";

export default function Profile() {
  return (
    <div className="w-full">
      <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-3xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md mx-auto text-center border border-gray-200 dark:border-gray-700 transition">
        {/* Top Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-105 transition">
            <Settings size={18} />
          </button>
          <button className="p-2 rounded-full bg-purple-600 text-white hover:scale-105 transition">
            <Pencil size={18} />
          </button>
        </div>

        {/* Avatar */}
        <div className="relative w-fit mx-auto">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="profile"
            className="w-28 h-28 rounded-full mx-auto border-4 border-purple-500 shadow-lg"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-semibold mt-5 text-gray-900 dark:text-white">
          Naseem Khan
        </h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Full Stack Developer
        </p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
            <p className="font-bold text-gray-900 dark:text-white">120</p>
            <p className="text-xs text-gray-500">Projects</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
            <p className="font-bold text-gray-900 dark:text-white">5K</p>
            <p className="text-xs text-gray-500">Clients</p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-xl">
            <p className="font-bold text-gray-900 dark:text-white">3+ yrs</p>
            <p className="text-xs text-gray-500">Experience</p>
          </div>
        </div>

        {/* Bio */}
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Building premium web experiences with modern technologies like React,
          Node.js, and Tailwind CSS. Focused on performance, design, and user
          experience.
        </p>
      </div>
    </div>
  );
}
