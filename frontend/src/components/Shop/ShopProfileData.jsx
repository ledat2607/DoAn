import React, { useEffect, useState } from "react";
import { productData } from "../../static/data.js";
import ProductCart from "../../components/Route/ProductCard/ProductCard";
import { Link, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch } from "react-redux";
import axios from "axios";
import { server } from "../../server.js";
const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`${server}/product/get-all-products-of-shop/${id}`)
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);
  console.log(data);
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex ">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-[600] text-[25px] ${
                active === 1 ? "text-red-500" : "#333"
              } cursor-pointer pr-[30px]`}
            >
              Sản phẩm
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(2)}>
            <h5
              className={`font-[600] text-[25px] ${
                active === 2 ? "text-red-500" : "#333"
              } cursor-pointer pr-[30px]`}
            >
              Sự kiện đang diễn ra
            </h5>
          </div>
          <div className="flex items-center" onClick={() => setActive(3)}>
            <h5
              className={`font-[600] text-[25px] ${
                active === 3 ? "text-red-500" : "#333"
              } cursor-pointer pr-[30px]`}
            >
              Đánh giá
            </h5>
          </div>
        </div>
        {isOwner && (
          <div>
            <Link to="/dashboard">
              <div
                className={`${styles.button} w-[250px] h-[50px] font-[600] text-md font-Roboto`}
              >
                Truy cập trang quản lý
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border">
        {data &&
          data.map((i, index) => (
            <ProductCart data={i} key={index} isShop={true} />
          ))}
      </div>
    </div>
  );
};

export default ShopProfileData;
