import React from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";
const EventCard = ({ active }) => {
  return (
    <div
      className={`w-full block bg-white rounded-lg lg:flex p-2 ${
        active ? "unset" : "mb-12"
      }`}
    >
      <div className="w-full lg:-w-[10%]">
        <img
          src="https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/289691/iphone-14-pro-vang-thumb-600x600.jpg"
          alt="img-event"
          width={150}
          className="ml-[10%]"
        />
      </div>
      <div className="w-full lg:w-[90%] flex flex-col justify-center">
        <h2 className={`${styles.productTitle}`}>Iphone 14 pro 128GB</h2>
        <p>Mô tả sản phẩm ....</p>
        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              24.990.000 đ
            </h5>
            <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
              23.890.000đ
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
            85 chiếc đã bán
          </span>
        </div>
        <CountDown />
      </div>
    </div>
  );
};

export default EventCard;
