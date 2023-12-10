import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import CheckOutStep from "../../components/CheckOut/CheckOutStep";
import CheckOut from "../../components/CheckOut/CheckOut";
const CheckOutPage = () => {
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
          ? "bg-gray-900 text-gray-500 brightness-75 flex flex-col"
          : "bg-gray-100 text-gray-800 flex flex-col"
      }`}
    >
      <Header onHeaderChange={handleHeaderChange} />
      <div className="w-full 800px:min-h-[80vh]">
        <CheckOutStep active={1} />
        <CheckOut />
      </div>
      <Footer />
    </div>
  );
};

export default CheckOutPage;
