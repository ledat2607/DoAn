import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { deleteItems } from "../../redux/actions/cart";
import axios from "axios";
import { toast } from "react-toastify";
const Payment = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);
  const createOrder = (data, actions) => {};
  const onApprove = (data, actions) => {
    console.log(`fff`);
  };
  const paypalPaymentHandler = async (paymentInfo) => {
    console.log(`first`);
  };
  console.log(orderData);
  const order = {
    cart: orderData?.cartItems,
    shippingAddress: orderData?.shippingAddress,
    user: user && user,
    totalPrice: orderData?.totalPrice,
  };
  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();

    order.paymentInfo = {
      type: "Cash On Delivery",
    };

    await axios.post(`${server}/order/create-order`, order).then((res) => {
      setOpen(false);
      navigate("/order/success");
      toast.success("Đặt hàng thành công!");
      localStorage.setItem("latestOrder", JSON.stringify([]));
      window.location.reload();
    });
  };

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo
            user={user}
            open={open}
            setOpen={setOpen}
            onApprove={onApprove}
            createOrder={createOrder}
            cashOnDeliveryHandler={cashOnDeliveryHandler}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8 ">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = ({
  user,
  open,
  setOpen,
  onApprove,
  createOrder,
  paymentHandler,
  cashOnDeliveryHandler,
}) => {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      {/*paypal payment*/}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(2)}
          >
            {select === 2 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1ab4] rounded-full"></div>
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000ba]">
            Thanh toán qua Paypal
          </h4>
        </div>
        {/*pay with payment*/}
        {select === 2 ? (
          <div className="w-full flex border-b">
            <form className="w-full">
              <div className="w-full flex pb-2">
                <div className="w-full">
                  <label className="block pb-2">Paypal Email</label>
                  <input required className={`${styles.input}`} />
                </div>
              </div>
              <input
                type="submit"
                value="Xác nhận"
                className={`${styles.button} mx-auto w-[100px] text-[#fff] h-[35px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
      {/*cash on delivery*/}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(3)}
          >
            {select === 3 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1ab4] rounded-full"></div>
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000ba]">
            Thanh toán khi nhận hàng
          </h4>
        </div>
        {/* cash on delivery */}
        {select === 3 ? (
          <div className="w-full flex">
            <form className="w-full" onSubmit={cashOnDeliveryHandler}>
              <input
                type="submit"
                value="Xác nhận"
                className={`${styles.button} w-[110px] mx-auto !bg-[#f63b60] text-[#fff] h-[45px] rounded-[5px] cursor-pointer text-[18px] font-[600]`}
              />
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};
const CartData = ({ orderData }) => {
  function formatVietnameseCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  }

  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8 shadow-2xl">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Tổng tiền sản phẩm:
        </h3>
        <h5 className="text-[18px] font-[600]">
          {formatVietnameseCurrency(orderData?.subTotalPrice)}
        </h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">
          Phí vận chuyển:
        </h3>
        <h5 className="text-[18px] font-[600]">
          {formatVietnameseCurrency(orderData?.shipping.toFixed(2))}
        </h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Khuyến mãi:</h3>
        <h5 className="text-[18px] font-[600]">
          - {formatVietnameseCurrency(orderData?.discountPrice)}
        </h5>
      </div>
      <div className="flex justify-between pb-3">
        <h3 className="text-[16px] mt-2 font-[400] text-[#000000a4]">
          Tổng thanh toán:
        </h3>
        <h5 className="text-[18px] font-[600] text-end pt-3">
          {formatVietnameseCurrency(orderData?.totalPrice)}
        </h5>
      </div>

      <br />
      <form></form>
    </div>
  );
};
export default Payment;
