import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "../../styles/styles";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
  AiOutlineMessage,
} from "react-icons/ai";
import { backend_url } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { addToCart, getAllCartItemsUser } from "../../redux/actions/cart";
import { toast } from "react-toastify";
import Ratings from "./Ratings";
const ProductDetails = ({ data }) => {
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop?._id));
  }, [dispatch]);

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
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
  //hàm định dạng tiền tệ
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }
  const addToCartHandler = (id) => {
    const isItemExists = cartItems && cartItems.find((i) => i._id === id);
    if (isItemExists) {
      dispatch(addToCart(user?._id, data.shop?._id, data?._id, 1));
      toast.success("Thêm vào giỏ hàng thành công !");
    } else {
      if (data.stock < 1) {
        toast.error("Vượt quá số lượng sản phẩm trong kho !");
      } else {
        const cartData = { ...data, qty: count };
        dispatch(addToCart(user?._id, data.shop?._id, data?._id, count));
        toast.success("Thêm vào giỏ hàng thành công !");
      }
    }
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

  const averageRating = avg.toFixed(1);
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[75%] `}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${data?.images && data?.images[select]}`}
                  alt="img-select"
                  className="w-[400px] object-contain"
                />
                <div className="w-full 800px:w-[80%] mt-3">
                  <div className="w-full flex">
                    {data &&
                      data.images.map((i, index) => (
                        <div
                          className={`${
                            select === 0 ? "border-blue-500" : "null"
                          } cursor-pointer`}
                        >
                          <img
                            src={`${backend_url}${i}`}
                            alt="product-img"
                            className="h-[160px] flex justify-center items-center"
                            onClick={() => setSelect(index)}
                          />
                        </div>
                      ))}
                    <div
                      className={`${
                        select === 1 ? "border" : "null"
                      } cursor-pointer`}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="w-[full] 800px:w-[50%] mt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p className="mt-3">
                  {data?.description.includes("\\n")
                    ? data?.description.split("\\n").map((line, index) => (
                        <React.Fragment key={index}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))
                    : data?.description}
                </p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice} mt-2`}>
                    {formatVietnameseCurrency(data.discountPrice)}
                  </h4>
                  <h3 className={`${styles.price} mt-2 ml-3`}>
                    {data.originalPrice
                      ? formatVietnameseCurrency(data.originalPrice)
                      : null}
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
                  <span
                    className="flex items-center"
                    onClick={() => addToCartHandler(data?._id)}
                  >
                    Thêm vào giỏ hàng <AiOutlineShoppingCart className="ml-2" />
                  </span>
                </div>
                <div className="flex items-center pt-8">
                  <Link to={`/shop/preview/${data?.shop._id}`}>
                    <img
                      src={`${backend_url}${data?.shop.avatar.url}`}
                      alt="shop-avt-detail"
                      className="w-[50px] h-[50px] rounded-full ml-2"
                    />
                  </Link>
                  <div className="pr-8">
                    <h3 className={`${styles.shop_name} ml-3`}>
                      {data.shop.shopName}
                    </h3>
                    <h5 className="pb-3 text-[15px] ml-3">4.6 / 5</h5>
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
          <ProductDetailsInfo
            data={data}
            products={products}
            totalReviewsLength={totalReviewsLength}
            averageRating={averageRating}
          />
          <br />
        </div>
      ) : null}
    </div>
  );
};

const ProductDetailsInfo = ({
  data,
  products,
  totalReviewsLength,
  averageRating,
}) => {
  const [active, setActive] = useState(1);
  return (
    <div className="bg-[#f5f6fb] px-3 800px:px-10 py-2 rounded 800px:h-[60vh]">
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
            className={
              "text-[#000] text-[18px] px-1 leading-5 font-[600] cursor-pointer 800px:text-[20px]"
            }
            onClick={() => setActive(2)}
          >
            Đánh giá sản phẩm
          </h5>
          {active === 2 ? (
            <div className={`${styles.active_indicator}`} />
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
        <div className="w-full min-h-[40vh] flex flex-col items-center py-3 overflow-y-scroll">
          {data &&
            data.reviews.map((item, index) => (
              <div className="w-full flex my-2">
                <img
                  src={`${backend_url}${item?.user?.avatar}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full"
                />
                <div className="pl-2 ">
                  <div className="w-full flex items-center">
                    <h1 className="font-[500] mr-3">{item.user.name}</h1>
                    <Ratings rating={data?.ratings} />
                  </div>
                  <p>{item.comment}</p>
                  <i className="text-[12px] text-blue-700">
                    {item?.createdAt?.slice(0, 10)}
                  </i>
                </div>
              </div>
            ))}

          <div className="w-full flex justify-center">
            {data && data.reviews.length === 0 && (
              <h5>Sản phẩm chưa có đánh giá nào !</h5>
            )}
          </div>
        </div>
      ) : null}
      {active === 3 ? (
        <div className="w-full min-h-[40vh] block 800px:flex p-5">
          <div className="w-full 800px:w-[50%]">
            <div className="flex items-center">
              <Link to={`/shop/preview/${data?.shop._id}`}>
                <img
                  src={`${backend_url}${data?.shop?.avatar.url}`}
                  alt="de"
                  className="w-[50px] h-[50px] rounded-full"
                />
              </Link>
              <div className="pr-8">
                <h3 className={`${styles.shop_name} ml-3`}>
                  {data.shop.shopName}
                </h3>
                <h5 className="pb-3 text-[15px] ml-3">
                  <h5 className="pb-2 text-[15px]">({averageRating}/5.0)</h5>
                </h5>
              </div>
            </div>
            <p className="pt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius,
              quos iste. Dolores, eveniet provident magni repudiandae id eius
              natus rerum dicta, saepe modi pariatur perferendis delectus
              aperiam tenetur dignissimos assumenda.
            </p>
          </div>
          <div className="w-full 800px:w-[50%] mt-5 800px:mt-0 flex 800px:items-end flex-col">
            <div className="text-left">
              <h5 className="font-[600]">
                Đăng ký: <span>{data?.createdAt.slice(0, 10)}</span>
              </h5>
              <h5 className="font-[600]">
                Tổng sản phẩm: <span> {products && products.length}</span>
              </h5>
              <h5 className="font-[600]">
                Tổng lượt bình luận sản phẩm: <span>{totalReviewsLength}</span>
              </h5>
              <Link to={`/shop/preview/${data?.shop._id}`}>
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
