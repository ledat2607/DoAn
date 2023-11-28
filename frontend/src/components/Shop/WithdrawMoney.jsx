import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";

const WithdrawMoney = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { orders } = useSelector((state) => state.order);
  const { products } = useSelector((state) => state.products);
  const [deliveredOrder, setDeliveredOder] = useState(null);
  const [cashOnDelivery, setCashOnDelivery] = useState(null);
  useEffect(() => {
    if (!orders || !products) {
      // Dữ liệu chưa được tải lên từ API, bạn có thể thực hiện các xử lý khác tùy thuộc vào yêu cầu của bạn.
      return;
    }

    const orderData =
      orders &&
      orders?.filter((item) => item.status === "Giao hàng thành công");

    if (!orderData) {
      return;
    }

    const deliveredOrders = orderData?.filter(
      (item) => item.paymentInfo.type === "Paypal"
    );

    setDeliveredOder(deliveredOrders);
    setCashOnDelivery(orderData);
  }, [dispatch, seller?.id, orders, products]);

  const accountBalance =
    deliveredOrder &&
    deliveredOrder?.reduce((acc, item) => acc + item.totalPrice, 0);
  //format Vietnamese currency

  function formatVietnameseCurrency(number) {
    // Chia cho 1000 và làm tròn xuống để lấy phần nguyên
    let formattedNumber = Math.floor(number / 1000);

    // Nhân lại cho 1000 để có giá trị mong muốn
    formattedNumber *= 1000;

    // Sử dụng hàm toLocaleString để định dạng số theo ngôn ngữ và định dạng của Việt Nam
    let result = formattedNumber.toLocaleString("vi-VN");

    return result;
  }
  return (
    <div className="w-full h-[80vh] p-5">
      <div className="w-full bg-white rounded-md h-full flex items-center justify-center flex-col">
        <h5>Số dư khả dụng:{formatVietnameseCurrency(accountBalance)}</h5>
        <div className={`${styles.button} w-[100px] h-[40px]`}>Rút tiền</div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
