import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(1);
  const navigate = useNavigate();
  return (
    <div className="bg-white">
      {data ? (
        <div className={`${styles.section} w-[90%] 800px:w-[75%] h-screen`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data?.image_Url[select].url}
                  alt="img-select"
                  className="w-[80%]"
                />
              </div>
              <div className="w-full 800px:w-[50%]">
                <div className="w-full flex">
                  <div
                    className={`${
                      select === 0 ? "border" : null
                    } cursor-pointer`}
                  >
                    <img
                      src={data?.image_Url[0].url}
                      alt="product-img"
                      className="h-[180px]"
                      onClick={() => setSelect(0)}
                    />
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

export default ProductDetails;
