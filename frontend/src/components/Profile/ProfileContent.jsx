import React, { useState } from "react";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import {
  AiOutlineCamera,
  AiOutlineArrowRight,
  AiOutlineDelete,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { MdOutlineTrackChanges } from "react-icons/md";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
const ProfileContent = ({ active }) => {
  const { user } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user?.name);
  const [email, setEmail] = useState(user && user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user?.phoneNumber);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`first`);
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
                <AiOutlineCamera />
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
const Addresses = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const handleClick = () => {
    setPopupVisible(!isPopupVisible);
  };
  return (
    <div className="w-full px-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[25px] font-[600] text-[#000000ba] uppercase font-Poppins">
          Địa chỉ giao hàng
        </h1>
        <div
          className={`${styles.button} w-[150px] h-[40px] rounded-md text-[18px] shadow-lg bg-gray-300 `}
        >
          Thêm mới
        </div>
      </div>
      <div className="mt-5 w-full bg-white h-[70px] rounded-[5px] flex items-center px-3 shadow-lg justify-between pr-10">
        <div className="flex item-center">
          <h5 className="pl-5 font-[600] text-[18px] mt-2">Mặc định</h5>
        </div>
        <div className="pl-8 flex items-center">
          <h6 className="font-[600] text-[20px]">
            Tân Thành 24, Huyện Bắc Tân Uyên, Tỉnh Bình Dương
          </h6>
        </div>
        <div className="pl-6 flex items-center font-[400] text-[18px]">0966872138</div>
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
export default ProfileContent;
