import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

export default function EHeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="mx-auto max-w-none bg-white mb-2">
        {/* Background gradient + rounded bottom */}
        <div className="relative min-h-[300px] md:h-[500px] lg:h-[550px] rounded-b-[30px] md:rounded-b-[50px] overflow-hidden bg-gradient-to-b from-[#011681] to-[#06ACDE]">
          {/* Responsive padding */}
          <div className="h-full pb-[3px] px-5 sm:px-6 md:px-8  lg:pl-[80px] lg:pr-[60px]">
            {/* Responsive grid: mobile stack, desktop side-by-side */}
            <div className="h-full flex flex-col md:grid md:items-center md:grid-cols-1 lg:grid-cols-[0.85fr_auto] gap-0 py-8 md:py-0">
              {/* Left content */}
              <div className="z-10 text-white w-full md:max-w-[900px] lg:max-w-none lg:pr-0 order-2 md:order-1 lg:-mt-12 xl:-mt-20">
                <h1
                  className={`${plusJakarta.className} font-extrabold text-white text-center md:text-left
                    text-[28px] leading-[36px] sm:text-[36px] sm:leading-[44px]
                    md:text-[42px] md:leading-[50px] lg:text-[46px] lg:leading-[56px] tracking-[-0.016em]`}
                >
                  <span className="block lg:whitespace-nowrap">
                    Belajar Fleksibel yang Bikin
                  </span>
                  <span className="block lg:whitespace-nowrap">
                    Kamu Cepat Dapat Kerja
                  </span>
                </h1>
                <div
                  className="hidden md:block mt-4 md:mt-7 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[450px] xl:max-w-[480px] h-[3px] rounded md:h-[4px]"
                  style={{ background: "#AFC6FF" }}
                />
              </div>

              {/* Mobile image */}
              <div className="md:hidden flex justify-center order-1">
                <Image
                  src="/assets/e-learning/elearningskillspace.png"
                  alt="Bootcamp Webinar"
                  width={400}
                  height={300}
                  className="h-auto w-full max-w-[300px] object-contain"
                  priority
                />
              </div>

              {/* Desktop image */}
              <div className="hidden md:block relative w-full lg:w-auto md:order-1">
                <div
                  className="relative md:h-[500px] lg:h-[600px] w-full lg:w-[750px] xl:w-[850px]"
                  style={{ marginRight: "clamp(0px, 6vw, 140px)" }}
                >
                  <Image
                    src="/assets/e-learning/elearningskillspace.png"
                    alt="Bootcamp Webinar"
                    width={850}
                    height={600}
                    className="absolute
                      md:bottom-[-60px] md:right-0
                      lg:bottom-[-21px] lg:right-0
                      h-auto w-full max-w-[450px]
                      lg:h-[550px] lg:w-[750px]
                      xl:h-[650px] xl:w-[850px]
                      lg:max-w-none object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
