import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
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
const ProductCard = ({ data }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${data?.name}`);
    window.location.reload(true);
  };

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
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }

  //Thêm vào giỏ hàng
  const addToCartHandler = () => {
    dispatch(addToCart(user?._id, data.shop?._id, data?._id, 1));
    {
      isAuthenticated
        ? toast.success("Thêm vào giỏ hàng thành công !", {
            onClose: () => {
              dispatch(getAllCartItemsUser(user?._id));
            },
          })
        : toast.warning("Vui lòng đăng nhập để tiếp tục !");
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
  return (
    <>
      <div className="mt-4 800px:mt-1 border bg-white hover:border-2 hover:border-blue-300 border-gray-800 800px:h-[350px] rounded-lg shadow-md p-3 relative cursor-pointer">
        <div className="flex justify-end"></div>

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
              {data?.discountPrice === 0
                ? 0
                : formatVietnameseCurrency(data?.discountPrice)}
            </span>
            <span className={`${styles.price} !text-[12px] 800px:!text-[16px]`}>
              {data?.originalPrice === 0
                ? 0
                : formatVietnameseCurrency(data?.originalPrice)}
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
      </div>
    </>
  );
};

export default ProductCard;
