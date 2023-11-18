import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const ProductsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (categoryData === null) {
      const d = allProducts;
      setData(d);
    } else {
      const d =
        allProducts && allProducts.filter((i) => i.category === categoryData);
      setData(d);
    }
  }, [categoryData, allProducts]);

  return (
    <div>
      <Header activeHeading={3} />
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

export default ProductsPage;
