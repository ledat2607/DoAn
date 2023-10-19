import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../../components/Route/ProductCard/ProductCard";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setData(d);
  }, []);
  return (
    <div>
      <Header activeHeading={2} />
      <div className={`${styles.section} mt-5`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard key={index} data={i} />)}
        </div>
        {data && data.length === 0 ? (
          <h1 className="text-center w-full pb-[110px] text-[20px]">
            Không tìm thấy sản phẩm
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default BestSellingPage;
