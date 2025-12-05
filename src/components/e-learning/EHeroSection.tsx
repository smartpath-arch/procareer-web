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
        {/* Background color + rounded bottom */}
        <div className="relative min-h-[300px] md:h-[500px] lg:h-[550px] rounded-b-[30px] md:rounded-b-[50px] overflow-hidden bg-gradient-to-b from-[#86beff] to-[#5c89c7]">
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
                <div className="hidden md:block mt-4 md:mt-7 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[450px] xl:max-w-[480px] h-[3px] rounded md:h-[4px] bg-white" />
              </div>

              {/* Mobile image */}
              <div className="md:hidden flex justify-end order-1">
                <Image
                  src="/assets/e-learning/elearningskillspace2.png"
                  alt="Bootcamp Webinar"
                  width={300}
                  height={200}
                  className="h-auto w-full max-w-[280px] object-contain mr-[10px]"
                  priority
                />
              </div>

              {/* Desktop image */}
              <div className="hidden md:block relative w-full lg:w-auto md:order-1">
                <div
                  className="relative md:h-[400px] lg:h-[500px] w-full lg:w-[650px] xl:w-[750px]"
                  style={{ marginRight: "clamp(0px, 6vw, 140px)" }}
                >
                  <Image
                    src="/assets/e-learning/elearningskillspace2.png"
                    alt="Bootcamp Webinar"
                    width={750}
                    height={500}
                    className="absolute
                      md:bottom-[-50px] md:right-[-20px]
                      lg:bottom-[-30px] lg:right-[-50px]
                      h-auto w-full max-w-[350px]
                      lg:h-[400px] lg:w-[600px]
                      xl:h-[500px] xl:w-[700px]
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
