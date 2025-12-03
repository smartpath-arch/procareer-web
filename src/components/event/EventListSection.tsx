"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Search, ChevronRight, ChevronLeft, Calendar } from "lucide-react";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["800", "600", "400"],
  display: "swap",
});

export type EventCategory = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type EventPoster = {
  id: string;
  url: string;
  mimeType: string | null;
  fileSize: number | null;
};

export type EventItem = {
  id: string;
  title: string;
  categoryId: string | null;
  category: EventCategory | null;
  registrationDeadline: string;
  registrationLink: string;
  guidebookLink: string | null;
  description: string;
  benefitTitle: string;
  benefits: string[];
  posterId: string | null;
  poster: EventPoster | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: string;
  updatedAt: string;
};

type Props = {
  items: EventItem[];
  isLoading: boolean;
};

const ITEMS_PER_PAGE = 12;

export default function EventListSection({ items, isLoading }: Props) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsWithExpiredFlag = useMemo(() => {
    return items.map((item) => ({
      ...item,
      isExpired: new Date(item.registrationDeadline) < new Date(),
    }));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const searched = !q
      ? itemsWithExpiredFlag
      : itemsWithExpiredFlag.filter(
          (it) =>
            it.title.toLowerCase().includes(q) ||
            it.category?.name.toLowerCase().includes(q) ||
            it.description.toLowerCase().includes(q),
        );
    return searched.sort((a, b) => {
      if (a.isExpired && !b.isExpired) return 1;
      if (!a.isExpired && b.isExpired) return -1;
      return (
        new Date(a.registrationDeadline).getTime() -
        new Date(b.registrationDeadline).getTime()
      );
    });
  }, [itemsWithExpiredFlag, query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedItems = filtered.slice(startIndex, endIndex);

  const formatDeadline = (deadline: string): string => {
    try {
      return `Hingga ${format(new Date(deadline), "dd MMMM yyyy", { locale: localeId })}`;
    } catch {
      return deadline;
    }
  };

  if (isLoading) {
    return (
      <section className={`${plusJakarta.className} w-full bg-white py-10`}>
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 text-center">
          <div className="text-[#0056A3] text-xl">Loading events…</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${plusJakarta.className} w-full bg-[#19499A] py-8 md:py-12 lg:py-16`}
    >
      <div className="mx-auto max-w-[1420px] px-4 sm:px-6 md:px-8 lg:px-[64px]">
        <div className="mx-auto max-w-[980px] mb-6 md:mb-8">
          <label className="relative block">
            <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-[#9AA8B2]">
              <Search className="h-4 w-4 md:h-5 md:w-5" />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Apa event yang ingin kamu cari?"
              className="w-full rounded-xl border border-white bg-white pl-10 md:pl-11 pr-4 py-2.5 md:py-3 outline-none
                         text-[14px] md:text-[16px] text-[#0B2540] placeholder:text-[#9AA8B2] focus:ring-2 focus:ring-white/20"
            />
          </label>
        </div>
        <div className="grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedItems.map((event) => {
            return (
              <article
                key={event.id}
                className={`group bg-white rounded-2xl shadow-sm ring-1 ring-[#0056A3]/10 overflow-hidden transition ${
                  event.isExpired
                    ? "opacity-50 hover:shadow-sm"
                    : "hover:shadow-md"
                } flex flex-col`}
              >
                <div className="p-0">
                  <div className="overflow-hidden">
                    {event.poster ? (
                      <Image
                        src={event.poster.url}
                        alt={event.title}
                        width={640}
                        height={800}
                        className="h-auto w-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="aspect-[4/5] w-full bg-gray-200 flex items-center justify-center text-gray-400">
                        <div className="text-center">
                          <Calendar className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm">No Image</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="px-3 sm:px-4 pb-4 flex flex-col flex-grow">
                  <h3
                    className="pt-3 sm:pt-4 line-clamp-2 font-semibold text-[#0B2540] text-[15px] leading-[22px] sm:text-[16px] sm:leading-[26px] min-h-[48px] sm:min-h-[52px]"
                    title={event.title}
                  >
                    {event.title}
                  </h3>

                  <div className="mt-2 text-[13px] sm:text-[14px] text-[#0B2540]/70">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">
                        {event.category?.name || "Kategori"}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2">
                      <Calendar
                        className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${
                          event.isExpired ? "text-[#DC2626]" : "text-[#15803D]"
                        }`}
                      />
                      <span
                        className={`px-1.5 py-0.5 sm:px-2 rounded-md text-xs sm:text-[14px] ${
                          event.isExpired
                            ? "text-[#DC2626] bg-[#FEE2E2]"
                            : "text-[#15803D] bg-[#F0FDF4]"
                        }`}
                      >
                        {formatDeadline(event.registrationDeadline)}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] sm:text-[12px]">
                      *Ditutup lebih awal jika kuota penuh
                    </div>
                  </div>
                  {event.isExpired ? (
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
                    <a
                      href={event.registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 sm:mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg sm:rounded-xl border border-[#19499A] text-[#19499A] font-semibold
                                 text-sm sm:text-base py-0.5 md:py-2.5 hover:bg-[#19499A] hover:text-white transition"
                    >
                      Selengkapnya{" "}
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </a>
                  )}
                </div>
              </article>
            );
          })}

          {paginatedItems.length === 0 && filtered.length === 0 && (
            <div className="col-span-full text-center text-white py-10">
              Tidak ada event yang cocok dengan pencarian.
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <div className="mt-8 flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-white text-[#19499A] font-semibold text-sm
                         hover:bg-[#FEA600] hover:text-white hover:border-[#FEA600] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#19499A]"
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    const showPage =
                      pageNum === 1 ||
                      pageNum === totalPages ||
                      (pageNum >= currentPage - 1 &&
                        pageNum <= currentPage + 1);
                    const showEllipsisBefore =
                      pageNum === currentPage - 2 && currentPage > 3;
                    const showEllipsisAfter =
                      pageNum === currentPage + 2 &&
                      currentPage < totalPages - 2;

                    if (showEllipsisBefore || showEllipsisAfter) {
                      return (
                        <span key={pageNum} className="px-2 text-white">
                          ...
                        </span>
                      );
                    }

                    if (!showPage) return null;

                    return (
                      <button
                        type="button"
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-lg font-semibold text-sm transition-all
                          ${
                            currentPage === pageNum
                              ? "bg-[#FEA600] text-white"
                              : "bg-white text-[#19499A] hover:bg-[#FEA600] hover:text-white"
                          }`}
                        aria-label={`Halaman ${pageNum}`}
                        aria-current={
                          currentPage === pageNum ? "page" : undefined
                        }
                      >
                        {pageNum}
                      </button>
                    );
                  },
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white border border-white text-[#19499A] font-semibold text-sm
                         hover:bg-[#FEA600] hover:text-white hover:border-[#FEA600] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#19499A]"
                aria-label="Halaman berikutnya"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="text-sm text-white">
              Halaman {currentPage} dari {totalPages} (Total: {filtered.length}{" "}
              event)
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
