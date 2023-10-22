import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { MdLocationOn } from "react-icons/md";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [shopName, setShopName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [address, setAddress] = useState("");
  const [description, setDescriptions] = useState("");
  const [visible, setVisible] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [visibleConfirm, setvisibleConfirm] = useState(false);
  const handleDescriptionChange = (e) => {
    const inputValue = e.target.value;

    if (inputValue.length <= 100) {
      setDescriptions(inputValue);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    const config = { headers: { "Content-Type": "multipath/form-data" } };
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("shopName", shopName);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("phoneNumber", phoneNumber);
    newForm.append("address", address);
    newForm.append("description", description);
    newForm.append("confirm", confirm);
    axios
      .post(`${server}/shop/create-shop`, newForm, config)
      .then((res) => {
        toast.success(res.data.message);
        //navigate("/login");
        setName("");
        setShopName("");
        setDescriptions("");
        setAddress("");
        setPassword("");
        setPhoneNumber("");
        setConfirm("");
        setEmail("");
        setAvatar("");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await axios.get(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c38ddf8d8f8c4b3baf04420f39148790`
            );

            if (response.data.results.length > 0) {
              const locationInfo = response.data.results[0].components;
              const location = `${locationInfo.state}`;
              setAddress(location);
            } else {
              setAddress("Không thể tìm thấy vị trí");
            }
          } catch (error) {
            console.error("Lỗi truy vấn vị trí:", error);
          }
        },
        (error) => {
          console.error("Lỗi truy cập vị trí:", error);
        }
      );
    } else {
      alert("Trình duyệt không hỗ trợ truy cập vị trí.");
    }
  };
  const handleChangeImageInput = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };
  const [locationInfo, setLocationInfo] = useState(null);

  useEffect(() => {
    if (locationInfo) {
      setAddress(
        `${locationInfo.suburb}, ${locationInfo.city}, ${locationInfo.state}`
      );
    } else {
      setAddress("");
    }
  }, [locationInfo]);
  return (
    <div className="min-h-screen bg-gray-300 flex flex-col justify-center py-12 sm:px-6 lg-px-8">
      <div className="sm:w-full sm:mx-auto sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Đăng ký tài khoản bán hàng
        </h2>
      </div>
      <div className="800px:w-full w-[90%] mx-auto sm:max-w-md mt-8">
        <div className="bg-gray-50  py-8 px-4 shadow rounded-lg sm:px-10">
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
                htmlFor="shopName"
                className="block text-md font-medium text-gray-700"
              >
                Tên cửa hàng
              </label>
              <div className="mt-3">
                <input
                  type="text"
                  autoComplete="shopName"
                  required
                  placeholder="Vui lòng nhập tên cửa hàng..."
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
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
                htmlFor="description"
                className="block text-md font-medium text-gray-700"
              >
                Mô tả
              </label>
              <div className="mt-3 relative">
                <textarea
                  type="text"
                  required
                  placeholder="Vui lòng viết một vài miêu tả về cửa hàng..."
                  value={description}
                  onChange={handleDescriptionChange}
                  className="overflow-hidden h-[15vh] appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 sm:text-sm"
                />
                <p className="text-sm text-gray-500 mt-2 absolute bottom-0 left-2">
                  {description.length} / 100.
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-md font-medium text-gray-700"
              >
                Số điện thoại
              </label>
              <div className="mt-3">
                <input
                  type="number"
                  autoComplete="phoneNumber"
                  required
                  placeholder="Vui lòng nhập số điện thoại cửa hàng..."
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-md font-medium text-gray-700"
              >
                Địa chỉ cửa hàng
              </label>
              <div className="mt-3 flex items-center">
                <input
                  type="text"
                  autoComplete="address"
                  required
                  placeholder="Vui lòng nhập địa chỉ cửa hàng..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="appearance-none block w-[90%] px-3 py-2 border border-gray-300 rounded-md placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:ring-2 sm:text-sm"
                />
                <MdLocationOn
                  size={30}
                  className="hover:scale-[1.1] hover:text-blue-500 cursor-pointer"
                  onClick={handleGetLocation}
                />
              </div>
              {locationInfo && (
                <div className="text-gray-400 mt-2">
                  {`${locationInfo.suburb}, ${locationInfo.city}, ${locationInfo.state}`}
                </div>
              )}
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

export default ShopCreatePage;
