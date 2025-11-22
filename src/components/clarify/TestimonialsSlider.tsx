"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { clarifyTestimonials } from "@/lib/testimonials/clarifyTestimonials";

const PrevArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);

const NextArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

export default function TestimonialsSlider() {
  return (
    <div className="w-full max-w-sm mx-auto relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        className="pb-8"
      >
        {clarifyTestimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center justify-center">
              <Image
                src={testimonial.image}
                alt={testimonial.alt}
                width={400}
                height={400}
                className="rounded-2xl shadow-lg border border-gray-100"
                style={{ objectFit: "contain" }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev-custom absolute top-1/2 left-[-1rem] transform -translate-y-1/2 text-black bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-md z-10">
        <PrevArrow />
      </div>
      <div className="swiper-button-next-custom absolute top-1/2 right-[-1rem] transform -translate-y-1/2 text-black bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer shadow-md z-10">
        <NextArrow />
      </div>
    </div>
  );
}
