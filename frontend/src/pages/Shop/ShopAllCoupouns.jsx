import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar";
import AllCoupounCode from "../../components/Shop/AllCoupounCode.jsx";

const ShopAllCoupouns = () => {
  return (
    <div className="overflow-y-scroll">
      <DashboardHeader />
      <div className="flex w-full">
        <div className="800px:w-[17%] w-[12%]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-[83%] mx-auto">
          <AllCoupounCode />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupouns;
