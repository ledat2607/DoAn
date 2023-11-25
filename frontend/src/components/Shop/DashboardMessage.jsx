import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { server } from "../../server";
import { useNavigate } from "react-router-dom";
import {
  AiFillForward,
  AiOutlineArrowLeft,
  AiOutlineDelete,
  AiOutlineInfo,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { IoSend } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { MdKeyboardVoice } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
const DashboardMessage = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const messageList = axios
      .get(`${server}/conversation/get-all-conversation-seller/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [seller]);

  return (
    <div className="800px:w-[70%] w-[95%] bg-white m-5 h-[85vh] overflow-y-scroll rounded-md shadow-2xl">
      {!open && (
        <>
          <h1 className="text-center font-[500] text-[30px] font-Roboto uppercase mt-2">
            Tất cả đoạn chat
          </h1>
          {/*All message list */}
          {conversations &&
            conversations.map((i, index) => (
              <MessageList
                data={i}
                index={index}
                key={index}
                setOpen={setOpen}
              />
            ))}
        </>
      )}
      {open && <SellerInbox setOpen={setOpen} />}
    </div>
  );
};
const MessageList = ({ data, index, setOpen }) => {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  return (
    <div
      className={`${
        active === index ? "bg-[#00000010]" : "bg-transparent"
      } w-full items-center flex p-2 px-2 my-3 cursor-pointer`}
      onClick={(e) => setActive(index) || handleClick(data?._id)}
    >
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
const SellerInbox = ({ setOpen }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const handleBack = () => {
    setOpen(false);
  };
  const handleSendMessage = () => {
    sendMessage(message);
  };

  const sendMessage = (content) => {
    console.log("Sending message:", content);
    // Thực hiện gửi tin nhắn logic tương ứng ở đây
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setMessage(locationLink);
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleVoiceClick = () => {
    if (!isListening) {
      startListening();
    } else {
      stopListening();
    }
  };
  const startListening = () => {
    const newRecognition = new window.webkitSpeechRecognition();
    newRecognition.continuous = true;
    newRecognition.lang = "vi-VN";

    newRecognition.onstart = () => {
      setIsListening(true);
    };

    newRecognition.onend = () => {
      setIsListening(false);
    };

    newRecognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setMessage((prevMessage) => prevMessage + " " + transcript);
      console.log("Speech recognition result:", transcript);
    };

    newRecognition.start();
    setRecognition(newRecognition);
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  useEffect(() => {
    return () => {
      if (isListening) {
        stopListening();
      }
    };
  }, [isListening]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
      setMessage("");
    }
  };
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/*message header */}
      <div className="w-[100%] flex bg-slate-400 h-[70px] sticky">
        <div className="w-[50%] flex items-center">
          <AiOutlineArrowLeft
            size={25}
            className="hover:scale-[1.2] hover:text-white cursor-pointer ml-2"
            onClick={handleBack}
          />
          <div className="flex items-center">
            <img
              src="Http://localhost:8000/4-1700490274290-214173217.png"
              alt=""
              className="800px:w-[50px] 800px:h-[50px] w-[40px] h-[40px] rounded-full 800px:ml-8 ml-2 mt-2"
            />
            <div className="ml-3">
              <h1 className="font-[500] font-Poppins">Test</h1>
              <i className="800px:text-[12px] text-[8px]">Đang hoạt động</i>
            </div>
          </div>
        </div>
        <div className="w-[50%] flex items-center justify-end pr-3">
          <AiOutlineInfo
            size={25}
            className="hover:scale-[1.2] hover:text-yellow-500 cursor-pointer"
          />
          <AiOutlineDelete
            size={25}
            className="hover:scale-[1.2] hover:text-red-500 cursor-pointer"
          />
        </div>
      </div>
      {/*send message input */}
      <form
        aria-required={true}
        className="p-3 relative w-full flex justify-between bg-gray-200"
      >
        <div className="w-[20%] h-[45px] flex items-center">
          <FaLocationDot
            className="cursor-pointer hover:scale-[1.2] hover:text-green-500"
            size={20}
            onClick={handleLocationClick}
          />
          <MdKeyboardVoice
            className=" ml-4 cursor-pointer hover:scale-[1.2]"
            size={20}
            onClick={handleVoiceClick}
          />
          <GrGallery
            className=" ml-4 cursor-pointer hover:scale-[1.2]"
            size={20}
          />
        </div>
        <div className="w-[80%]">
          <input
            type="text"
            required
            placeholder="Soạn tin nhắn..."
            className={`${styles.input} !h-[45px] ring-1 focus:ring-blue-500 border focus:border-blue-400`}
            onKeyDown={handleKeyPress}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div
            className="absolute right-4 flex justify-center items-center top-4 w-[35px] h-[35px] rounded-full bg-blue-300 hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            <IoSend
              size={20}
              className="cursor-pointer  hover:text-white ml-1"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default DashboardMessage;
