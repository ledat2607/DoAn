import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar";
import WithdrawMoney from "../../components/Shop/WithdrawMoney";
const ShopWithdrawMoney = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center w-full">
        <div className="800px:w-[18%] w-[12%]">
          <DashboardSideBar active={7} />
        </div>
        <div className="w-[88%] mx-auto justify-center flex">
          <WithdrawMoney />
        </div>
      </div>
    </div>
  );
};

export default ShopWithdrawMoney;
