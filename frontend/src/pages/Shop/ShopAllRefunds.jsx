import React from "react";
import DashboardSideBar from "../../components/Shop/DashboardSideBar";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import AllRefundsOrder from "../../components/Shop/AllRefundsOrder";
const ShopAllRefunds = () => {
  return (
    <div className="overflow-y-scroll">
      <DashboardHeader />
      <div className="flex w-full">
        <div className="800px:w-[17%] w-[12%]">
          <DashboardSideBar active={10} />
        </div>
        <div className="w-[83%] flex justify-center mt-10">
          <AllRefundsOrder />
        </div>
      </div>
    </div>
  );
};

export default ShopAllRefunds;
