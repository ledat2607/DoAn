import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar";
import AllProducts from "../../components/Shop/AllProducts";

const ShopAllProduct = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex w-full">
        <div className="800px:w-[25%] w-[10%]">
          <DashboardSideBar active={3} />
        </div>
        <div className="w-[85%] mx-auto mt-10">
          <AllProducts />
        </div>
      </div>
    </div>
  );
};

export default ShopAllProduct;
