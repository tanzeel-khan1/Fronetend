import DarkModeToggle from "./DarkModeToggle";

export default function Topbar({ days, onDaysChange }) {
  return (
    <div className="flex justify-between items-center px-13 py-5 bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 shadow-md">
      <h1 className="text-xl font-semibold ml-2 md:ml-0">Campaign Dashboard</h1>

      <div className="flex items-center space-x-4">
        <select
          value={days}
          onChange={(e) => onDaysChange(Number(e.target.value))} // ✅ FIX
          className="bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded cursor-pointer"
        >
          <option value="7">Last 7d</option>
          <option value="30">Last 30d</option>
          <option value="90">Last 90d</option>
        </select>

        <DarkModeToggle />
      </div>
    </div>
  );
}
