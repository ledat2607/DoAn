import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import CheckoutSteps from "../../components/CheckOut/CheckOutStep";
import Payment from "../../components/Payment/Payment.jsx"
const PaymentPage = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-full 800px:min-h-[80vh]">
        <CheckoutSteps active={2} />
        <Payment />
      </div>
      <Footer />
    </div>
  );
};

export default PaymentPage;
