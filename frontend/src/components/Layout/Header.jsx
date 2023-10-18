import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { productData, categoriesData } from "../../static/data";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import Navbar from "./Navbar";
import DropDown from "./DropDown";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productData.filter((product) =>
      product.name.toLocaleLowerCase().includes(term.toLocaleLowerCase())
    );
    setSearchData(filteredProducts);
  };

  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });
  return (
    <div className={`w-full`}>
      <div className="ml-4 hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
        <div className="mt-5">
          <Link to="/">
            <img src="./img/logo.png" alt="logo" width={"100px"} />
          </Link>
        </div>
        {/*Search box*/}
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="Nhập sản phẩm cần tìm..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="h-[40px] w-full px-2 border-[#3957db] border-[2px] rounded-md"
          />
          <AiOutlineSearch
            size={30}
            className="absolute right-2 top-1.5 cursor-pointer"
          />
          {searchData && searchData.length !== 0 ? (
            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
              {searchData &&
                searchData.map((i, index) => {
                  const d = i.name;
                  const Product_name = d.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${Product_name}`}>
                      <div className="w-full flex items-start-py-3">
                        <img
                          src={`${i.image_Url[0]?.url}`}
                          alt="img-search"
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{i.name}</h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>
        <div className={`${styles.button} mr-4`}>
          <Link to="/seller">
            <h1 className="flex items-center">
              Become a Seller <IoIosArrowForward className="ml-1" />
            </h1>
          </Link>
        </div>
      </div>
      <div
        className={`w-full relative ${styles.noramlFlex} justify-between bg-gray-400`}
      >
        {/*categories */}
        <div onClick={() => setDropDown(!dropDown)}>
          <div className="ml-4 relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
            <BiMenuAltLeft size={30} className="absolute top-3 left-2" />
            <button
              className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-[500] select-none rounded-t-md`}
            >
              Tất cả danh mục
            </button>
            <IoIosArrowDown
              size={20}
              className="absolute right-2 top-4 cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            />
            {dropDown ? (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            ) : null}
          </div>
        </div>
        {/* navitems */}
        <div className={`${styles.noramlFlex} mr-4`}>
          <Navbar active={activeHeading} />
        </div>
        <div className="flex">
          <div className={`${styles.noramlFlex}`}>
            <div
              className="relative cursor-pointer mr-[15px]"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={30} color="rgb(255 255 255 / 83%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                1
              </span>
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <div
              className="relative cursor-pointer mr-[15px]"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                1
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
