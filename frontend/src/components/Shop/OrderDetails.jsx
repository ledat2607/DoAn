import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";

const OrderDetails = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch]);

  const data = orders && orders.find((item) => item._id === id);
  //hàm định dạng tiền tệ
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  const orderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/update-order-status/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Cập nhật thành công!");
        navigate("/dashboard-orders");
        setTimeout(() => {
          dispatch(getAllOrdersOfShop(seller._id));
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const refundOrderUpdateHandler = async (e) => {
    await axios
      .put(
        `${server}/order/order-refund-success/${id}`,
        {
          status,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Cập nhật thành công!");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Chi tiết đơn hàng</h1>
        </div>
        <Link to="/dashboard-orders">
          <div
            className={`${styles.button} w-[200px] !bg-gray-400 !rounded-[4px] font-[600] !h-[45px] text-[18px]`}
          >
            Danh sách đơn hàng
          </div>
        </Link>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <h5 className="text-[#00000084]">
          Mã đơn hàng: <span>{data?._id?.slice(0, 8)}</span>
        </h5>
        <h5 className="text-[#00000084]">
          Ngày đặt hàng: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data &&
        data?.cart.map((item, index) => (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${backend_url}${item?.product?.images[0]}`}
              alt=""
              className="w-[80x] h-[80px]"
            />
            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{item?.product?.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                {formatVietnameseCurrency(item?.product?.discountPrice)} x{" "}
                {item.qty}
              </h5>
            </div>
          </div>
        ))}

      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Tổng tiền:{" "}
          <strong>{formatVietnameseCurrency(data?.totalPrice)}</strong>
        </h5>
      </div>
      <br />
      <br />
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Địa chỉ giao hàng:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.street + " " + data?.shippingAddress.town}
          </h4>
          <h4 className=" text-[20px]">{data?.shippingAddress.country}</h4>
          <h4 className=" text-[20px]">0{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Thông tin thanh toán:</h4>
          <h4>
            Trạng thái:{" "}
            {data?.paymentInfo?.status
              ? data?.paymentInfo?.status
              : "Chưa thanh toán"}
          </h4>
        </div>
        <div className="w-full 800px:w-[40%] mx-auto">
          <h4 className="pt-3 text-[20px] font-[500] font-Roboto">
            Thông tin khách hàng:
          </h4>
          <h4>
            Họ tên: <span>{data?.user?.name}</span>
          </h4>
          <h4>
            Số điện thoại: <span>0{data?.user?.phoneNumber}</span>
          </h4>
          <h3>Hình ảnh</h3>
          <img
            src={`${backend_url}${data?.user?.avatar}`}
            alt=""
            className="w-[100px] h-[100px] rounded-lg"
          />
        </div>
      </div>
      <br />
      <br />
      <h4 className="pt-3 text-[20px] font-[600]">Trạng thái đơn hàng:</h4>
      {data?.status !== "Chờ xác nhận hoàn trả đơn hàng" &&
        data?.status !== "Hoàn trả thành công" && (
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-[250px] mt-2 border h-[35px] rounded-[5px]"
          >
            {[
              "Chờ duyệt",
              "Chuyển đến đơn vị vận chuyển",
              "Đơn vị vận chuyển đã nhận hàng",
              "Đang trên đường vận chuyển",
              "Giao hàng thành công",
            ]
              .slice(
                [
                  "Chờ duyệt",
                  "Chuyển đến đơn vị vận chuyển",
                  "Đơn vị vận chuyển đã nhận hàng",
                  "Đang trên đường vận chuyển",
                  "Giao hàng thành công",
                ].indexOf(data?.status)
              )
              .map((option, index) => (
                <option value={option} key={index}>
                  {option}
                </option>
              ))}
          </select>
        )}
      {data?.status === "Chờ xác nhận hoàn trả đơn hàng" ||
      data?.status === "Hoàn trả thành công" ? (
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[300px] mt-2 border h-[35px] rounded-[5px]"
        >
          {["Chờ xác nhận hoàn trả đơn hàng", "Hoàn trả thành công"]
            .slice(
              ["Chờ xác nhận hoàn trả đơn hàng", "Hoàn trả thành công"].indexOf(
                data?.status
              )
            )
            .map((option, index) => (
              <option value={option} key={index} className="w-[300px]">
                {option}
              </option>
            ))}
        </select>
      ) : null}

      <div
        className={`${styles.button} mt-5 !w-[200px] !rounded-[4px]  font-[600] !h-[45px] text-[18px]`}
        onClick={
          data?.status !== "Chờ xác nhận hoàn trả đơn hàng"
            ? orderUpdateHandler
            : refundOrderUpdateHandler
        }
      >
        Cập nhật
      </div>
    </div>
  );
};

export default OrderDetails;
