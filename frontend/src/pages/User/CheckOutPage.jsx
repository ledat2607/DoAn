import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import CheckOutStep from "../../components/CheckOut/CheckOutStep";
import CheckOut from "../../components/CheckOut/CheckOut";
const CheckOutPage = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-full 800px:min-h-[80vh]">
        <CheckOutStep active={1} />
        <CheckOut />
      </div>
      <Footer />
    </div>
  );
};

export default CheckOutPage;
