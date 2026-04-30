import React from "react";
import Topbar from "../components/Topbar";
import CampaignChart from "./CampaignChart";
import { useState } from "react";
import CampaignList from "./CampaignList";

const Home = () => {
  const [days, setDays] = useState(7);

  return (
    <div className="min-h-screen pb-10">
      <Topbar days={days} onDaysChange={setDays} />
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <CampaignChart days={days} setDays={setDays} />
      </div>
      <CampaignList limit={3} />
    </div>
  );
};

export default Home;
