import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar.jsx";
const DashboardPage = () => {
  return (
    <div className="overflow-y-scroll">
      <DashboardHeader />
      <div className="flex w-full">
        <div className="800px:w-[17%] w-[12%]">
          <DashboardSideBar active={1} />
        </div>
        <div className="w-[83%] mx-auto mt-10"></div>
      </div>
    </div>
  );
};

export default DashboardPage;
