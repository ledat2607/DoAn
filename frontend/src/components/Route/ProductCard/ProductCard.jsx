import React, { useState } from "react";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const d = data.name;
  const product_name = d.replace(/\s+/g, "-");
  return (
    <>
      <div className="border bg-white hover:border-2 hover:border-blue-300 border-gray-800 h-[350px] rounded-lg shadow-md p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>
        <Link to={`/product/${product_name}`}>
          <div className="relative group">
            <img
              src={data.image_Url[0].url}
              alt="product-img"
              className="w-full h-[150px] object-contain"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
              <p className="text-white text-lg font-semibold transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out">
                Xem chi tiết
              </p>
            </div>
          </div>
        </Link>
        <Link to="/">
          <p className="text-[16px] font-normal mt-3 cursor-pointer hover:text-blue-600">
            {data.shop.name}
          </p>
        </Link>
        <Link to={`/product/${product_name}`}>
          <h4 className="text-[16px] text-gray-700 hover:text-blue-500 transition-all duration-100 font-extrabold cursor-pointer ">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="mt-1 flex">
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6ba00"
              size={15}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6ba00"
              size={15}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6ba00"
              size={15}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6ba00"
              size={15}
            />
            <AiOutlineStar
              className="mr-2 cursor-pointer"
              color="#F6ba00"
              size={15}
            />
          </div>
          <div className="py-2 flex items-center justify-between">
            <span className={`${styles.productDiscountPrice}`}>
              {data.price === 0 ? data.price : data.discount_price}
            </span>
            <span className={`${styles.price}`}>
              {data.price ? data.price : null}
            </span>
          </div>
          <div className="font-[400] text-[13px] text-[#68d284]">
            {data.total_sell} Đã bán
          </div>
        </Link>
        {/*side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={18}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Xóa khỏi danh sách yêu thích"
            />
          ) : (
            <AiOutlineHeart
              size={18}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => setClick(!click)}
              color={click ? "red" : "#333"}
              title="Thêm vào danh sách yêu thích"
            />
          )}
          <AiOutlineEye
            size={18}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Xem nhanh"
          />
          <AiOutlineShoppingCart
            size={18}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Thêm vào giỏ hàng"
          />
          {open ? (
            <ProductDetailsCard open={open} data={data} setOpen={setOpen} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
