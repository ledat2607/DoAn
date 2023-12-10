import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import UserOrderDetails from "../../components/UserOrderDetails.jsx";

const OrderDetailsPage = () => {
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
      <Header onHeaderChange={handleHeaderChange} />
      <UserOrderDetails />
      <Footer />
    </div>
  );
};

export default OrderDetailsPage;
