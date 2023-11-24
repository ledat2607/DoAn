import React from "react";

const DashboardMessage = () => {
  return (
    <div className="w-[90%] bg-white m-5 h-[85vh] overflow-y-scroll rounded-md shadow-2xl">
      <h1 className="text-center font-[500] text-[30px] font-Roboto uppercase mt-2">
        Tất cả đoạn chat
      </h1>
      {/*All message list */}
      <MessageList />
    </div>
  );
};
const MessageList = () => {
  return (
    <div className="w-full items-center flex p-2 px-2 my-3 bg-[#00000010] cursor-pointer">
      <div className="relative">
        <img
          src="Http://localhost:8000/4-1700490274290-214173217.png"
          alt=""
          className="w-[40px] h-[40px] rounded-full"
        />
        <div className="w-[15px] h-[15px] bg-green-400 rounded-full absolute top-[65%] left-[70%]"></div>
      </div>
      <div className="pl-3">
        <h1 className="800px:text-[18px] text-[12px]">Test</h1>
        <p className="800px:text-[18px] text-[12px] text-gray-400">Bạn:Hello</p>
      </div>
    </div>
  );
};
export default DashboardMessage;
