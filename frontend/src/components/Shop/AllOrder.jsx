import React, { useEffect, useState } from "react";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { backend_url } from "../../server";
import { toast } from "react-toastify";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { TbListDetails } from "react-icons/tb";
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
  const handleDelete = (id) => {
    if (isPopupVisible === true) {
      dispatch(deleteProduct(id));
      toast.success("Xóa sản phẩm thành công !");
      window.location.reload(true);
    }
  };

  return (
    <div className="w-full">
      {data &&
        data.map((i, index) => (
          <div className="flex justify-between mx-auto w-[95%] bg-white shadow-2xl p-4 rounded-md mt-6 800px:h-[150px] h-[120px]">
            <div className="w-[120px] relative">
              <span className="800px:text-lg text-[12px]">Hình ảnh</span>
              {i?.cart.map((item, inde) => (
                <img
                  src={`${backend_url}${item?.product?.images[0]}`}
                  key={index}
                  className="800px:w-[120px] w-[80px] hover:cursor-pointer pt-2"
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
            <div className="w-[150px]">
              <span className="800px:text-lg text-[12px]">Tên sản phẩm</span>
              <div className="800px:text-lg text-[12px] text-blue-500 mt-6">
                {i?.cart.map((item, inde) => (
                  <label key={inde}>{item?.product?.name}</label>
                ))}
              </div>
            </div>
            <div>
              <span className="800px:text-lg text-[12px]">Trạng thái</span>
              <div className="800px:text-lg text-[12px] text-green-500 mt-6">
                <label
                  className={`${
                    i.status === "Processing"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {i?.status}
                </label>
              </div>
            </div>
            <div>
              <span className="800px:text-lg text-[12px]">Giá bán</span>
              <div className="800px:text-lg text-[12px] text-green-500 mt-6">
                {i?.cart.map((item, inde) => (
                  <label key={inde}>
                    {formatVietnameseCurrency(item?.product?.discountPrice)}
                  </label>
                ))}
              </div>
            </div>
            <div className="hidden 800px:block">
              <span>Chức năng</span>
              <div className="flex justify-between mt-6">
                <TbListDetails
                  size={20}
                  className="cursor-pointer hover:scale-[1.2] hover:text-blue-500"
                  onClick={() => setIsPopupVisible(true)}
                />
                <AiOutlineEdit
                  size={20}
                  className="cursor-pointer hover:scale-[1.2] hover:text-green-500"
                />
                {isPopupVisible && (
                  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[99999]">
                    <div className="bg-white w-[60%] p-4 rounded-lg ">
                      <p>Thông tin đơn hàng</p>
                      <div className="w-full flex justify-between">
                        <div className="w-[30%]">
                          {i.cart?.map((item, ind) => (
                            <img
                              src={`${backend_url}${item.product?.images[0]}`}
                              className="w-[80%] mt-5"
                            />
                          ))}
                        </div>
                        <div>
                          <div>
                            <label className="text-[18px] font-[600] font-Roboto">
                              Họ và tên khách hàng
                            </label>
                            <div>{i.user?.name}</div>
                          </div>
                          <div>
                            <label className="text-[18px] font-[600] font-Roboto">
                              Số điện thoại
                            </label>
                            <div>0{i.user?.phoneNumber}</div>
                          </div>
                          <div>
                            <label className="text-[18px] font-[600] font-Roboto">
                              Địa chỉ giao hàng
                            </label>
                            <div>
                              {i.shippingAddress?.street} ,
                              {i.shippingAddress?.town}
                            </div>
                          </div>
                          <div>
                            <label className="text-[18px] font-[600] font-Roboto">
                              Phương thức thanh toán
                            </label>
                            <div>{i.paymentInfo?.type}</div>
                          </div>
                        </div>
                        <div>
                          <div>
                            <label className="text-[18px] font-[600] font-Roboto">
                              Họ và tên khách hàng
                            </label>
                            <div>{i.user?.name}</div>
                          </div>
                          <div>
                            <label className="text-[18px] font-[600] font-Roboto">
                              Số điện thoại
                            </label>
                            <div>0{i.user?.phoneNumber}</div>
                          </div>
                          <div>
                            <label className="text-[18px] font-[600] font-Roboto">
                              Địa chỉ giao hàng
                            </label>
                            <div>
                              {i.shippingAddress?.street} ,
                              {i.shippingAddress?.town}
                            </div>
                          </div>
                          <div>
                            <label className="text-[18px] font-[600] font-Roboto">
                              Phương thức thanh toán
                            </label>
                            <div>{i.paymentInfo?.type}</div>
                          </div>
                        </div>
                      </div>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded mt-[10%]"
                        onClick={handleClick}
                      >
                        Xác nhận giao hàng
                      </button>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded ml-5"
                        onClick={() => setIsPopupVisible(!isPopupVisible)}
                      >
                        Đóng
                      </button>
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
