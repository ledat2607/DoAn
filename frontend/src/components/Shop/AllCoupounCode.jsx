import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Route/ProductCard/ProductCard";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { backend_url } from "../../server";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
const AllCoupounCode = () => {
  const { products, isLoading } = useSelector((state) => state.products);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [open, setOpen] = useState(false);
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
  const handleClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const handleClickOpen = () => {
    setOpen(!open);
  };
  const handleDelete = (id) => {
    if (isPopupVisible === true) {
      dispatch(deleteProduct(id));
      toast.success("Xóa sản phẩm thành công !");
      window.location.reload(true);
    }
  };
  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto mt-5" onClick={handleClickOpen}>
        <span
          className={`${styles.button} w-[100px] h-[40px] !bg-blue-200 hover:!bg-gray-900 !shadow-2xl`}
        >
          Thêm mới
        </span>
      </div>
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1000"
        >
          <div className="bg-white p-4 rounded-lg">
            <p>Bạn có chắc chắn muốn xóa dữ liệu này không?</p>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded mt-[10%]"
              //onClick={() => handleDelete(i._id)}
            >
              Xác nhận
            </button>
            <button
              className="bg-gray-300 px-2 py-1 rounded ml-5"
              onClick={() => setOpen(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
      <div className="w-full">
        {products &&
          products.map((i, index) => (
            <div className="flex justify-between mx-auto w-[95%] bg-white shadow-2xl p-4 rounded-md mt-6 800px:h-[150px] h-[120px]">
              <div className="w-[120px] relative">
                <span className="800px:text-lg text-[12px]">Hình ảnh</span>
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
                <span className="800px:text-lg text-[12px]">Tên sản phẩm</span>
                <div className="800px:text-lg text-[12px] text-blue-500 mt-6">
                  {i.name}
                </div>
              </div>
              <div>
                <span className="hidden 800px:block 800px:text-md">
                  Giá gốc
                </span>
                <div className="text-md text-red-500 800px:block hidden mt-6">
                  {formatVietnameseCurrency(i.originalPrice)}
                </div>
              </div>
              <div>
                <span className="800px:text-lg text-[12px]">Giá bán</span>
                <div className="800px:text-lg text-[12px] text-green-500 mt-6">
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
                    onClick={handleClick}
                  />
                  {isPopupVisible && (
                    <div
                      key={index}
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1000"
                    >
                      <div className="bg-white p-4 rounded-lg">
                        <p>Bạn có chắc chắn muốn xóa dữ liệu này không?</p>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded mt-[10%]"
                          onClick={() => handleDelete(i._id)}
                        >
                          Xác nhận
                        </button>
                        <button
                          className="bg-gray-300 px-2 py-1 rounded ml-5"
                          onClick={() => setIsPopupVisible(false)}
                        >
                          Đóng
                        </button>
                      </div>
                    </div>
                  )}
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
    </div>
  );
};

export default AllCoupounCode;
