import DarkModeToggle from "./DarkModeToggle";

export default function Topbar({ days, onDaysChange }) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/60 bg-white/72 text-slate-950 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/72 dark:text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="pl-14 md:pl-0">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-teal-600 dark:text-teal-300">
            Overview
          </p>
          <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
            Campaign Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track campaign health and recent performance
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <select
            value={days}
            onChange={(e) => onDaysChange(Number(e.target.value))}
            className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/12 dark:border-white/10 dark:bg-white/10 dark:text-slate-100"
          >
            <option value="7">Last 7d</option>
            <option value="30">Last 30d</option>
            <option value="90">Last 90d</option>
          </select>

          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
