"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import imageSwiper1 from "@/assets/Gemini_Generated_Image_2y531o2y531o2y53.png";
import imageSwiper2 from '@/assets/Gemini_Generated_Image_q999rfq999rfq999.png'
import imageSwiper3 from '@/assets/Gemini_Generated_Image_tav4n5tav4n5tav4.png'

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./styles.css";
import Image from "next/image";

const SwiperImg = () => {
  return (
    <div className="w-[100%] md:h-[500px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Image src={imageSwiper1} alt="image 1"/></SwiperSlide>
        <SwiperSlide><Image src={imageSwiper2} alt="image 2"/></SwiperSlide>
        <SwiperSlide><Image src={imageSwiper3} alt="image 3"/></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperImg;
