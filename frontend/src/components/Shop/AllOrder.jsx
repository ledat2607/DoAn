import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { backend_url } from "../../server";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { TbListDetails } from "react-icons/tb";
import { Link } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const AllOrder = () => {
  const [data, setData] = useState([]);
  const { orders } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [filterStatus, setFilterStatus] = useState("all"); // Lọc theo trạng thái
  const [priceRange, setPriceRange] = useState([0, 99999999]); // Lọc theo giá tiền

  const handleFilterStatusChange = (newFilterStatus) => {
    setFilterStatus(newFilterStatus);
  };

  const handlePriceRangeChange = (newPriceRange) => {
    setPriceRange(newPriceRange);
  };
  const filteredData = data?.filter((item) => {
    const statusCondition =
      filterStatus === "all" || item.status === filterStatus;

    const priceCondition =
      item.totalPrice >= priceRange[0] && item.totalPrice <= priceRange[1];

    return statusCondition && priceCondition;
  });
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
      <div className="flex items-center">
        <div>
          <span className="mr-2">Lọc sản phẩm:</span>
          <select
            value={filterStatus}
            onChange={(e) => handleFilterStatusChange(e.target.value)}
            className="border rounded p-1"
          >
            <option value="all">Tất cả</option>
            <option value="Chờ duyệt">Chờ duyệt</option>
            <option value="Chuyển đến đơn vị vận chuyển">
              Chuyển đến đơn vị vận chuyển
            </option>
            <option value="Đơn vị vận chuyển đã nhận hàng">
              Đơn vị vận chuyển đã nhận hàng
            </option>
            <option value="Đang trên đường vận chuyển">
              Đang trên đường vận chuyển
            </option>
            <option value="Giao hàng thành công">Giao hàng thành công</option>
            <option value="Chờ xác nhận hoàn trả đơn hàng">
              Chờ xác nhận hoàn trả đơn hàng
            </option>
            <option value="Hoàn trả thành công">Hoàn trả thành công</option>
          </select>
        </div>

        <div className="ml-5">
          <span className="mr-2">Lọc theo giá trị đơn hàng:</span>
          <Slider
            range
            min={0}
            max={99999999}
            defaultValue={priceRange}
            onChange={handlePriceRangeChange}
          />
          <span className="mr-2">
            Khoảng giá: {formatVietnameseCurrency(priceRange[0])} -{" "}
            {formatVietnameseCurrency(priceRange[1])}
          </span>
        </div>
      </div>
      <>
        {filteredData?.length === 0 ? (
          <div className=" w-full flex justify-center items-center mt-[20%]">
            <h2 className="text-[22px] font-Roboto font-[500]">
              Chưa có đơn hàng
            </h2>
          </div>
        ) : (
          <div>
            {filteredData &&
              filteredData.map((i, index) => (
                <>
                  <div className="flex mx-auto w-[95%] bg-white shadow-2xl p-4 rounded-md mt-6 800px:h-[150px] h-[120px]">
                    <div className="w-[120px] relative">
                      <span className="800px:text-lg text-[12px]">
                        Hình ảnh
                      </span>
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
                      <span className="800px:text-lg text-[12px]">
                        Tên sản phẩm
                      </span>
                      <div className="800px:text-lg text-[12px] text-blue-500 mt-6">
                        {i?.cart.map((item, inde) => (
                          <label key={inde}>{item?.product?.name}</label>
                        ))}
                      </div>
                    </div>
                    <div className="ml-8">
                      <span className="800px:text-lg text-[12px]">
                        Trạng thái
                      </span>
                      <div className="800px:text-lg text-[12px] text-green-500 mt-6">
                        <label
                          className={`${
                            i.status === "Chờ duyệt"
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        >
                          {i?.status}
                        </label>
                      </div>
                    </div>
                    <div className="ml-[10%]">
                      <span className="800px:text-lg text-[12px]">Tổng đơn hàng</span>
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
                </>
              ))}
          </div>
        )}
      </>
    </div>
  );
};
export default AllOrder;
