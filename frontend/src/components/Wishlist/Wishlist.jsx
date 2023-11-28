import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { BsCartPlus } from "react-icons/bs";
import { getAllWishlistItemsUser } from "../../redux/actions/wishlist";
import { backend_url, server } from "../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getAllCartItemsUser } from "../../redux/actions/cart";
const Wishlist = ({ setOpenWishlist, data }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed  top-0 right-0 min-h-full 800px:w-[25%] w-[80%] shadow-sm bg-white flex flex-col justify-between">
        {/*items length */}
        <div>
          <div className={`flex p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">
              {data && data?.length} Sản phẩm
            </h5>
          </div>
          <div className="absolute top-[20px] flex w-full justify-end pr-5">
            <RxCross1
              size={25}
              className="cursor-pointer hover:text-red-500 hover:scale-[1.1]"
              onClick={() => setOpenWishlist(false)}
            />
          </div>
          {/*wishlist signle */}
          <div className="w-full border-t ">
            {data &&
              data.map((i, index) => (
                <WishlistSingle
                  key={index}
                  data={i}
                  setOpenWishlist={setOpenWishlist}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
//wishlist signle
const WishlistSingle = ({ setOpenWishlist, data }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  function formatVietnameseCurrency(number) {
    // Chia cho 1000 và làm tròn xuống để lấy phần nguyên
    let formattedNumber = Math.floor(number / 1000);

    // Nhân lại cho 1000 để có giá trị mong muốn
    formattedNumber *= 1000;

    // Sử dụng hàm toLocaleString để định dạng số theo ngôn ngữ và định dạng của Việt Nam
    let result = formattedNumber.toLocaleString("vi-VN");

    return result;
  }
  const handleDelete = async (id) => {
    try {
      await axios.post(
        `${server}/wishlist/delete-items-in-wishlist/${data?._id}`
      );
      // Sau khi xóa thành công, cập nhật danh sách cartData
      toast.success("Xóa thành công !");
      // Tải lại danh sách mục trong giỏ hàng sau khi xóa
      dispatch(getAllWishlistItemsUser(data?.user?._id));
    } catch (error) {
      console.error("Lỗi xóa mục khỏi giỏ hàng:", error);
    }
  };
  const addToCartHandler = () => {
    dispatch(addToCart(data.user?._id, data.shop?._id, data?.product?._id, 1));
    toast.success("Thêm vào giỏ hàng thành công !");
    setOpenWishlist(false);
    dispatch(getAllCartItemsUser(user?._id));
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 className="cursor-pointer" size={25} onClick={handleDelete} />
        <img
          src={`${backend_url}${data.product?.images[0]}`}
          alt="cart-img"
          className="w-[80px] h-h[80px] pl-6"
        />
        <div className="pl-[5px] flex justify-between w-full items-center">
          <div>
            <h1>{data.product?.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              {formatVietnameseCurrency(data.product?.discountPrice)} x 1
            </h4>
          </div>
        </div>
        <div>
          <BsCartPlus
            size={30}
            className="cursor-pointer"
            title="Thêm vào giỏ hàng"
            onClick={addToCartHandler}
          />
        </div>
      </div>
    </div>
  );
};
export default Wishlist;
