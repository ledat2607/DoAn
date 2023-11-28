import React, { useEffect, useState } from "react";
import styles from "../../../styles/styles";
import { AiOutlineMoneyCollect } from "react-icons/ai";
import { MdBorderClear } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../../components/Layout/Loader";
import { getAllSellers } from "../../../redux/actions/selles";
import { HiOutlineUserGroup } from "react-icons/hi";
import { getAllOrdersOfAdmin } from "../../../redux/actions/order";
import { getAllUsers } from "../../../redux/actions/user";
import { Line } from "react-chartjs-2";
import { format, startOfMonth, addMonths } from "date-fns";
const AdminDashboardMain = () => {
  const dispatch = useDispatch();

  const { adminOrders, adminOrderLoading } = useSelector(
    (state) => state.order
  );
  const { sellers } = useSelector((state) => state.seller);
  const { users } = useSelector((state) => state.user);
  const { allProducts } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllOrdersOfAdmin());
    dispatch(getAllSellers());
    dispatch(getAllUsers());
  }, []);

  const adminEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => acc + item.totalPrice * 0.1, 0);

  const adminBalance = adminEarning?.toFixed(0);

  function formatVietnameseCurrency(number) {
    // Chia cho 1000 và làm tròn xuống để lấy phần nguyên
    let formattedNumber = Math.floor(number / 1000);

    // Nhân lại cho 1000 để có giá trị mong muốn
    formattedNumber *= 1000;

    // Sử dụng hàm toLocaleString để định dạng số theo ngôn ngữ và định dạng của Việt Nam
    let result = formattedNumber.toLocaleString("vi-VN");

    return result;
  }
  //biểu đồ
  const getLastSixMonths = () => {
    const currentMonth = startOfMonth(new Date());
    return Array.from({ length: 4 }, (_, index) =>
      format(addMonths(currentMonth, -index), "yyyy-MM")
    ).reverse(); // Reverse the array to have the months in ascending order
  };

  const allMonths = getLastSixMonths();

  const productsByMonth = allProducts
    ? allMonths.reduce((acc, month) => {
        const productsInMonth = allProducts.filter(
          (product) => format(new Date(product.createdAt), "yyyy-MM") === month
        );
        acc[month] = productsInMonth.length;
        return acc;
      }, {})
    : {};
  const chartData = {
    labels: allMonths,
    datasets: [
      {
        label: "Thống kê sản phẩm mới",
        data: Object.values(productsByMonth),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
        borderWidth: 1,
        max: 100,
      },
    ],
  };
  const maxDataValue = Math.max(...Object.values(productsByMonth));
  const maxYAxisValue = Math.ceil(maxDataValue / 10) * 10;
  const chartOptions = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
          displayFormats: {
            month: "MMM YYYY",
          },
        },
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        beginAtZero: true,
        max: maxYAxisValue,
        title: {
          display: true,
          text: "Number of Products",
        },
        ticks: {
          stepSize: 10,
          min: 0,
          max: maxYAxisValue,
        },
      },
    },
  };

  return (
    <>
      {adminOrderLoading ? (
        <Loader />
      ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <AiOutlineMoneyCollect
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Tổng thu nhập
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {formatVietnameseCurrency(adminBalance)}
              </h5>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <MdBorderClear size={30} className="mr-2" fill="#00000085" />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Tất cả Seller
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {sellers && sellers.length}
              </h5>
              <Link to="/admin-sellers">
                <h5 className="pt-4 pl-2 text-[#077f9c]">Xem</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <HiOutlineUserGroup
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Tất cả người dùng
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {users && users.length}
              </h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">Xem</h5>
              </Link>
            </div>
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
              <div className="flex items-center">
                <HiOutlineUserGroup
                  size={30}
                  className="mr-2"
                  fill="#00000085"
                />
                <h3
                  className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                >
                  Tất cả sản phẩm
                </h3>
              </div>
              <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">
                {allProducts && allProducts.length}
              </h5>
              <Link to="/admin-orders">
                <h5 className="pt-4 pl-2 text-[#077f9c]">Xem</h5>
              </Link>
            </div>
          </div>
          <div>
            <Line data={chartData} options={chartOptions} />
          </div>
          <br />
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
