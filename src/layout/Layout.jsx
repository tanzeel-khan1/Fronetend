import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-white  dark:bg-black">
      <Sidebar />

      <main className="min-h-screen bg-white dark:bg-black ">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;