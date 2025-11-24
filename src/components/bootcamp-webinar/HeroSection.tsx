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
        <div className="relative min-h-[300px] md:h-[500px] lg:h-[550px] rounded-b-[30px] md:rounded-b-[50px] overflow-visible bg-gradient-to-b from-[#011681] to-[#06ACDE]">
          {/* Responsive padding */}
          <div className="h-full pb-[3px] px-5 sm:px-6 md:px-8  lg:pl-[80px] lg:pr-[60px]">
            {/* Responsive grid: mobile stack, desktop side-by-side */}
            <div className="h-full flex flex-col md:grid md:items-center md:grid-cols-1 lg:grid-cols-[0.85fr_auto] gap-0 py-8 md:py-0">
              {/* Left content */}
              <div className="z-10 text-white w-full md:max-w-[900px] lg:max-w-none lg:pr-0 order-2 md:order-1 lg:-mt-12 xl:-mt-20">
                {/* Mobile heading */}
                <h1
                  className={`md:hidden ${plusJakarta.className} font-extrabold text-white text-center
                    text-[28px] leading-[36px] sm:text-[36px] sm:leading-[44px] tracking-[-0.016em]`}
                >
                  <span className="block">Bootcamp & Webinar</span>
                  <span className="block">yang bikin kamu cepat</span>
                  <span className="block">dapat kerja di Top</span>
                  <span className="block">Company</span>
                </h1>
                {/* Desktop heading */}
                <h1
                  className={`hidden md:block ${plusJakarta.className} font-extrabold text-white text-left
                    md:text-[42px] md:leading-[50px] lg:text-[46px] lg:leading-[56px] tracking-[-0.016em]`}
                >
                  <span className="block lg:whitespace-nowrap">
                    Bootcamp & Webinar yang
                  </span>
                  <span className="block lg:whitespace-nowrap">
                    bikin kamu cepat dapat kerja
                  </span>
                  <span className="block lg:whitespace-nowrap">
                    di Top Company
                  </span>
                </h1>
                <div className="hidden md:block mt-4 md:mt-7 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[450px] xl:max-w-[480px] h-[3px] rounded md:h-[4px] bg-[#AFC6FF]" />
              </div>

              {/* Mobile image */}
              <div className="md:hidden flex justify-center order-1">
                <Image
                  src="/assets/bootcamp-webinar/hero-bootcamp.svg"
                  alt="Bootcamp Webinar"
                  width={400}
                  height={300}
                  className="h-auto w-full max-w-[320px] object-contain"
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
                    src="/assets/bootcamp-webinar/hero-bootcamp.svg"
                    alt="Bootcamp Webinar"
                    width={850}
                    height={600}
                    className="absolute 
                      md:bottom-[-60px] md:right-0
                      lg:bottom-[-21px] lg:right-0
                      h-auto w-full max-w-[450px] 
                      lg:h-[600px] lg:w-[750px] 
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
