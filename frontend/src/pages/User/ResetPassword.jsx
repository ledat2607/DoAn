import React, { useState } from "react";
import { backend_url, server } from "../../server";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibleNew, setVisibleNew] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const PasswordStrengthBar = ({ password }) => {
    // Hàm kiểm tra mật khẩu và cập nhật màu sắc
    const checkPassword = (password) => {
      const conditions = [
        /[a-z]/, // Chữ thường
        /[A-Z]/, // Chữ hoa
        /\d/, // Số
        /[!@#$%^&*.,]/, // Ký tự đặc biệt
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,]).{6,}/, // Độ dài ít nhất 6 ký tự và các yêu cầu khác
      ];

      const strength = conditions.reduce((count, condition) => {
        return count + (condition.test(password) ? 1 : 0);
      }, 0);

      return strength;
    };

    const passwordStrength = checkPassword(password);

    const colors = [
      "bg-green-100",
      "bg-green-200",
      "bg-green-300",
      "bg-green-400",
      "bg-green-500",
    ];

    const strengthLabels = ["Cực yếu", "Yếu", "Trung bình", "Mạnh", "Mạnh"];

    return (
      <div className="flex w-[60%] mx-auto">
        {colors.map((color, index) => (
          <div
            key={index}
            className={`ml-2 w-[17%] h-[10px] rounded-[10px] ${
              index < passwordStrength ? colors[index] : "bg-gray-200"
            }`}
          ></div>
        ))}
      </div>
    );
  };
  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(`${server}/user/forgot-password/${storedUser.email}`, {
        newPassword,
        confirmPassword,
      })
      .then((res) => {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const storedUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="w-full h-[100vh] bg-gray-300 flex justify-center items-center">
      <div className="800px:w-[40%] w-[90%] bg-white rounded-lg shadow-2xl">
        <h1 className="text-[25px] font-Roboto font-[500] text-center uppercase mt-4">
          Xin Chào
        </h1>
        <img
          src={`${backend_url}${storedUser?.avatar}`}
          alt=""
          className="800px:w-[150px] 800px:h-[150px] w-[70px] h-[70px] rounded-full mx-auto mt-4"
        />
        <h2 className="text-center mt-2 text-blue-500 font-Poppins font-[400]">
          {storedUser?.name}
        </h2>
        <div className="w-full 800px:ml-3">
          <form aria-required onSubmit={passwordChangeHandler}>
            <div className="block p-2">
              <label className="block p-2">Mật khẩu mới</label>
              <div className="relative mt-2">
                <input
                  type={visibleNew ? "text" : "password"}
                  className="w-[95%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
                  placeholder="Nhập mật khẩu mới của bạn..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {visibleNew ? (
                  <AiOutlineEye
                    className="absolute cursor-pointer right-8 top-2"
                    size={25}
                    onClick={() => setVisibleNew(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute cursor-pointer right-8 top-2"
                    size={25}
                    onClick={() => setVisibleNew(true)}
                  />
                )}
              </div>
            </div>
            <PasswordStrengthBar password={newPassword} />
            <div className="block p-2">
              <label className="block p-2">Xác nhận mật khẩu mới</label>
              <div className="relative mt-2">
                <input
                  type={visibleConfirm ? "text" : "password"}
                  className="w-[95%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
                  placeholder="Nhập mật khẩu cũ của bạn..."
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {visibleConfirm ? (
                  <AiOutlineEye
                    className="absolute cursor-pointer right-4 top-2"
                    size={25}
                    onClick={() => setVisibleConfirm(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute cursor-pointer right-8 top-2"
                    size={25}
                    onClick={() => setVisibleConfirm(true)}
                  />
                )}
              </div>
            </div>
            <input
              type="submit"
              className={`${styles.button} w-[100px] h-[40px] mx-auto`}
              value="Xác nhận"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
