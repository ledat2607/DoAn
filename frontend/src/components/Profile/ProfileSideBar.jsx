import React from "react";
import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { HiOutlineShoppingCart, HiOutlineReceiptRefund } from "react-icons/hi";
import { AiOutlineMessage, AiOutlineCreditCard } from "react-icons/ai";
import { MdOutlineTrackChanges } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { TbAddressBook } from "react-icons/tb";
const ProfileSideBar = ({ active, setActive }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white shadow-lg rounded-[10px] p-4 pt-8">
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(1)}
      >
        <RxPerson size={30} color={active === 1 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 1 ? "text-red-500" : ""
          } 800px:block hidden`}
        >
          Thông tin
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8 relative"
        onClick={() => setActive(8)} //|| navigate("/inbox")
      >
        <RiLockPasswordLine size={30} color={active === 8 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 8 ? "text-red-500" : ""
          } 800px:block hidden`}
        >
          Thay đổi mật khẩu
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(2)}
      >
        <HiOutlineShoppingCart size={30} color={active === 2 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 2 ? "text-red-500" : ""
          } 800px:block hidden`}
        >
          Đơn hàng
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8"
        onClick={() => setActive(3)}
      >
        <HiOutlineReceiptRefund size={30} color={active === 3 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 3 ? "text-red-500" : ""
          } 800px:block hidden`}
        >
          Các đơn hàng hoàn trả
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8 relative"
        onClick={() => setActive(4)} //|| navigate("/inbox")
        title="Trò chuyện"
      >
        <AiOutlineMessage size={30} color={active === 4 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 4 ? "text-red-500" : ""
          } 800px:block hidden`}
        >
          Trò chuyện
        </span>
        <span className="absolute 800px:bottom-4 bottom-3 800px:left-4 left-2 w-[18px] h-[18px]  800px:h-[22px] flex items-center justify-center 800px:w-[22px] rounded-full bg-blue-200">
          2
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8 relative"
        onClick={() => setActive(5)} //|| navigate("/inbox")
      >
        <MdOutlineTrackChanges size={30} color={active === 5 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 5 ? "text-red-500" : ""
          } 800px:block hidden`}
        >
          Theo dõi đơn hàng
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-8 relative"
        onClick={() => setActive(6)} //|| navigate("/inbox")
      >
        <AiOutlineCreditCard size={30} color={active === 6 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 6 ? "text-red-500" : ""
          } 800px:block hidden`}
        >
          Phương thức thanh toán
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-8 relative"
        onClick={() => setActive(7)} //|| navigate("/inbox")
      >
        <TbAddressBook size={30} color={active === 7 ? "red" : ""} />
        <span
          className={`pl-3 ${
            active === 7 ? "text-red-500" : ""
          } 800px:block hidden`}
        >
          Địa chỉ giao hàng
        </span>
      </div>
    </div>
  );
};

export default ProfileSideBar;
