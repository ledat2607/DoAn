import React from "react";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import axios from "axios";
const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);
  const handleLogout = async () => {
    axios.get(`${server}/shop/logout`, { withCredentials: true });
    window.location.reload(true);
  };
  return (
    <>
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={`${backend_url}${seller?.avatar.url}`}
            alt="shopInfor"
            className="w-[150px] h-[150px] rounded-full object-cover hover:scale-[1.1]  border-blue-500 border-2"
          />
        </div>
        <h3 className="text-center py-2 text-[20px]">{seller?.name}</h3>
        <h4 className="text-[16px] text-[#000000ba] p-[10px] text-center">
          {seller?.description}
        </h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Địa chỉ</h5>
        <h4 className="text-[#000000ba]">{seller?.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Số điện thoại</h5>
        <h4 className="text-[#000000ba]">0{seller?.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Tổng số sản phẩm</h5>
        <h4 className="text-[#000000ba]">10</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Đánh giá</h5>
        <h4 className="text-[#000000ba]">4.6/5</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Ngày mở shop</h5>
        <h4 className="text-[#000000ba]">{seller?.createdAt.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4 flex items-center justify-center">
          <div
            className={`${styles.button} mx-auto w-[120px] h-[40px] !rounded-[10px]`}
          >
            <span className="font-Roboto text-[18px]">Chỉnh sửa</span>
          </div>
          <div
            className={`${styles.button} mx-auto w-[120px] h-[40px] !rounded-[10px]`}
            onClick={handleLogout}
          >
            <span className="font-Roboto text-[18px]">Thoát</span>
          </div>
        </div>
      )}
    </>
  );
};

export default ShopInfo;
