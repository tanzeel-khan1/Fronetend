import { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const DAY_OPTIONS = [7, 30, 90];

const generateData = (days) => {
  return Array.from({ length: days }, (_, i) => ({
    day: `Day ${i + 1}`,
    campaigns: Math.floor(Math.random() * 100) + 20,
  }));
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-700 rounded-xl px-3 py-2 shadow-xl">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
          {label}
        </p>
        <p className="text-sm font-semibold text-indigo-500">
          {payload[0].value} campaigns
        </p>
      </div>
    );
  }
  return null;
};

export default function CampaignChart({ days, setDays }) {
//   const [days, setDays] = useState(30);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(generateData(days));
  }, [days]);

  const total = data.reduce((s, d) => s + d.campaigns, 0);
  const avg = data.length ? Math.round(total / data.length) : 0;
  const peak = data.length
    ? data.reduce((a, b) => (a.campaigns > b.campaigns ? a : b))
    : null;
  const minD = data.length
    ? data.reduce((a, b) => (a.campaigns < b.campaigns ? a : b))
    : null;

  const tickInterval = days > 30 ? Math.ceil(days / 15) : 0;

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl shadow-xl p-4 sm:p-6 transition-all">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1">
            Campaign Performance
          </p>
          <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            {total.toLocaleString()}
          </p>
        </div>

        <span className="self-start sm:self-auto text-xs px-3 py-1 rounded-full border border-indigo-300 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
          Last {days} Days
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {[
          {
            label: "Total Campaigns",
            value: total.toLocaleString(),
            sub: `Avg ${avg}/day`,
            subColor: "text-green-500",
          },
          {
            label: "Peak Day",
            value: peak?.campaigns ?? "—",
            sub: peak?.day ?? "",
            subColor: "text-green-500",
          },
          {
            label: "Min Activity",
            value: minD?.campaigns ?? "—",
            sub: minD?.day ?? "",
            subColor: "text-red-500",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-4 transition hover:shadow-lg hover:-translate-y-1"
          >
            <div className="text-[11px] text-zinc-500 uppercase tracking-wide mb-1">
              {s.label}
            </div>
            <div className="text-lg sm:text-xl font-semibold">
              {s.value}
            </div>
            <div className={`text-xs mt-1 ${s.subColor}`}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Day Selector */}
      <div className="flex flex-wrap gap-2 mb-5">
        {DAY_OPTIONS.map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`relative text-xs px-4 py-1.5 rounded-full border transition-all duration-200
            ${
              days === d
                ? "bg-indigo-500 text-white border-indigo-500 shadow-md scale-105"
                : "border-zinc-300 dark:border-zinc-700 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
          >
            {d}D
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-[220px] sm:h-[260px]">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(120,120,120,0.15)"
              vertical={false}
            />

            <XAxis hide />

            <YAxis
              tick={{ fill: "#71717a", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="campaigns"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#indigoGrad)"
              dot={days <= 30 ? { r: 3 } : false}
              activeDot={{ r: 6 }}
              isAnimationActive
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}