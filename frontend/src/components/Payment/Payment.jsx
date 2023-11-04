import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const Payment = () => {
  const [orderData, setOrderData] = useState();
  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <PaymentInfo />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8 ">
          <CartData orderData={orderData} />
        </div>
      </div>
    </div>
  );
};

const PaymentInfo = () => {
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();
  const paymentHandler = (e) => {
    e.preventDefault();
    navigate("/order/success/6sadgah");
  };
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      {/*selected button*/}
      <div>
        <div className="flex w-full pb-5 border-b mb-2">
          <div
            className="w-[25px] h-[25px] rounded-full bg-transparent border-[3px] border-[#1d1a1ab4] relative flex items-center justify-center"
            onClick={() => setSelect(1)}
          >
            {select === 1 ? (
              <div className="w-[13px] h-[13px] bg-[#1d1a1ab4] rounded-full"></div>
            ) : null}
          </div>
          <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">
            Thanh toán bằng Debit/Thẻ Credit
          </h4>
        </div>
        {/*pay with card*/}
        {select === 1 ? (
          <div className="w-full flex border-b">
            <form className="w-full" onSubmit={paymentHandler}>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Số thẻ</label>
                  <input
                    required
                    className={`${styles.input} w-[80%] focus:ring-2 focus:ring-blue-300`}
                  />
                </div>
                <div className="w-[50%] ml-2">
                  <label className="block pb-2">Ngày Exp</label>
                  <input
                    type="number"
                    required
                    className={`${styles.input} focus:ring-2 focus:ring-blue-300`}
                  />
                </div>
              </div>
              <div className="w-full flex pb-3">
                <div className="w-[50%]">
                  <label className="block pb-2">Họ và tên trên thẻ</label>
                  <input
                    required
                    className={`${styles.input} w-[80%] focus:ring-2 focus:ring-blue-300`}
                  />
                </div>
                <div className="w-[50%] ml-2">
                  <label className="block pb-2">Địa chỉ</label>
                  <input
                    type="text"
                    required
                    className={`${styles.input} focus:ring-2 focus:ring-blue-300`}
                  />
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
            <form className="w-full" onSubmit={paymentHandler}>
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
      </div>
    </div>
  );
};
const CartData = ({ orderData }) => {
  return <div>hello</div>;
};
export default Payment;
