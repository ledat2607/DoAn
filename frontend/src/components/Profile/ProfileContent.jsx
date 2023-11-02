import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { MdOutlineTrackChanges } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import {
  deleteUserAddress,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import axios from "axios";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
const ProfileContent = ({ active }) => {
  const dispatch = useDispatch();
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user?.name);
  const [email, setEmail] = useState(user && user?.email);
  const [avatar, setAvatar] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(
    user && "0" + user?.phoneNumber
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage.successMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [error, successMessage]);

  //update information
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserInformation(name, email, phoneNumber));
  };

  //change image
  const handleImage = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setAvatar(file);
    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    await axios
      .put(`${server}/user/update-avatar`, formData, { withCredentials: true })
      .then((res) => {
        window.location.reload();
        toast.success("Cập nhật ảnh đại diện thành công !");
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <div className="w-full">
      {/*profile page */}
      {active === 1 && (
        <div className="800px:flex 800px:justify-between">
          <div className="flex justify-center w-full 800px:w-[50%]">
            <div className="relative">
              <img
                src={`${backend_url}${user?.avatar}`}
                className="h-[150px] w-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                alt="img-profile-avt"
              />
              <div className="800px:top-[40%] w-[30px] h-[30px] rounded-full bg-[#e3e9ee] flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <AiOutlineCamera className="cursor-pointer" />
                </label>
              </div>
            </div>
          </div>
          <div className="w-full px-5 800px:mt-10 mt-2">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex pb-3">
                <div className="800px:w-[50%]">
                  <label className="block pb-2">Họ và tên</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="800px:w-[50%]">
                  <label className="block pb-2">Địa chỉ email</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Số điện thoại</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%]`}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              <input
                type="submit"
                value={"Cập nhật"}
                required
                className={`w-[200px] h-[40px] border border-[#3a24db] text-center rounded-lg mt-8 cursor-pointer`}
              />
            </form>
          </div>
        </div>
      )}
      {/*order page */}
      {active === 2 && (
        <div>
          <AllOrder />
        </div>
      )}
      {/*refund page */}
      {active === 3 && (
        <div>
          <AllRefund />
        </div>
      )}
      {/*track order */}
      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}
      {/*payment method */}
      {active === 6 && (
        <div>
          <PaymentMethod />
        </div>
      )}
      {/*Addresses */}
      {active === 7 && (
        <div>
          <Addresses />
        </div>
      )}
      {active === 8 && (
        <div>
          <ChangePassword />
        </div>
      )}
    </div>
  );
};
const AllOrder = () => {
  const orders = [
    {
      _id: "189298A61267hbnzxb",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 24990000,
      orderStatus: "Delived",
    },
  ];
  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 250, flex: 0.7 },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      minWidth: 250,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng tiền",
      type: "number",
      minWidth: 170,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/user/order/${params.id}`}
              className="relative inline-block"
            >
              <span className="inline-block transition-transform duration-500 text-md hover:translate-x-2 hover:text-blue-500 hover:opacity-70">
                Xem chi tiết
              </span>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        productName: item.orderItems[0].name,
        itemsQty: item.orderItems.length,
        total: item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
const AllRefund = () => {
  const orders = [
    {
      _id: "189298A61267hbnzxb",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 24990000,
      orderStatus: "Delived",
    },
  ];
  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 250, flex: 0.7 },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      minWidth: 250,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng tiền",
      type: "number",
      minWidth: 170,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/user/order/${params.id}`}
              className="relative inline-block"
            >
              <span className="hover:scale-[1.1] inline-block transition-transform duration-500 text-md  hover:text-green-500 hover:opacity-70">
                Xem chi tiết
              </span>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        productName: item.orderItems[0].name,
        itemsQty: item.orderItems.length,
        total: item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
