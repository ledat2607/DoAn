import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllCartItemsUser } from "../../redux/actions/cart";
import { toast } from "react-toastify";
const Cart = ({ setOpenCart, data }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      {data.length === 0 ? (
        <div className="fixed top-0 right-0 min-h-full 800px:w-[25%] w-[80%] shadow-sm bg-white">
          <RxCross1
            className="flex justify-center items-end absolute right-3 top-3 cursor-pointer"
            size={30}
            onClick={() => setOpenCart(false)}
          />
          <div className="flex items-center justify-center mt-[50%]">
            Chưa có sản phẩm nào trong giỏ hàng của bạn !
          </div>
        </div>
      ) : (
        <div className="fixed  top-0 right-0 min-h-full 800px:w-[25%] w-[80%] shadow-sm bg-white flex flex-col justify-between">
          {/*items length */}
          <div>
            <div className={`flex p-4`}>
              <IoBagHandleOutline size={25} />
              <h5 className="pl-2 text-[20px] font-[500]">
                {data.length} Sản phẩm
              </h5>
            </div>
            <div className="absolute top-[20px] flex w-full justify-end pr-5">
              <RxCross1
                size={25}
                className="cursor-pointer hover:text-red-500 hover:scale-[1.1]"
                onClick={() => setOpenCart(false)}
              />
            </div>
            <div className="w-full border-t ">
              {data &&
                data.map((i, index) => <CartSignle key={index} data={i} />)}
            </div>
          </div>

          {/*Cart signle */}

          <div className="px-5 mb-3">
            {/*check out */}
            <Link to="/checkout">
              <div
                className={`h-[45px] flex items-center justify-center w-[70%] mx-auto bg-[#e44343] rounded-[5px]`}
              >
                <h1 className="text-[#fff] text-[18px]">Xác nhận thanh toán</h1>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
//Cart signle
const CartSignle = ({ data }) => {
  const { user } = useSelector((state) => state.user);
  const [value, setValue] = useState(data?.qty);
  const total_price = data.product.discountPrice * value;
  const dispatch = useDispatch();
  const handleDelete = async (id) => {
    try {
      await axios.post(`${server}/cart/delete-items-in-cart/${id}`);
      // Sau khi xóa thành công, cập nhật danh sách cartData
      toast.success("Xóa thành công !");
      // Tải lại danh sách mục trong giỏ hàng sau khi xóa
      dispatch(getAllCartItemsUser(user?._id));
    } catch (error) {
      console.error("Lỗi xóa mục khỏi giỏ hàng:", error);
    }
  };
  //Incre
  const incre = async (id) => {
    try {
      await axios.post(`${server}/cart/incre-qty-cart-items/${id}`);
    } catch (error) {
      console.error("Lỗi xóa mục khỏi giỏ hàng:", error);
    }
  };
  //Decre
  const decre = async (id) => {
    try {
      await axios.post(`${server}/cart/decre-qty-cart-items/${id}`);
    } catch (error) {
      console.error("Lỗi xóa mục khỏi giỏ hàng:", error);
    }
  };
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <div>
          <div
            className={`bg-[#e43443] border border-[#e4344373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <button
              onClick={() => incre(data?._id)}
              disabled={value >= data.product.stock}
            >
              <HiPlus size={16} color="white" />
            </button>
          </div>
          <span className="pl-[10px]">{value}</span>
          <div
            className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            onClick={() => setValue(value === 1 ? 1 : value - 1)}
          >
            <button onClick={() => decre(data?._id)}>
              <HiOutlineMinus size={16} color="#7d879c" />
            </button>
          </div>
        </div>
        <img
          src={`${backend_url}${data.product.images[0]}`}
          alt="cart-img"
          className="w-[80px] h-h[80px] pl-2"
        />
        <div className="pl-[5px] flex justify-between w-full items-center">
          <div>
            <h1>{data.product.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              {formatVietnameseCurrency(data.product.discountPrice)} x {value}
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
              {formatVietnameseCurrency(total_price)}
            </h4>
          </div>
          <RxCross1
            className="cursor-pointer"
            onClick={() => handleDelete(data?._id)}
          />
        </div>
      </div>
    </div>
  );
};
export default Cart;
