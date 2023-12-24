import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineEvent } from "react-icons/md";
import { backend_url } from "../../server";
const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full h-[80px] bg-white sticky top-0 left-0 z-30 shadow-lg flex items-center justify-between px-4">
      <div>
        <Link to="/dashboard">
          <img
            src="../img/logo.png"
            alt="logo-dashboard"
            className="w-[80px] cursor-pointer"
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link to="/dashboard/coupon" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
              title="Mã khuyến mãi"
            />
          </Link>
          <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineEvent
              size={30}
              className="mx-5 cursor-pointer"
              title="Sự kiện khuyến mãi"
              color="#555"
            />
          </Link>
          <Link to={`/shop/${seller?._id}`} className="ml-5">
            <img
              src={`${backend_url}${seller?.avatar.url}`}
              alt="seller-avatar"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
