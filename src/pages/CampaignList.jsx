import React from "react";
import { motion } from "framer-motion";
import useCampaigns from "../Hook/useCampaigns";
import Loader from "../components/Loader";
import { TrendingUp, DollarSign, MousePointer, Clock } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  hover: { scale: 1.03, transition: { duration: 0.3 } },
};

const CampaignList = ({ limit }) => {
  const { campaigns, loading, error } = useCampaigns();

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader />
      </div>
    );

  if (error)
    return (
      <p className="text-red-500 text-center mt-5 text-lg font-medium">
        {error}
      </p>
    );

  const displayedCampaigns = Array.isArray(campaigns)
    ? limit
      ? campaigns.slice(0, limit)
      : campaigns
    : [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 font-inter">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mb-7">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-700 dark:text-purple-400">
          Campaigns
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Showing {displayedCampaigns.length} campaign
          {displayedCampaigns.length === 1 ? "" : "s"}
        </p>
      </div>

      {displayedCampaigns.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No campaigns found
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {displayedCampaigns.map((c) => (
            <motion.div
              key={c._id}
              className="bg-white dark:bg-[#0f0f0f] rounded-3xl shadow-lg p-5 sm:p-6 flex mb-10 flex-col justify-between border border-gray-200 dark:border-gray-700"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-purple-700 dark:text-purple-400 font-bold text-2xl truncate">
                  {c.campaignName || c.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 truncate font-medium">
                  {c.client || "Unknown client"}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid gap-4">
                <div className="flex justify-between items-center bg-gray-50 dark:bg-black p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Status
                    </span>
                  </div>
                  <span
                    className={`font-semibold ${
                      c.status === "active"
                        ? "text-green-500"
                        : c.status === "paused"
                          ? "text-yellow-500"
                          : "text-red-500"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-gray-50 dark:bg-black p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Budget
                    </span>
                  </div>
                  <span className="font-semibold">${c.budget}</span>
                </div>

                <div className="flex justify-between items-center bg-gray-50 dark:bg-black p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Impressions
                    </span>
                  </div>
                  <span className="font-semibold">{c.impressions ?? 0}</span>
                </div>

                <div className="flex justify-between items-center bg-gray-50 dark:bg-black p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <MousePointer className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Clicks
                    </span>
                  </div>
                  <span className="font-semibold">{c.clicks ?? 0}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CampaignList;
