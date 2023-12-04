import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiFillSave,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../../styles/styles";
import ProductDetailsCard from "../ProductDetailsCard/ProductDetailsCard";
import { backend_url, server } from "../../../server";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart, getAllCartItemsUser } from "../../../redux/actions/cart";
import {
  addToWishlist,
  getAllWishlistItemsUser,
} from "../../../redux/actions/wishlist";
import axios from "axios";
import { BiSolidDiscount } from "react-icons/bi";
import { MdSell } from "react-icons/md";
import { loadUser } from "../../../redux/actions/user";
const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { allEvents } = useSelector((state) => state.events);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [dataEvent, setDataEvent] = useState();
  const [sortedEvents, setSortedEvents] = useState([]);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [couponCodes, setCouponCodes] = useState([]);
  const [codeFilter, setCodeFilter] = useState([]);

  useEffect(() => {
    if (allEvents) {
      const currentDate = new Date();

      // Filter events based on status is "Đang diễn ra"
      const filteredEvents = allEvents.filter(
        (event) =>
          event.status === "Đang diễn ra" &&
          new Date(event.Finish_Date) > currentDate
      );

      // Sort filteredEvents by sold_out in descending order
      filteredEvents.sort((a, b) => b.sold_out - a.sold_out);

      setSortedEvents(filteredEvents);

      // Check if the current product is discounted in any ongoing event
      const discounted = filteredEvents.some(
        (event) =>
          event.shopId === data?.shopId && event?.category === data?.category
      );

      setIsDiscounted(discounted);
    }
  }, [allEvents, data]);

  const handleClick = () => {
    navigate(`/product/${data?.name}`);
    window.location.reload(true);
  };
  useEffect(() => {
    const data =
      allEvents && allEvents?.find((item) => item?.status === "Đang diễn ra");
    setDataEvent(data);
  }, [allEvents]);

  useEffect(() => {
    if (
      wishlistItems &&
      wishlistItems?.find((i) => i.product?._id === data?._id)
    ) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlistItems, data]);

  //hiển thị định dạng tiền tệ
  function formatVietnameseCurrency(number) {
    // Chia cho 1000 và làm tròn xuống để lấy phần nguyên
    let formattedNumber = Math.floor(number / 1000);

    // Nhân lại cho 1000 để có giá trị mong muốn
    formattedNumber *= 1000;

    // Sử dụng hàm toLocaleString để định dạng số theo ngôn ngữ và định dạng của Việt Nam
    let result = formattedNumber.toLocaleString("vi-VN");

    return result;
  }
  //Thêm vào giỏ hàng
  const addToCartHandler = () => {
    // Kiểm tra xem sản phẩm có nằm trong danh mục được khuyến mãi không
    const isDiscountedProduct = sortedEvents.some(
      (event) =>
        event.shopId === data?.shopId && event?.category === data?.category
    );

    // Áp dụng giá trị tương ứng
    const priceToAdd = isDiscountedProduct
      ? (data?.discountPrice * (100 - dataEvent?.discountPercent)) / 100
      : data?.discountPrice;

    dispatch(addToCart(user?._id, data.shop?._id, data?._id, 1, priceToAdd));

    // Hiển thị thông báo tương ứng
    if (isAuthenticated) {
      toast.success("Thêm vào giỏ hàng thành công !", {
        onClose: () => {
          dispatch(getAllCartItemsUser(user?._id));
        },
      });
    } else {
      toast.warning("Vui lòng đăng nhập để tiếp tục !");
    }
  };

  //Thêm vào danh sách yêu thích
  const addToWishlistHandler = async () => {
    dispatch(addToWishlist(user?._id, data.shop?._id, data?._id));
    {
      isAuthenticated
        ? toast.success("Thêm vào danh sách yêu thích thành công !")
        : toast.warning("Vui lòng đăng nhập để tiếp tục !");
    }
  };
  const handleDelete = async () => {
    try {
      await axios.post(
        `${server}/wishlist/delete-product-wishlist/${data?._id}`
      );
      // Sau khi xóa thành công, cập nhật danh sách cartData
      toast.success("Xóa khỏi danh sách thành công !", {
        onClose: () => {
          dispatch(getAllWishlistItemsUser(user?._id));
        },
      });
      // Tải lại danh sách mục trong giỏ hàng sau khi xóa
      dispatch(getAllWishlistItemsUser(data?.user?._id));
    } catch (error) {
      console.error("Lỗi xóa mục khỏi giỏ hàng:", error);
    }
  };
  function applyDiscount(price, shopId, category) {
    if (Array.isArray(sortedEvents) && sortedEvents.length > 0) {
      const matchingEvent = sortedEvents?.find(
        (event) => event.shopId === shopId && event?.category === category
      );

      if (matchingEvent) {
        const discountedPrice =
          (price * (100 - matchingEvent.discountPercent)) / 100;
        return Math.floor(discountedPrice / 1000) * 1000;
      }
    }

    // Nếu không có sự kiện khuyến mãi, trả về giá không thay đổi
    return price;
  }
  const handleDiscountIconClick = async (id, name) => {
    try {
      const response = await axios.get(
        `${server}/coupon/get-all-coupon/${id}/${name}`,
        { withCredentials: true }
      );
      setCouponCodes(response.data.couponCodes);
      setOpenPopUp(true);
    } catch (error) {
      console.error("Error fetching coupon codes:", error);
    }
  };
  //lọc dữ liệu
  useEffect(() => {
    // Filter couponCodes based on user's discount codes
    const filteredCodes = couponCodes.filter(
      (code) => !user?.discountCodes?.includes(code.code)
    );
    setCodeFilter(filteredCodes);
  }, [user, couponCodes]);
  const handleAddDiscountCode = async (id, selectedIndex, shopId) => {
    if (
      couponCodes &&
      Array.isArray(couponCodes) &&
      couponCodes.length > selectedIndex
    ) {
      try {
        const selectedCoupon = couponCodes[selectedIndex];

        const response = await axios.post(
          `${server}/user/add-discount-code/${id}`,
          {
            code: selectedCoupon.code,
            valueDiscount: selectedCoupon.valueDiscount,
            shopId: selectedCoupon.shopId,
            selectedProduct: selectedCoupon.selectedProduct,
            name: selectedCoupon.name,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          toast.success("Mã giảm giá được áp dụng thành công!");

          // Update user's discount codes in the redux store
          dispatch(loadUser(user?._id));

          // Set addedCoupon to true when the coupon is successfully applied
        } else {
          toast.error("Áp dụng mã giảm giá thất bại: " + response.data.message);
        }
      } catch (error) {
        console.error("Error adding discount code:", error);
      }
    } else {
      console.error("couponCodes is undefined or not in the correct format");
    }
  };
  return (
    <>
      <div className="mt-4 800px:w-[250px] flex flex-col justify-between 800px:mt-1 border bg-white hover:border-2 hover:border-blue-300 border-gray-800 800px:h-[350px] rounded-lg shadow-md p-3 relative cursor-pointer">
        {isDiscounted && (
          <div className="absolute top-0 left-0 mt-2 ml-2 flex items-center">
            <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs mr-1">
              {/* Display the discount percentage */}
              {sortedEvents.map(
                (event) =>
                  event.shopId === data?.shopId &&
                  event?.category === data?.category && (
                    <span key={event._id}>-{event.discountPercent}%</span>
                  )
              )}
            </div>
          </div>
        )}

        <div className="relative group" onClick={handleClick}>
          <img
            src={`${backend_url}${data?.images && data?.images[0]}`}
            alt="product-img"
            className="w-[100px] h-[100px] 800px:w-[150px] 800px:h-[150px] object-contain mx-auto"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
            <p className="text-white text-lg font-semibold transform translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-1000 ease-in-out">
              Xem chi tiết
            </p>
          </div>
        </div>

        <Link to={`/shop/preview/${data?.shop._id}`}>
          <p className="text-[12px] 800px:text-[16px] font-normal mt-3 cursor-pointer hover:text-blue-600">
            {data?.shop?.shopName}
          </p>
        </Link>
        <Link to={`/product/${data?.name}`}>
          <h4 className="text-[12px] 800px:text-[16px] text-gray-700 hover:text-blue-500 transition-all duration-100 font-extrabold cursor-pointer ">
            {data?.name.length > 40
              ? data?.name.slice(0, 40) + "..."
              : data?.name}
          </h4>
          <div className="mt-1 flex">
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6ba00"
              size={15}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6ba00"
              size={15}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6ba00"
              size={15}
            />
            <AiFillStar
              className="mr-2 cursor-pointer"
              color="#F6ba00"
              size={15}
            />
            <AiOutlineStar
              className="mr-2 cursor-pointer"
              color="#F6ba00"
              size={15}
            />
          </div>
          <div className="py-2 flex items-center justify-between">
            <span
              className={`${styles.productDiscountPrice} !text-[12px] 800px:!text-[16px]`}
            >
              {formatVietnameseCurrency(
                applyDiscount(
                  data?.discountPrice,
                  data?.shopId,
                  data?.category
                ),
                true
              )}
            </span>

            <span className={`${styles.price} !text-[12px] 800px:!text-[16px]`}>
              {isDiscounted ? (
                <>
                  {formatVietnameseCurrency(
                    Math.floor(data?.discountPrice / 1000) * 1000
                  )}
                </>
              ) : (
                <div>
                  {formatVietnameseCurrency(
                    Math.floor(data?.originalPrice / 1000) * 1000
                  )}
                </div>
              )}
            </span>
          </div>
          <div className="font-[400] text-[13px] text-[#68d284]">
            {data?.sold_out} Đã bán
          </div>
        </Link>
        {/*side options */}
        <div>
          {click ? (
            <AiFillHeart
              size={18}
              className="cursor-pointer absolute right-2 top-5"
              onClick={handleDelete}
              color={click ? "red" : "#333"}
              title="Xóa khỏi danh sách yêu thích"
            />
          ) : (
            <AiOutlineHeart
              size={18}
              className="cursor-pointer absolute right-2 top-5"
              onClick={addToWishlistHandler}
              color={click ? "red" : "#333"}
              title="Thêm vào danh sách yêu thích"
            />
          )}
          <AiOutlineEye
            size={18}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Xem nhanh"
          />
          <AiOutlineShoppingCart
            size={18}
            className="cursor-pointer absolute right-2 top-24"
            onClick={addToCartHandler}
            color="#333"
            title="Thêm vào giỏ hàng"
          />
          {open ? (
            <ProductDetailsCard open={open} data={data} setOpen={setOpen} />
          ) : null}
        </div>
        <div className="relative group">
          <BiSolidDiscount
            size={25}
            onClick={() => handleDiscountIconClick(data?.shopId, data?.name)}
            title="Mã khuyến mãi"
            className="cursor-pointer hover:text-green-500"
          />
          {openPopUp && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-[100]">
              <div className="bg-white p-4 rounded-md h-[55vh] 800px:w-[50%]">
                <p>Danh sách mã giảm giá</p>
                <div className="h-[35vh] mt-5">
                  {couponCodes &&
                    couponCodes
                      .filter(
                        (code) =>
                          !user?.discountCode?.some(
                            (dc) => dc.code === code.code
                          )
                      ) // Filter out codes already in user.discountCode
                      .map((code, index) => (
                        <div
                          className={`mt-4 w-full !h-[100px] flex justify-center items-center 800px:mt-1 border bg-white hover:border-2 hover:border-blue-300 border-gray-800 800px:h-[350px] rounded-lg shadow-md p-3 relative cursor-pointer`}
                          key={index}
                        >
                          <MdSell size={25} className="ml-1" />
                          <div className="w-[85%] flex flex-col">
                            <i className="text-[12px] 800px:text-[14px] text-center text-gray-800 font-normal font-Poppins ml-2">
                              {code?.name}
                            </i>
                            <i className="text-[12px] 800px:text-[14px] text-center font-Poppins ml-2">
                              Số lượng còn lại:{" "}
                              <i className="text-red-500 font-normal">
                                {code?.sum}
                              </i>
                            </i>
                            <i className="text-[12px] 800px:text-[14px] text-center font-Poppins ml-2">
                              Giá trị giảm:{" "}
                              <i className="text-green-500 font-normal">
                                {code?.valueDiscount <= 100
                                  ? `${code?.valueDiscount}%`
                                  : formatVietnameseCurrency(
                                      code?.valueDiscount
                                    )}
                              </i>
                            </i>
                          </div>
                          <AiFillSave
                            className="mr-1 cursor-pointer"
                            onClick={() =>
                              handleAddDiscountCode(
                                user?._id,
                                index,
                                code?.shopId
                              )
                            }
                          />
                        </div>
                      ))}
                </div>
                <button
                  className={`${styles.button} w-[100px] h-[40px] text-[15px] mx-auto flex justify-end items-end`}
                  onClick={() => setOpenPopUp(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
