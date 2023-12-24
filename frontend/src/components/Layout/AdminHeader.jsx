import React, { useEffect } from "react";
import { AiOutlineGift } from "react-icons/ai";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { backend_url } from "../../server";
import { loadAdmin } from "../../redux/actions/admin";

const AdminHeader = () => {
  const dispatch = useDispatch();
  const { admins } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(loadAdmin());
  }, [dispatch]);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/">
          <img src="../img/logo.png" alt="" className="w-[150px]"/>
        </Link>
      </div>
      <div className="flex items-center">
        {admins.map((i, index) => (
          <img
            src={`${backend_url}${i.avatar}`}
            alt=""
            className="w-[50px] h-[50px] rounded-full object-cover"
          />
        ))}
      </div>
    </div>
  );
};

export default AdminHeader;
