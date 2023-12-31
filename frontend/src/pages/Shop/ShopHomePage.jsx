import React from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex py-10 justify-between">
        <div className="w-[25%] bg-[#fff] rounded-lg shadow-lg overflow-y-scroll h-screen sticky top-2 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-[72%] rounded-[5px]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
