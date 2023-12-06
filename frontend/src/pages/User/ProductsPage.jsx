import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import styles from "../../styles/styles";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../components/Route/ProductCard/ProductCard";
import { useSelector } from "react-redux";
import { LuListFilter } from "react-icons/lu";
import { categoriesData } from "../../static/data";
import CurrencyInput from "react-currency-input-field";
import { toast } from "react-toastify";
import { AiOutlineClear } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
const ProductsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const [data, setData] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [selectedBrand, setSelectedBrand] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("desce");
  const [popUp, setPopup] = useState(false);

  useEffect(() => {
    handleSearch();
  }, [sortOption]);
  useEffect(() => {
    const filteredData =
      selectedBrand === "ALL"
        ? allProducts
        : allProducts?.filter((item) => item.brand === selectedBrand);

    const finalFilteredData =
      selectedCategory === "ALL"
        ? filteredData
        : filteredData?.filter((item) => item.category === selectedCategory);

    setData(finalFilteredData);
  }, [selectedBrand, selectedCategory, allProducts]);

  const brandMobile = {
    "Điện thoại và máy tính bảng": [
      { name: "Apple" },
      { name: "Samsung" },
      { name: "Oneplus" },
      { name: "Huawei" },
      { name: "Xiaomi" },
      { name: "Oppo" },
    ],
    "Máy tính và Laptop": [
      { name: "Apple" },
      { name: "Samsung" },
      { name: "Oneplus" },
      { name: "Huawei" },
      { name: "Xiaomi" },
      { name: "Oppo" },
    ],
  };
  const getBrandOptions = (category) => {
    return category === "ALL" ? [] : brandMobile[category] || [];
  };

  const brandOptions = getBrandOptions(selectedCategory);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setPopup(!popUp);
  };

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    setSelectedBrand("ALL");
    setPopup(!popUp);
  };

  useEffect(() => {
    setFilteredProducts(allProducts);
  }, [allProducts]);

  const handleMinPriceChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxPriceChange = (value) => {
    setMaxPrice(value);
  };
  const handleSearch = () => {
    // Check if maxPrice is less than or equal to minPrice
    if (maxPrice && minPrice && parseFloat(maxPrice) <= parseFloat(minPrice)) {
      // Display an error message or take appropriate action
      alert("Max Price must be greater than or equal to Min Price");
      return; // Do not proceed with the search
    }

    // Filter products based on minPrice and maxPrice
    let filteredData = allProducts?.filter((item) => {
      const price = item.discountPrice; // replace with the actual property holding the price
      return (
        (!minPrice || price >= parseFloat(minPrice)) &&
        (!maxPrice || price <= parseFloat(maxPrice))
      );
    });

    // Apply sorting based on the selected option
    switch (sortOption) {
      case "desce":
        // Sort by price in descending order
        filteredData?.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case "incre":
        // Sort by price in ascending order
        filteredData?.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "sold":
        // Sort by quantity sold in descending order (replace 'quantitySold' with actual property)
        filteredData?.sort((a, b) => b.sold_out - a.sold_out);
        break;
      default:
      // No sorting or default sorting logic
    }

    setData(filteredData);
    setMaxPrice("");
    setMinPrice("");
  };
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setPopup(!popUp);
  };
  const handleClear = () => {
    setMaxPrice("");
    setMinPrice("");
    setSortOption("");
    setSelectedBrand("");
    setSelectedCategory("");
    setPopup(!popUp);
    setTimeout(() => {
      setData(allProducts);
    }, 500);
  };
  const togglePopup = () => {
    setPopup(!popUp);
  };
  return (
    <div>
      <Header activeHeading={3} />
      <div className={`${styles.section} mt-5`}>
        <div className="800px:flex items-center 800px:h-[10vh] 800px:mt-0 mt-8">
          <div className="flex">
            <LuListFilter size={30} onClick={togglePopup} />
            <p className="font-[600] font-Poppins text-[18px] ml-3">Bộ lọc</p>
            {popUp && (
              <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[#00000062]  z-[20000]">
                <div className="w-[90%] 800px:w-[40%] h-[40vh] bg-white rounded-md shadow-sm p-4">
                  <div className="w-full flex justify-between items-center pb-2 border-b-2">
                    <span className="800px:text-[18px] text-[16px] uppercase font-Roboto font-[500]">
                      Bộ lọc
                    </span>
                    <RxCross1
                      size={25}
                      className="cursor-pointer"
                      onClick={() => setPopup(false)}
                    />
                  </div>
                  <div className="mt-8">
                    <div className="800px:h-[10vh] 800px:mt-0 border border-blue-500 flex items-center ml-4 p-2 rounded-xl relative">
                      <div className="absolute top-2 left-2 transform -translate-y-full bg-gray-100 px-2">
                        Danh mục và thương hiệu:
                      </div>
                      <select
                        className="800px:w-[250px] w-[150px] rounded-md shadow-2xl h-[40px] bg-gray-300 text-black"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                      >
                        <option value="ALL">Tất cả danh mục</option>
                        {categoriesData.map((category) => (
                          <option key={category.id} value={category.title}>
                            {category.title}
                          </option>
                        ))}
                      </select>
                      <select
                        className="800px:w-[250px] rounded-md shadow-2xl h-[40px] ml-3 bg-gray-300 text-black"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                      >
                        <option value="ALL">Tất cả thương hiệu</option>
                        {brandOptions.map((brand) => (
                          <option key={brand.name} value={brand.name}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="800px:h-[10vh] mt-8 800px:mt-0 border border-blue-500 flex items-center ml-4 p-2 rounded-xl relative">
                      <div className="absolute top-2 left-2 transform -translate-y-full bg-gray-100 px-2">
                        Đơn giá:
                      </div>
                      <div className="flex flex-col">
                        <label>Tối thiểu</label>
                        <CurrencyInput
                          className="rounded-md shadow-2xl p-1 800px:w-[150px] w-[120px] bg-gray-300 text-black"
                          allowDecimals={true}
                          decimalsLimit={2}
                          value={minPrice}
                          onValueChange={(value) => handleMinPriceChange(value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <label className="ml-4">Tối đa</label>
                        <CurrencyInput
                          className="rounded-md shadow-2xl ml-4 p-1 800px:w-[150px] w-[120px] bg-gray-300 text-black"
                          allowDecimals={true}
                          decimalsLimit={2}
                          value={maxPrice}
                          onValueChange={(value) => handleMaxPriceChange(value)}
                        />
                      </div>

                      <div
                        className={`${styles.button} w-[80px] h-[30px] ml-4 mt-9`}
                        onClick={handleSearch}
                      >
                        Tìm
                      </div>
                    </div>
                    <div className="ml-4 800px:ml-2 mt-4 flex justify-center items-center">
                      <select
                        id="sortOption"
                        className="w-[150px] p-3 rounded-md bg-gray-300 "
                        onChange={handleSortChange}
                      >
                        <option>Chọn</option>
                        <option value="desce">Giá giảm dần</option>
                        <option value="incre">Giá tăng dần</option>
                        <option value="sold">Số lượng bán</option>
                      </select>

                      <AiOutlineClear
                        size={30}
                        className="cursor-pointer hover:text-red-500 hover:scale-[1.2] ml-4"
                        onClick={handleClear}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="800px:mt-0 grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
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
