import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar";
import DashboardMessage from "../../components/Shop/DashboardMessage";

const ShopInboxPage = () => {
  return (
    <div className="overflow-y-scroll">
      <DashboardHeader />
      <div className="flex w-full">
        <div className="800px:w-[17%] w-[12%]">
          <DashboardSideBar active={8} />
        </div>
        <div className="w-[83%] flex justify-center 800px:mt-0 mt-10">
          <DashboardMessage />
        </div>
      </div>
    </div>
  );
};

export default ShopInboxPage;
