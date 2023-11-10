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
const AllOrder = () => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
    setData(orders);
  }, [user?._id, dispatch]);
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  return (
    <>
      <div className="overflow-y-scroll max-h-[80vh]">
        <div className="w-[150vw] 800px:w-[98%] ml-2 mx-auto bg-gray-300 rounded-[10px] flex items-center justify-between">
          <div className="ml-2 w-[38%]">Hình ảnh</div>
          <div className="ml-2 w-[63%]">Trạng thái đơn hàng</div>
          <div className="ml-4 w-[30%]">Số lượng</div>
          <div className="p-2 w-[55%]">Tổng tiền</div>
          <div className="p-2 w-[35%]">Chức năng</div>
        </div>
      </div>
      {data?.map((item, index) => (
        <div className="w-[95%] mx-auto pb-2 shadow-2xl bg-white mt-2 rounded-[10px] flex items-center justify-between">
          <div className="ml-2 w-[35%]">
            {item?.cart?.map((items, ind) => (
              <div>
                <img
                  src={`${backend_url}${items?.product?.images[0]}`}
                  key={ind}
                  className="mt-2"
                />
              </div>
            ))}
          </div>
          <div className="ml-2 w-[63%]">
            <label className="flex items-center justify-center">
              {item.status}
            </label>
          </div>
          <div className="ml-4 w-[30%]">
            {item?.cart?.map((items, ind) => (
              <div>
                <label className="flex items-center justify-center">
                  {items?.qty}
                </label>
              </div>
            ))}
          </div>
          <div className="p-2 w-[55%]">
            {formatVietnameseCurrency(item?.totalPrice)}
          </div>
          <div className="p-2 w-[35%] flex">
            <TbListDetails
              className="hover:text-green-500 cursor-pointer"
              size={25}
            />
            <MdDeleteForever
              className="hover:text-red-500 cursor-pointer ml-4"
              size={25}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default AllOrder;
