import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsFacebook, BsInstagram, BsTwitter, BsGoogle } from "react-icons/bs";
import styles from "../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/user/login-user`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Đăng nhập thành công");
        setTimeout(() => {
          navigate("/");
          window.location.reload(true);
        }, 1500);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center py-12 sm:px-6 lg-px-8">
      <div className="sm:w-full sm:mx-auto sm:max-w-md  w-[95%]  mx-auto ">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng nhập
        </h2>
      </div>
      <div className="800px:w-full w-[90%] mx-auto sm:max-w-md mt-8 ">
        <div className="bg-gray-50  py-8 px-4 shadow-lg rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-md font-medium text-gray-700"
              >
                Địa chỉ email
              </label>
              <div className="mt-3">
                <input
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Vui lòng nhập địa chỉ email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-md font-medium text-gray-700"
              >
                Mật khẩu
              </label>
              <div className="mt-3 relative">
                <input
                  type={visible ? "text" : "password"}
                  autoComplete="email"
                  required
                  placeholder="Vui lòng nhập mật khẩu..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 sm:text-sm"
                />
                {visible ? (
                  <AiOutlineEye
                    className="absolute cursor-pointer right-2 top-2"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute cursor-pointer right-2 top-2"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-400 focus:ring-1 border-gray-300 rounded focus:ring-blue-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900 cursor-pointer"
                >
                  Ghi nhớ
                </label>
              </div>
              <div className="text-md">
                <Link
                  to="/forgot-password"
                  className="font-medium text-gray-600 hover:text-red-500"
                >
                  Quên mật khẩu
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-[50%] m-auto h-[40px] flex items-center justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
              >
                Đăng nhập
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Bạn chưa có tài khoản ?</h4>
              <Link
                to="/sign-up"
                className="pl-2 cursor-pointer text-blue-400 hover:text-blue-900 font-medium"
              >
                Đăng ký
              </Link>
            </div>
            <span className="flex items-center justify-center">Hoặc</span>
            <div className="flex mx-auto  justify-between w-[50%]">
              <BsGoogle
                className="cursor-pointer text-gray-600 hover:text-red-500"
                size={25}
              />
              <BsFacebook
                className="cursor-pointer text-gray-600 hover:text-blue-500"
                size={25}
              />
              <BsInstagram
                className="cursor-pointer text-gray-600 hover:text-pink-700"
                size={25}
              />
              <BsTwitter
                className="cursor-pointer text-gray-600 hover:text-blue-800"
                size={25}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
