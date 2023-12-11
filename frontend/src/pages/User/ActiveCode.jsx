import React, { useState, useRef } from "react";
import styles from "../../styles/styles";
import { AiOutlineReload } from "react-icons/ai";

const ActiveCode = ({ verificationCode }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
  ]);

  const handleChange = (index, value) => {
    // Lọc chỉ giữ lại các chữ số
    const filteredValue = value.replace(/\D/g, "");

    // Cập nhật giá trị của input tại index
    setCode((prevCode) => {
      const newCode = [...prevCode];
      newCode[index] = filteredValue.slice(0, 1); // Only keep the first character
      return newCode;
    });

    // Nếu độ dài của giá trị tại index đạt đến 1, chuyển trỏ chuột đến input tiếp theo (nếu có)
    if (filteredValue.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }

    // Nếu giá trị của input tại index là rỗng và nút Backspace được nhấn, chuyển trỏ chuột về input trước đó (nếu có)
    if (filteredValue.length === 0 && index > 0) {
      const prevInputRef = inputRefs.current[index - 1];
      if (prevInputRef && prevInputRef.current) {
        // Kiểm tra xem input trước đó có tồn tại không
        prevInputRef.current.focus();
      }
    }
  };

  const handleReloadCode = () => {
    // You can call the server to request a new verification code here
    // and update the 'verificationCode' prop accordingly.
    // For now, let's simulate a new verification code.
    const newVerificationCode = Math.floor(100000 + Math.random() * 900000);
    alert(`Đã gửi lại mã xác nhận mới: ${newVerificationCode}`);
  };

  const handleConfirm = () => {
    // Join the entered code to compare with the verification code
    const enteredCode = code.join("");

    // Retrieve the verification code from local storage
    const storedVerificationCode = localStorage.getItem("verificationCode");

    if (enteredCode === storedVerificationCode) {
      // Codes match, show success message (replace with your actual success logic)
      alert("Mã xác nhận thành công!");
    } else {
      // Codes do not match, handle accordingly (replace with your actual error logic)
      alert("Mã xác nhận không đúng. Vui lòng kiểm tra lại!");
    }
  };

  return (
    <div className="h-[100vh] flex justify-center items-center w-full bg-gray-300">
      <div className="800px:w-[40%] rounded-xl shadow-2xl w-[95%] 800px:h-[50vh] bg-white">
        <h1 className="text-center font-[500] font-Roboto text-[20px] uppercase mt-4">
          Điền mã xác thực
        </h1>
        <p className="text-center text-[18px] font-Roboto mt-4">
          Vui lòng điền mã xác thực gồm 6 chữ số đã gửi đến email của bạn
        </p>
        <div className="w-full flex p-2 justify-between mt-4">
          {code.map((value, index) => (
            <input
              key={index}
              type="text"
              className={`${styles.input} !w-[50px] h-[50px] text-center`}
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              ref={inputRefs.current[index]}
              onKeyDown={(e) => {
                // Nếu nút Backspace được nhấn và giá trị tại index là rỗng, chuyển trỏ chuột về input trước đó (nếu có)
                if (e.key === "Backspace" && value === "") {
                  const prevIndex = index - 1;
                  const prevInputRef = inputRefs.current[prevIndex];

                  if (prevInputRef && prevInputRef.current) {
                    prevInputRef.current.focus();
                  }
                }
              }}
            />
          ))}
        </div>
        <div
          className="flex w-full hover:text-green-500 justify-center items-center cursor-pointer"
          onClick={handleReloadCode}
        >
          <AiOutlineReload />
          <p className="ml-4">Gửi lại mã</p>
        </div>
        <div
          className={`${styles.button} w-[100px] h-[40px] mx-auto mt-2`}
          onClick={handleConfirm}
        >
          Xác nhận
        </div>
      </div>
    </div>
  );
};

export default ActiveCode;
