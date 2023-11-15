import React, { useEffect } from "react";
import DashboardMenu from "./DashboardMenu";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";

const DashboardSideBar = ({ active }) => {
  return (
    <div className="w-full mt-[5%] pb-[10px] h-[85vh] bg-white shadow-lg sticky top-0 left-0 z-10">
      <DashboardMenu active={active} />
    </div>
  );
};

export default DashboardSideBar;
