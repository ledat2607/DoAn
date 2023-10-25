import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar";
import AllProducts from "../../components/Shop/AllProducts";

const ShopAllProduct = () => {
  return (
    <div className="overflow-y-scroll">
      <DashboardHeader />
      <div className="flex w-full">
        <div className="800px:w-[17%] w-[12%]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-[83%] mx-auto mt-10">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProduct;
