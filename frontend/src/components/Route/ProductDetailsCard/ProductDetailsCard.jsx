import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
  AiOutlineMessage,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../../server";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, getAllCartItemsUser } from "../../../redux/actions/cart";

const ProductDetailsCard = ({ setOpen, open, data }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [count, setCount] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();
  const toggleDescription = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = () => {
    console.log(`trò chuyện`);
  };
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };
  //Định dạng đơn vị tiền tệ
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  const addToCartHandler = () => {
    dispatch(addToCart(user?._id, data.shop?._id, data?._id, count));
    {
      isAuthenticated
        ? toast.success("Thêm vào giỏ hàng thành công !", {
            onClose: () => {
              dispatch(getAllCartItemsUser(user?._id));
            },
          })
        : toast.warning("Vui lòng đăng nhập để tiếp tục !");
    }
    dispatch(getAllCartItemsUser(user?._id));
  };
  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center overflow-y-scroll">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-md relative p-4">
            <div className="flex justify-between items-center border-b-4">
              <h3 className="mt-[2%] 800px:text-[28px] font-[600]">
                Thông tin sản phẩm
              </h3>
              <RxCross1
                size={25}
                className="absolute right-5 800px:top-[-25px] mt-[6%]  z-50 hover:text-red-500"
                onClick={() => setOpen(false)}
              />
            </div>
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%] mt-[35px]">
                <img
                  src={`${backend_url}${data?.images[0]}`}
                  alt="preview"
                  width={"80%"}
                />
                <div className="flex">
                  <Link to={`/shop/preview/${data.shop._id}`}>
                    <img
                      src={`${backend_url}${data?.shop?.avatar.url}`}
                      alt="shop-preview"
                      className="w-[35px] h-[35px] mt-4 rounded-full mr-2"
                    />
                  </Link>
                  <div>
                    <h3 className={`${styles.shop_name} mt-4 ml-2`}>
                      {data.shop.shopName}
                    </h3>
                    <h4 className="text-[15px] ml-2">4.6/5</h4>
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-2 h-[40px] w-[120px] rounded hover:bg-gray-600`}
                  onClick={handleSubmit}
                >
                  <span className="flex text-[16px] font-Roboto font-semibold items-center">
                    Trò chuyện <AiOutlineMessage className="ml-1" />
                  </span>
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[17px]`}>
                  {data.name}
                </h1>
                <div className="text-start">
                  <div
                    id="des"
                    className={`text-[15px] font-light font-Poppins ${
                      expanded ? "max-h-full" : "max-h-12"
                    } overflow-hidden mt-5`}
                  >
                    {data?.description.includes("\\n")
                      ? data?.description.split("\\n").map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))
                      : data?.description}
                  </div>
                  <span
                    onClick={toggleDescription}
                    className={`text-[14px] font-semibold ${
                      expanded ? "text-red-500" : "text-blue-600"
                    }`}
                  >
                    {expanded ? "Ẩn bớt" : "Xem thêm"}
                  </span>
                </div>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {formatVietnameseCurrency(
                      Math.floor(data?.discountPrice / 1000) * 1000
                    )}
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {formatVietnameseCurrency(data.originalPrice)}
                  </h3>
                </div>
                <div className="h-8 mt-12">
                  <div className="flex">
                    <div
                      className=" h-10 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      <AiOutlineMinus size={20} className="mt-1" />
                    </div>
                    <div className="items-center justify-center flex h-10 w-[40px] bg-gray-400 relative">
                      {count}
                    </div>
                    <div
                      className="h-10 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      <AiOutlinePlus size={20} className="mt-1" />
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.button} w-[250px] mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(data?._id)}
                >
                  <span className="flex items-center text-[16px]">
                    Thêm vào giỏ hàng <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
