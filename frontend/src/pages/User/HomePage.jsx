import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import Hero from "../../components/Route/Hero/Hero";
import Categories from "../../components/Route/Categories/Categories";
import BestDeals from "../../components/Route/BestDeals/BestDeals";
import FeaturedProduct from "../../components/Route/FeaturedProduct/FeaturedProduct";
import Events from "../../components/Route/Events/Events";

const HomePage = () => {
  const [headerState, setHeaderState] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setHeaderState(storedTheme);
    } else {
      setHeaderState("light");
    }
  }, []);

  const handleHeaderChange = (newHeaderState) => {
    setHeaderState(newHeaderState);
    localStorage.setItem("theme", newHeaderState);
  };

  return (
    <div
      className={`w-full ${
        headerState === "dark"
          ? "bg-gray-900 text-gray-500 brightness-75"
          : "bg-gray-100 text-gray-800"
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
