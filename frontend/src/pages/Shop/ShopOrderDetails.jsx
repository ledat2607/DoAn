import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar";
import AllOrders from "../../components/Shop/AllOrder";

const ShopOrderDetails = () => {
  return (
    <div className="overflow-y-scroll">
      <DashboardHeader />
      <div className="flex w-full">
        <div className="800px:w-[17%] w-[12%]">
          <DashboardSideBar active={2} />
        </div>
        <div className="w-[83%] mx-auto mt-10">
          <AllOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopOrderDetails;
