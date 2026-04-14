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
      className="max-w-5xl mx-auto mt-12 p-10 bg-white dark:bg-gray-900 rounded-3xl shadow-xl font-inter"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-3xl font-extrabold text-purple-700 dark:text-purple-400 mb-10">
        Create Campaign
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8"
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
            className="p-4 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm transition"
          />
        ))}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`col-span-full cursor-pointer py-4 px-6 font-bold rounded-xl shadow-lg transition-transform transform hover:scale-105 
            ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed text-gray-200"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            }`}
          whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
        >
          {isSubmitting ? "Creating..." : "Create Campaign"}
        </motion.button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />

      {createdCampaign && (
        <motion.div
          className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            <h3 className="text-2xl font-bold text-green-500">
              Campaign Created Successfully!
            </h3>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(createdCampaign).map(([key, value]) => (
              <div
                key={key}
                className="bg-white dark:bg-gray-900 p-4 rounded-xl shadow-inner border border-gray-200 dark:border-gray-700"
              >
                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                </p>
                <p className="text-gray-900 dark:text-gray-100 font-semibold mt-1">
                  {["startDate", "endDate"].includes(key)
                    ? new Date(value).toLocaleDateString()
                    : value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CampaignForm;
