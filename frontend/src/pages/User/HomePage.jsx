import React, { useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Hero from "../../components/Route/Hero/Hero";
import Categories from "../../components/Route/Categories/Categories";
import BestDeals from "../../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../../components/Route/Events/Events";
const HomePage = () => {
  const [headerState, setHeaderState] = useState(/* initial state */);

  // Callback function to handle changes from Header
  const handleHeaderChange = (newHeaderState) => {
    // Do something with the new header state
    setHeaderState(newHeaderState);
  };

  return (
    <div
      className={`w-full ${
        headerState === "dark" ? "bg-[#3c3b3b] text-gray-400 brightness-75" : "bg-gray-100"
      }`}
    >
      <Header activeHeading={1} onHeaderChange={handleHeaderChange} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProduct />
      <Footer />
    </div>
  );
};

export default HomePage;
