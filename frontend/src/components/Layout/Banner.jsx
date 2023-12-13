import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import b1 from "../../banner/b1.jpg";
import b2 from "../../banner/b2.jpg";
import b3 from "../../banner/b3.jpg";
import b4 from "../../banner/b4.jpg";
import b5 from "../../banner/b5.jpg";
import b6 from "../../banner/b6.jpg";

const Banner = () => {
  const banners = [b1, b2, b3, b4, b5, b6];

  return (
    <>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        className="mySwiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <img
              src={banner}
              alt={`Slide ${index + 1}`}
              className="w-full h-[40vh] object-center"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Banner;
