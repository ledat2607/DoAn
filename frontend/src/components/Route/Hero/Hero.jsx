import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative h-[80vh] 1300px:h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
        backgroundRepeat: "no-repeat",
        objectFit: "contain",
      }}
    >
      <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Sự lựa chọn tốt nhất <br /> cho ngôi nhà của bạn
        </h1>
        <p className="pt-5 text-[16px] font-Roboto font-[400] text-[#000000ba]">
         Cuộc sống sẽ trở nên tươi đẹp hơn nếu bạn dành thời gian để mua sắm
          <br /> trang trí cho ngôi nhà của bạn.
        </p>
        <Link to="/products" className="inline-block">
          <div className={`${styles.button} w-[110px] h-[40px] mt-5`}>
            <span className="font-[Poppins] text-[18px]">Mua ngay</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
