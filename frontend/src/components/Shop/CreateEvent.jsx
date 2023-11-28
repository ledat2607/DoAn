import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";

import { toast } from "react-toastify";
import { createevent } from "../../redux/actions/event";
const CreateEvent = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.events);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImage] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [stock, setStock] = useState();
  const [isPercentage, setIsPercentage] = useState(true);
  const [isTrue, setIsTrue] = useState(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  useEffect(() => {
    // dispatch(getAllProductsShop(seller._id));
    if (error) {
      toast.error(error);
    }
    if (success === true) {
      toast.success("Tạo mới thành công !");
      navigate("/dashboard");
    }
  }, [dispatch, error, success]);

  //Format dữ liệu theo dạng tiền tệ Việt Nam
  function formatVietnameseCurrency(number) {
    // Chia cho 1000 và làm tròn xuống để lấy phần nguyên
    let formattedNumber = Math.floor(number / 1000);

    // Nhân lại cho 1000 để có giá trị mong muốn
    formattedNumber *= 1000;

    // Sử dụng hàm toLocaleString để định dạng số theo ngôn ngữ và định dạng của Việt Nam
    let result = formattedNumber.toLocaleString("vi-VN");

    return result;
  }
  ///Thay đổi
  const handleMinAmountChange = (e) => {
    const value = e.target.value;
    setDiscountPercent(value);

    if (value <= 100) {
      setIsTrue(true);
    } else {
      setIsTrue(false);
    }
  };
  //thay đổi giá trị ngày bắt đầu và kết thúc
  const handleChangeEndDate = (e) => {
    const endDate = new Date(e.target.value);
    setEndDate(endDate);
  };
  const handleChangeStartDate = (e) => {
    const startDate = new Date(e.target.value);
    const minEndDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
    setStartDate(startDate);
    setEndDate(null);
    document.getElementById("end-date").min = minEndDate
      .toISOString()
      .slice(0, 10);
  };
  const today = new Date().toISOString().slice(0, 10);
  const minEndDate = startDate
    ? new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 10)
    : today;
  //Hàm submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", category);
    newForm.append("discountPercent", discountPercent);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    newForm.append("start_Date", startDate.toISOString());
    newForm.append("Finish_Date", endDate.toISOString());
    dispatch(createevent(newForm));
  };

  //Hàm thay đổi mảng chứa ảnh sản phẩm
  const handleChangeImage = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    setImage((prevImgaes) => [...prevImgaes, ...files]);
  };
  return (
    <div className="800px:w-[80%] mx-auto w-[90%] rounded-md bg-white shadow-lg h-[80vh] overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center font-[600] mt-5">
        Thêm mới sự kiện
      </h5>
      {/*create product*/}
      <form onSubmit={handleSubmit}>
        <div className="mt-5">
          <label className="pb-2 ml-12 text-[18px] font-Poppins font-[400] mt-5">
            Tên sự kiện <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Vui lòng điền tên sự kiện..."
            value={name}
            className="mt-2 mx-auto appearance-none block w-[90%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label className="pb-2 ml-12 text-[18px] font-Poppins font-[400] mt-5">
            Mô tả về sự kiện
            <i className="text-[12px] ml-2">(Dùng \n để xuống hàng)</i>
          </label>
          <textarea
            type="text"
            name="name"
            placeholder="Vui lòng điền mô tả sản phẩm..."
            value={description}
            className="mt-2 mx-auto appearance-none block w-[90%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label className="pb-2 ml-12 text-[18px] font-Poppins font-[400] mt-5">
            Sản phẩm khuyến mãi
            <i className="text-[12px] ml-2">*</i>
          </label>
          <select
            className="w-[90%] ml-12 border h-[35px] rounded-[5px]"
            id=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Chọn danh mục sản phẩm của bạn">
              Chọn danh mục sản phẩm
            </option>
            {categoriesData &&
              categoriesData.map((i, index) => (
                <option value={i.title} key={i.title}>
                  {i.title}
                </option>
              ))}
          </select>
        </div>

        <div className="flex">
          <div className="mt-5 w-[40%] flex">
            <label className="pb-2 ml-12 text-[18px] font-Poppins font-[400] mt-5">
              Khuyến mãi
              <div className="mt-1 text-[12px] text-red-600 relative">
                {isTrue
                  ? `${discountPercent}%`
                  : `${formatVietnameseCurrency(discountPercent)}`}
              </div>
            </label>
            <input
              type="number"
              name="discountPercent"
              placeholder="Khuyến mãi..."
              value={discountPercent}
              className="mt-2 ml-10 mx-auto appearance-none block w-[30%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
              onChange={handleMinAmountChange}
            />
          </div>
        </div>
        <div className="mt-5">
          <label className="pb-2 ml-10 text-[18px] font-Poppins font-[400] mt-5">
            Ngày bắt đầu
            <i className="text-[12px] ml-2">*</i>
          </label>
          <input
            type="date"
            // name="tags"
            id="start-date"
            value={startDate ? startDate.toISOString().slice(0, 10) : "null"}
            className="mt-2 mx-auto appearance-none block w-[90%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
            onChange={handleChangeStartDate}
            min={today}
          />
        </div>
        <div className="mt-5">
          <label className="pb-2 ml-10 text-[18px] font-Poppins font-[400] mt-5">
            Ngày kết thúc
            <i className="text-[12px] ml-2">*</i>
          </label>
          <input
            type="date"
            // name="tags"
            id="end-date"
            value={endDate ? endDate.toISOString().slice(0, 10) : "null"}
            className="mt-2 mx-auto appearance-none block w-[90%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
            onChange={handleChangeEndDate}
            min={minEndDate}
          />
        </div>
        <div className="mt-5">
          <label className="pb-2 ml-10 text-[18px] font-Poppins font-[400] mt-5">
            Số lượng nhập kho
            <i className="text-[12px] ml-2">*</i>
          </label>
          <input
            type="number"
            name="tags"
            placeholder="Vui lòng điền số lượng nhập kho..."
            value={stock}
            className="mt-2 mx-auto appearance-none block w-[90%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        <div className="mt-5">
          <label className="pb-2 ml-10 text-[18px] font-Poppins font-[400] mt-5">
            Hình ảnh sản phẩm
            <i className="text-[12px] ml-2">*</i>
          </label>
          <input
            type="file"
            name=""
            id="upload"
            className="hidden"
            onChange={handleChangeImage}
          />
          <div className="w-full items-center justify-between flex ">
            <div className="w-full items-center flex flex-wrap">
              <label htmlFor="upload">
                <AiOutlinePlusCircle size={30} className="mt-3" color="#555" />
              </label>
              {images &&
                images.map((i) => (
                  <img
                    src={URL.createObjectURL(i)}
                    key={i}
                    alt="img-p"
                    className="w-[120px] h-[120px] object-cover m-2"
                  />
                ))}
            </div>
            <div
              className="w-[50px] h-[50px] rounded-full cursor-pointer"
              onClick={(e) => setImage("")}
            >
              {images.length >= 1 ? (
                <AiOutlineDelete className="hover:scale-[1.2] hover:text-red-500" />
              ) : null}
            </div>
          </div>
        </div>
        <div className="mb-4 mt-10">
          <input
            type="submit"
            value="Tạo mới"
            className="mt-2 text-md hover:text-white bg-gray-200 cursor-pointer hover:bg-gray-600 mx-auto appearance-none block w-[20%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
