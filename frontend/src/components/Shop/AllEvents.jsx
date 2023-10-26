import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event";
const AllEvents = () => {
  const { events, isLoading } = useSelector((state) => state.events);
  const { seller } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  useEffect(() => {
    dispatch(getAllEventsShop(seller._id));
  }, [dispatch]);
  //format đơn vị tiền tệ
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  const handleClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const handleDelete = (id) => {
    if (isPopupVisible === true) {
      dispatch(deleteEvent(id));
      toast.success("Xóa sản phẩm thành công !");
      window.location.reload(true);
    }
  };
  return (
    <div className="w-full">
      {events &&
        events.map((i, index) => (
          <div className="flex justify-between mx-auto w-[95%] bg-white shadow-2xl p-4 rounded-md mt-6 800px:h-[150px] h-[120px]">
            <div className="w-[150px]">
              <span className="800px:text-lg text-[12px]">Tên sự kiện</span>
              <div className="800px:text-lg text-[12px] text-blue-500 mt-6">
                {i.name}
              </div>
            </div>
            <div>
              <span className="hidden 800px:block 800px:text-md">
                Ngày bắt đầu
              </span>
              <div className="text-md  text-green-500 800px:block hidden mt-6">
                {i.start_Date.slice(0, 10)}
              </div>
            </div>
            <div>
              <span className="800px:text-lg text-[12px]">Ngày kết thúc</span>
              <div className="800px:text-lg text-[12px] text-red-500 mt-6">
                {i.Finish_Date.slice(0, 10)}
              </div>
            </div>
            <div className="hidden 800px:block">
              <span>Chức năng</span>
              <div className="flex justify-between mt-6">
                <AiOutlineDelete
                  size={20}
                  color="red"
                  className="cursor-pointer hover:scale-[1.2]"
                  onClick={handleClick}
                />
                {isPopupVisible && (
                  <div
                    key={index}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1000"
                  >
                    <div className="bg-white p-4 rounded-lg">
                      <p>Bạn có chắc chắn muốn xóa dữ liệu này không?</p>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded mt-[10%]"
                        onClick={() => handleDelete(i._id)}
                      >
                        Xác nhận
                      </button>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded ml-5"
                        onClick={() => setIsPopupVisible(false)}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                )}
                <AiOutlineEdit
                  size={20}
                  color="green"
                  className="cursor-pointer hover:scale-[1.2]"
                />
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AllEvents;
