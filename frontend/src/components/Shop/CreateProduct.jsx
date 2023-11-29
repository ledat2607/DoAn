import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoriesData } from "../../static/data";
import {
  AiFillPlusCircle,
  AiOutlineArrowRight,
  AiOutlineDelete,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { createProduct } from "../../redux/actions/product";
import { toast } from "react-toastify";
const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [images, setImage] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState();
  const [discount, setDiscount] = useState("");
  const [isPercentage, setIsPercentage] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
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
  //Thay đổi và hiển thị phần discount
  const handleDiscountChange = (e) => {
    const value = e.target.value;
    setDiscount(value);

    if (value <= 100) {
      setIsPercentage(true);
    } else {
      setIsPercentage(false);
    }
  };
  //Tính số tiền ở discountPrice
  const calculateDiscountPrice = () => {
    if (discount === "") {
      // Nếu discount rỗng, gán discountPrice bằng originalPrice
      setDiscountPrice(originalPrice);
    } else if (isPercentage) {
      const percentage = (100 - parseFloat(discount)) / 100;
      setDiscountPrice(originalPrice * percentage);
    } else {
      setDiscountPrice(originalPrice - parseFloat(discount));
    }
  };
  //Hàm submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newForm = new FormData();
    images.forEach((image) => {
      newForm.append("images", image);
    });
    newForm.append("name", name);
    newForm.append("description", description);
    newForm.append("category", selectedCategory);
    newForm.append("brand", selectedBrand);
    newForm.append("tags", tags);
    newForm.append("originalPrice", originalPrice);
    newForm.append("discountPrice", discountPrice);
    newForm.append("discount", discount);
    newForm.append("stock", stock);
    newForm.append("shopId", seller._id);
    dispatch(createProduct(newForm));
  };

  //Hàm thay đổi mảng chứa ảnh sản phẩm
  const handleChangeImage = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    setImage((prevImgaes) => [...prevImgaes, ...files]);
  };
  return (
    <div className="800px:w-[65%] 800px:mx-auto w-[95%] rounded-md bg-white shadow-lg h-[80vh] overflow-y-scroll">
      <h5 className="800px:text-[30px] text-[25px] font-Poppins text-center font-[600] mt-5">
        Thêm mới sản phẩm
      </h5>
      {/*create product*/}
      <div className="800px:ml-6 ml-2 w-full">
        <form onSubmit={handleSubmit}>
          <div className="mt-5">
            <label className="pb-2 800px:text-[18px] text-[13px] font-Poppins font-[600] mt-5">
              Tên sản phẩm <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Vui lòng điền tên sản phẩm..."
              value={name}
              className="mt-2 text-[14px] appearance-none block w-[87%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label className="pb-2 800px:text-[18px] text-[13px] font-Poppins font-[600] mt-5">
              Mô tả về sản phẩm
              <i className="800px:text-[12px]  text-[10px] ml-2">
                (Dùng \n để xuống hàng)
              </i>
            </label>
            <textarea
              type="text"
              name="name"
              placeholder="Vui lòng điền mô tả sản phẩm..."
              value={description}
              className="mt-2  appearance-none block w-[87%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label className="pb-2  800px:text-[18px] text-[13px] font-Poppins font-[600] mt-5">
              Danh mục sản phẩm
              <i className="800px:text-[12px] text-[10px] ml-2">*</i>
            </label>
            <select
              className="w-[87%]  border h-[35px] rounded-[5px]"
              id=""
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
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

            {selectedCategory !== "Chọn danh mục sản phẩm của bạn" ? (
              <div className="mt-5">
                <label className="pb-2  800px:text-[18px] text-[13px] font-Poppins font-[600] mt-5">
                  Thương hiệu{" "}
                  <i className="800px:text-[12px] text-[10px] ml-2">*</i>
                </label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Vui lòng nhập thương hiệu..."
                  value={selectedBrand}
                  className="mt-2   appearance-none block w-[87%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
                  onChange={(e) => setSelectedBrand(e.target.value)}
                />
              </div>
            ) : null}
          </div>
          <div className="mt-5">
            <label className="pb-2 800px:text-[18px] text-[13px] font-Poppins font-[600] mt-5">
              Danh mục liên quan
              <i className="800px:text-[12px] text-[10px] ml-2">*</i>
            </label>
            <input
              type="text"
              name="tags"
              placeholder="Danh mục liên quan..."
              value={tags}
              className="mt-2  appearance-none block w-[87%]  px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="800px:flex items-center w-full">
            <div className="mt-5 800px:w-[30%]">
              <label className="pb-2  800px:text-[18px] text-[13px] font-Poppins font-[600] mt-5">
                Giá gốc
                <i className="ml-2 800px:text-[12px] text-[10px] text-red-500">
                  {formatVietnameseCurrency(originalPrice)}
                </i>
              </label>
              <input
                type="number"
                name="originalPrice"
                placeholder="Vui lòng nhập giá gốc..."
                value={originalPrice}
                className="mt-2   appearance-none block w-[87%]  px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
            </div>
            <span className="text-redd-500 mt-12 ">
              <AiOutlineArrowRight className="hidden 800px:block" />
            </span>
            <div className="mt-5 800px:w-[30%]">
              <label className="pb-2 ml-3 800px:text-[18px] text-[13px] font-Poppins font-[600] mt-5">
                Khuyến mãi
                <span className="ml-2 800px:text-[12px] text-[10px] text-blue-400">
                  {isPercentage
                    ? `${discount}%`
                    : `${formatVietnameseCurrency(discount)}`}
                </span>
              </label>
              <input
                type="number"
                name="originalPrice"
                placeholder="Khuyến mãi..."
                value={discount}
                className="mt-2  appearance-none block w-[87%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
                onChange={handleDiscountChange}
                onBlur={calculateDiscountPrice}
              />
            </div>
            <span>
              <AiOutlineArrowRight
                className="mt-12 hidden 800px:block"
                color="red"
              />
            </span>
            <div className="mt-5">
              <label className="pb-2 ml-3 800px:text-[18px] text-[13px] font-Poppins font-[600] mt-5">
                Giá khuyến mãi
                <i className="800px:text-[12px] text-[10px] ml-2 text-green-500">
                  {formatVietnameseCurrency(discountPrice)}
                </i>
              </label>
              <input
                disabled
                type="number"
                name="discountPrice"
                placeholder="Giá khuyến mãi..."
                value={discountPrice}
                className="mt-2  appearance-none block w-[87%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-5">
            <label className="pb-2  800px:text-[18px] text-[13px] font-Poppins font-[600] mt-5">
              Số lượng nhập kho
              <i className="800px:text-[12px] text-[10px] ml-2">*</i>
            </label>
            <input
              type="number"
              name="tags"
              placeholder="Vui lòng điền số lượng nhập kho..."
              value={stock}
              className="mt-2  appearance-none block w-[87%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label className="pb-2 800px:text-[18px] text-[13px] font-Poppins font-[600] mt-5">
              Hình ảnh sản phẩm
              <i className="800px:text-[12px] text-[10px] ml-2">*</i>
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
                  <AiOutlinePlusCircle
                    size={30}
                    className="mt-3"
                    color="#555"
                  />
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
              className="mt-2 text-md hover:text-white bg-gray-200 cursor-pointer hover:bg-gray-600 mx-auto appearance-none block 800px:w-[20%] px-3 h-[35px] border border-gray-300 rounded-[5px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 text-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
