import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from "../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../server";
import { toast } from "react-toastify";
const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [visibleConfirm, setvisibleConfirm] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    const config = { headers: { "Content-Type": "multipath/form-data" } };
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("confirm", confirm);
    axios
      .post(`${server}/user/new-user`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleChangeImageInput = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center py-12 sm:px-6 lg-px-8">
      <div className="sm:w-full sm:mx-auto sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng nhập
        </h2>
      </div>
      <div className="sm:w-full sm:mx-auto sm:max-w-md mt-8">
        <div className="bg-gray-50  py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-md font-medium text-gray-700"
              >
                Họ và tên
              </label>
              <div className="mt-3">
                <input
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="Vui lòng nhập họ và tên..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 sm:text-sm"
                />
              </div>
            </div>
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
            <div>
              <label
                htmlFor="confirm"
                className="block text-md font-medium text-gray-700"
              >
                Xác nhận mật khẩu
              </label>
              <div className="mt-3 relative">
                <input
                  type={visibleConfirm ? "text" : "password"}
                  required
                  placeholder="Vui lòng nhập mật khẩu..."
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 sm:text-sm"
                />
                {visibleConfirm ? (
                  <AiOutlineEye
                    className="absolute cursor-pointer right-2 top-2"
                    size={25}
                    onClick={() => setvisibleConfirm(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute cursor-pointer right-2 top-2"
                    size={25}
                    onClick={() => setvisibleConfirm(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="avatar"
                className="block text-md font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block overflow-hidden h-10 w-10 rounded-full">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      className="h-full w-full object-cover rounded-full"
                      alt="img-avatar"
                    />
                  ) : (
                    <RxAvatar className="h-10 w-10 rounded-full" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="flex items-center justify-center ml-5 bg-white px-4 py-2 border border-gray-300 text-md rounded-md shadow-lg font-medium text-gray-800 hover:bg-gray-200"
                >
                  <span>Chọn hình ảnh</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept=".jpg,.jpeg,.png"
                    className="sr-only"
                    onChange={handleChangeImageInput}
                  />
                </label>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-[50%] m-auto h-[40px] flex items-center justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700"
              >
                Đăng ký
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4>Bạn đã có tài khoản ?</h4>
              <Link
                to="/login"
                className="pl-2 cursor-pointer text-blue-400 hover:text-blue-900 font-medium"
              >
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
