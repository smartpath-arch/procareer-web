"use client";

import Image from "next/image";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { useState, useEffect } from "react";
import type React from "react";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

interface TestimonialData {
  name: string;
  role: string;
  company: string;
  testimonial: string;
  profileImage: string;
  companyLogo: string;
}

const AlumniTestimonial = ({
  testimonialData,
}: {
  testimonialData?: TestimonialData[];
}) => {
  const defaultTestimonialData: TestimonialData[] = [
    {
      name: "Citra Permatasari",
      role: "Marketing Officer",
      company: "BNI",
      testimonial:
        "Pernah ada masa di mana aku gak yakin sama jalur karirku, tapi SmartPath ngebantu aku bikin keputusan yang tepat. Sekarang aku jadi Marketing Officer di Bank BNI, dan aku sangat menikmati setiap harinya!",
      profileImage: "/assets/e-learning/cintapermatasari.webp",
      companyLogo: "/assets/mobile/home/testimonial/companies/bni.svg",
    },
    {
      name: "M. Putra",
      role: "Internal Audit",
      company: "PT Sinar Mas Agro Resources and Technology Tbk",
      testimonial:
        "Thanks SkillSpace! Program belajarnya berguna banget. Cara pengajarannya enak banget, bikin aku gampang ngerti. Ga nyesel ikut program ini. Sekarang aku kerja di P&G sebagai Data Analyst",
      profileImage: "/assets/e-learning/mputra.png",
      companyLogo: "/assets/mobile/home/testimonial/companies/sinarmas.png",
    },
    {
      name: "Rifandi R.",
      role: "O-Ranger Loket",
      company: "Pos Indonesia",
      testimonial:
        "Aku jadi lebih tahu cara mempersiapkan diri dengan baik setelah ikut SmartPath. Banyak hal yang sebelumnya aku anggap susah jadi lebih mudah dipahami di sini. Benar-benar bermanfaat!",
      profileImage: "/assets/e-learning/rifandi.webp",
      companyLogo: "/assets/mobile/home/testimonial/companies/posind.png",
    },
    {
      name: "Sri Intan",
      role: "Finance Officer",
      company: "Sari Roti",
      testimonial:
        "Dapet ilmu baru itu pasti, tapi di SmartPath aku juga dapet jaringan yang sangat luas! Banyak teman-teman baru yang punya visi yang sama, jadi makin semangat buat terus belajar dan berkembang",
      profileImage: "/assets/e-learning/sri_intan.jpeg",
      companyLogo: "/assets/mobile/home/testimonial/companies/sari_roti.png",
    },
    {
      name: "Naufal Alif",
      role: " ",
      company: "PT HM Sampoerna Tbk",
      testimonial:
        "Pengalamannya sangat luar biasa! Aku dapet banyak tips yang aplikatif dan langsung bisa dipakai di dunia nyata. SmartPath bener-bener ngajarin kita cara terbaik buat berkembang",
      profileImage: "/assets/e-learning/Naufal.jpg",
      companyLogo: "/assets/mobile/home/testimonial/companies/sampoerna.jpg",
    },
    {
      name: "Amelda Syakira",
      role: "Finance accounting",
      company: "PT. Cargill Indonesia",
      testimonial:
        "Sebelum ikut SmartPath, aku merasa masih kurang siap buat dunia kerja. Tapi setelah itu, aku jadi lebih ngerti banyak hal dan sekarang aku udah diterima di Cargill Indonesia di bagian Finance Accounting!",
      profileImage: "/assets/e-learning/Amelda.jpg",
      companyLogo: "/assets/mobile/home/testimonial/companies/cargill.jpg",
    },
    {
      name: "Surya Sukmana",
      role: "Administration support staff ",
      company: "PT Elnusa Tbk",
      testimonial:
        "Dari belajar di SmartPath, aku dapet banyak banget perspektif baru. Gak lama setelah itu, aku diterima di PT Elnusa dan kerja sebagai Administration support staff. Pengalaman yang bener-bener gak ternilai!",
      profileImage: "/assets/bootcamp-webinar/surya_sukmana.png",
      companyLogo: "/assets/mobile/home/testimonial/companies/elnusa.png",
    },
    {
      name: "Fandi Muhamad",
      role: "Engineer Process",
      company: "PT Medco Energi Internasional Tbk ",
      testimonial:
        "SmartPath berhasil ngubah cara pandang aku soal networking dan karir. Sekarang aku di PT Medco Energi Internasional, jadi bagian dari tim Engineer Process, dan aku ngerasa banget perbedaan cara kerja aku dari sebelumnya",
      profileImage: "/assets/bootcamp-webinar/Surya Darma.png",
      companyLogo: "/assets/mobile/home/testimonial/companies/medcoenergi.png",
    },
  ];

  const data = testimonialData || defaultTestimonialData;

  const [currentIndexMobile, setCurrentIndexMobile] = useState(0);
  const [currentIndexDesktop, setCurrentIndexDesktop] = useState(0);
  const [touchStartMobile, setTouchStartMobile] = useState(0);
  const [touchEndMobile, setTouchEndMobile] = useState(0);
  const [touchStartDesktop, setTouchStartDesktop] = useState(0);
  const [touchEndDesktop, setTouchEndDesktop] = useState(0);
  const [isDraggingDesktop, setIsDraggingDesktop] = useState(false);
  const [dragStartDesktop, setDragStartDesktop] = useState(0);
  const [dragEndDesktop, setDragEndDesktop] = useState(0);
  const [isPausedMobile, setIsPausedMobile] = useState(false);
  const [isPausedDesktop, setIsPausedDesktop] = useState(false);

  const testimonialPairs: TestimonialData[][] = [];
  for (let i = 0; i < data.length; i += 2) {
    testimonialPairs.push(data.slice(i, i + 2));
  }

  const getTestimonialFontSize = (text: string): string => {
    if (text.length < 150) return "text-lg";
    if (text.length < 250) return "text-base";
    return "text-sm";
  };

  const handleTouchStartMobile = (e: React.TouchEvent) => {
    setTouchStartMobile(e.targetTouches[0].clientX);
    setIsPausedMobile(true);
  };

  const handleTouchMoveMobile = (e: React.TouchEvent) => {
    setTouchEndMobile(e.targetTouches[0].clientX);
  };

  const handleTouchEndMobile = () => {
    if (!touchStartMobile || !touchEndMobile) {
      setIsPausedMobile(false);
      return;
    }
    const distance = touchStartMobile - touchEndMobile;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndexMobile((prev) => (prev + 1) % data.length);
    } else if (isRightSwipe) {
      setCurrentIndexMobile((prev) =>
        prev === 0 ? data.length - 1 : prev - 1,
      );
    }

    setTouchStartMobile(0);
    setTouchEndMobile(0);
    setIsPausedMobile(false);
  };

  const handleTouchStartDesktop = (e: React.TouchEvent) => {
    setTouchStartDesktop(e.targetTouches[0].clientX);
    setIsPausedDesktop(true);
  };

  const handleTouchMoveDesktop = (e: React.TouchEvent) => {
    setTouchEndDesktop(e.targetTouches[0].clientX);
  };

  const handleTouchEndDesktop = () => {
    if (!touchStartDesktop || !touchEndDesktop) {
      setIsPausedDesktop(false);
      return;
    }
    const distance = touchStartDesktop - touchEndDesktop;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      setCurrentIndexDesktop((prev) => (prev + 1) % testimonialPairs.length);
    } else if (isRightSwipe) {
      setCurrentIndexDesktop((prev) =>
        prev === 0 ? testimonialPairs.length - 1 : prev - 1,
      );
    }

    setTouchStartDesktop(0);
    setTouchEndDesktop(0);
    setIsPausedDesktop(false);
  };

  const handleMouseDownDesktop = (e: React.MouseEvent) => {
    setIsDraggingDesktop(true);
    setDragStartDesktop(e.clientX);
    setIsPausedDesktop(true);
  };

  const handleMouseMoveDesktop = (e: React.MouseEvent) => {
    if (!isDraggingDesktop) return;
    setDragEndDesktop(e.clientX);
  };

  const handleMouseUpDesktop = () => {
    if (!isDraggingDesktop) return;
    setIsDraggingDesktop(false);

    if (!dragStartDesktop || !dragEndDesktop) {
      setIsPausedDesktop(false);
      return;
    }
    const distance = dragStartDesktop - dragEndDesktop;
    const isLeftDrag = distance > 50;
    const isRightDrag = distance < -50;

    if (isLeftDrag) {
      setCurrentIndexDesktop((prev) => (prev + 1) % testimonialPairs.length);
    } else if (isRightDrag) {
      setCurrentIndexDesktop((prev) =>
        prev === 0 ? testimonialPairs.length - 1 : prev - 1,
      );
    }

    setDragStartDesktop(0);
    setDragEndDesktop(0);
    setIsPausedDesktop(false);
  };

  const handleMouseLeaveDesktop = () => {
    if (isDraggingDesktop) {
      setIsDraggingDesktop(false);
      setDragStartDesktop(0);
      setDragEndDesktop(0);
      setIsPausedDesktop(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausedMobile) {
        setCurrentIndexMobile((prev) => (prev + 1) % data.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [data.length, isPausedMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPausedDesktop) {
        setCurrentIndexDesktop((prev) => (prev + 1) % testimonialPairs.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonialPairs.length, isPausedDesktop]);

  return (
    <>
      {/* Mobile */}
      <section className="block md:hidden px-4 py-8 bg-[#FEFADD]">
        <h2
          className={`${plusJakartaSans.className} text-3xl font-bold text-center mb-6`}
        >
          <span className="text-[#1E1E1E]">Testimoni </span>
          <span className="text-[#2F184C]">Alumni</span>
        </h2>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndexMobile * 100}%)` }}
            onTouchStart={handleTouchStartMobile}
            onTouchMove={handleTouchMoveMobile}
            onTouchEnd={handleTouchEndMobile}
          >
            {data.map((testimonial, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <div className="relative bg-gradient-to-b from-[#CB66E8] to-[#2F184C] rounded-3xl p-6 shadow-lg flex flex-col justify-between min-h-[280px]">
                  <p
                    className={`${poppins.className} text-white ${getTestimonialFontSize(
                      testimonial.testimonial,
                    )} font-semibold leading-relaxed mb-4`}
                  >
                    {testimonial.testimonial}
                  </p>

                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 flex-shrink-0 bg-white rounded-full overflow-hidden">
                        <Image
                          src={testimonial.profileImage}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="w-full h-full rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3
                          className={`${poppins.className} text-white font-semibold text-sm`}
                        >
                          {testimonial.name}
                        </h3>
                        <p
                          className={`${poppins.className} text-white/90 text-xs`}
                        >
                          {testimonial.role}
                        </p>
                        <p
                          className={`${poppins.className} text-white/90 text-xs`}
                        >
                          {testimonial.company}
                        </p>
                      </div>
                    </div>

                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center p-2.5 shadow-md flex-shrink-0">
                      <Image
                        src={testimonial.companyLogo}
                        alt={testimonial.company}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Indicators for Mobile */}
          <div className="flex justify-center gap-2 mt-6">
            {data.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndexMobile(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndexMobile === index
                    ? "w-8 h-2 bg-[#2B5BA6]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Desktop Version */}
      <section className="hidden md:block px-8 py-8 bg-[#FEFADD]">
        <h2
          className={`${plusJakartaSans.className} text-5xl font-bold text-center mb-8`}
        >
          <span className="text-[#1E1E1E]">Testimoni </span>
          <span className="text-[#2F184C]">Alumni</span>
        </h2>

        <div className="relative overflow-hidden max-w-7xl mx-auto">
          <div
            className="flex transition-transform duration-500 ease-in-out cursor-grab active:cursor-grabbing select-none"
            style={{ transform: `translateX(-${currentIndexDesktop * 100}%)` }}
            onTouchStart={handleTouchStartDesktop}
            onTouchMove={handleTouchMoveDesktop}
            onTouchEnd={handleTouchEndDesktop}
            onMouseDown={handleMouseDownDesktop}
            onMouseMove={handleMouseMoveDesktop}
            onMouseUp={handleMouseUpDesktop}
            onMouseLeave={handleMouseLeaveDesktop}
          >
            {testimonialPairs.map((pair, pairIndex) => (
              <div
                key={pairIndex}
                className="w-full flex-shrink-0 flex gap-6 px-4"
              >
                {pair.map((testimonial, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="flex-1 relative overflow-hidden shadow-xl bg-gradient-to-b from-[#CB66E8] to-[#2F184C]"
                    style={{
                      minHeight: "260px",
                      borderRadius: "24px 0 24px 0",
                    }}
                  >
                    <div className="relative h-full p-8 flex flex-col justify-between">
                      <p
                        className={`${poppins.className} text-white ${getTestimonialFontSize(
                          testimonial.testimonial,
                        )} font-semibold leading-relaxed mb-6`}
                      >
                        {testimonial.testimonial}
                      </p>
                      <div className="flex items-center justify-between gap-4 mt-auto">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 flex-shrink-0 bg-white rounded-full overflow-hidden">
                            <Image
                              src={testimonial.profileImage}
                              alt={testimonial.name}
                              width={64}
                              height={64}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3
                              className={`${poppins.className} text-white font-bold text-base`}
                            >
                              {testimonial.name}
                            </h3>
                            <p
                              className={`${poppins.className} text-white/90 text-sm`}
                            >
                              {testimonial.role}
                            </p>
                            <p
                              className={`${poppins.className} text-white/90 text-sm`}
                            >
                              {testimonial.company}
                            </p>
                          </div>
                        </div>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-3 shadow-lg flex-shrink-0">
                          <Image
                            src={testimonial.companyLogo}
                            alt={testimonial.company}
                            width={48}
                            height={48}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Carousel Indicators for Desktop */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonialPairs.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndexDesktop(index)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndexDesktop === index
                    ? "w-8 h-2 bg-[#2B5BA6]"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to testimonial pair ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AlumniTestimonial;
