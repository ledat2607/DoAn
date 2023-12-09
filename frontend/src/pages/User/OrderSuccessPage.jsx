import React, { useEffect } from "react";
import Footer from "../../components/Layout/Footer";
import Header from "../../components/Layout/Header";
import Lottie from "react-lottie";
import animationData from "../../assets/107043-success.json";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const OrderSuccessPage = () => {
  const appliedCodes = JSON.parse(localStorage.getItem("appliedCodes")) || [];
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    console.log("Applied Codes:", appliedCodes);
    // localStorage.removeItem("appliedCodes");
  }, [appliedCodes]);

  return (
    <div>
      <Header />
      <Success appliedCodes={appliedCodes} user={user} />
      <Footer />
    </div>
  );
};

const Success = ({ appliedCodes, user }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const navigate = useNavigate();
  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      // Delete cart items
      await axios.delete(
        `${server}/cart/delete-cartItems-in-cart/${user?._id}`
      );

      // Ensure appliedCodes is an array of valid codes
      const validAppliedCodes = appliedCodes.filter((code) => code);

      // Delete discount codes
      const response = await axios.post(`${server}/user/delete-code`, {
        userId: user?._id,
        appliedCodes: validAppliedCodes,
      });

      // Common logic after deletions
      navigate("/");
      // window.location.reload(true);
    } catch (error) {
      toast.error(error.message);
      navigate("/");
      // window.location.reload(true);
    }
  };

  return (
    <div>
      <Lottie options={defaultOptions} width={300} height={300} />
      <h5 className="text-center mb-14 text-[25px] text-[#000000a1]">
        Đặt hàng thành công ! 😍
      </h5>
      <h4 className="text-center">
        <u onClick={handleDelete} className="cursor-pointer">
          Quay về trang chủ
        </u>
      </h4>
      <br />
      <br />
    </div>
  );
};

export default OrderSuccessPage;
