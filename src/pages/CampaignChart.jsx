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
      <div className="rounded-lg border border-slate-200 bg-white/90 px-3 py-2 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90">
        <p className="mb-1 text-xs text-slate-500 dark:text-slate-400">
          {label}
        </p>
        <p className="text-sm font-semibold text-teal-600 dark:text-teal-300">
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
      } catch {
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
    <div className="premium-panel relative overflow-hidden rounded-lg p-4 transition-all sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-linear-to-r from-teal-400/12 via-indigo-500/10 to-transparent" />

      {/* Header */}
      <div className="relative mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
            Campaign Performance
          </p>
          <p className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {total.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Campaigns created in the selected range
          </p>
        </div>

        <span className="self-start rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-300 sm:self-auto">
          Last {days} Days
        </span>
      </div>

      {/* Stats */}
      <div className="relative mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            label: "Total Campaigns",
            value: total.toLocaleString(),
            sub: `Avg ${avg}/day`,
            subColor: "text-emerald-600 dark:text-emerald-300",
          },
          {
            label: "Peak Day",
            value: peak?.campaigns ?? "-",
            sub: peak?.day ?? "",
            subColor: "text-indigo-600 dark:text-indigo-300",
          },
          {
            label: "Min Activity",
            value: minD?.campaigns ?? "-",
            sub: minD?.day ?? "",
            subColor: "text-rose-600 dark:text-rose-300",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur-md transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-1 text-[11px] font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {s.label}
            </div>
            <div className="text-lg font-bold text-slate-950 dark:text-white sm:text-xl">
              {s.value}
            </div>
            <div className={`text-xs mt-1 ${s.subColor}`}>
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Day Selector */}
      <div className="relative mb-5 flex flex-wrap gap-2">
        {DAY_OPTIONS.map((d) => (
          <button
            key={d}
            onClick={() => setDays?.(d)}
            className={`relative rounded-full border px-4 py-1.5 text-xs font-bold transition-all duration-200
            ${
              days === d
                ? "scale-105 border-slate-950 bg-slate-950 text-white shadow-md dark:border-white dark:bg-white dark:text-slate-950"
                : "border-slate-300 text-slate-500 hover:bg-slate-100 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/10"
            }`}
          >
            {d}D
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="relative h-[220px] w-full sm:h-[280px]">
        {error ? (
          <div className="grid h-full place-items-center text-sm text-rose-500">
            {error}
          </div>
        ) : loading ? (
          <div className="grid h-full place-items-center text-sm text-slate-500">
            Loading...
          </div>
        ) : (
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="indigoGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.36} />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
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
                stroke="#14b8a6"
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
