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
  ? (limit ? campaigns.slice(0, limit) : campaigns)
  : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-0 mt-10 font-inter">
      <h2 className="text-3xl font-extrabold text-purple-700 dark:text-purple-400 mb-8">
        Campaigns
      </h2>

      {displayedCampaigns.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center text-lg">
          No campaigns found
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {displayedCampaigns.map((c) => (
            <motion.div
              key={c._id}
              className="bg-white dark:bg-[#0f0f0f] mb-10 rounded-3xl shadow-lg p-6 flex flex-col justify-between border border-gray-200 dark:border-gray-700"
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
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 truncate">
                  {c.client}
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
                  <span className="font-semibold">{c.impressions}</span>
                </div>

                <div className="flex justify-between items-center bg-gray-50 dark:bg-black p-3 rounded-xl">
                  <div className="flex items-center gap-2">
                    <MousePointer className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Clicks
                    </span>
                  </div>
                  <span className="font-semibold">{c.clicks}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CampaignList;
