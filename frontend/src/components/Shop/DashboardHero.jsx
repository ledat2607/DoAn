import React, { useEffect, useState } from "react";
import { GiMoneyStack } from "react-icons/gi";
import { FiActivity } from "react-icons/fi";
import { PiArchiveFill } from "react-icons/pi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { BsBank2 } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import AllOrder from "./AllOrder.jsx";
const DashboardHero = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.products);
  const [deliveredOrder, setDeliveredOder] = useState(null);
  const [cashOnDelivery, setCashOnDelivery] = useState(null);
  useEffect(() => {
    if (!orders || !products) {
      // Dữ liệu chưa được tải lên từ API, bạn có thể thực hiện các xử lý khác tùy thuộc vào yêu cầu của bạn.
      return;
    }

    const orderData =
      orders &&
      orders?.filter((item) => item.status === "Giao hàng thành công");

    if (!orderData) {
      return;
    }

    const deliveredOrders = orderData?.filter(
      (item) => item.paymentInfo.type === "Paypal"
    );

    setDeliveredOder(deliveredOrders);
    setCashOnDelivery(orderData);
  }, [dispatch, seller?.id, orders, products]);

  const accountBalance =
    deliveredOrder &&
    deliveredOrder?.reduce((acc, item) => acc + item.totalPrice, 0);

  const totalMoney =
    cashOnDelivery &&
    cashOnDelivery?.reduce((acc, item) => acc + item.totalPrice, 0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: [12, 19, 3, 5, 2, 50],
        fill: false,
        borderColor: "#077f9c",
      },
    ],
  };
  function formatVietnameseCurrency(number) {
    // Chia cho 1000 và làm tròn xuống để lấy phần nguyên
    let formattedNumber = Math.floor(number / 1000);

    // Nhân lại cho 1000 để có giá trị mong muốn
    formattedNumber *= 1000;

    // Sử dụng hàm toLocaleString để định dạng số theo ngôn ngữ và định dạng của Việt Nam
    let result = formattedNumber.toLocaleString("vi-VN");

    return result;
  }

  return (
    <div className="w-full p-2">
      <h3 className="800px:text-[22px] font-Poppins pb-2">Tổng quát</h3>
      <div className="w-full 800px:ml-4 800px:flex items-center 800px:justify-between">
        <div className="w-full flex">
          <div className="w-[50%] mb-4 800px:w-[50%] bg-white shadow-2xl rounded px-2 py-5">
            <div className="flex items-center">
              <BsBank2
                className="mr-2 text-[12px] 800px:text-[30px]"
                fill="#0000085"
              />
              <h3
                className={`${styles.productTitle} 800px:!text-[18px] !text-[12px] leading-5 !font-[400]`}
              >
                Số dư tài khoản
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] 800px:text-[22px] text-[15px] font-[500]">
              {formatVietnameseCurrency(accountBalance)}
            </h5>
            <Link to="/dashboard-withdraw-money">
              <i className="pt-4 pl-2 800px:text-[18px] text-[15px] text-[#077f9c] ml-6">
                Rút tiền
              </i>
            </Link>
          </div>
          <div className="w-[50%] mb-4 800px:w-[50%] bg-white shadow-2xl rounded px-2 py-5 ml-2">
            <div className="flex items-center">
              <GiMoneyStack
                className="mr-2 text-[12px] 800px:text-[30px]"
                fill="#0000085"
              />
              <h3
                className={`${styles.productTitle} 800px:!text-[18px] !text-[12px] leading-5 !font-[400]`}
              >
                Tổng thu nhập
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] 800px:text-[22px] text-[15px] font-[500]">
              {formatVietnameseCurrency(totalMoney)}
            </h5>
            <Link to="/dashboard-withdraw-money">
              <i className="pt-4 pl-2 800px:text-[18px] text-[15px] text-[#077f9c] ml-6">
                Thống kê
              </i>
            </Link>
          </div>
        </div>
        <div className="w-full flex 800px:ml-2">
          <div className="w-[50%] mb-4 800px:w-[40%] bg-white shadow-2xl rounded px-2 py-5">
            <div className="flex items-center">
              <PiArchiveFill
                className="mr-2 text-[12px] 800px:text-[30px]"
                fill="#0000085"
              />
              <h3
                className={`${styles.productTitle} 800px:!text-[18px] !text-[12px] leading-5 !font-[400]`}
              >
                Tổng sản phẩm
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] 800px:text-[22px] text-[15px] font-[500]">
              {products?.length}
            </h5>
          </div>
          <div className="w-[50%] mb-4 800px:w-[50%] bg-white shadow-2xl rounded px-2 py-5 ml-2">
            <div className="flex items-center">
              <FiActivity
                className="mr-2 text-[12px] 800px:text-[30px]"
                size={30}
              />
              <h3
                className={`${styles.productTitle} 800px:!text-[18px] !text-[12px] leading-5 !font-[400]`}
              >
                Đơn hàng
              </h3>
            </div>
            <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
              {orders?.length}
            </h5>

            <i
              className="pt-4 pl-2 800px:text-[18px] text-[15px] text-[#077f9c] ml-6 cursor-pointer"
              onClick={handlePopupToggle}
            >
              Xem biểu đồ thống kê
            </i>
            {isPopupOpen && (
              <div className="absolute  top-0 right-0 left-0 bottom-0 bg-gray-800 bg-opacity-50 z-50">
                <div className="absolute top-1/2 left-1/2 w-[30vw] transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md">
                  <h3 className="text-xl font-bold mb-4">Biểu đồ đường</h3>
                  <Line
                    data={chartData}
                    options={{
                      scales: {
                        x: { type: "category", labels: chartData.labels },
                      },
                    }}
                  />
                  <button
                    onClick={handlePopupToggle}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <h3 className="800px:text-[22px] text-[15px] font-Poppins pb-2 mt-4">
        Đơn hàng gần nhất
      </h3>
      <div className="w-[95%] mx-auto min-h-[40vh] bg-white rounded p-2">
        <AllOrder />
      </div>
    </div>
  );
};

export default DashboardHero;
