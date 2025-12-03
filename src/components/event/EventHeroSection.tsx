import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

export default function EventHeroSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Mobile - Home-style banner */}
      <div className="md:hidden w-full bg-white mb-4">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#5C89C7] to-[#86BEFF] rounded-b-[40px] pt-6 pb-8">
          <div className="w-full flex justify-center -mb-2 pb-4">
            <Image
              src="/assets/event/event-hero1.png"
              alt="Event"
              width={220}
              height={360}
              className="w-[65%] h-auto object-contain"
              priority
            />
          </div>
          <div className="px-6 text-center">
            <h1
              className={`${plusJakarta.className} text-white font-extrabold
        text-[24px] leading-[24px] tracking-[-0.02em]`}
            >
              Upgrade Skill di Event Kami.
            </h1>
            <div className="md:block mt-4 md:mt-7 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[450px] xl:max-w-[480px] h-[3px] rounded md:h-[4px] bg-white mx-auto" />
          </div>
        </div>
      </div>

      {/* Desktop - Original layout (tidak diubah) */}
      <div className="hidden md:block mx-auto max-w-none bg-white mb-2">
        <div className="relative min-h-[300px] md:h-[500px] lg:h-[550px] rounded-b-[30px] md:rounded-b-[50px] overflow-hidden bg-gradient-to-b from-[#5C89C7] to-[#86BEFF]">
          <div className="h-full pb-[3px] px-5 sm:px-6 md:px-8 lg:pl-[120px] lg:pr-[40px]">
            <div className="h-full flex flex-col md:grid md:items-center md:grid-cols-1 lg:grid-cols-[0.75fr_auto] gap-0 py-8 md:py-0">
              <div className="z-10 text-white w-full md:max-w-[900px] lg:max-w-none lg:pr-0 lg:pl-8 order-2 md:order-1 -mt-10 lg:-mt-12 xl:-mt-20">
                <h1
                  className={`${plusJakarta.className} font-extrabold text-white text-center md:text-left
                    text-[32px] leading-[40px] sm:text-[36px] sm:leading-[44px]
                    md:text-[42px] md:leading-[50px] lg:text-[46px] lg:leading-[56px] tracking-[-0.016em]`}
                >
                  <span className="block">Upgrade Skill di Event Kami</span>
                </h1>
                <div className="hidden md:block mt-4 md:mt-7 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[450px] xl:max-w-[480px] h-[3px] rounded md:h-[4px] bg-white" />
              </div>

              {/* Desktop image*/}
              <div className="hidden md:block relative w-full lg:w-auto md:order-1">
                <div className="relative md:h-[500px] lg:h-[600px] w-full lg:w-[750px] xl:w-[850px]">
                  <Image
                    src="/assets/event/event-hero1.png"
                    alt="Event Hero"
                    width={850}
                    height={600}
                    className="absolute
                      md:bottom-[-100px] md:right-[-120px]
                      lg:bottom-[-61px] lg:right-[-140px]
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
