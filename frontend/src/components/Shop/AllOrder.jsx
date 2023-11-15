import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { backend_url } from "../../server";
import { toast } from "react-toastify";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { TbCheck, TbCopy, TbEdit, TbListDetails } from "react-icons/tb";
import { Link, useParams } from "react-router-dom";

const AllOrder = () => {
  const [data, setData] = useState([]);
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
    setData(orders);
  }, [dispatch]);

  //format đơn vị tiền tệ
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  const handleCopyClick = (id) => {
    // Lấy nội dung mã đơn hàng
    const orderCode = id;

    // Tạo một thẻ input tạm thời để có thể sử dụng hàm select và copy
    const tempInput = document.createElement("input");
    tempInput.value = orderCode;
    document.body.appendChild(tempInput);

    // Chọn nội dung của input
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    // Sao chép nội dung vào clipboard
    document.execCommand("copy");

    // Xóa thẻ input tạm thời
    document.body.removeChild(tempInput);
  };

  return (
    <div className="w-full">
      {data &&
        data.map((i, index) => (
          <div className="flex mx-auto w-[95%] bg-white shadow-2xl p-4 rounded-md mt-6 800px:h-[150px] h-[120px]">
            <div className="w-[120px] relative">
              <span className="800px:text-lg text-[12px]">Hình ảnh</span>
              {i?.cart.map((item, inde) => (
                <img
                  src={`${backend_url}${item?.product?.images[0]}`}
                  key={index}
                  className="800px:w-[120px] w-[80px] hover:cursor-pointer pt-2"
                  alt=""
                />
              ))}
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
            <div className="w-[200px] ml-[10%]">
              <span className="800px:text-lg text-[12px]">Tên sản phẩm</span>
              <div className="800px:text-lg text-[12px] text-blue-500 mt-6">
                {i?.cart.map((item, inde) => (
                  <label key={inde}>{item?.product?.name}</label>
                ))}
              </div>
            </div>
            <div className="ml-8">
              <span className="800px:text-lg text-[12px]">Trạng thái</span>
              <div className="800px:text-lg text-[12px] text-green-500 mt-6">
                <label
                  className={`${
                    i.status === "Chờ duyệt" ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {i?.status}
                </label>
              </div>
            </div>
            <div className="ml-[10%]">
              <span className="800px:text-lg text-[12px]">Giá bán</span>
              <div className="800px:text-lg text-[12px] text-green-500 mt-6">
                {formatVietnameseCurrency(i.totalPrice)}
              </div>
            </div>

            <div className="hidden 800px:block ml-[15%]">
              <span>Chức năng</span>
              <div className="flex justify-between mt-6">
                <Link to={`/order/${i?._id}`}>
                  <TbListDetails
                    size={20}
                    className={`cursor-pointer hover:scale-[1.2] hover:text-blue-500`}
                  />
                </Link>

                <AiOutlineEdit
                  size={20}
                  className="cursor-pointer hover:scale-[1.2] hover:text-yellow-500 mt-1 ml-4"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default AllOrder;
