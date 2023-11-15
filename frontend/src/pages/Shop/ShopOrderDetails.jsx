import React from "react";
import DashboardHeader from "../../components/Shop/DashboardHeader";
import Footer from "../../components/Layout/Footer";
import OrderDetails from "../../components/Shop/OrderDetails.jsx";
const ShopOrderDetails = () => {
  return (
    <div className="overflow-y-scroll">
      <DashboardHeader />
      <div className="flex w-full">
        <div className="w-[83%] mx-auto mt-10">
          <OrderDetails />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopOrderDetails;
