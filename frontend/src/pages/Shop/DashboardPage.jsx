import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar.jsx";
const DashboardPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center justify-between w-[40%]">
        <div>
          <DashboardSideBar active={1} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
