import React from "react";
import Topbar from "../components/Topbar";
import CampaignChart from "./CampaignChart";
import { useState } from "react";
import CampaignList from "./CampaignList";

const Home = () => {
  const [days, setDays] = useState(7);

  return (
    <div className="dark:bg-black min-h-screen">
      <Topbar days={days} onDaysChange={setDays} />
      <div className="m-10">
        <CampaignChart days={days} />
      </div>
      <CampaignList limit={3} />
    </div>
  );
};

export default Home;
