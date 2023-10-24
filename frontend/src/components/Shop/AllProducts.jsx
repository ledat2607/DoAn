import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Route/ProductCard/ProductCard";
import { getAllProductsShop } from "../../redux/actions/product";
import { backend_url } from "../../server";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch]);
  //format đơn vị tiền tệ
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  return (
    <div className="w-full">
      <div className="w-[95%] h-[140px] p-4 rounded-lg mx-auto shadow-xl bg-gray-300">
        {products &&
          products.map((i, index) => (
            <div className="flex justify-between items-center">
              <div>
                <p>Hình ảnh sản phẩm</p>
                <img
                  src={`${backend_url}${i.images[0]}`}
                  className="w-[120px] h-[80px] rounded-md"
                />
              </div>
              <div>
                <p>Tên sản phẩm</p>
                <span className="mt-10">{i.name}</span>
              </div>
              <div>
                <p>Giá gốc</p>
                <span>{formatVietnameseCurrency(i.originalPrice)}</span>
              </div>
              <div>
                <p>Giá khuyến mãi</p>
                <span>{formatVietnameseCurrency(i.discountPrice)}</span>
              </div>
              <div>
                <p>Chức năng</p>
                <div className="flex justify-between">
                  <AiOutlineDelete className="cursor-pointer" size={20} />
                  <AiOutlineEdit className="cursor-pointer" size={20} />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
