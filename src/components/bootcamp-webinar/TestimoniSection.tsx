"use client";

import { useEffect, useRef, useState } from "react";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // include bold
  display: "swap",
});

type Testimonial = {
  id: number;
  company: string;
  companyLogo: string;
  text: string;
  name: string;
  position: string;
  photo: string;
  linkedinUrl: string;
};

export default function TestimoniSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      company: "BCA",
      companyLogo: "/assets/bootcamp-webinar/logo_perusahaan.png",
      text: "Kaget banget bisa keterima di Bank BCA sebagai Business Analyst! Semua tips dan triknya dari SkillSpace emang pas banget buat persiapan aku masuk BCA",
      name: "Fauziyah Rahman",
      position: "Business Analyst",
      photo: "/assets/bootcamp-webinar/logo_perusahaan.png",
      linkedinUrl: "#",
    },
    {
      id: 2,
      company: "BCA",
      companyLogo: "/assets/bootcamp-webinar/logo_perusahaan.png",
      text: "Kelas dan mentornya sangat membantu, penjelasannya detail banget dan relate sama dunia kerja nyata!",
      name: "Raka Pratama",
      position: "Data Analyst",
      photo: "/assets/bootcamp-webinar/logo_perusahaan.png",
      linkedinUrl: "#",
    },
    {
      id: 3,
      company: "BCA",
      companyLogo: "/assets/bootcamp-webinar/logo_perusahaan.png",
      text: "Sangat bermanfaat! Aku bisa langsung apply tips dari kelas buat dapetin pekerjaan pertamaku.",
      name: "Nadia Putri",
      position: "UI/UX Designer",
      photo: "/assets/bootcamp-webinar/logo_perusahaan.png",
      linkedinUrl: "#",
    },
  ];

  const allTestimonials = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    const speed = 0.8; // px per frame

    const animate = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += speed;
        const maxScroll = scrollContainer.scrollWidth / 3;
        if (scrollContainer.scrollLeft >= maxScroll) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isPaused]);

  // Handler untuk pause/resume pada mobile touch
  const handleTouchStart = () => {
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
  };

  return (
    <section
      className={`${poppins.className} w-full bg-white md:py-16 lg:py-10`}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-black mb-8 md:mb-6 px-6">
          Testimoni <span className="text-[#0E5AA6]">Alumni</span>
        </h2>

        {/* Carousel */}
        <div className="relative overflow-hidden">
          <div
            ref={scrollRef}
            className="overflow-x-hidden overflow-y-visible px-6 md:px-12 lg:px-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="flex gap-6">
              {allTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${index}`}
                  className="flex-shrink-0 w-[340px] sm:w-[400px] md:w-[480px] lg:w-[569px] h-[286px] bg-[#0056A3] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-full p-6 md:p-8 text-white flex flex-col justify-between">
                    {/* Company Logo */}
                    <div className="absolute top-2 right-4 w-9 h-9 rounded-full overflow-hidden">
                      <img
                        src={testimonial.companyLogo}
                        alt={testimonial.company}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Testimonial Text */}
                    <div className="pr-10 pt-4">
                      <p className="font-bold text-[15px] leading-relaxed line-clamp-4">
                        {testimonial.text}
                      </p>
                    </div>

                    {/* Profile + LinkedIn */}
                    <div className="space-y-4 pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-[#0056A3] font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-base md:text-lg leading-tight">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-white/90">
                            {testimonial.position}
                          </p>
                          <p className="text-sm text-white/90">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>

                      <a
                        href={testimonial.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#D9E6F1] hover:bg-gray-50 text-[#0056A3] py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 font-semibold transition-all duration-300 shadow-sm"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        <span>LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
