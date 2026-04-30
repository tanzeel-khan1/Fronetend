import React, { useState } from "react";
import { motion as Motion } from "framer-motion";
import useCampaigns from "../Hook/useCampaigns";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckCircle2, DollarSign, Send, UserRound } from "lucide-react";

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

  const fields = [
    {
      name: "campaignName",
      type: "text",
      label: "Campaign Name",
      placeholder: "Spring launch",
      icon: Send,
    },
    {
      name: "client",
      type: "text",
      label: "Client Name",
      placeholder: "Client or brand",
      icon: UserRound,
    },
    {
      name: "budget",
      type: "number",
      label: "Budget",
      placeholder: "25000",
      icon: DollarSign,
    },
  ];

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
    } catch {
      toast.error("Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Motion.div
      className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
      variants={formVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal-600 dark:text-teal-300">
          New campaign
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
            Create Campaign
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">
            Add campaign details to start tracking performance.
        </p>
      </div>

      <div className="premium-panel rounded-lg p-4 sm:p-6 lg:p-8">
        <form
          onSubmit={handleSubmit}
          className="grid gap-5 md:grid-cols-3"
        >
          {fields.map((field) => {
            const Icon = field.icon;
            return (
              <label key={field.name} className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {field.label}
                </span>
                <span className="relative block">
                  <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="h-12 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/12 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-slate-500"
                  />
                </span>
              </label>
            );
          })}

          <Motion.button
            type="submit"
            disabled={isSubmitting}
            className={`col-span-full inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-bold shadow-lg transition
            ${
              isSubmitting
                ? "cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                : "bg-slate-950 text-white shadow-slate-950/20 hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            }`}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
          >
            <Send size={18} />
            {isSubmitting ? "Creating..." : "Create Campaign"}
          </Motion.button>
        </form>

        <ToastContainer position="top-right" autoClose={3000} />

        {createdCampaign && (
          <Motion.div
            className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50/70 p-4 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 sm:p-6 lg:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 flex items-center gap-3">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
              <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-200 sm:text-2xl">
                Campaign Created Successfully!
              </h3>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(createdCampaign).map(([key, value]) => (
                <div
                  key={key}
                  className="rounded-lg border border-white/80 bg-white/80 p-4 shadow-sm dark:border-white/10 dark:bg-slate-950/50"
                >
                  <p className="text-xs font-bold tracking-wide text-slate-500 dark:text-slate-400">
                    {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  </p>
                  <p className="mt-1 break-words font-semibold text-slate-900 dark:text-slate-100">
                    {["startDate", "endDate"].includes(key)
                      ? new Date(value).toLocaleDateString()
                      : value}
                  </p>
                </div>
              ))}
            </div>
          </Motion.div>
        )}
      </div>
    </Motion.div>
  );
};

export default CampaignForm;
