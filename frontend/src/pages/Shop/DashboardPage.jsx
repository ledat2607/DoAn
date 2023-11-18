import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar";
import DashboardHero from "../../components/Shop/DashboardHero";
const DashboardPage = () => {
  return (
    <div className="overflow-y-scroll">
      <DashboardHeader />
      <div className="flex w-full items-start">
        <div className="800px:w-[17%] w-[12%]">
          <DashboardSideBar active={1} />
        </div>
        <div className="w-[83%] 800px:mt-10">
          <DashboardHero />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
