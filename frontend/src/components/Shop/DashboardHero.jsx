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
import axios from "axios";
import { server } from "../../server.js";
const DashboardHero = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.products);
  const [deliveredOrder, setDeliveredOder] = useState(null);
  const [cashOnDelivery, setCashOnDelivery] = useState(null);
  const [dataWithdraw, setDataWithdraw] = useState();
  useEffect(() => {
    if (!orders || !products) {
      return;
    }
    const orderData =
      orders &&
      orders?.filter((item) => item?.status === "Giao hàng thành công");
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
    deliveredOrder?.reduce((acc, item) => acc + item?.totalPrice, 0);
  const totalBankMoney = dataWithdraw && accountBalance - dataWithdraw?.amount;
  const totalMoney =
    cashOnDelivery &&
    cashOnDelivery?.reduce((acc, item) => acc + item?.totalPrice, 0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };
  const extendedStartDate = new Date();
  extendedStartDate.setMonth(extendedStartDate.getMonth() - 2);
  const monthlyOrders = orders?.reduce((acc, order) => {
    const deliveredDate = new Date(order.deliveredAt);
    if (deliveredDate < extendedStartDate) {
      return acc;
    }
    const deliveredMonth = deliveredDate.getMonth();
    const existingMonth = acc.findIndex(
      (item) => item.month === deliveredMonth
    );
    if (existingMonth !== -1) {
      acc[existingMonth].count += 1;
    } else {
      acc.push({ month: deliveredMonth, count: 1 });
    }
    return acc;
  }, []);
  monthlyOrders?.sort((a, b) => a.month - b.month);
  const monthLabels = monthlyOrders?.map((item) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthNames[item.month];
  });
  const chartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Số lượng đơn hàng",
        data: monthlyOrders?.map((item) => item.count),
        fill: false,
        borderColor: "#077f9c",
      },
    ],
  };

  function formatVietnameseCurrency(number) {
    let formattedNumber = Math.floor(number / 1000);
    formattedNumber *= 1000;
    let result = formattedNumber.toLocaleString("vi-VN");
    return result;
  }
  useEffect(() => {
    axios
      .get(`${server}/shop/get-withdraw-by-id/${seller?._id}`)
      .then((res) => {
        setDataWithdraw(res.data.seller);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }, []);

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
              {formatVietnameseCurrency(totalBankMoney)}
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
                <div className="absolute top-1/2 left-1/2 800px:w-[30vw] w-[95%] transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-md">
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
