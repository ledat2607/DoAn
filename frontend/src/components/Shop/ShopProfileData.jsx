import React, { useEffect, useState } from "react";
import ProductCart from "../../components/Route/ProductCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { backend_url, server } from "../../server.js";
import Ratings from "../Products/Ratings.jsx";
import { deleteEvent, getAllEventsShop } from "../../redux/actions/event.js";
import { getAllProductsShop } from "../../redux/actions/product.js";
import { AiFillStop, AiOutlineDelete } from "react-icons/ai";
import { toast } from "react-toastify";
const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { events, isLoading } = useSelector((state) => state.events);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  useEffect(() => {
    dispatch(getAllEventsShop(id));
    dispatch(getAllProductsShop(id));
  }, [dispatch]);

  const allReviews =
    products && products.map((product) => product.reviews.flat());
  const handleClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const handleDelete = (id) => {
    if (isPopupVisible === true) {
      dispatch(deleteEvent(id));
      toast.success("Xóa sự kiện thành công !");
      setTimeout(() => {
        dispatch(getAllEventsShop(id));
        window.location.reload(true);
      }, 500);
    }
  };
  const handelStop = async (id) => {
    await axios
      .post(`${server}/event/stop-event/${id}`)
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          getAllEventsShop(id);
          window.location.reload();
        }, 500);
      })
      .catch((error) => {
        toast.error("Lỗi thực hiện");
      });
  };
  return (
    <div className="w-full 800px:mx-6 mt-4 800px:mt-0">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex ">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] 800px:text-[25px] text-[12px] ${
                active === 1 ? "text-red-500" : "#333"
              } cursor-pointer pr-[30px]`}
            >
              Sản phẩm
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] 800px:text-[25px] text-[12px] ${
                active === 2 ? "text-red-500" : "#333"
              } cursor-pointer pr-[30px]`}
            >
              Sự kiện đang diễn ra
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] 800px:text-[25px] text-[12px] ${
                active === 3 ? "text-red-500" : "#333"
              } cursor-pointer pr-[30px]`}
            >
              Đánh giá
            </h5>
          </div>
        </div>
        {isOwner && (
          <div>
            <Link to="/dashboard">
              <div
                className={`${styles.button} hidden items-center 800px:flex justify-center w-[250px] h-[50px] font-[600] text-md font-Roboto pr-8`}
              >
                Truy cập trang quản lý
              </div>
            </Link>
          </div>
        )}
      </div>

      {active === 1 && (
        <div className="w-[100%] mt-4 800px:mt-2 800px:w-full mx-auto grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12">
          {products &&
            products.map((i, index) => (
              <ProductCart data={i} key={index} isShop={true} />
            ))}
        </div>
      )}
      {active === 2 && (
        <div className="mt-8">
          {events &&
            events.map((item, index) => (
              <>
                <div
                  key={index}
                  className="flex mt-8 justify-between items-start bg-gray-300 p-3 rounded-tl-lg rounded-tr-lg"
                >
                  <span className="text-[8px] w-[100px] 800px:text-[16px]">
                    Tên sản phẩm
                  </span>
                  <span className="text-[8px] 800px:text-[16px]">
                    Ngày bắt đầu
                  </span>
                  <span className="text-[8px] 800px:text-[16px]">
                    Ngày kết thúc
                  </span>
                  <span className="text-[8px] 800px:text-[16px]">
                    Trạng thái
                  </span>
                  <span className="text-[8px] 800px:text-[16px]">Số lượng</span>
                  <span className="text-[8px] 800px:text-[16px]">
                    Chức năng
                  </span>
                </div>
                <div className="flex bg-blue-200 p-2">
                  <span className="800px:ml-1 w-[135px] text-[8px] 800px:text-[16px]">
                    {item?.name}
                  </span>
                  <span className="800px:ml-10 ml-1 text-[8px] 800px:text-[16px]">
                    {item?.start_Date.slice(0, 10)}
                  </span>
                  <span className="800px:ml-[10%] ml-6 text-[8px] 800px:text-[16px]">
                    {item?.Finish_Date.slice(0, 10)}
                  </span>
                  <span className="800px:ml-[11%] ml-6 text-[8px] 800px:text-[16px]">
                    {item?.status}
                  </span>
                  <span className="800px:ml-[9%] ml-4 text-[8px] 800px:text-[16px]">
                    {item?.stock}
                  </span>
                  <span className="ml-[12%] flex">
                    <AiOutlineDelete
                      className="hover:text-red-500 hover:scale-[1.2] cursor-pointer text-[12px] 800px:text-[20px]"
                      onClick={handleClick}
                    />
                    {isPopupVisible && (
                      <div
                        key={index}
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]"
                      >
                        <div className="bg-white p-4 rounded-lg">
                          <p>Bạn có chắc chắn muốn xóa dữ liệu này không?</p>
                          <button
                            className="bg-red-500 text-white px-2 py-1 rounded mt-[10%]"
                            onClick={() => handleDelete(item._id)}
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
                    <AiFillStop
                      title="Dừng sự kiện"
                      className="hover:text-yellow-500 hover:scale-[1.2] cursor-pointer 800px:ml-6 ml-2 text-[12px] 800px:text-[20px]"
                      onClick={() => handelStop(item._id)}
                    />
                  </span>
                </div>
              </>
            ))}
        </div>
      )}
      {active === 3 && (
        <div className="w-full 800px:w-full mx-auto mb-12 mt-4 800px:mt-2">
          {allReviews &&
            allReviews?.map((item, index) => (
              <div key={index} className="mb-4">
                {item?.map((review, reviewIndex) => (
                  <div key={reviewIndex} className="flex items-center mb-4">
                    <img
                      src={`${backend_url}${review.user?.avatar}`}
                      alt=""
                      className="w-[100px] h-[100px] rounded-full p-6"
                    />
                    <div className="ml-4">
                      <h3 className="text-lg font-[500] font-Roboto">
                        {review.user?.name}
                      </h3>
                      <p className="text-gray-600">{review?.comment}</p>
                      <div className="flex">
                        <Ratings rating={review?.rating} />
                        <i className="ml-2 text-[12px]">
                          {review?.createdAt.slice(0, 10)}
                        </i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
        </div>
      )}
      <div>
        {products && products.length === 0 && (
          <h5 className="w-full text-center py-5 text-[18px]">
            Chưa có sản phẩm nào
          </h5>
        )}
      </div>
    </div>
  );
};

export default ShopProfileData;
