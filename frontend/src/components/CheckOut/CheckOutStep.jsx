import React from "react";
import styles from "../../styles/styles";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="w-full flex justify-center 800px:mt-[2%] mt-8 mx-auto">
      <div className="w-[90%] 800px:w-[50%] flex items-center flex-wrap">
        <div className={`${styles.noramlFlex}`}>
          <div className={`${styles.cart_button}`}>
            <span className={`${styles.cart_button_text}`}>1.</span>
            <span
              className={`${
                active > 1
                  ? "800px:block hidden text-[#fff] font-[500]"
                  : "800px:block  text-[#fff] font-[500]"
              } flex`}
            >
              Vận chuyển
            </span>
          </div>
          <div
            className={`${
              active > 1
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
            }`}
          />
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active > 1
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-[#FDE1E6]`
            } flex`}
          >
            <span
              className={`${
                active > 1
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#f63b60]`
              }`}
            >
              2.
            </span>
            <span
              className={`${
                active > 2
                  ? "800px:block hidden text-[#fff] font-[500]"
                  : "800px:block  text-[#fff] font-[500]"
              } flex`}
            >
              Thanh toán
            </span>
          </div>
        </div>

        <div className={`${styles.noramlFlex}`}>
          <div
            className={`${
              active === 3
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-[#f63b60]"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-[#FDE1E6]"
            }`}
          />
          <div
            className={`${
              active > 2
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-[#FDE1E6]`
            }`}
          >
            <span
              className={`${
                active > 2
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-[#f63b60]`
              }`}
            >
              3.
            </span>
            <span
              className={`${
                active === 3
                  ? "800px:block text-[#fff] font-[500]"
                  : "800px:block hidden text-[#f63b60] font-[500]"
              } flex`}
            >
              Thành công
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSteps;
