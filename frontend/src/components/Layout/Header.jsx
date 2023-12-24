import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { productData, categoriesData } from "../../static/data";
import {
  AiOutlineSearch,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { MdSunny, MdVoiceChat } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import Navbar from "./Navbar";
import DropDown from "./DropDown";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../server";
import Cart from "../cart/Cart";
import Wishlist from "../Wishlist/Wishlist";
import Account from "../Account";
import { RxCross1 } from "react-icons/rx";
import { getAllWishlistItemsUser } from "../../redux/actions/wishlist";
import { getAllCartItemsUser } from "../../redux/actions/cart";

const Header = ({ activeHeading, onHeaderChange }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { isSeller, seller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);
  const data = user?._id;
  const dispatch = useDispatch();
  const [theme, setTheme] = useState("light");

  const handleClick = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    onHeaderChange(newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    dispatch(getAllCartItemsUser(data));
    dispatch(getAllWishlistItemsUser(data));
  }, [isAuthenticated, user, wishlistItems?.length, cartItems?.length]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = allProducts.filter((product) =>
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
    <div className={`w-full ${theme === "dark" ? "bg-gray-700" : ""}`}>
      <div className="ml-4 hidden 800px:flex items-center justify-between">
        <div className="mt-5 h-[7vh]">
          <Link to="/">
            <img
              src="../../../img/logo.png"
              alt="logo"
             className="h-full"
            />
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
            className="absolute right-12 top-1.5 cursor-pointer"
          />
          {searchTerm && searchData && searchData.length !== 0 ? (
            <div className="absolute min-h-[30vh] bg-slate-50 shadow-sm-2 z-[9] p-4">
              {searchData &&
                searchData.map((i, index) => {
                  const d = i.name;
                  const Product_name = d.replace(/\s+/g, "-");
                  return (
                    <Link to={`/product/${Product_name}`}>
                      <div className="w-full flex items-start-py-3">
                        <img
                          src={`${backend_url}${i.images[0]}`}
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
          {/* <MdVoiceChat size={30} className="ml-4"/> */}
        </div>
        <div className={`${styles.button} w-[180px] h-[40px] mr-4`}>
          {isSeller ? (
            <Link to={`/shop/${seller._id}`}>
              <h1 className="flex items-center justify-center transform hover:translate-x-2 transition-transform">
                Truy cập cửa hàng
                <IoIosArrowForward className="ml-1 mt-[4px]" />
              </h1>
            </Link>
          ) : (
            <Link to="/shop-login">
              <h1 className="flex items-center justify-center transform hover:translate-x-2 transition-transform">
                Đăng ký cửa hàng <IoIosArrowForward className="ml-1 mt-[4px]" />
              </h1>
            </Link>
          )}
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
        <div className={`${styles.noramlFlex} mr-4 800px:block hidden`}>
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
                {wishlistItems?.length}
              </span>
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <div
              className="relative cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart size={30} color="rgb(255 255 255 / 83%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 top right p-0 m-0 text-white font-mono text-[12px] leading-tight text-center">
                {cartItems?.length}
              </span>
            </div>
          </div>
          <div className={`${styles.noramlFlex}`}>
            <div className="relative cursor-pointer mr-[10px]">
              {isAuthenticated ? (
                <Account />
              ) : (
                <Link to="/login">
                  <CgProfile
                    size={30}
                    color="rgb(255 255 255 / 83%)"
                    className="ml-3"
                  />
                </Link>
              )}
            </div>
          </div>
          <div
            onClick={handleClick}
            className="h-[40px] flex justify-center items-center"
          >
            {theme === "light" ? (
              <MdSunny size={20} fill="#fff" className=" cursor-pointer mr-4" />
            ) : (
              <FaMoon size={20} fill="#000" className=" cursor-pointer mr-4" />
            )}
          </div>
          {/*cart popup */}
          {openCart ? (
            <Cart setOpenCart={setOpenCart} data={cartItems} />
          ) : null}
          {/*wishlist popup */}
          {openWishlist ? (
            <Wishlist setOpenWishlist={setOpenWishlist} data={wishlistItems} />
          ) : null}
        </div>
      </div>
      {/*mobile header */}
      <div className="w-full h-[70px] fixed bg-[#fff] z-50 top-0 left-0 shadow-sm block 800px:hidden">
        <div className="w-full flex items-center justify-between">
          <div>
            <BiMenuAltLeft
              size={40}
              className="ml-4 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </div>
          <div>
            <Link to="/">
              <img
                src="../img/logo.png"
                alt="logo"
                width={"80px"}
                className="flex items-center justify-center cursor-pointer"
              />
            </Link>
          </div>
          <div className="relative mr-[20px]">
            <AiOutlineShoppingCart
              size={40}
              onClick={() => setOpenCart(!openCart)}
            />
            <span className="absolute h-[20px] w-[20px] flex items-center justify-center bottom-5 left-6 cursor-pointer rounded-full bg-green-400 ">
              {cartItems && cartItems.length}
            </span>
          </div>
        </div>
        {/*header sidebar */}
        {open && (
          <div className="fixed w-full bg-[#000000ba] z-20 h-full top-0 left-0">
            <div className="fixed w-[60%] bg-[#fff] h-screen  top-0 left-0 z-10">
              <div className="w-full flex justify-between pr-3">
                <div>
                  <div className="relative mr-[15px]">
                    <AiOutlineHeart
                      size={30}
                      className="mt-5 ml-3"
                      onClick={() => setOpenWishlist(!openWishlist)}
                    />
                    <span className="absolute h-[20px] w-[20px] flex items-center justify-center bottom-3 left-6 cursor-pointer rounded-full bg-green-400 ">
                      {wishlistItems && wishlistItems.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={20}
                  className="cursor-pointer hover:text-red-500 hover:scale-[1.2] mt-8 mr-3"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="my-8 w-[92%] m-auto h-[40px] relative">
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
              <Navbar active={activeHeading} />
              <div className={`${styles.button} w-[160px] h-[40px] ml-4`}>
                <Link to="/shop-login">
                  <h1 className="flex items-center">
                    Become a Seller <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div>
              <div className="flex w-full justify-center">
                {isAuthenticated ? (
                  <div className="mt-[15%]">
                    <Account />
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[18px] pr-[10px] text-[#000000ba]"
                    >
                      Đăng nhập /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[18px] pr-[10px] text-[#000000ba]"
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
