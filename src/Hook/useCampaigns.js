import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 
import 'react-toastify/dist/ReactToastify.css';
  https://backend-git-main-tanzeel0680-6266s-projects.vercel.app/
// const API_URL = "https://backend-three-alpha-69.vercel.app/api/campaigns"; 
const API_URL = "https://backend-git-main-tanzeel0680-6266s-projects.vercel.app/api/campaigns"; 

const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/getall`);
      setCampaigns(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching campaigns");
    } finally {
      setLoading(false);
    }
  };

  const createCampaign = async (data) => {
    try {
      setLoading(true);
      const res = await axios.post(API_URL, data);

      // Add new campaign to state
      setCampaigns((prev) => [res.data.data, ...prev]);

      // ✅ Show success toast
      toast.success(res.data.message || "Campaign created successfully");

      return res.data;
    } catch (err) {
      const msg = err.response?.data?.message || "Error creating campaign";
      setError(msg);

      // ✅ Show error toast
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

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