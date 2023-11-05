import React, { useState } from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../../server";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";
const EventCard = ({ active, data }) => {
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  const handleClick = () => {
    navigate(`/shop/preview/${seller._id}`);
  };
  return (
    <div
      className={`w-full block bg-white rounded-lg lg:flex ${
        active ? "unset" : "mb-12"
      }`}
    >
      <div className="w-full lg:-w-[10%] flex justify-center items-center">
        <img
          src={`${backend_url}${data?.images}`}
          alt="img-event"
          className="800px:ml-[5%] ml-0 mt-2 w-[200px]"
        />
        <h2 className={`${styles.productTitle} !text-[20px] 800px:text-[20px]`}>
          {data?.name}
        </h2>
      </div>
      <div className="w-full lg:w-[90%] flex flex-col justify-center">
        <p>{data?.description}</p>
        <div className="w-full flex py-2 items-center justify-between">
          <div className="flex">
            Giảm từ
            {data?.minAmount <= 100 ? (
              <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through ml-2">
                {data?.minAmount}%
              </h5>
            ) : (
              <h5 className="font-bold text-[20px] text-red-500 font-Roboto ml-4 pr-4">
                {formatVietnameseCurrency(data?.minAmount)}
              </h5>
            )}
            <AiOutlineArrowRight className="mt-2"/>
            {data?.maxAmount <= 100 ? (
              <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through ml-3">
                {data?.maxAmount}%
              </h5>
            ) : (
              <h5 className="font-bold text-[20px] text-green-500 font-Roboto ml-4">
                {formatVietnameseCurrency(data?.maxAmount)}
              </h5>
            )}
          </div>
        </div>
        <div
          className={`${styles.button} w-[100px] h-[40px]`}
          onClick={handleClick}
        >
          Mua ngay
        </div>
        <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
          Số lượng sản phẩm đã bán {data?.sold_out}
        </span>
        <CountDown data={data} />
      </div>
    </div>
  );
};

export default EventCard;