const TrackOrder = () => {
  const orders = [
    {
      _id: "189298A61267hbnzxb",
      orderItems: [
        {
          name: "Iphone 14 pro max",
        },
      ],
      totalPrice: 24990000,
      orderStatus: "Delived",
    },
  ];
  const columns = [
    { field: "id", headerName: "Mã đơn hàng", minWidth: 250, flex: 0.7 },
    {
      field: "productName",
      headerName: "Tên sản phẩm",
      minWidth: 250,
      flex: 0.7,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng",
      type: "number",
      minWidth: 150,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Tổng tiền",
      type: "number",
      minWidth: 170,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={`/user/order/${params.id}`}
              className="relative inline-block"
            >
              <MdOutlineTrackChanges
                size={30}
                className="hover:scale-[1.1] hover:text-green-500"
              />
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];
  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        productName: item.orderItems[0].name,
        itemsQty: item.orderItems.length,
        total: item.totalPrice,
        status: item.orderStatus,
      });
    });
  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};
const PaymentMethod = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleClick = () => {
    setPopupVisible(!isPopupVisible);
  };
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] uppercase font-Poppins">
          Phương thức thanh toán
        </h1>
        <div
          className={`${styles.button} w-[150px] h-[40px] rounded-md text-[18px] shadow-lg bg-gray-300 `}
        >
          Thêm mới
        </div>
      </div>
      <div className="mt-5 w-full bg-white h-[70px] rounded-[5px] flex items-center px-3 shadow-lg justify-between pr-10">
        <div className="flex item-center">
          <img
            src="https://pngimg.com/uploads/visa/visa_PNG4.png"
            alt="visa-payment"
            className="w-[100px]"
          />
          <h5 className="pl-5 font-[600] text-[18px] mt-2">Lê Lưu Quốc Đạt</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6 className="font-[800] text-[20px]">1234 **** *** ****</h6>
          <h5 className="pl-6 font-[600]">10/2023</h5>
        </div>
        <div className="min-w-[10%] flex items-center justify-between pl-8">
          <AiOutlineDelete
            size={25}
            className="cursor-pointer hover:scale-[1.1] hover:text-red-500"
            onClick={handleClick}
          />
        </div>
        {isPopupVisible && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg ">
              <p>Bạn có chắc chắn muốn xóa dữ liệu này không?</p>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded mt-[10%]"
                onClick={handleClick}
              >
                Xác nhận
              </button>
              <button
                className="bg-gray-300 px-2 py-1 rounded ml-5"
                onClick={() => setPopupVisible(!isPopupVisible)}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
//Change password
const ChangePassword = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleClick = () => {
    setPopupVisible(!isPopupVisible);
  };
  const passwordChangeHandler = async () => {};
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] uppercase font-Poppins">
          Thay đổi mật khẩu
        </h1>
      </div>
      <div className="w-full ">
        <form aria-required onSubmit={passwordChangeHandler}>
          <div className="w-[60%] block mx-auto p-2">
            <label className="block p-2">Mật khẩu cũ</label>
            <input
              type="text"
              className="w-[95%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
              placeholder="Nhập mật khẩu cũ của bạn..."
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[60%] block mx-auto p-2">
            <label className="block p-2">Mật khẩu mới</label>
            <input
              type="text"
              className="w-[95%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
              placeholder="Nhập mật khẩu mới của bạn..."
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div></div>
          <div className="w-[60%] block mx-auto p-2">
            <label className="block p-2">Xác nhận mật khẩu mới</label>
            <input
              type="text"
              className="w-[95%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
              placeholder="Xác nhận mật khẩu mới của bạn..."
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            className={`${styles.button} w-[100px] h-[40px] mx-auto`}
            value="Xác nhận"
          />
        </form>
      </div>
    </div>
  );
};
const Addresses = () => {
  const { user } = useSelector((state) => state.user);
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [town, setTown] = useState("");
  const [street, setStreet] = useState("");
  const [addressType, setAddressType] = useState("");
  const dispatch = useDispatch();
  const addressTypeData = [
    { name: "Mặc định" },
    { name: "Nhà riêng" },
    { name: "Mặc định" },
    { name: "Khác" },
  ];
  //hàm thêm địa chỉ
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addressType === "" || country === "" || city === "") {
      toast.error("Vui lòng điền đầy đủ thông tin !");
    } else {
      //Cập nhật
      dispatch(updatUserAddress(country, city, town, street, addressType));
      setPopupVisible(false);
      setCountry("");
      setCity("");
      setTown("");
      setStreet("");
    }
  };
  const handleClick = () => {
    setPopupVisible(!isPopupVisible);
  };
  const handleDelete = (item) => {
    dispatch(deleteUserAddress(item._id));
  };
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] uppercase font-Poppins">
          Địa chỉ giao hàng
        </h1>
        <div
          className={`${styles.button} w-[150px] h-[40px] rounded-md text-[18px] shadow-lg bg-gray-300 `}
          onClick={handleClick}
        >
          Thêm mới
        </div>
      </div>
      {user &&
        user?.addresses.map((item, index) => (
          <div className="mt-5 w-full bg-white h-[70px] rounded-[5px] flex items-center px-3 shadow-lg justify-between pr-10">
            <div className="flex item-center" key={index}>
              <h5 className="pl-5 font-[600] text-[18px] mt-2">
                {item?.addressType}
              </h5>
            </div>
            <div className="pl-8 flex items-center">
              <h6 className="font-[600] text-[20px]">
                {item.street} - {item.town} - {item.country}
              </h6>
            </div>
            <div className="pl-6 flex items-center font-[400] text-[18px]">
              0{user?.phoneNumber}
            </div>
            <div className="min-w-[10%] flex items-center justify-between pl-8">
              <AiOutlineDelete
                size={25}
                className="cursor-pointer hover:scale-[1.1] hover:text-red-500"
                onClick={() => setIsOpen(true)}
              />
              {isOpen && (
                <div
                  key={index}
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20000]"
                >
                  <div className="bg-white p-4 rounded-lg">
                    <p>Bạn có chắc chắn muốn xóa dữ liệu này không?</p>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded mt-[10%]"
                      onClick={() => handleDelete(item)}
                    >
                      Xác nhận
                    </button>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded ml-5"
                      onClick={() => setIsOpen(false)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      {user && user.addresses.length === 0 && (
        <h5 className="text-center font-Roboto font-[300] text-[25px]">
          Bạn chưa thêm địa chỉ nào !
        </h5>
      )}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-[45%] h-[90vh] bg-white p-4 rounded-lg ">
            <div className="w-full flex justify-end p-1">
              <RxCross1
                className="cursor-pointer"
                size={20}
                onClick={handleClick}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Thêm mới địa chỉ nhận hàng
            </h1>
            <div className="w-full">
              <form aria-required onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-2">
                  <label className="block p-2">Quốc gia</label>
                  <select
                    name=""
                    id=""
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-[95%] border h-[40px] rounded-[5px]"
                  >
                    <option value="" className="block border pb-2">
                      Chọn quốc gia
                    </option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option
                          className="block pb-2"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="w-full block p-2">
                  <label className="block p-2">Tỉnh/Thành phố</label>
                  <select
                    name=""
                    id=""
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-[95%] border h-[40px] rounded-[5px]"
                  >
                    <option value="" className="block border pb-2">
                      Chọn Tỉnh/Thành phố
                    </option>
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <option
                          className="block pb-2"
                          key={item.isoCode}
                          value={item.isoCode}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="w-full block p-2">
                  <label className="block p-2">Quận/Huyện</label>
                  <input
                    type="text"
                    className="w-[95%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
                    placeholder="Nhập Quận/Huyện của bạn..."
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                  />
                </div>
                <div className="w-full block p-2">
                  <label className="block p-2">Số nhà/Tên đường</label>
                  <input
                    type="text"
                    className="w-[95%] p-2 h-[40px] border ring-1 rounded-lg focus:ring-blue-500 focus:border-gray-400"
                    placeholder="Nhập Số nhà,Tên đường,..."
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
                <div className="w-full block p-2">
                  <label className="block p-2">Số nhà/Tên đường</label>
                  <select
                    name=""
                    id=""
                    value={addressType}
                    onChange={(e) => setAddressType(e.target.value)}
                    className="w-[95%] border h-[40px] rounded-[5px]"
                  >
                    <option value="" className="block border pb-2">
                      Chọn hình thức
                    </option>
                    {addressTypeData &&
                      addressTypeData.map((item) => (
                        <option
                          className="block pb-2"
                          key={item.name}
                          value={item.name}
                        >
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="w-full flex justify-center pb-2">
                  <input
                    type="submit"
                    className={`${styles.button} w-[100px] h-[40px] mt-5 cursor-pointer`}
                    required
                    value={"Xác nhận"}
                    readOnly
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProfileContent;
