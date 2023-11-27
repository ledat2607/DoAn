import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import UserTrackOrder from "../../components/UserTrackOrder.jsx";

const TrackOrderPage = () => {
  return (
    <div>
      <Header />
      <UserTrackOrder />
      <Footer />
    </div>
  );
};

export default TrackOrderPage;
