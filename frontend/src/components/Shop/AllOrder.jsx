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
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
    setData(orders);
  }, [seller?._id, dispatch]);

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
                {i?.status === "Chờ duyệt" ? (
                  <div className="flex h-[28px] w-[90px] rounded-lg items-center hover:bg-green-500 hover:text-white">
                    <TbCheck className="w-[20px] h-[20px] rounded-full  hover:bg-white hover:text-green-500 cursor-pointer ml-2" />
                    <label className="ml-2">Duyệt</label>
                  </div>
                ) : (
                  <TbListDetails
                    size={20}
                    className={`cursor-pointer hover:scale-[1.2] hover:text-blue-500`}
                    onClick={handleClick}
                  />
                )}

                <AiOutlineEdit
                  size={20}
                  className="cursor-pointer hover:scale-[1.2] hover:text-yellow-500 mt-1 ml-4"
                />
                {isPopupVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[999]">
                    <div className="bg-white w-[90%] p-4 rounded-lg ">
                      <div>
                        <h1 className="text-[25px] text-center uppercase font-[500] font-Roboto">
                          Thông tin đơn hàng
                        </h1>
                      </div>
                      <div className="800px:flex 800px:justify-between">
                        <div className="800px:w-[30%] w-[40%] mt-5">
                          <div className="border-2 rounded-xl border-gray-500">
                            <label className="items-center flex justify-center text-center p-3 800px:text-[15px] text-[12px] font-Roboto font-[500] uppercase">
                              Thông tin khách hàng
                            </label>
                          </div>
                          {i?.cart?.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-center mt-5"
                            >
                              <img
                                src={`${backend_url}${item.user?.avatar}`}
                                className="w-[160px] h-[160px] rounded-full"
                                alt=""
                              />
                            </div>
                          ))}

                          <div className="mt-4 flex">
                            <label className="w-[30%] h-[30px] items-center flex 800px:text-[14px] text-[12px]">
                              Tên
                            </label>
                            <div className="w-[70%] border border-blue-500 flex items-center rounded-lg h-[40px]">
                              {i?.cart.map((item, index) => (
                                <label
                                  className="p-2 800px:text-[14px] text-[12px]"
                                  key={index}
                                >
                                  {item.user?.name}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 flex">
                            <label className="w-[40%] h-[40px] items-center flex 800px:text-[14px] text-[12px]">
                              Số điện thoại
                            </label>
                            <div className="w-[60%] border border-blue-500 flex items-center rounded-lg h-[40px]">
                              {i?.cart.map((item, index) => (
                                <label
                                  className="p-2 800px:text-[14px] text-[12px]"
                                  key={index}
                                >
                                  0{item.user?.phoneNumber}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 flex">
                            <label className="w-[40%] h-[40px] items-center flex 800px:text-[14px] text-[12px]">
                              Ngày sinh
                            </label>
                            <div className="w-[60%] border border-blue-500 flex items-center rounded-lg h-[40px]">
                              {i?.cart.map((item, index) => (
                                <label
                                  className="p-2 800px:text-[14px] text-[12px]"
                                  key={index}
                                >
                                  {item.user?.birthDay.slice(0, 10)}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="w-[32%] ml-4 mr-3 mt-5 1000px:block hidden">
                          <div className="border-2 rounded-xl border-gray-500">
                            <label className="items-center flex justify-center text-center p-3 800px:text-[15px] text-[12px] font-Roboto font-[500] uppercase">
                              Thông tin sản phẩm
                            </label>
                          </div>
                          {i?.cart?.map((item, index) => (
                            <div
                              key={index}
                              className="flex justify-center mt-5"
                            >
                              <img
                                src={`${backend_url}${item.product?.images[0]}`}
                                alt=""
                              />
                            </div>
                          ))}

                          <div className="mt-4 flex">
                            <label className="w-[30%] h-[40px] items-center flex 800px:text-[14px] text-[12px]">
                              Tên
                            </label>
                            <div className="w-[70%] border border-blue-500 flex items-center rounded-lg h-[40px]">
                              {i?.cart.map((item, index) => (
                                <label
                                  className="p-2 800px:text-[14px] text-[12px]"
                                  key={index}
                                >
                                  {item.product?.name}
                                </label>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 flex">
                            <label className="w-[30%] h-[40px] items-center flex 800px:text-[14px] text-[12px]">
                              Giá bán
                            </label>
                            <div className="w-[70%] border border-blue-500 flex items-center rounded-lg h-[40px]">
                              {i?.cart.map((item, index) => (
                                <label
                                  className="p-2 800px:text-[14px] text-[12px]"
                                  key={index}
                                >
                                  {formatVietnameseCurrency(
                                    item.product?.discountPrice
                                  )}
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="w-[40%] mt-5 800px:ml-8">
                          <div className="border-2 rounded-xl border-gray-500">
                            <label className="items-center flex justify-center text-center p-3 800px:text-[15px] text-[12px] font-Roboto font-[500] uppercase">
                              Thông tin đơn hàng
                            </label>
                          </div>
                          <div className="mt-4 flex">
                            <label className="w-[30%] h-[40px] items-center flex 800px:text-[14px] text-[12px]">
                              Mã đơn hàng
                            </label>
                            <div className="w-[70%] border border-blue-500 flex items-center rounded-lg h-[40px]">
                              <label className="p-2 800px:text-[13px] text-[12px]">
                                {i?._id}
                              </label>
                              <TbCopy
                                size={20}
                                className="hover:text-blue-500 cursor-pointer"
                                onClick={() => handleCopyClick(i?._id)}
                              />
                            </div>
                          </div>
                          <div className="mt-4 flex">
                            <label className="w-[30%] h-[40px] items-center flex 800px:text-[14px] text-[12px]">
                              Ngày đặt
                            </label>
                            <div className="w-[70%] border border-blue-500 flex items-center rounded-lg h-[40px]">
                              <label
                                className="p-2 800px:text-[14px] text-[12px]"
                                key={index}
                              >
                                {i.paidAt.slice(0, 10)}
                              </label>
                            </div>
                          </div>
                          <div className="mt-4 flex">
                            <label className="w-[30%] h-[40px] items-center flex 800px:text-[14px] text-[12px]">
                              Phương thức thanh toán
                            </label>
                            <div className="w-[70%] border border-blue-500 flex items-center rounded-lg h-[40px]">
                              <label
                                className="p-2 800px:text-[14px] text-[12px]"
                                key={index}
                              >
                                {i.paymentInfo?.type}
                              </label>
                            </div>
                          </div>
                          <div className="mt-4 flex">
                            <label className="w-[30%] h-[40px] items-center flex 800px:text-[14px] text-[12px]">
                              Tổng tiền
                            </label>
                            <div className="w-[70%] border border-blue-500 flex items-center rounded-lg h-[40px]">
                              <label
                                className="p-2 800px:text-[14px] text-[12px]"
                                key={index}
                              >
                                {formatVietnameseCurrency(i.totalPrice)}
                              </label>
                            </div>
                          </div>
                          <div className="mt-4 flex">
                            <label className="w-[30%] h-[40px] items-center flex 800px:text-[14px] text-[12px]">
                              Địa chỉ giao hàng
                            </label>
                            <div className="w-[70%] border border-blue-500 flex items-center rounded-lg h-[40px]">
                              <label
                                className="p-2 800px:text-[14px] text-[12px]"
                                key={index}
                              >
                                <lable>
                                  {i.shippingAddress?.street} -{" "}
                                  {i.shippingAddress?.town}
                                </lable>
                              </label>
                            </div>
                          </div>
                          <div className="mt-4 flex">
                            <label className="w-[30%] h-[40px] items-center flex 800px:text-[14px] text-[12px]">
                              Trạng thái
                            </label>
                            <div className="w-[70%] border border-blue-500 flex items-center rounded-lg h-[40px] relative">
                              <label
                                className="p-2 800px:text-[14px] text-[12px]"
                                key={index}
                              >
                                <input value={i.status} />
                                <TbEdit
                                  className={`absolute right-0 top-3 mr-2 hover:text-yellow-800 cursor-pointer`}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="bg-gray-300 px-2 py-1 rounded mt-8"
                          onClick={handleClick}
                        >
                          Đóng
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default AllOrder;
