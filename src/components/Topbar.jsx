import DarkModeToggle from "./DarkModeToggle";

export default function Topbar({ days, onDaysChange }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200/70 dark:border-gray-800 bg-gray-100/90 dark:bg-black/90 backdrop-blur-sm text-gray-900 dark:text-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold tracking-tight">
            Campaign Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Track campaign health and recent performance
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <select
            value={days}
            onChange={(e) => onDaysChange(Number(e.target.value))}
            className="h-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 px-3 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500"
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
