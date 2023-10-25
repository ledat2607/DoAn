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
      {products &&
        products.map((i, index) => (
          <div className="flex justify-between mx-auto w-[95%] bg-white shadow-2xl p-4 rounded-md mt-6 800px:h-[150px] h-[120px]">
            <div className="w-[120px] relative">
              <span className="800xp:text-md text-[12px]">Hình ảnh</span>
              <img
                src={`${backend_url}${i.images[0]}`}
                className="800px:w-[120px] w-[80px] hover:cursor-pointer pt-2"
              />
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300">
                <AiOutlineDelete
                  size={20}
                  color="red"
                  className="cursor-pointer hover:scale-[1.2] text-white"
                />
                <AiOutlineEdit
                  size={20}
                  color="green"
                  className="cursor-pointer hover:scale-[1.2] text-white ml-4"
                />
              </div>
            </div>
            <div className="w-[150px]">
              <span className="800xp:text-md text-[12px]">Tên sản phẩm</span>
              <div className="800xp:text-md text-[12px] text-blue-500 mt-6">
                {i.name}
              </div>
            </div>
            <div>
              <span className="hidden 800px:block 800xp:text-md">Giá gốc</span>
              <div className="text-md text-red-500 800px:block hidden mt-6">
                {formatVietnameseCurrency(i.originalPrice)}
              </div>
            </div>
            <div>
              <span className="800xp:text-md text-[12px]">Giá bán</span>
              <div className="800xp:text-md text-[12px] text-green-500 mt-6">
                {formatVietnameseCurrency(i.discountPrice)}
              </div>
            </div>
            <div className="hidden 800px:block">
              <span>Chức năng</span>
              <div className="flex justify-between mt-6">
                <AiOutlineDelete
                  size={20}
                  color="red"
                  className="cursor-pointer hover:scale-[1.2]"
                />
                <AiOutlineEdit
                  size={20}
                  color="green"
                  className="cursor-pointer hover:scale-[1.2]"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllProducts;
