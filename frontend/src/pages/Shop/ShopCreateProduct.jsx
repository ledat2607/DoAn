import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import DashboardSideBar from "../../components/Shop/DashboardSideBar";
import CreateProduct from "../../components/Shop/CreateProduct";
const ShopCreateProduct = ({ active }) => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-center w-full">
        <div className="800px:w-[25%] w-[10%]">
          <DashboardSideBar active={4} />
        </div>
        <div className="w-[85%] mx-auto justify-center flex">
          <CreateProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopCreateProduct;
