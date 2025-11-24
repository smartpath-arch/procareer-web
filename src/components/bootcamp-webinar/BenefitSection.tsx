import { Check } from "lucide-react";
import Image from "next/image";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export default function BenefitSection() {
  const benefits = [
    "Dibuatkan CV standar top company impianmu",
    "Grup info loker/magang & Networking Eksklusif",
    "E-Certificate & Portofolio Standar Top Company",
    "Para pengajar dari Top Company",
  ];

  return (
    <section className="w-full bg-[#F2F4F8] py-8 md:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8 md:pl-12 lg:pl-16">
          <div className="md:w-1/3 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900">
              Benefit
            </h2>
          </div>
          <div className="md:w-2/3 space-y-3 md:space-y-4 flex flex-col items-start w-full">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-2 sm:gap-3 group hover:translate-x-2 transition-transform duration-300 w-full md:max-w-none"
              >
                <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 relative">
                  <Image
                    src="/assets/bootcamp-webinar/check-list 1.png"
                    alt="Check"
                    fill
                    className="object-contain"
                  />
                </div>

                <p
                  className={`${roboto.className} text-gray-900 text-base sm:text-lg md:text-xl font-medium leading-relaxed text-left`}
                >
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
