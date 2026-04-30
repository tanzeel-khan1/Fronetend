import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  BarChart3,
  Home,
  Menu,
  PlusCircle,
  Settings,
  Sparkles,
  Target,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/home", icon: Home },
    { name: "All Campaigns", path: "/campaigns", icon: BarChart3 },
    { name: "Create Campaign", path: "/form", icon: PlusCircle },
    { name: "Setting", path: "/setting", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Button */}
      <button
        className="fixed left-4 top-4 z-50 grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white shadow-lg shadow-slate-950/20 transition hover:bg-slate-800 md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-72 flex-col overflow-hidden border-r border-white/60 bg-white/86 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/84 dark:shadow-black/30
        transform ${open ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 md:translate-x-0`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-linear-to-br from-teal-400/18 via-indigo-500/10 to-transparent" />

        {/* Logo */}
        <div className="relative flex items-center justify-between border-b border-slate-200/70 p-6 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-slate-950 text-white shadow-lg shadow-slate-950/20 dark:bg-white dark:text-slate-950">
              <Target size={22} />
            </div>
            <div>
              <span className="block text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                Campaigns
              </span>
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
                Command
              </span>
            </div>
          </div>

          <button
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white md:hidden"
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav */}
        <nav className="relative space-y-2 p-4">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={i}
                to={item.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-lg px-4 py-3.5 text-sm font-semibold transition-all duration-200
                  
                  ${
                    isActive
                      ? "bg-slate-950 text-white shadow-lg shadow-slate-950/15 dark:bg-white dark:text-slate-950 dark:shadow-black/20"
                      : "text-slate-600 hover:bg-white hover:text-slate-950 hover:shadow-sm dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="relative m-4 mt-auto rounded-lg border border-slate-200/70 bg-white/70 p-4 shadow-sm dark:border-white/10 dark:bg-white/5">
          <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/12 text-teal-600 dark:text-teal-300">
            <Sparkles size={18} />
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            Premium dashboard
          </p>
          <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">
            Clean controls for campaign tracking.
          </p>
        </div>
      </aside>
    </>
  );
}
