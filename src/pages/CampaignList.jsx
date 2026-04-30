import React from "react";
import { motion as Motion } from "framer-motion";
import useCampaigns from "../Hook/useCampaigns";
import Loader from "../components/Loader";
import { Clock, DollarSign, MousePointer, TrendingUp } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

const statusStyles = {
  active:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300",
  paused:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-300",
  default:
    "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/20 dark:bg-rose-500/10 dark:text-rose-300",
};

const CampaignList = ({ limit }) => {
  const { campaigns, loading, error } = useCampaigns();

  if (loading)
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader />
      </div>
    );

  if (error)
    return (
      <p className="mt-5 text-center text-lg font-medium text-rose-500">
        {error}
      </p>
    );

  const displayedCampaigns = Array.isArray(campaigns)
    ? limit
      ? campaigns.slice(0, limit)
      : campaigns
    : [];

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
            Campaign library
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          Campaigns
          </h2>
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Showing {displayedCampaigns.length} campaign
          {displayedCampaigns.length === 1 ? "" : "s"}
        </p>
      </div>

      {displayedCampaigns.length === 0 ? (
        <div className="premium-panel rounded-lg border-dashed p-10 text-center">
          <p className="text-lg text-slate-500 dark:text-slate-400">
            No campaigns found
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayedCampaigns.map((c) => (
            <Motion.div
              key={c._id}
              className="premium-panel flex min-h-[310px] flex-col justify-between rounded-lg p-5 transition sm:p-6"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {/* Header */}
              <div className="mb-6">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                  {c.campaignName || c.name}
                    </h3>
                    <p className="mt-1 truncate text-sm font-medium text-slate-500 dark:text-slate-400">
                  {c.client || "Unknown client"}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold capitalize ${
                      statusStyles[c.status] || statusStyles.default
                    }`}
                  >
                    {c.status || "draft"}
                  </span>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid gap-3">
                <div className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-teal-500" />
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      Status
                    </span>
                  </div>
                  <span className="font-semibold capitalize text-slate-900 dark:text-white">
                    {c.status}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-indigo-500" />
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      Budget
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${Number(c.budget || 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-violet-500" />
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      Impressions
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {(c.impressions ?? 0).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-slate-200/70 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-2">
                    <MousePointer className="h-4 w-4 text-amber-500" />
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      Clicks
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {(c.clicks ?? 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </Motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CampaignList;
