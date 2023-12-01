import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Route/ProductCard/ProductCard";
import { deleteProduct, getAllProductsShop } from "../../redux/actions/product";
import { backend_url, server } from "../../server";
import { AiFillCopy, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllCoupounCode = () => {
  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [coupouns, setCoupouns] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState();
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [sum, setSum] = useState();
  const [typeCode, setTypeCode] = useState("select");
  const [valueDiscount, setvalueDiscount] = useState("");

  const handleInputChange = (e) => {
    setvalueDiscount(e.target.value);
  };
  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-coupon/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupouns(res.data.couponCodes);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, [dispatch]);
  //format đơn vị tiền tệ
  function formatVietnameseCurrency(number) {
    // Chia cho 1000 và làm tròn xuống để lấy phần nguyên
    let formattedNumber = Math.floor(number / 1000);

    // Nhân lại cho 1000 để có giá trị mong muốn
    formattedNumber *= 1000;

    // Sử dụng hàm toLocaleString để định dạng số theo ngôn ngữ và định dạng của Việt Nam
    let result = formattedNumber.toLocaleString("vi-VN");

    return result;
  }
  const formatDiscountValue = (value) => {
    if (value <= 100) {
      return `${value}%`;
    } else {
      return `${formatVietnameseCurrency(value)}đ`;
    }
  };
  const handleClick = () => {
    setIsPopupVisible(!isPopupVisible);
  };
  const handleClickOpen = () => {
    setOpen(!open);
  };
  //Hàm submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/coupon/create-coupon-code`,
        {
          name,
          code,
          selectedProduct,
          typeCode,
          valueDiscount,
          shopId: seller._id,
          sum,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success === true) {
          setName("");
          setCode("");
          setSelectedProduct("");
          setvalueDiscount("");
          setTypeCode("select");
          setSum("");
          setOpen(false);
          toast.success("Thêm mã giảm giá thành công !");
          window.location.reload(true);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  //hàm tạo mã code
  const handleCreateCode = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let codeDiscount = "";

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      codeDiscount += characters.charAt(randomIndex);
    }
    setCode(codeDiscount);
  };
  //Xóa mã giảm giá
  const handleDelete = async (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success("Xóa thành công!");
        setIsPopupVisible(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      });
  };
  const copyCodeToClipboard = (code) => {
    const el = document.createElement("textarea");
    el.value = code;
    document.body.appendChild(el);
    const range = document.createRange();
    range.selectNode(el);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    document.body.removeChild(el);
    toast.success("Mã code đã được sao chép!");
  };
  return (
    <div className="w-full">
      <div className="w-[95%] mx-auto mt-5" onClick={handleClickOpen}>
        <span
          className={`${styles.button} w-[100px] h-[40px] !bg-blue-200 hover:!bg-gray-900 !shadow-2xl`}
        >
          Thêm mới
        </span>
      </div>
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-[#00000062]  z-[20000]">
          <div className="w-[90%] 800px:w-[40%] h-[90vh] bg-white rounded-md shadow-sm p-4">
            <div className="w-full flex justify-between items-center pb-2 border-b-2">
              <span className="800px:text-[18px] text-[16px] uppercase font-Roboto font-[500]">
                Thêm mới mã khuyến mãi
              </span>
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="mt-5">
                <label className="pb-2 text-[18px] font-Poppins font-[400] mt-5">
                  Tên khuyến mãi <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Vui lòng điền tên sản phẩm..."
                  value={name}
                  className="mt-2 appearance-none block w-[95%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <div className="mt-5">
                  <label className="pb-2 text-[18px] font-Poppins font-[400] mt-5">
                    Loại khuyến mãi
                    <i className="text-[12px] ml-2">*</i>
                  </label>
                  <select
                    className="w-[95%] border h-[35px] rounded-[5px]"
                    value={typeCode}
                    onChange={(e) => setTypeCode(e.target.value)}
                  >
                    <option value="select">Chọn</option>
                    <option value="ship">Vận chuyển</option>
                    <option value="total">Tổng sản phẩm</option>
                    <option value="all">Tất cả</option>
                  </select>
                </div>
                <div>
                  <div className="flex">
                    <label className="text-[18px] font-Poppins font-[400] mt-5">
                      {typeCode === "ship" ? "Phí ship" : "Tổng sản phẩm"}
                      <span className="ml-3 text-[14px] font-Poppins">
                        {formatDiscountValue(valueDiscount)}
                      </span>
                    </label>
                  </div>
                  <input
                    type="number"
                    name="valueDiscount"
                    placeholder={`Nhập giảm ${
                      typeCode === "ship" ? "vận chuyển" : "tổng đơn hàng"
                    }...`}
                    value={valueDiscount}
                    className="mt-2 appearance-none block w-[95%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="text-[18px] font-Poppins font-[400]">
                  Mã giảm giá
                </label>
                <div className="flex justify-between w-[95%] items-center">
                  <input
                    type="text"
                    name="code"
                    placeholder="Mã giảm giá..."
                    value={code}
                    className="mt-2 appearance-none block w-[60%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
                  />
                  <div
                    className={`${styles.button} w-[30%] h-[40px]`}
                    onClick={handleCreateCode}
                  >
                    Tạo mã
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <label className="pb-2 text-[18px] font-Poppins font-[400] mt-5">
                  Sản phẩm
                  <i className="text-[12px] ml-2">*</i>
                </label>
                <select
                  className="w-[95%] border h-[35px] rounded-[5px]"
                  id=""
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="Chọn sản phẩm được khuyến mãi">
                    Chọn sản phẩm được khuyến mãi
                  </option>
                  {products &&
                    products.map((i, index) => (
                      <option value={i.id} key={i.id}>
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mt-5">
                <label className="pb-2 text-[18px] font-Poppins font-[400] mt-5">
                  Số lượng
                </label>
                <input
                  type="number"
                  name="sum"
                  placeholder="Số lượng..."
                  value={sum}
                  className="mt-2 appearance-none block w-[95%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
                  onChange={(e) => setSum(e.target.value)}
                />
              </div>
              <div className="mb-4 mt-10">
                <input
                  type="submit"
                  value="Tạo mới"
                  className="mt-2 text-md hover:text-white bg-gray-200 cursor-pointer hover:bg-gray-600 mx-auto appearance-none block 800px:w-[20%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
                />
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="w-full">
        {coupouns &&
          coupouns.map((i, index) => (
            <div className="flex justify-between mx-auto w-[80%] bg-white shadow-2xl p-4 rounded-md mt-6 800px:h-[150px] h-[120px]">
              <div className="w-[300px]">
                <h1 className="800px:text-lg text-[12px] text-center">
                  Tên mã giảm giá
                </h1>
                <div className="800px:text-lg text-[12px] text-blue-500 mt-6">
                  {i.name.length > 30
                    ? `${i.name.substring(0, 30)}...`
                    : i.name}
                </div>
              </div>
              <div className="w-[150px]">
                <h1 className="800px:text-lg text-[12px] text-center">
                  Mã code
                </h1>
                <div className="800px:text-lg text-[12px] text-blue-500 mt-6 flex justify-center items-center">
                  {i.code}
                  <i>
                    <AiFillCopy
                      className="ml-4 cursor-pointer hover:scale-[1.2]"
                      color="#333"
                      onClick={() => copyCodeToClipboard(i.code)}
                    />
                  </i>
                </div>
              </div>
              <div className="w-[40px]">
                <h1 className="800px:text-lg text-[12px] text-center">Giảm</h1>
                <div className="800px:text-lg text-[12px] text-blue-500 mt-6 flex justify-center items-center">
                  {i.valueDiscount}
                </div>
              </div>
              <div className="w-[100px]">
                <h1 className="800px:text-lg text-[12px] text-center">
                  Số lượng
                </h1>
                <div className="800px:text-lg text-[12px] text-blue-500 mt-6 flex justify-center items-center">
                  {i.sum}
                </div>
              </div>

              <div className="hidden 800px:block">
                <span>Chức năng</span>
                <div className="flex justify-between mt-6">
                  <AiOutlineDelete
                    size={20}
                    color="red"
                    className="cursor-pointer hover:scale-[1.2]"
                    onClick={handleClick}
                  />
                  {isPopupVisible && (
                    <div
                      key={index}
                      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[20000]"
                    >
                      <div className="bg-white p-4 rounded-lg">
                        <p>Bạn có chắc chắn muốn xóa dữ liệu này không?</p>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded mt-[10%]"
                          onClick={() => handleDelete(i._id)}
                        >
                          Xác nhận
                        </button>
                        <button
                          className="bg-gray-300 px-2 py-1 rounded ml-5"
                          onClick={() => setIsPopupVisible(false)}
                        >
                          Đóng
                        </button>
                      </div>
                    </div>
                  )}
                  <AiOutlineEdit
                    size={20}
                    color="green"
                    className="cursor-pointer hover:scale-[1.2]"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllCoupounCode;
