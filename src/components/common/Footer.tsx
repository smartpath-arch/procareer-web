import Link from "next/link";
import Image from "next/image";

type NavLink = { name: string; href: string };
type Social = { name: string; icon: string; url: string };

export default function Footer() {
  const navigationLinks: readonly NavLink[] = [
    { name: "Home", href: "/" },
  ] as const;

  const socialMedia: readonly Social[] = [
    {
      name: "TikTok",
      icon: "/assets/home/footer/tiktok.svg",
      url: "",
    },
    {
      name: "Instagram",
      icon: "/assets/home/footer/instagram.svg",
      url: "https://www.instagram.com/skillspace_id/",
    },
    {
      name: "LinkedIn",
      icon: "/assets/home/footer/linkedin.svg",
      url: "",
    },
    {
      name: "YouTube",
      icon: "/assets/home/footer/youtube.svg",
      url: "",
    },
  ] as const;
  return (
    <footer
      className="border-t border-white/20"
      style={{
        background: "linear-gradient(to bottom, #CB66E8 0%, #2F184C 100%)",
      }}
      role="contentinfo"
    >
      {/* Mobile Layout */}
      <div className="lg:hidden px-6 pt-3 pb-10">
        {" "}
        <div className="flex flex-col space-y-8">
          <div className="flex justify-center">
            <Link href="/" className="inline-block" aria-label="ProCareer Home">
              <Image
                src="/assets/common/footer/logofooter.svg"
                alt="ProCareer"
                width={550}
                height={161}
                sizes="(max-width: 1024px) 85vw, 380px"
                priority
                className="h-auto w-[min(85vw,380px)] object-contain"
                style={{ aspectRatio: "550 / 161" }}
              />
            </Link>
          </div>
          <p className="text-white text-lg leading-relaxed text-center mt-1">
            Bantu kamu lebih cepat meraih kerja impian.
          </p>
          <nav aria-label="Footer navigation" className="w-full">
            <ul className="flex flex-col space-y-4">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white font-medium hover:text-purple-200 transition-colors text-base block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="w-full pt-4">
            <h3 className="text-white font-semibold text-base mb-4">
              Location
            </h3>
            <p className="text-white font-medium text-sm mb-3">
              PT Jalur Cerdas International
            </p>
            <a
              href="https://maps.app.goo.gl/QPedThRyTPuyNduWA"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-white hover:text-purple-200 transition-colors text-sm"
            >
              <svg
                className="w-5 h-5 flex-shrink-0 mt-0.5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Batam Center, Batam, Indonesia</span>
            </a>
          </div>
          <div className="w-full pt-2">
            <h3 className="text-white font-semibold text-base mb-4">
              Contact Us
            </h3>
            <div className="space-y-3">
              <a
                href="tel:+6285122903009"
                className="flex items-center gap-3 text-white hover:text-purple-200 transition-colors text-sm"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+62 851-2290-3009</span>
              </a>
              <a
                href="mailto: official.procareer@gmail.com"
                className="flex items-center gap-3 text-white hover:text-purple-200 transition-colors text-sm"
              >
                <svg
                  className="w-5 h-5 flex-shrink-0 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>official.procareer@gmail.com</span>
              </a>
            </div>
          </div>
          <div className="pt-6 border-t border-white/20 w-full text-center">
            <p className="text-white text-sm">
              Copyright 2025© ProCareer, All Rights Reserved
            </p>
          </div>
          <div className="flex items-center justify-center gap-8 pb-2">
            {socialMedia.map((s) =>
              s.url ? (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-purple-200 transition-colors"
                  aria-label={s.name}
                  title={s.name}
                >
                  <Image
                    src={s.icon}
                    alt={s.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity"
                  />
                </a>
              ) : (
                <div key={s.name} className="text-white" title={s.name}>
                  <Image
                    src={s.icon}
                    alt={s.name}
                    width={24}
                    height={24}
                    className="w-6 h-6 opacity-60"
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-4">
              <Link
                href="/"
                className="inline-block"
                aria-label="ProCareer Home"
              >
                <Image
                  src="/assets/common/footer/logofooter.svg"
                  alt="ProCareer"
                  width={300}
                  height={100}
                  className="h-auto w-[300px] object-contain"
                  style={{ aspectRatio: "300 / 100" }}
                />
              </Link>
              <p className="text-white text-base leading-relaxed -mt-2">
                Bantu Lebih Cepat Dapat Kerja sesuai impianmu
              </p>
              <nav aria-label="Footer navigation">
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2">
                  {navigationLinks.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-white font-semibold hover:text-purple-200 transition-colors text-base"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="space-y-8 pl-0 lg:pl-12 text-left">
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Location
                </h3>
                <p className="text-white font-medium text-base mb-3">
                  PT Jalur Cerdas International
                </p>
                <a
                  href="https://maps.app.goo.gl/QPedThRyTPuyNduWA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-white hover:text-purple-200 transition-colors text-base group"
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5 text-white group-hover:text-purple-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Batam Center, Batam, Indonesia</span>
                </a>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-4">
                  Contact Us
                </h3>
                <div className="space-y-3">
                  <a
                    href="tel:+6285122903009"
                    className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors text-base"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>+62 851-2290-3009</span>
                  </a>
                  <a
                    href="mailto:official.procareer@gmail.com"
                    className="flex items-center gap-2 text-white hover:text-purple-200 transition-colors text-base"
                  >
                    <svg
                      className="w-5 h-5 flex-shrink-0 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>official.procareer@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 flex justify-between items-center">
            <p className="text-white text-sm">
              Copyright 2025© ProCareer, All Rights Reserved
            </p>
            <div className="flex gap-4">
              {socialMedia.map((s) =>
                s.url ? (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-purple-200 transition-colors"
                    aria-label={s.name}
                    title={s.name}
                  >
                    <Image
                      src={s.icon}
                      alt={s.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 opacity-60 hover:opacity-100 transition-opacity"
                    />
                  </a>
                ) : (
                  <div key={s.name} className="text-white" title={s.name}>
                    <Image
                      src={s.icon}
                      alt={s.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 opacity-60"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
