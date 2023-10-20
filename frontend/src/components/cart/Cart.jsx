import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
const Cart = ({ setOpenCart }) => {
  const cartData = [
    {
      name: "Iphone 14 pro max 1TB",
      descriptions: "Test",
      price: "24990000",
    },
    {
      name: "Laptop asus zenbook",
      descriptions: "Test",
      price: "28990000",
    },
    {
      name: "Apple watch ultra",
      descriptions: "Test",
      price: "22990000",
    },
  ];
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed  top-0 right-0 min-h-full 800px:w-[25%] w-[80%] shadow-sm bg-white flex flex-col justify-between">
        {/*items length */}
        <div>
          <div className={`flex p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">3 Sản phẩm</h5>
          </div>
          <div className="absolute top-[20px] flex w-full justify-end pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer hover:text-red-500 hover:scale-[1.1]"
              onClick={() => setOpenCart(false)}
            />
          </div>
          <div className="w-full border-t ">
            {cartData &&
              cartData.map((i, index) => <CartSignle key={index} data={i} />)}
          </div>
        </div>

        {/*Cart signle */}

        <div className="px-5 mb-3">
          {/*check out */}
          <Link to="/checkout">
            <div
              className={`h-[45px] flex items-center justify-center w-[70%] mx-auto bg-[#e44343] rounded-[5px]`}
            >
              <h1 className="text-[#fff] text-[18px]">Xác nhận thanh toán</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
//Cart signle
const CartSignle = ({ data }) => {
  const [value, setValue] = useState(1);
  const total_price = data.price * value;
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e43443] border border-[#e4344373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <HiOutlineMinus size={16} color="#7d879c" />
          </div>
        </div>
        <img
          src="https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg"
          alt="cart-img"
          className="w-[80px] h-h[80px] pl-2"
        />
        <div className="pl-[5px] flex justify-between w-full items-center">
          <div>
            <h1>{data.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              {formatVietnameseCurrency(data.price)} x {value}
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              {formatVietnameseCurrency(total_price)}
            </h4>
          </div>
          <RxCross1 className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
export default Cart;
