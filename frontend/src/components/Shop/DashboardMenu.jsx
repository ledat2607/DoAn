import React from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";

const DashboardMenu = ({ active }) => {
  return (
    <>
      <div className="overflow-y-scroll h-[85vh]">
        {/*signle Item */}
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard" className="w-full flex items-center">
            <RxDashboard
              size={30}
              color={`${active === 1 ? "#0000FF" : "#555"}`}
              title="Quản lý chung"
            />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 1 ? "text-[#0000FF]" : "text-[#555]"
              } 800px:block hidden`}
            >
              Quản lý chung
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-orders" className="w-full flex items-center">
            <FiShoppingBag
              size={30}
              color={`${active === 2 ? "#0000FF" : "#555"}`}
              title="Quản lý đơn hàng"
            />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 2 ? "text-[#0000FF]" : "text-[#555]"
              } 800px:block hidden`}
            >
              Quản lý đơn hàng
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-products" className="w-full flex items-center">
            <FiPackage
              size={30}
              color={`${active === 3 ? "#0000FF" : "#555"}`}
              title="Quản lý sản phẩm"
            />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 3 ? "text-[#0000FF]" : "text-[#555]"
              } 800px:block hidden`}
            >
              Quản lý sản phẩm
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link
            to="/dashboard-create-product"
            className="w-full flex items-center"
          >
            <AiOutlineFolderAdd
              size={30}
              color={`${active === 4 ? "#0000FF" : "#555"}`}
              title="Thêm mới sản phẩm"
            />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 4 ? "text-[#0000FF]" : "text-[#555]"
              } 800px:block hidden`}
            >
              Thêm mới sản phẩm
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-events" className="w-full flex items-center">
            <MdOutlineLocalOffer
              size={30}
              color={`${active === 5 ? "#0000FF" : "#555"}`}
              title="Quản lý sự kiện"
            />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 5 ? "text-[#0000FF]" : "text-[#555]"
              } 800px:block hidden`}
            >
              Quản lý sự kiện
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link
            to="/dashboard-create-event"
            className="w-full flex items-center"
          >
            <VscNewFile
              size={30}
              color={`${active === 6 ? "#0000FF" : "#555"}`}
              title="Thêm mới sự kiện"
            />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 6 ? "text-[#0000FF]" : "text-[#555]"
              } 800px:block hidden`}
            >
              Thêm mới sự kiện
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link
            to="/dashboard-withdraw-money"
            className="w-full flex items-center"
          >
            <CiMoneyBill
              size={30}
              color={`${active === 7 ? "#0000FF" : "#555"}`}
              title="Rút tiền"
            />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 7 ? "text-[#0000FF]" : "text-[#555]"
              } 800px:block hidden`}
            >
              Rút tiền
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-messages" className="w-full flex items-center">
            <BiMessageSquareDetail
              size={30}
              color={`${active === 8 ? "#0000FF" : "#555"}`}
              title="Trò chuyện"
            />
            <h5
             className={`pl-2 text-[18px] font-[400] ${
              active === 8 ? "text-[#0000FF]" : "text-[#555]"
            } 800px:block hidden`}
            >
              Trò chuyện
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-coupouns" className="w-full flex items-center">
            <AiOutlineGift
              size={30}
              color={`${active === 9 ? "#0000FF" : "#555"}`}
              title="Mã khuyến mãi"
            />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 9 ? "text-[#0000FF]" : "text-[#555]"
              } 800px:block hidden`}
            >
              Mã khuyến mãi
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/dashboard-refunds" className="w-full flex items-center">
            <HiOutlineReceiptRefund
              size={30}
              color={`${active === 10 ? "#0000FF" : "#555"}`}
              title="Hoàn tiền"
            />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 10 ? "text-[#0000FF]" : "text-[#555]"
              } 800px:block hidden`}
            >
              Hoàn tiền
            </h5>
          </Link>
        </div>
        <div className="w-full flex items-center p-4">
          <Link to="/settings" className="w-full flex items-center">
            <CiSettings
              size={30}
              color={`${active === 11 ? "#0000FF" : "#555"}`}
              title="Cài đặt"
            />
            <h5
              className={`pl-2 text-[18px] font-[400] ${
                active === 11 ? "text-[#0000FF]" : "text-[#555]"
              } 800px:block hidden`}
            >
              Cài đặt
            </h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DashboardMenu;
