import React from "react";
import styles from "../../styles/styles";
import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";

const ShopPreviewPage = () => {
  return (
    <div className={`${styles.section} 800px:ml-4 bg-[#f5f5f5]`}>
      <div className="w-full 800px:flex 800px:py-10">
        <div className="w-[100%] 800px:w-[25%] 800px:bg-[#fff]  rounded-lg 800px:shadow-lg overflow-y-scroll 800px:h-screen sticky top-2 left-0 z-10">
          <ShopInfo isOwner={true} />
        </div>

        <div className="800px:w-[60%] 800px:ml-6 rounded-[5px]">
          <ShopProfileData isOwner={false} />
        </div>
      </div>
    </div>
  );
};

export default ShopPreviewPage;
