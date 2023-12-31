import React, { useState } from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";
import { backend_url } from "../../../server";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowRight } from "react-icons/ai";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
const EventCard = ({ active, data }) => {
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state.seller);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }

  const addToCartHandler = () => {
    dispatch(addToCart(user?._id, data.shop?._id, data?._id, 1));
    toast.success("Thêm vào giỏ hàng thành công !");
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
            <AiOutlineArrowRight className="mt-2" />
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

        <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">
          Số lượng sản phẩm đã bán {data?.sold_out}
        </span>
        <CountDown data={data} />
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
