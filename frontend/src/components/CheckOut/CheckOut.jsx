import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Country, State } from "country-state-city";
import axios from "axios";
import { server } from "../../server";
import { BiSolidDiscount } from "react-icons/bi";
import { BiCopy } from "react-icons/bi";
import copy from "clipboard-copy";
const CheckOut = () => {
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [town, setTown] = useState("");
  const [street, setStreet] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [shipDiscount, setShipDiscount] = useState();
  const [appliedCodes, setAppliedCodes] = useState([]);
  const navigate = useNavigate();
  const paymentSubmit = () => {
    navigate("/payment");
    if (town === "" || street === "" || country === "" || city === "") {
      toast.error("Vui lòng chọn địa chỉ nhận hàng!");
    } else {
      const shippingAddress = {
        town,
        street,
        country,
        city,
      };
      const orderData = {
        cartItems,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${code}`).then((res) => {
      const shopId = res.data.coupon?.shopId;
      const couponType = res.data.coupon?.typeCode;
      const couponCodeValue = res.data.coupon?.valueDiscount;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cartItems && cartItems.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error("Mã giảm giá không tồn tại !");
          setCouponCode("");
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.product?.discountPrice,
            0
          );
          const ship = eligiblePrice * 0.001;

          if (couponType === "all" || couponType === "total") {
            // Calculate discount as a percentage of the total value
            const totalValue = eligiblePrice + ship;
            const discountPrice = (totalValue * couponCodeValue) / 100;
            setAppliedCodes((prevCodes) => [...prevCodes, code]);
            localStorage.setItem(
              "appliedCodes",
              JSON.stringify([...appliedCodes, code])
            );
            setDiscountPrice(discountPrice);
          } else if (couponType === "ship") {
            // Store the discount value in a separate variable
            setShipDiscount(couponCodeValue);
            setAppliedCodes((prevCodes) => [...prevCodes, code]);
            localStorage.setItem(
              "appliedCodes",
              JSON.stringify([...appliedCodes, code])
            );
          }

          setCouponCodeData(res.data.coupon);
          setCouponCode("");
        }
      }

      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exist!");
        setCouponCode("");
      }
    });
  };

  const subTotalPrice = cartItems?.reduce(
    (acc, item) => acc + item.qty * item?.priceToAdd,
    0
  );
  let shipping;
  if (subTotalPrice < 5000000) {
    shipping = 10000 + subTotalPrice * 0.01;
  } else {
    shipping = 30000 + subTotalPrice * 0.03;
  }
  if (
    shipDiscount !== null &&
    shipDiscount !== undefined &&
    shipDiscount !== ""
  ) {
    shipping *= 1 - shipDiscount / 100;
  }
  const discountPercentenge = couponCodeData ? discountPrice : "";

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-2  mt-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            town={town}
            setTown={setTown}
            street={street}
            setStreet={setStreet}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
            cartItems={cartItems}
            user={user}
          />
        </div>
      </div>
      <div
        className={`${styles.button} 800px:h-[45px] shadow-2xl h-12 w-[200px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-[18px] font-Roboto text-center p-2">
          Chuyển tới thanh toán
        </h5>
      </div>
    </div>
  );
};
//Shipping info
const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  town,
  setTown,
  street,
  setStreet,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8 shadow-2xl">
      <h5 className="text-[22px] font-[600] font-Roboto uppercase text-center">
        Thông tin giao hàng
      </h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Họ và tên</label>
            <input
              type="text"
              value={user && user.name}
              required
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Địa chỉ email</label>
            <input
              type="email"
              value={user && user.email}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Số điện thoại</label>
            <input
              type="number"
              required
              value={user && "0" + user.phoneNumber}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Quốc gia</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Chọn quốc gia
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Tỉnh/Thành phố</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option className="block pb-2" value="">
                Chọn Tỉnh/Thành phố
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Quận/Huyện</label>
            <input
              type="address"
              required
              value={town}
              onChange={(e) => setTown(e.target.value)}
              className={`${styles.input} !w-[95%]`}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Số nhà,tên đường,...</label>
            <input
              type="address"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
              className={`${styles.input}`}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Chọn từ địa chỉ có sẵn
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1">
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() =>
                    setTown(item.town) ||
                    setStreet(item.street) ||
                    setCountry(item.country) ||
                    setCity(item.city)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
//Cart Data
const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentenge,
  cartItems,
  user,
}) => {
  const [openPopUp, setOpenPopUp] = useState(false);
  //hàm định dạng tiền tệ
  function formatVietnameseCurrency(number) {
    // Chia cho 1000 và làm tròn xuống để lấy phần nguyên
    let formattedNumber = Math.floor(number / 1000);

    // Nhân lại cho 1000 để có giá trị mong muốn
    formattedNumber *= 1000;

    // Sử dụng hàm toLocaleString để định dạng số theo ngôn ngữ và định dạng của Việt Nam
    let result = formattedNumber.toLocaleString("vi-VN");

    return result;
  }

  const filterDiscountCodes = () => {
    const filteredCodes = user.discountCode.filter((code) =>
      cartItems.some(
        (cartItem) =>
          code.shopId === cartItem.shopId &&
          code.selectedProduct === cartItem.product.name
      )
    );
    return filteredCodes;
  };
  const handleCopyClick = async (discountCode) => {
    try {
      await copy(discountCode); // Use clipboard-copy to copy the discount code
      toast.success("Đã sao chép thành công:", discountCode);
      setTimeout(() => {
        setOpenPopUp(false);
      }, 1000);
      // You can show a success message to the user if needed
    } catch (error) {
      console.error("Sao chép thất bại:", error);
      // Handle the error, show an error message, etc.
    }
  };
  const handleClick = () => {
    setOpenPopUp(true);
  };
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8 shadow-2xl">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Tổng tiền sản phẩm:
        </h3>
        <h5 className="text-[18px] font-[600]">
          {formatVietnameseCurrency(subTotalPrice)}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Phí vận chuyển:
        </h3>
        <h5 className="text-[18px] font-[600]">
          {formatVietnameseCurrency(shipping.toFixed(2))}
        </h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Khuyến mãi:</h3>
        <h5 className="text-[18px] font-[600]">
          - {formatVietnameseCurrency(discountPercentenge)}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">
        {formatVietnameseCurrency(totalPrice)}
      </h5>

      <br />
      <div>
        <BiSolidDiscount size={30} onClick={handleClick} />
        {openPopUp && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-md z-50">
              {/* Render or display the filtered discount codes within the popup */}
              {filterDiscountCodes().map((code) => (
                <div
                  key={code._id}
                  className="p-2 bg-slate-300 mt-2 text-center rounded-md"
                >
                  <h4>{code.couponName}</h4>
                  <p>
                    Giá trị giảm:
                    {code.value > 100
                      ? formatVietnameseCurrency(code.value)
                      : code.value + "%"}
                  </p>
                  <div className="flex justify-center items-center">
                    <p>Code: {code.code}</p>
                    <BiCopy
                      className="cursor-pointer ml-2"
                      onClick={() => handleCopyClick(code.code)}
                    />
                  </div>
                </div>
              ))}

              {/* Close button or any other controls to close the popup */}
              <button
                onClick={() => setOpenPopUp(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Mã khuyến mãi..."
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          required
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Áp dụng"
          type="submit"
        />
      </form>
    </div>
  );
};
export default CheckOut;
