"use client";

import Image, { type ImageProps } from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { CalendarDays, ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const SafeImage = (props: ImageProps) => {
  const { src, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      unoptimized
      onError={() => {
        setImgSrc("/assets/bootcamp-webinar/Poster.png");
      }}
    />
  );
};

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["800", "600", "400"],
  display: "swap",
});

type ApiProgram = {
  id: string;
  title: string;
  type: string;
  dateISO?: string;
  dateText?: string;
  poster?: string | null;
  slug?: string;
  linkMayar?: string | null;
};

type BootItem = {
  id: string;
  title: string;
  category: string;
  deadline: string;
  href: string;
  poster: string;
  slug?: string;
  linkMayar?: string | null;
  dateISO?: string;
  isExpired?: boolean;
};

type Props = {
  bootcamps?: ApiProgram[];
  webinars?: ApiProgram[];
  isLoading: boolean;
};

export default function ProgramListSection({
  bootcamps,
  webinars,
  isLoading,
}: Props) {
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (isLoading) {
    return (
      <section
        className={`${plusJakarta.className} w-full bg-[#0056A3] py-10 md:py-14`}
      >
        <div className="mx-auto max-w-[1420px] px-4 md:px-[64px] text-center">
          <div className="text-white text-xl">Loading programs...</div>
        </div>
      </section>
    );
  }

  const bc = Array.isArray(bootcamps) ? bootcamps : [];
  const wb = Array.isArray(webinars) ? webinars : [];

  const isBootcampExpired = (dateISO?: string): boolean => {
    if (!dateISO) return false;
    const now = new Date();
    const bootcampDate = new Date(dateISO);
    return now > bootcampDate;
  };

  const mappedItems: BootItem[] = [
    ...bc.map((b) => {
      const expired = isBootcampExpired(b.dateISO);
      return {
        id: b.id,
        title: b.title || "Tanpa Judul",
        category: b.type || "Bootcamp",
        deadline: b.dateText
          ? b.dateText
          : b.dateISO
            ? `Hingga ${new Date(b.dateISO).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}`
            : "TBA",
        href: `/bootcamp-webinar/${b.slug ?? b.id}`,
        poster: b.poster?.trim()
          ? b.poster
          : "/assets/bootcamp-webinar/Poster.png",
        linkMayar: b.linkMayar,
        slug: b.slug,
        dateISO: b.dateISO,
        isExpired: expired,
      };
    }),
    ...wb.map((w) => {
      const expired = isBootcampExpired(w.dateISO);
      return {
        id: w.id,
        title: w.title || "Tanpa Judul",
        category: w.type || "Webinar",
        deadline: w.dateText
          ? w.dateText
          : w.dateISO
            ? `Hingga ${new Date(w.dateISO).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}`
            : "TBA",
        href: `/bootcamp-webinar/${w.slug ?? w.id}`,
        poster: w.poster?.trim()
          ? w.poster
          : "/assets/bootcamp-webinar/Poster.png",
        linkMayar: w.linkMayar,
        slug: w.slug,
        dateISO: w.dateISO,
        isExpired: expired,
      };
    }),
  ];

  const filteredItems = mappedItems.filter((item) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (a.isExpired && !b.isExpired) return 1;
    if (!a.isExpired && b.isExpired) return -1;
    return 0;
  });

  const visibleItems = showAll ? sortedItems : sortedItems.slice(0, 4);

  return (
    <section
      className={`${plusJakarta.className} w-full bg-[#19499a] py-8 md:py-12`}
    >
      <div className="mx-auto max-w-[1420px] px-4 sm:px-6 md:px-[64px]">
        <h2 className="text-[#fafafa] font-extrabold text-[28px] leading-8 sm:text-[32px] sm:leading-[40px] md:text-[36px] md:leading-[44px] text-center mb-6 md:mb-8">
          Belajar Skill Baru, Siap Kerja Lebih Cepat!
        </h2>

        <div className="mx-auto max-w-[980px] mb-6 sm:mb-10">
          <label className="relative block">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Apa skill yang ingin kamu cari?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-white pl-11 pr-4 py-3 outline-none
                         text-[16px] text-[#0B2540] caret-[#0056A3]
                         placeholder:text-gray-400 focus:ring-2 focus:ring-white/60"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 xl:grid-cols-4">
          {visibleItems.map((it) => (
            <article
              key={`${it.category}-${it.id}`}
              className={`group bg-white rounded-2xl shadow-sm ring-1 ring-[#0056A3]/10 overflow-hidden transition ${
                it.isExpired ? "opacity-50 hover:shadow-sm" : "hover:shadow-md"
              }`}
            >
              <div className="p-0">
                <div className="overflow-hidden">
                  <SafeImage
                    src={it.poster}
                    alt={`Poster ${it.category}`}
                    width={640}
                    height={800}
                    className="h-auto w-full object-cover"
                    priority={it.id === "b1"}
                  />
                </div>
              </div>

              <div className="px-3 sm:px-4 pb-4">
                <h3
                  className="pt-3 sm:pt-4 line-clamp-2 font-semibold text-[#0B2540] text-[15px] leading-[22px] sm:text-[16px] sm:leading-[26px] min-h-[48px] sm:min-h-[52px]"
                  title={it.title}
                >
                  {it.title}
                </h3>

                <div className="mt-2 text-[13px] sm:text-[14px] text-[#0B2540]/70">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{it.category}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <CalendarDays
                      className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                        it.isExpired ? "text-[#DC2626]" : "text-[#15803D]"
                      }`}
                    />
                    <span
                      className={`px-1.5 py-0.5 sm:px-2 rounded-md text-xs sm:text-[14px] ${
                        it.isExpired
                          ? "text-[#DC2626] bg-[#FEE2E2]"
                          : "text-[#15803D] bg-[#F0FDF4]"
                      }`}
                    >
                      {it.deadline}
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] sm:text-[12px]">
                    *Ditutup lebih awal jika kuota penuh
                  </div>
                </div>

                {it.isExpired ? (
                  <button
                    type="button"
                    disabled
                    className="mt-3 sm:mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-xl border border-gray-300 text-gray-400 font-semibold
                               text-sm sm:text-base py-0.5 md:py-2.5 cursor-not-allowed bg-gray-100"
                  >
                    Selengkapnya{" "}
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                ) : (
                  <Link
                    href={it.linkMayar || it.href}
                    target="_blank"
                    className="mt-3 sm:mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-xl border border-[#0056A3] text-[#0056A3] font-semibold
                               text-sm sm:text-base py-0.5 md:py-2.5 hover:bg-[#0056A3] hover:text-white transition"
                  >
                    Selengkapnya{" "}
                    <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        {sortedItems.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="w-full max-w-[1170px] rounded-2xl bg-[#D9E6F1] text-[#0056A3] font-semibold py-3
                         border border-white/60 hover:bg-[#D9E6F1]/90 transition"
              aria-expanded={showAll ? "true" : "false"}
            >
              {showAll ? "Lihat Lebih Sedikit" : "Lihat Lebih Banyak"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
