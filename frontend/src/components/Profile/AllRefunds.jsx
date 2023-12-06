import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { TbListDetails } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
const AllRefunds = () => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
    setData(orders);
  }, [user?._id, dispatch]);
  const refundData =
    orders &&
    orders.filter(
      (item) =>
        item?.status === "Chờ xác nhận hoàn trả đơn hàng" ||
        item?.status === "Hoàn trả thành công"
    );
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
    <>
      {refundData && refundData.length !== 0 ? (
        <div className="overflow-y-scroll max-h-[80vh]">
          <div className="w-[150vw] 800px:w-[95%] mx-auto bg-gray-300 rounded-[10px] flex items-center justify-between">
            <div className="ml-2 w-[35%]">Hình ảnh</div>
            <div className="ml-2 w-[63%]">Trạng thái đơn hàng</div>
            <div className="ml-4 w-[30%]">Số lượng</div>
            <div className="p-2 w-[55%]">Tổng tiền</div>
            <div className="p-2 w-[35%]">Chức năng</div>
          </div>
          <div className="w-[150vw] 800px:w-[95%] mx-auto bg-white mt-2 shadow-2xl rounded-b-[10px] flex items-center justify-between">
            <div className="ml-2 w-[35%]">
              <div className="p-2">
                {refundData &&
                  refundData.map((i, index) => (
                    <div key={index}>
                      {i.cart.map((item) => (
                        <img
                          src={`${backend_url}${item?.product?.images[0]}`}
                          className="w-[80%] cursor-pointer mt-2"
                        />
                      ))}
                    </div>
                  ))}
              </div>
            </div>
            <div className="ml-2 w-[63%]">
              <div className="p-2">
                {refundData &&
                  refundData.map((i, index) => (
                    <div key={index}>{i.status}</div>
                  ))}
              </div>
            </div>
            <div className="ml-4 w-[30%]">
              <div className="p-2">
                {refundData &&
                  refundData.map((i, index) => (
                    <div key={index} className="flex flex-col">
                      {i.cart.map((item) => (
                        <span> {item.qty}</span>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
            <div className="p-2 w-[55%]">
              <div className="p-2">
                {refundData &&
                  refundData.map((i, index) => (
                    <div key={index}>
                      {formatVietnameseCurrency(i.totalPrice)}
                    </div>
                  ))}
              </div>
            </div>
            <div className="p-2 w-[35%] flex justify-center">
              {refundData &&
                refundData.map((i, index) => (
                  <Link to={`/user/refunds/${i?._id}`}>
                    <TbListDetails
                      className="hover:text-green-500 cursor-pointer"
                      size={25}
                    />
                  </Link>
                ))}
              <MdDeleteForever
                className="cursor-pointer hover:text-red-500 ml-4"
                size={25}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center text-[25px] 800px:mt-[20%]">Chưa có đơn hàng nào yêu cầu hoàn trả</div>
      )}
    </>
  );
};

export default AllRefunds;
