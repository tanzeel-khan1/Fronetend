import { useEffect, useMemo, useState } from "react";
import axios from "axios";
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

const API_URL = "https://backend-three-alpha-69.vercel.app/api/campaigns";

const ymd = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

const formatLabel = (d) =>
  d.toLocaleDateString(undefined, { month: "short", day: "numeric" });

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
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${API_URL}/getall`);
        const campaigns = Array.isArray(res.data?.data) ? res.data.data : [];

        const today = startOfDay(new Date());
        const buckets = new Map();

        for (let i = 0; i < days; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() - i);
          buckets.set(ymd(d), 0);
        }

        for (const c of campaigns) {
          const raw = c?.createdAt || c?.startDate || c?.date;
          if (!raw) continue;
          const parsed = new Date(raw);
          if (Number.isNaN(parsed.getTime())) continue;

          const key = ymd(startOfDay(parsed));
          if (buckets.has(key)) {
            buckets.set(key, (buckets.get(key) ?? 0) + 1);
          }
        }

        const series = Array.from(buckets.entries())
          .map(([key, count]) => {
            const d = new Date(`${key}T00:00:00`);
            return { day: formatLabel(d), campaigns: count };
          })
          .reverse();

        if (!cancelled) setData(series);
      } catch (e) {
        if (!cancelled) setError("Failed to load chart data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [days]);

  const { total, avg, peak, minD } = useMemo(() => {
    const total = data.reduce((s, d) => s + d.campaigns, 0);
    const avg = data.length ? Math.round(total / data.length) : 0;
    const peak = data.length
      ? data.reduce((a, b) => (a.campaigns > b.campaigns ? a : b))
      : null;
    const minD = data.length
      ? data.reduce((a, b) => (a.campaigns < b.campaigns ? a : b))
      : null;
    return { total, avg, peak, minD };
  }, [data]);

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
            onClick={() => setDays?.(d)}
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
        {error ? (
          <div className="h-full grid place-items-center text-sm text-red-500">
            {error}
          </div>
        ) : loading ? (
          <div className="h-full grid place-items-center text-sm text-zinc-500">
            Loading...
          </div>
        ) : (
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

              <XAxis hide interval={tickInterval} />

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
        )}
      </div>
    </div>
  );
}