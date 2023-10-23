import React from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);
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
    </>
  );
};

export default ShopInfo;
