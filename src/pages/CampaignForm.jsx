import React, { useState } from "react";
import { motion } from "framer-motion";
import useCampaigns from "../Hook/useCampaigns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle2 } from "lucide-react";

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const CampaignForm = () => {
  const { createCampaign } = useCampaigns();
  const [formData, setFormData] = useState({
    campaignName: "",
    client: "",
    budget: "",
  });
  const [createdCampaign, setCreatedCampaign] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.budget <= 0) {
      toast.error("Budget must be greater than 0");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createCampaign(formData);

      if (res?.data) {
        setCreatedCampaign(res.data);
        setFormData({ campaignName: "", client: "", budget: "" });
      } else {
        toast.error("Failed to create campaign");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto mt-6 sm:mt-10 lg:mt-12 px-4 sm:px-6 lg:px-8 font-inter"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 p-4 sm:p-6 lg:p-10">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-purple-700 dark:text-purple-400">
            Create Campaign
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Add campaign details to start tracking performance.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8"
        >
          {["campaignName", "client", "budget"].map((field, idx) => (
            <input
              key={idx}
              type={field === "budget" ? "number" : "text"}
              name={field}
              placeholder={
                field === "campaignName"
                  ? "Campaign Name"
                  : field === "client"
                    ? "Client Name"
                    : "Budget"
              }
              value={formData[field]}
              onChange={handleChange}
              required
              className="h-12 p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
            />
          ))}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`col-span-full cursor-pointer py-3.5 px-6 font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-[1.01] 
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed text-gray-200"
                : "bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            }`}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            {isSubmitting ? "Creating..." : "Create Campaign"}
          </motion.button>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />

        {createdCampaign && (
          <motion.div
            className="bg-gray-50 dark:bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 mt-8 sm:mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <h3 className="text-xl sm:text-2xl font-bold text-green-500">
                Campaign Created Successfully!
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(createdCampaign).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-inner border border-gray-200 dark:border-gray-700"
                >
                  <p className="text-gray-500 dark:text-gray-400 text-xs font-medium tracking-wide">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </p>
                  <p className="text-gray-900 dark:text-gray-100 font-semibold mt-1 wrap-break-word">
                    {["startDate", "endDate"].includes(key)
                      ? new Date(value).toLocaleDateString()
                      : value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CampaignForm;
