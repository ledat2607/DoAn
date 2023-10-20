import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { BsCartPlus } from "react-icons/bs";
const Wishlist = ({ setOpenWishlist }) => {
  const WishlistData = [
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
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/*wishlist signle */}
          <div className="w-full border-t ">
            {WishlistData &&
              WishlistData.map((i, index) => (
                <WishlistSingle key={index} data={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
//Cart signle
const WishlistSingle = ({ data }) => {
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" size={25} />
        <img
          src="https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-tim-thumb-600x600.jpg"
          alt="cart-img"
          className="w-[80px] h-h[80px] pl-6"
        />
        <div className="pl-[5px] flex justify-between w-full items-center">
          <div>
            <h1>{data.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              {formatVietnameseCurrency(data.price)} x 1
            </h4>
          </div>
        </div>
        <div>
          <BsCartPlus
            size={30}
            className="cursor-pointer"
            title="Thêm vào giỏ hàng"
          />
        </div>
      </div>
    </div>
  );
};
export default Wishlist;
