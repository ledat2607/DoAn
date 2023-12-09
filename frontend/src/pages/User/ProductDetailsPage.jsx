import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { useParams } from "react-router-dom";
import ProductDetails from "../../components/Products/ProductDetails";
import SuggestedProduct from "../../components/Products/SuggestedProduct.jsx";
import { useSelector } from "react-redux";
const ProductDetailsPage = ({ headerState }) => {
  const { allProducts } = useSelector((state) => state.products);
  const { name } = useParams();
  const [data, setData] = useState(null);
  const productName = name.replace(/-/g, " ");
  useEffect(() => {
    const data =
      allProducts && allProducts.find((i) => i?.name === productName);
    setData(data);
  }, [allProducts, data]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
      <div className="mt-5 bg-white">
        {data && <SuggestedProduct data={data} />}
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetailsPage;
