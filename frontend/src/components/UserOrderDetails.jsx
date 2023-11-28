import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../styles/styles";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillStar,
  AiOutlineDelete,
  AiOutlinePlusCircle,
  AiOutlineStar,
} from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import { backend_url, server } from "../server";
import { getAllOrdersOfUser } from "../redux/actions/order";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [reason, setReason] = useState("");

  const setOpenPopUp = () => {
    // Hiển thị popup khi click
    setPopupVisible(!isPopupVisible);
  };
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, user._id]);

  const data = orders && orders?.find((item) => item?._id === id);
  const reviewHandler = async (e) => {
    await axios
      .put(
        `${server}/product/create-new-review`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?.product?._id,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(1);
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const refundHandler = async () => {
    await axios
      .put(`${server}/order/order-refund/${id}`, {
        status: "Chờ xác nhận hoàn trả đơn hàng",
        reason: reason,
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setPopupVisible(!isPopupVisible);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  //hàm định dạng tiền tệ
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
    <div className={`py-4 min-h-screen ${styles.section}`}>
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <BsFillBagFill size={30} color="crimson" />
          <h1 className="pl-2 text-[25px]">Chi tiết đơn hàng</h1>
        </div>
      </div>

      <div className="w-full flex items-center justify-between pt-6">
        <div>
          <h5 className="text-[#00000084]">
            Mã đơn hàng: <span>#{data?._id?.slice(0, 8)}</span>
          </h5>
          <h4>
            Trạng thái đơn hàng:
            <span
              className={`${
                data?.status === "Chờ duyệt" ? "text-red-500" : "text-green-500"
              }`}
            >
              {data?.status}
            </span>
          </h4>

          {data?.status === "Chờ xác nhận hoàn trả đơn hàng" ? (
            <h4>
              Lý do trả hàng: <i className="ml-2">{data?.reason}</i>
            </h4>
          ) : null}
        </div>
        <h5 className="text-[#00000084]">
          Ngày lập hóa đơn: <span>{data?.createdAt?.slice(0, 10)}</span>
        </h5>
      </div>

      {/* order items */}
      <br />
      <br />
      {data?.cart?.map((i, index) => {
        return (
          <div className="w-full flex items-start mb-5">
            <img
              src={`${backend_url}${i?.product?.images[0]}`}
              alt=""
              className="w-[80x] h-[80px]"
            />

            <div className="w-full">
              <h5 className="pl-3 text-[20px]">{i.product?.name}</h5>
              <h5 className="pl-3 text-[20px] text-[#00000091]">
                {formatVietnameseCurrency(i.product?.discountPrice)} x {i.qty}
              </h5>
            </div>
            {!i.isReviewed && data?.status === "Giao hàng thành công" ? (
              <div
                className={`${styles.button} w-[120px] h-[40px]`}
                onClick={() => setOpen(true) || setSelectedItem(i)}
              >
                Bình luận
              </div>
            ) : null}
          </div>
        );
      })}
      {/* review popup */}
      {open && (
        <div className="w-full fixed top-0 left-0 h-screen bg-[#0005] z-50 flex items-center justify-center">
          <div className="w-[50%] h-min bg-[#fff] shadow rounded-md p-3">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              />
            </div>
            <h2 className="text-[30px] font-[500] font-Poppins text-center">
              Đánh giá của bạn về sản phẩm
            </h2>
            <br />
            <div className="w-full flex">
              <img
                src={`${backend_url}${selectedItem?.product?.images[0]}`}
                alt=""
                className="w-[80px] h-[80px]"
              />
              <div>
                <div className="pl-3 text-[20px]">
                  {selectedItem?.product?.name}
                </div>
                <h4 className="pl-3 text-[20px]">
                  {formatVietnameseCurrency(
                    selectedItem?.product?.discountPrice
                  )}
                  x{selectedItem?.qty}
                </h4>
              </div>
            </div>

            <br />
            <br />

            {/* ratings */}
            <h5 className="pl-3 text-[20px] font-[500]">
              Đánh giá <span className="text-red-500">*</span>
            </h5>
            <div className="flex w-full ml-2 pt-1">
              {[1, 2, 3, 4, 5].map((i) =>
                rating >= i ? (
                  <AiFillStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                ) : (
                  <AiOutlineStar
                    key={i}
                    className="mr-1 cursor-pointer"
                    color="rgb(246,186,0)"
                    size={25}
                    onClick={() => setRating(i)}
                  />
                )
              )}
            </div>
            <br />
            <div className="w-full ml-3">
              <label className="block text-[20px] font-[500]">
                Bình luận
                <span className="ml-1 font-[400] text-[16px] text-[#00000052]">
                  (optional)
                </span>
              </label>
              <textarea
                name="comment"
                id=""
                cols="20"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Hãy viết cảm nhận của bạn về sản phẩm này !!!"
                className="mt-2 w-[95%] border p-2 outline-none"
              ></textarea>
            </div>
            <div
              className={`${styles.button} w-[100px] h-[40px] mx-auto text-[20px] ml-3`}
              onClick={rating > 1 ? reviewHandler : null}
            >
              Đăng
            </div>
          </div>
        </div>
      )}
      <div className="border-t w-full text-right">
        <h5 className="pt-3 text-[18px]">
          Tổng tiền:{" "}
          <strong>{formatVietnameseCurrency(data?.totalPrice)}</strong>
        </h5>
      </div>
      <div className="w-full 800px:flex items-center">
        <div className="w-full 800px:w-[60%]">
          <h4 className="pt-3 text-[20px] font-[600]">Thông tin giao hàng:</h4>
          <h4 className="pt-3 text-[20px]">
            {data?.shippingAddress.street + " " + data?.shippingAddress.town}
          </h4>
          <h2 className="pt-3 text-[20px]">{data?.user?.name}</h2>
          <h4 className="pt-3 text-[20px]">0{data?.user?.phoneNumber}</h4>
        </div>
        <div className="w-full 800px:w-[40%]">
          <h4 className="pt-3 text-[20px]">Thanh toán:</h4>
          <div className="w-full flex">
            <h4>Trạng thái:</h4>
            <i
              className={`ml-2 ${
                data?.paymentInfo?.status === "Đã thanh toán"
                  ? "text-green-500"
                  : "rext-red-500"
              }`}
            >
              {data?.paymentInfo?.status
                ? data?.paymentInfo?.status
                : " Chưa thanh toán"}
            </i>
          </div>
          <br />
          {data?.status === "Giao hàng thành công" && (
            <div
              className={`${styles.button} w-[150px] h-[40px] mx-auto`}
              onClick={setOpenPopUp}
            >
              Hoàn trả
              {isPopupVisible && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-300 bg-opacity-50">
                  <div className="bg-white p-4 w-[40vw] h-[70vh] rounded shadow-md">
                    {/* Nội dung của popup */}
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Lý do trả hàng
                      </label>
                      <textarea
                        className="border rounded w-full py-2 px-3 h-[100px] text-[#000]"
                        placeholder="Lý do trả hàng..."
                        name="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>

                    <button
                      className="bg-blue-300 hover:bg-blue-500 cursor-pointer text-[#000] hover:text-white rounded py-2 px-4 mt-2"
                      onClick={refundHandler}
                    >
                      Xác nhận
                    </button>

                    <button
                      onClick={setOpenPopUp}
                      className="bg-red-300 hover:bg-red-500 cursor-pointer text-[#000] hover:text-white  rounded py-2 px-4 mt-2 ml-5"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Link to="/">
        <div
          className={`${styles.button} w-[150px] h-[40px] !bg-gray-400 mx-auto`}
        >
          Gửi tin nhắn
        </div>
      </Link>
    </div>
  );
};

export default UserOrderDetails;
