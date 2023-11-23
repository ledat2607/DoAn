import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/styles";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { getAllProductsShop } from "../../redux/actions/product";
const ShopInfo = ({ isOwner }) => {
  const { products } = useSelector((state) => state.products);
  const [data, setData] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);

  const handleAvatarClick = () => {
    setShowPopup(!showPopup);
  };

  useEffect(() => {
    dispatch(getAllProductsShop(id));
    axios
      .get(`${server}/shop/get-shop-info/${id}`)
      .then((res) => {
        setData(res.data.shop);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = async () => {
    axios.get(`${server}/shop/logout`, { withCredentials: true });
    window.location.reload(true);
  };
  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );
  const avg = totalRatings / totalReviewsLength || 0;

  return (
    <>
      <div className="w-full py-5 800px:w-[100%]">
        <div className="w-full flex items-center justify-center">
          <img
            src={`${backend_url}${data?.avatar?.url}`}
            onClick={handleAvatarClick}
            alt="shopInfor"
            className="800px:w-[150px] 800px:h-[150px] w-[60px] h-[60px] rounded-full object-cover hover:scale-[1.1]  border-blue-500 border-2 cursor-pointer"
          />
        </div>
        <div className="hidden 800px:block">
          <h2 className="text-center py-2 text-[20px]">{data?.shopName}</h2>
          <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>
          <h4 className="text-[16px] text-[#000000ba] p-[10px] text-center">
            {data?.description}
          </h4>

          <div className="p-3">
            <h5 className="font-[600]">Địa chỉ</h5>
            <h4 className="text-[#000000ba]">{data?.address}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Số điện thoại</h5>
            <h4 className="text-[#000000ba]">0{data?.phoneNumber}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Tổng số sản phẩm</h5>
            <h4 className="text-[#000000ba]">{products && products.length}</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Đánh giá</h5>
            <h4 className="text-[#000000ba]">{parseFloat(avg.toFixed(1))}/5</h4>
          </div>
          <div className="p-3">
            <h5 className="font-[600]">Ngày mở shop</h5>
            <h4 className="text-[#000000ba]">
              {data?.createdAt?.slice(0, 10)}
            </h4>
          </div>
        </div>
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded shadow-md max-w-md">
              <div className="w-full flex items-center justify-center">
                <img
                  src={`${backend_url}${data?.avatar?.url}`}
                  onClick={handleAvatarClick}
                  alt="shopInfor"
                  className="800px:w-[150px] 800px:h-[150px] w-[60px] h-[60px] rounded-full object-cover hover:scale-[1.1]  border-blue-500 border-2 cursor-pointer"
                />
              </div>
              <h2 className="text-center py-2 text-[20px]">{data?.shopName}</h2>
              <h3 className="text-center py-2 text-[20px]">{data?.name}</h3>
              <h4 className="text-[16px] text-[#000000ba] p-[10px] text-center">
                {data?.description}
              </h4>

              <div className="p-3">
                <h5 className="font-[600]">Địa chỉ</h5>
                <h4 className="text-[#000000ba]">{data?.address}</h4>
              </div>
              <div className="p-3">
                <h5 className="font-[600]">Số điện thoại</h5>
                <h4 className="text-[#000000ba]">0{data?.phoneNumber}</h4>
              </div>
              <div className="p-3">
                <h5 className="font-[600]">Tổng số sản phẩm</h5>
                <h4 className="text-[#000000ba]">
                  {products && products.length}
                </h4>
              </div>
              <div className="p-3">
                <h5 className="font-[600]">Đánh giá</h5>
                <h4 className="text-[#000000ba]">{avg}/5</h4>
              </div>
              <div className="p-3">
                <h5 className="font-[600]">Ngày mở shop</h5>
                <h4 className="text-[#000000ba]">
                  {data?.createdAt?.slice(0, 10)}
                </h4>
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => setShowPopup(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        )}
        {isOwner && (
          <div className="py-3 px-4 flex items-center justify-center">
            <div
              className={`${styles.button} mx-auto w-[120px] h-[40px] !rounded-[10px]`}
            >
              <Link to="/settings">
                <span className="font-Roboto text-[18px]">Chỉnh sửa</span>
              </Link>
            </div>
            <div
              className={`${styles.button} mx-auto w-[120px] h-[40px] !rounded-[10px]`}
              onClick={handleLogout}
            >
              <span className="font-Roboto text-[18px]">Thoát</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ShopInfo;
