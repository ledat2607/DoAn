import React, { useEffect, useState } from "react";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import { MdTrackChanges } from "react-icons/md";
import { Link } from "react-router-dom";

const TrackOrder = () => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
    setData(orders);
  }, [user?._id, dispatch]);
  //định dạng tiền tệ
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  return (
    <div>
      <div className="overflow-y-scroll max-h-[80vh]">
        <div className="w-[150vw] 800px:w-[95%] mx-auto bg-gray-300 rounded-[10px] flex items-center justify-between">
          <div className="ml-2 w-[35%]">Hình ảnh</div>
          <div className="ml-2 w-[63%]">Trạng thái đơn hàng</div>
          <div className="ml-4 w-[30%]">Số lượng</div>
          <div className="p-2 w-[55%]">Tổng tiền</div>
          <div className="p-2 w-[35%]">Chức năng</div>
        </div>
      </div>
      {data?.map((i, index) => (
        <div className="w-[95%] mx-auto pb-2 shadow-2xl bg-white mt-2 rounded-[10px] flex items-center justify-between">
          <div className="ml-2 w-[35%]">
            {i?.cart?.map((items, ind) => (
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
              {i.status}
            </label>
          </div>
          <div className="ml-4 w-[30%]">
            {i?.cart?.map((item, ind) => (
              <div>
                <label className="flex items-center justify-center">
                  {item?.qty}
                </label>
              </div>
            ))}
          </div>
          <div className="p-2 w-[55%]">
            {formatVietnameseCurrency(i?.totalPrice)}
          </div>
          <div className="p-2 w-[35%] flex">
            <Link to={`/user/track/order/${i?._id}`}>
              <MdTrackChanges
                className="hover:text-green-500 cursor-pointer"
                size={25}
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackOrder;
