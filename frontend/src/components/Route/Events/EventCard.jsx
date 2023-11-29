import React, { useState } from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../../server";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const EventCard = ({ active, data }) => {
  function formatVietnameseCurrency(number) {
    // Chia cho 1000 và làm tròn xuống để lấy phần nguyên
    let formattedNumber = Math.floor(number / 1000);

    // Nhân lại cho 1000 để có giá trị mong muốn
    formattedNumber *= 1000;

    // Sử dụng hàm toLocaleString để định dạng số theo ngôn ngữ và định dạng của Việt Nam
    let result = formattedNumber.toLocaleString("vi-VN");

    return result;
  }
  const isEventStarted = new Date(data?.start_Date) <= new Date();
  return (
    <div
      className={`w-full block bg-white rounded-lg lg:flex ${
        active ? "unset" : "mb-12"
      }`}
    >
      <div className="800px:flex 800px:w-[60%] justify-center items-center">
        <div className="800px:w-[30%] w-full flex 800px:flex justify-center items-center">
          <img
            src={`${backend_url}${data?.shop?.avatar?.url}`}
            className="w-[50px] h-[50px] rounded-full"
            alt=""
          />
          <h1 className="ml-4">{data?.shop?.shopName}</h1>
        </div>
        <div className="p-2 800px:w-[70%] w-full lg:-w-[10%] flex justify-center items-center ">
          <img
            src={`${backend_url}${data?.images}`}
            alt="img-event"
            className="800px:ml-[5%] ml-0 mt-2 w-[200px]"
          />
          <h2
            className={`${styles.productTitle} !text-[20px] 800px:text-[20px]`}
          >
            {data?.name}
          </h2>
        </div>
      </div>

      <div className="800px:w-[60%] w-full flex flex-col justify-center">
        <p>{data?.description}</p>
        <div className="w-full flex py-2 items-center justify-between">
          <div className="flex">
            Giảm giá
            {data?.discountPercent <= 100 ? (
              <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through ml-2">
                {data?.discountPercent}%
              </h5>
            ) : (
              <h5 className="font-bold text-[20px] text-red-500 font-Roboto ml-4 pr-4">
                {formatVietnameseCurrency(data?.discountPercent)}
              </h5>
            )}
            cho tất cả sản phẩm thuộc danh mục '<i>{data?.category}</i>'.
          </div>
        </div>

        <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
          Số lượng sản phẩm đã bán {data?.sold_out}
        </span>
        {isEventStarted ? (
          <CountDown data={data} />
        ) : (
          <p>Sự kiện chưa bắt đầu</p>
        )}
        <div className="flex">
          <Link to={`/shop/preview/${data?.shop._id}`}>
            <div className={`${styles.button} w-[150px] h-[40px]`}>
              Xem chi tiết
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
