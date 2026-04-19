import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "https://backend-three-alpha-69.vercel.app/api/campaigns";

const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]); // ✅ always array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Fetch Campaigns
  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(`${API_URL}/getall`);

      // ✅ IMPORTANT FIX
      setCampaigns(res.data?.data || []); // only array store

    } catch (err) {
      const msg =
        err.response?.data?.message || "Error fetching campaigns";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create Campaign
  const createCampaign = async (data) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post(API_URL, data);

      const newCampaign = res.data?.data;

      if (newCampaign) {
        setCampaigns((prev) => [newCampaign, ...prev]); // ✅ safe update
      }

      toast.success(res.data?.message || "Campaign created successfully");

      return res.data;
    } catch (err) {
      const msg =
        err.response?.data?.message || "Error creating campaign";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Auto fetch on mount
  useEffect(() => {
    fetchCampaigns();
  }, []);

  return {
    campaigns,
    loading,
    error,
    fetchCampaigns,
    createCampaign,
  };
};

export default useCampaigns;