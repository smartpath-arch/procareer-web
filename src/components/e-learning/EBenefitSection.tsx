"use client";

import { Roboto } from "next/font/google";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Navigation } from "swiper/modules";
import { Crown, Award, Circle } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

interface BenefitPackage {
  packageName: string;
  packageType: "Exclusive" | "Premium" | "Basic";
  benefits: string[];
}

const TYPE_CONFIG = {
  Exclusive: {
    icon: Crown,
    color: "text-yellow-600",
    borderColor: "border-yellow-600",
  },
  Premium: {
    icon: Award,
    color: "text-purple-900",
    borderColor: "border-purple-900",
  },
  Basic: {
    icon: Circle,
    color: "text-emerald-600",
    borderColor: "border-emerald-600",
  },
};

export default function EBenefitSection() {
  const benefitPackages: BenefitPackage[] = [
    {
      packageName: "Paket Exclusive",
      packageType: "Exclusive",
      benefits: [
        "Seluruh Benefit Paket Premium",
        "Dibuatkan CV Standar Top Company Impianmu",
        "Portofolio Standar Top Company",
        "1 on 1 Private Consultation",
        "35+ Materi Exclusive",
      ],
    },
    {
      packageName: "Paket Premium",
      packageType: "Premium",
      benefits: [
        "E-Certificate",
        "Grup Info Loker/Magang & Networking Eksklusif",
        "Ebook Career and Self Development",
        "15+ Materi Premium",
      ],
    },
    {
      packageName: "Paket Basic",
      packageType: "Basic",
      benefits: ["E-Certificate", "1-5 Materi Berkualitas"],
    },
  ];
  const handleTouchStart = (swiper: SwiperType) => {
    if (swiper.autoplay?.running) {
      swiper.autoplay.stop();
    }
  };
  const handleTouchEnd = (swiper: SwiperType) => {
    if (swiper.autoplay && !swiper.autoplay.running) {
      swiper.autoplay.start();
    }
  };

  return (
    <section className="w-full bg-white py-6 md:py-8 lg:py-12">
      <div className="max-w-7xl lg:max-w-[1400px] xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 md:mb-8 lg:mb-6">
          Benefit
        </h2>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          speed={800}
          coverflowEffect={{
            rotate: 0,
            stretch: 80,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          navigation={{
            nextEl: ".benefit-swiper-button-next",
            prevEl: ".benefit-swiper-button-prev",
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          modules={[EffectCoverflow, Autoplay, Navigation]}
          className="benefit-swiper"
          style={{
            padding: "20px 0",
          }}
        >
          {benefitPackages.map((pkg, index) => {
            const IconComponent = TYPE_CONFIG[pkg.packageType].icon;
            const iconColor = TYPE_CONFIG[pkg.packageType].color;
            const borderColor = TYPE_CONFIG[pkg.packageType].borderColor;

            return (
              <SwiperSlide
                key={index}
                className="benefit-slide"
                style={{
                  width: "400px",
                  maxWidth: "85vw",
                }}
              >
                <div
                  className={`bg-white rounded-3xl p-8 md:p-10 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_70px_rgba(0,0,0,0.2)] relative overflow-hidden border-2 ${borderColor} transition-all duration-500 ${
                    pkg.benefits.length === 1
                      ? "benefit-card-basic"
                      : "benefit-card-standard"
                  }`}
                >
                  {/* Package Name */}
                  <div className="mb-6 md:mb-8 lg:mb-5">
                    <div className="flex items-center gap-3 mb-3">
                      <IconComponent
                        className={`w-8 h-8 md:w-10 md:h-10 ${iconColor}`}
                      />
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900">
                        {pkg.packageName}
                      </h3>
                    </div>
                    <div
                      className={`w-20 h-1.5 ${borderColor.replace("border", "bg")} rounded-full`}
                    ></div>
                  </div>
                  <div className="space-y-4 md:space-y-5 lg:space-y-3.5">
                    {pkg.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-start gap-4 md:gap-5 group"
                      >
                        <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#F2BD0F] via-[#F2C94C] to-[#F2A20F] rounded-full flex items-center justify-center shadow-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-300">
                          <svg
                            className="w-5 h-5 md:w-6 md:h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <p
                          className={`${roboto.className} text-gray-800 text-base md:text-xl font-semibold leading-relaxed flex-1 pt-0.5`}
                        >
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div className="benefit-swiper-button-prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </div>
        <div className="benefit-swiper-button-next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>

        <style jsx global>{`
          .benefit-swiper-button-prev,
          .benefit-swiper-button-next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 50px;
            height: 50px;
            background-color: #1f2937;
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            z-index: 20;
            transition: all 0.3s ease;
            color: white;
          }
          .benefit-swiper-button-prev:hover,
          .benefit-swiper-button-next:hover {
            background-color: #111827;
            transform: translateY(-50%) scale(1.1);
          }
          .benefit-swiper-button-prev.swiper-button-disabled,
          .benefit-swiper-button-next.swiper-button-disabled {
            opacity: 0.35;
            cursor: not-allowed;
          }
          .benefit-swiper-button-prev {
            left: 10px;
          }
          .benefit-swiper-button-next {
            right: 10px;
          }
          @media (min-width: 768px) {
            .benefit-swiper-button-prev,
            .benefit-swiper-button-next {
              display: flex;
            }
            .benefit-swiper-button-prev {
              left: 20px;
            }
            .benefit-swiper-button-next {
              right: 20px;
            }
          }
          @media (min-width: 1024px) {
            .benefit-swiper-button-prev,
            .benefit-swiper-button-next {
              width: 60px;
              height: 60px;
            }
          }
          .benefit-swiper .swiper-slide {
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0.3;
            filter: blur(1px);
          }
          .benefit-swiper .swiper-slide-active {
            opacity: 1;
            z-index: 10;
            filter: blur(0);
            transform: scale(1.02);
          }
          .benefit-swiper .swiper-slide-prev,
          .benefit-swiper .swiper-slide-next {
            opacity: 0.5;
            filter: blur(0.5px);
          }
          .benefit-card-basic {
            min-height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .benefit-card-standard {
            min-height: 300px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }
          @media (min-width: 1024px) {
            .benefit-slide {
              width: 480px !important;
            }
            .benefit-card-basic {
              min-height: 320px;
            }
            .benefit-card-standard {
              min-height: 320px;
            }
          }
          @media (min-width: 1280px) {
            .benefit-slide {
              width: 520px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
