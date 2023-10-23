import React from "react";
import DashboardMenu from "./DashboardMenu";

const DashboardSideBar = () => {
  return (
    <div className="w-full mt-[5%] pb-[10px] h-[85vh] bg-white shadow-lg sticky top-0 left-0 z-10">
      <DashboardMenu active={1} />
    </div>
  );
};

export default DashboardSideBar;
