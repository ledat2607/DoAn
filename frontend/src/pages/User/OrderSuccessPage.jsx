import React from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../../assets/107043-success.json";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  return (
    <div>
      <Header />
      <Success />
      <Footer />
    </div>
  );
};

const Success = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleDeleteCart = async (e) => {
    e.preventDefault();
    await axios
      .delete(`${server}/cart/delete-cartItems-in-cart/${user?._id}`)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err);
        navigate("/");
        window.location.reload(true);
      });
  };
  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Đặt hàng thành công ! 😍
      </h5>
      <h4 className="text-center">
        <u onClick={handleDeleteCart} className="cursor-pointer">
          Quay về trang chủ
        </u>
      </h4>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
