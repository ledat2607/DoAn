import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import { productData } from "../../static/data";
import styles from "../../styles/styles";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";

const BestSellingPage = () => {
  const { allProducts } = useSelector((state) => state.products);

  const [data, setData] = useState([]);
  const [headerState, setHeaderState] = useState("");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setHeaderState(storedTheme);
    } else {
      setHeaderState("light");
    }
  }, []);

  const handleHeaderChange = (newHeaderState) => {
    setHeaderState(newHeaderState);
    localStorage.setItem("theme", newHeaderState);
  };
  useEffect(() => {
    if (allProducts) {
      const sortedProducts = [...allProducts].sort(
        (a, b) => b.sold_out - a.sold_out
      );
      setData(sortedProducts);
    }
  }, [allProducts]);

  return (
    <div
      className={`w-full h-[150vh] ${
        headerState === "dark"
          ? "bg-[#3c3b3b] text-gray-400 opacity-9 brightness-75"
          : "bg-gray-100"
      }`}
    >
      <Header activeHeading={2} onHeaderChange={handleHeaderChange} />
      <div className={`${styles.section} mt-5`}>
        <div className="grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data &&
            data?.map((i, index) => <ProductCard key={index} data={i} />)}
        </div>
        {data && data?.length === 0 ? (
          <h1 className="text-center w-full pb-[110px] text-[20px]">
            Không tìm thấy sản phẩm
          </h1>
        ) : null}
      </div>
    </div>
  );
};

export default BestSellingPage;
