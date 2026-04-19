import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Home, Settings, Star, Form } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/home", icon: Home },
    { name: "All Campaigns", path: "/campaigns", icon: Star },
    { name: "Create Campaign", path: "/form", icon: Form },
    { name: "Setting", path: "/setting", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        className="md:hidden fixed top-3 left-3 z-50 bg-purple-600 text-white p-2 rounded-lg shadow-lg cursor-pointer"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-[#0f0f0f] flex flex-col
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 transition-transform duration-300 z-40 shadow-xl border-r border-gray-200 dark:border-gray-800`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-purple-600 text-white w-10 h-10 flex items-center justify-center rounded-xl font-bold text-lg">
              NT
            </div>
            <span className="text-lg font-semibold text-gray-800 dark:text-white">
              Dashboard
            </span>
          </div>

          <button
            className="md:hidden text-gray-600 dark:text-gray-300 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-4 space-y-2">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={i}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
                  
                  ${
                    isActive
                      ? "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-800/20"
                  }`
                }
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="mt-auto p-4 text-xs text-gray-400 border-t border-gray-200 dark:border-gray-800">
          v1.0 Dashboard
        </div>
      </aside>
    </>
  );
}
