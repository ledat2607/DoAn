import React from "react";
import { MdEmail } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";
import { IoReloadCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const back = () => {
    navigate("/login");
  };
  const Email = () => {
    navigate("/email-reset");
  };
  const Phone = () => {
    navigate("/phone-reset");
  };
  return (
    <div className="w-full h-[100vh] bg-gray-300 flex flex-col justify-center items-center">
      <h1 className="text-center text-[25px] uppercase font-[500] font-Roboto">
        Yêu cầu cấp lại mật khẩu
      </h1>
      <div className="mt-5 800px:w-[30%] flex flex-col items-center w-[90%] bg-white h-[40vh] rounded-lg p-4">
        <div
          className="flex w-full h-[30%] border border-blue-500 items-center p-4 rounded-md"
          onClick={Email}
        >
          <MdEmail size={35} />
          <h2 className="ml-4">Gửi yêu cầu qua Email đăng ký</h2>
        </div>
        <div
          className="flex w-full h-[30%] border border-blue-500 items-center mt-4 p-4 rounded-md"
          onClick={Phone}
        >
          <MdContactPhone size={35} />
          <h2 className="ml-4">Gửi mã xác nhận qua số điện thoại</h2>
        </div>
        <div
          className="flex 800px:w-[60%] justify-center h-[30%]  items-center mt-4 p-4 rounded-md"
          onClick={back}
        >
          <IoReloadCircleSharp size={35} />
          <h2 className="ml-4 cursor-pointer">Quay lại trang đăng nhập</h2>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
