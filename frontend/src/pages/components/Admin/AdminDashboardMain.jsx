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
import { Bar } from "react-chartjs-2";
import moment from "moment";

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

  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Số lượng sản phẩm",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const productDataByMonth = calculateProductDataByMonth();
    setChartData({
      labels: productDataByMonth.labels,
      datasets: [
        {
          label: "Số lượng sản phẩm",
          data: productDataByMonth.data,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
      ],
    });
  }, [allProducts]);

  const calculateProductDataByMonth = () => {
    const dataByMonth = {};

    // Lặp qua danh sách sản phẩm và tính toán số lượng theo tháng
    allProducts?.forEach((product) => {
      const monthYear = moment(product.createdAt).format("MM/YYYY");

      if (dataByMonth[monthYear]) {
        dataByMonth[monthYear]++;
      } else {
        dataByMonth[monthYear] = 1;
      }
    });

    // Chuyển đổi đối tượng thành mảng để sử dụng trong biểu đồ
    const labels = Object.keys(dataByMonth).sort(); // Sắp xếp theo thứ tự thời gian
    const data = labels.map((monthYear) => dataByMonth[monthYear]);

    return { labels, data };
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
            <Bar
              data={chartData}
              options={{
                indexAxis: "y",
                scales: {
                  x: {
                    beginAtZero: true,
                    stepSize: 1,
                    max:
                      Math.ceil(
                        (Math.max(10, ...chartData.datasets[0].data) + 10) / 10
                      ) * 10,
                  },
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
          <br />
        </div>
      )}
    </>
  );
};

export default AdminDashboardMain;
