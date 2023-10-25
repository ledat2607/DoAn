import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar";
import CreateEvent from "../../components/Shop/CreateEvent"
const ShopCreateEvent = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center w-full">
        <div className="800px:w-[17%] w-[12%]">
          <DashboardSideBar active={6} />
        </div>
        <div className="w-[88%] mx-auto justify-center flex">
          <CreateEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateEvent;
