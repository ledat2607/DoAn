import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
const ProductDetailsCard = ({ setOpen, open, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(false);
  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-md relative p-4">
            <h3>Thông tin sản phẩm</h3>
            <RxCross1
              size={25}
              className="absolute right-5 top-7 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img src={data.image_Url[0].url} alt="preview" width={"80%"} />
                <div className="flex">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt="shop-preview"
                    className="w-[35px] h-[35px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h4 className="pb-3 text-[15px]">{data.shop.ratings}/5</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
