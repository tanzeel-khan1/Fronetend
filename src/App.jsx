import React from "react";
import MainLayout from "./layout/MainLayout";
import AdminLayout from "./layout/Layout";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Setting from "./pages/Setting";
import CampaignList from "./pages/CampaignList";
import CampaignForm from "./pages/CampaignForm";

const App = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route element={<AdminLayout />}>
            {/* ✅ Default route */}
            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route path="/home" element={<Home />} />
            <Route path="/campaigns" element={<CampaignList />} />
            <Route path="/form" element={<CampaignForm />} />
            <Route path="/setting" element={<Setting />} />
          </Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};

export default App;