import React, { useState } from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../../server";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const EventCard = ({ active, data }) => {
  function formatVietnameseCurrency(number) {
    let formattedNumber = Math.floor(number / 1000);
    formattedNumber *= 1000;
    let result = formattedNumber.toLocaleString("vi-VN");
    return result;
  }
  const isEventStarted = new Date(data?.start_Date) <= new Date();
  console.log(data);
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
        <div className="pt-2 800px:w-[80%] flex justify-center items-center ">
          {data?.images && data.images.length > 0 ? (
            data.images.map((image, index) => (
              <img
                key={index}
                src={`${backend_url}${image}`}
                alt={`img-event-${index}`}
                className="w-[200px] mr-4"
              />
            ))
          ) : (
            <img
              src="https://cdn.tgdd.vn/hoi-dap/1311826/flashsale-la-gi-vao-nhung-ngay-nao-cach-san-flashsale22.jpg"
              alt="fallback-img"
              className="w-[150px] h-[150px] rounded-full"
            />
          )}
          <h2
            className={`${styles.productTitle} !text-[20px] 800px:text-[20px] ml-4`}
          >
            {data?.name}
          </h2>
        </div>
      </div>

      <div className="800px:w-[60%] w-full flex flex-col justify-center">
        <p>{data?.description}</p>
        <div className="w-full flex py-2 items-center justify-between">
          <div className="800px:flex">
            Giảm giá
            {data?.discountPercent <= 100 ? (
              <p className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through ml-2">
                {data?.discountPercent}%
              </p>
            ) : (
              <p className="font-bold text-[20px] text-red-500 font-Roboto ml-4 pr-4">
                {formatVietnameseCurrency(data?.discountPercent)}
              </p>
            )}
            cho tất cả sản phẩm thuộc danh mục '<i>{data?.category}</i>'.
          </div>
        </div>

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
