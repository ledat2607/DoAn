import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineMessage,
} from "react-icons/ai";
const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();
  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };
  const handleMessageSubmit = () => {
    console.log(`check`);
  };
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[75%] `}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data?.image_Url[select].url}
                  alt="img-select"
                  className="w-[80%]"
                />
                <div className="w-full 800px:w-[50%]">
                  <div className="w-full flex">
                    <div
                      className={`${
                        select === 0 ? "border border-blue-500" : null
                      } cursor-pointer`}
                    >
                      <img
                        src={data?.image_Url[0].url}
                        alt="product-img"
                        className="h-[180px]"
                        onClick={() => setSelect(0)}
                      />
                    </div>
                    <div
                      className={`${
                        select === 1 ? "border border-blue-500" : null
                      } cursor-pointer ml-2`}
                    >
                      <img
                        src={data?.image_Url[0].url}
                        alt="product-img"
                        className="h-[180px]"
                        onClick={() => setSelect(1)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[full] 800px:w-[50%] mt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p className="mt-3">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice} mt-2`}>
                    {data.discount_price}
                  </h4>
                  <h3 className={`${styles.price} mt-2 ml-3`}>
                    {data.price ? data.price : null}
                  </h3>
                </div>
                <div
                  className={`${styles.noramlFlex} mt-12 justify-between pr-3`}
                >
                  <div>
                    <div className="h-8 mt-12">
                      <div className="flex">
                        <div
                          className=" h-10 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                          onClick={decrementCount}
                        >
                          <AiOutlineMinus size={20} className="mt-1" />
                        </div>
                        <div className="items-center font-extrabold text-md justify-center flex h-10 w-[40px] bg-gray-400 relative">
                          {count}
                        </div>
                        <div
                          className="h-10 bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-r-lg px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                          onClick={incrementCount}
                        >
                          <AiOutlinePlus size={20} className="mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.button} w-[270px] h-[40px] mt-6 rounded flex items-center`}
                >
                  <span className="flex items-center">
                    Thêm vào giỏ hàng <AiOutlineShoppingCart className="ml-2" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt="shop-avt-detail"
                    className="w-[50px] h-[50px] rounded-full ml-2"
                  />
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} ml-3`}>
                      {data.shop.name}
                    </h3>
                    <h5 className="pb-3 text-[15px] ml-3">
                      {data.shop.ratings}
                    </h5>
                  </div>
                  <div
                    className={`${styles.button} w-[170px] h-[40px] mt-4 rounded-lg`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="flex items-center">
                      Trò chuyện <AiOutlineMessage className="ml-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailsInfo data={data} />
          <br />
        </div>
      ) : null}
    </div>
  );
};
const ProductDetailsInfo = ({ data }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded h-[40vh]">
      <div className="w-full flex justify-between border-b pt-10 pb-2">
        <div className="relative">
          <h5
            onClick={() => setActive(1)}
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
          >
            Chi tiết sản phẩm
          </h5>
          {active === 1 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            onClick={() => setActive(2)}
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
          >
            Đánh giá
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
        <div className="relative">
          <h5
            onClick={() => setActive(3)}
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
          >
            Thông tin cửa hàng
          </h5>
          {active === 3 ? (
            <div className={`${styles.active_indicator}`}></div>
          ) : null}
        </div>
      </div>
      {active === 1 ? (
        <>
          <p className="py-2 text-[18px] leading-8 pb-10 whitespace-pre-line">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Autem
            maiores suscipit deserunt ut at molestias perspiciatis voluptatem.
            Consectetur earum mollitia quaerat, harum saepe ut. Doloremque,
            minus. Quis est pariatur vitae?
          </p>
        </>
      ) : null}
      {active === 2 ? (
        <>
          <div className="w-full justify-center min-h-[40vh] flex items-center">
            <p>Chưa có đánh giá nào</p>
          </div>
        </>
      ) : null}
      {active === 3 ? (
        <div className="w-full block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                alt="de"
                className="w-[50px] h-[50px] rounded-full"
              />
              <div className="pr-8">
                <h3 className={`${styles.shop_name} ml-3`}>{data.shop.name}</h3>
                <h5 className="pb-3 text-[15px] ml-3">{data.shop.ratings}</h5>
              </div>
            </div>
            <p className="pt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
              quos iste. Dolores, eveniet provident magni repudiandae id eius
              natus rerum dicta, saepe modi pariatur perferendis delectus
              aperiam tenetur dignissimos assumenda.
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 flex items-end flex-col">
            <div className="text-left">
              <h5 className="font-[600]">
                Đăng ký: <span>20/10/2023</span>
              </h5>
              <h5 className="font-[600]">
                Tổng sản phẩm: <span>12</span>
              </h5>
              <h5 className="font-[600]">
                Tổng lượt thích: <span>12456</span>
              </h5>
              <Link to="/">
                <div
                  className={`${styles.button} w-[150px] h-[40px] mt-6 rounded-md`}
                >
                  <h4>Ghé shop</h4>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default ProductDetails;
