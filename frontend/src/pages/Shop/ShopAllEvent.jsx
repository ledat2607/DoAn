import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar";
import AllEvents from "../../components/Shop/AllEvents.jsx";


const ShopAllEvent = () => {
  return (
    <div className="overflow-y-scroll">
      <DashboardHeader />
      <div className="flex w-full">
        <div className="800px:w-[17%] w-[12%]">
          <DashboardSideBar active={5} />
        </div>
        <div className="w-[83%] mx-auto mt-10">
          <AllEvents />
        </div>
      </div>
    </div>
  );
};

export default ShopAllEvent;
