import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllSellers } from "../../redux/actions/selles";
import { Link, useParams } from "react-router-dom";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";
import { loadAdmin } from "../../redux/actions/admin";
const AllSellers = () => {
  const dispatch = useDispatch();
  const { sellers } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const { admins } = useSelector((state) => state.admin);
  const [data, setData] = useState(admins && admins);
  const [dataSeller, setDataSeller] = useState(sellers && sellers);
  useEffect(() => {
    dispatch(getAllSellers());
    dispatch(loadAdmin());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios
      .delete(`${server}/shop/delete-seller/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });

    dispatch(getAllSellers());
  };
  const handleActive = async (sellerId) => {
    await axios
      .post(`${server}/shop/update-status/${sellerId}`)
      .then((res) => toast.success(res.data.message));

    dispatch(getAllSellers());
  };
  const columns = [
    { field: "id", headerName: "Seller ID", minWidth: 150, flex: 0.7 },

    {
      field: "name",
      headerName: "name",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },
    {
      field: "address",
      headerName: "Seller Address",
      type: "text",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "joinedAt",
      headerName: "joinedAt",
      type: "text",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: "  ",
      flex: 0.7,
      minWidth: 100,
      headerName: "Preview Shop",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/shop/preview/${params.id}`}>
              <Button>
                <AiOutlineEye size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
    {
      field: "status",
      flex: 0.7,
      minWidth: 120,
      headerName: "Trạng thái",
      renderCell: (params) => {
        let statusIcon;
        switch (params.value) {
          case "Đã duyệt":
            statusIcon = (
              <span className="flex justify-center items-center">
                {/* Biểu tượng cho trạng thái Active */}
                {params.value}
                <IoCheckmarkDoneSharp
                  color="green"
                  className="cursor-pointer ml-4"
                  size={20}
                />
              </span>
            );
            break;
          case "Chờ duyệt":
            statusIcon = (
              <span className="flex text-red-500 justify-center items-center">
                {/* Biểu tượng cho trạng thái Inactive */}
                {params.value}
                <MdErrorOutline
                  color="red"
                  className="ml-4 cursor-pointer"
                  size={20}
                  onClick={() => handleActive(params.id)}
                />
              </span>
            );
            break;

          default:
            statusIcon = <span>{params.value}</span>;
        }
        return statusIcon;
      },
    },
    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "Delete Seller",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => setUserId(params.id) || setOpen(true)}>
              <AiOutlineDelete size={20} />
            </Button>
          </>
        );
      },
    },
  ];

  const row = [];
  sellers &&
    sellers.forEach((item) => {
      row.push({
        id: item._id,
        name: item?.name,
        email: item?.email,
        status: item?.activeAccount,
        joinedAt: item?.createdAt.slice(0, 10),
        address: item?.address,
      });
    });
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
        {open && (
          <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
              <div className="w-full flex justify-end cursor-pointer">
                <RxCross1 size={25} onClick={() => setOpen(false)} />
              </div>
              <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                Bạn có chắc sẽ xóa người dùng và tất cả thông tin người dùng ?
              </h3>
              <div className="w-full flex items-center justify-center">
                <div
                  className={`${styles.button} w-[150px] !bg-slate-300 hover:!bg-slate-500 text-white text-[18px] !h-[42px] ml-4`}
                  onClick={() => setOpen(false) || handleDelete(userId)}
                >
                  Xác nhận
                </div>
                <div
                  className={`${styles.button} w-[100px] !bg-slate-300 hover:!bg-slate-500 text-white text-[18px] !h-[42px] mr-4`}
                  onClick={() => setOpen(false)}
                >
                  Đóng
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllSellers;
