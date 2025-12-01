"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Event", href: "/event" },
  { name: "E-Learning", href: "/e-learning" },
  { name: "Bootcamp & Webinar", href: "/bootcamp-webinar" },
  { name: "For Corporate", href: "/for-corporate" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-lg shadow-[0_4px_25px_rgba(255,255,255,0.6)] py-2"
          : "shadow-[0_2px_20px_rgba(255,255,255,0.5)] py-3"
      }`}
      style={{
        background: scrolled
          ? "linear-gradient(to right, rgba(255, 255, 255, 0.75) 0%, rgba(245, 245, 245, 0.75) 50%, rgba(255, 255, 255, 0.75) 90%, rgba(250, 250, 250, 0.75) 100%)"
          : "linear-gradient(to right, #FFFFFF 0%, #F5F5F5 50%, #FFFFFF 90%, #FAFAFA 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-8 transition-all duration-300">
        {/* Mobile */}
        <div className="flex items-center justify-between md:hidden py-2">
          <div className="flex items-center gap-4">
            {isOpen ? (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Toggle menu"
                aria-expanded="true"
                aria-controls="mobile-menu"
                className="rounded-lg p--2 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-all duration-200"
              >
                <X size={30} className="text-[#19499A]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Toggle menu"
                aria-expanded="false"
                aria-controls="mobile-menu"
                className="rounded-lg p-2 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 transition-all duration-200"
              >
                <Menu size={30} className="text-[#19499A]" />
              </button>
            )}

            <Link href="/" aria-label="SmartPath Home">
              <Image
                src="/assets/common/navbar/logoheaderskillspace.svg"
                alt="SmartPath Mobile Logo"
                width={120}
                height={150}
                unoptimized={true}
                className="object-contain drop-shadow-sm"
                style={{
                  transform: "translate3d(0,0,0)",
                  WebkitTransform: "translate3d(0,0,0)",
                  imageRendering: "crisp-edges",
                  WebkitFontSmoothing: "antialiased",
                }}
                priority
              />
            </Link>
          </div>
          <a
            href="https://smartpath-id.myr.id/portal"
            target="_blank"
            rel="noopener noreferrer"
            className="relative text-[17px] font-semibold ext-white bg-[#19499A] px-6 py-2 rounded-md hover:bg-[#4a72a3] transition-colors duration-300"
          >
            Login
          </a>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between">
          <Link href="/" aria-label="SmartPath Home" className="group">
            <Image
              src="/assets/common/navbar/logoheaderskillspace.svg"
              alt="SmartPath Logo"
              width={180}
              height={220}
              unoptimized={true}
              className={`object-contain transition-all duration-300 drop-shadow-md group-hover:scale-105 ${
                scrolled ? "scale-95" : "scale-100"
              }`}
              priority
            />
          </Link>
          <div className="flex items-center gap-10 ml-auto">
            <nav aria-label="Primary">
              <ul className="flex items-center gap-10 text-[18px] font-semibold text-gray-900">
                {NAV_ITEMS.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="relative hover:text-blue-700 transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-blue-700 hover:after:w-full after:transition-all after:duration-300 after:shadow-[0_0_8px_rgba(59,130,246,0.5)] hover:drop-shadow-[0_2px_4px_rgba(29,78,216,0.3)]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <a
              href="https://smartpath-id.myr.id/portal"
              target="_blank"
              rel="noopener noreferrer"
              className="relative text-[18px] font-semibold text-white bg-[#19499A] px-6 py-2 rounded-md hover:bg-[#4a72a3] transition-colors duration-300"
            >
              Login
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden absolute top-full left-0 w-full bg-gradient-to-b from-[#FFFFFF] via-[#F5F5F5] to-[#FFFFFF] shadow-[0_8px_20px_rgba(255,255,255,0.4)] backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col items-center space-y-4 py-6 font-semibold text-gray-900 text-lg">
              {NAV_ITEMS.map((item, index) => (
                <li
                  key={item.name}
                  className="w-full text-center animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <Link
                    href={item.href}
                    className="block py-3 px-8 relative hover:text-[#19499A] transition-all duration-300
                after:absolute after:left-1/2 after:-bottom-1 after:-translate-x-1/2 after:h-[2px] after:w-0 
                after:bg-[#19499A] hover:after:w-3/4 after:transition-all after:duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
}
