"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  ChevronRight,
  Search,
  Filter,
  Check,
  Crown,
  Award,
  Users,
  Clock,
  Circle,
} from "lucide-react";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["800", "600", "400"],
  display: "swap",
});

export type CourseItem = {
  id: string;
  title: string;
  category: string;
  type: "Exclusive" | "Premium" | "Basic";
  participants?: string;
  duration?: string;
  href: string;
  poster?: { url?: string };
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

type Props = {
  items: CourseItem[];
  categories: Category[];
  isLoading: boolean;
  isCategoriesLoading: boolean;
};

const PACKAGE_PRIORITY = {
  Exclusive: 1,
  Premium: 2,
  Basic: 3,
} as const;

const CATEGORY_COLORS: Record<string, string> = {
  "Digital Marketing": "text-[#0056A3]",
  "Data Science & Data Analyst": "text-[#0056A3]",
  "Microsoft Excel, Word, dan Power Point": "text-[#0056A3]",
  "UI/UX Research & Design": "text-[#0056A3]",
  "Product dan Project Management": "text-[#0056A3]",
};

// Type icon and color (Basic no icon) - classy colors
const TYPE_CONFIG = {
  Exclusive: {
    icon: Crown,
    color: "text-yellow-600", // Gold tone
  },
  Premium: {
    icon: Award,
    color: "text-purple-900", // Emerald green for premium
  },
  Basic: {
    icon: Circle, // Basic has icon Circle
    color: "text-emerald-600", // Deep purple for basic
  },
};

export default function EProgramListSection({
  items,
  categories,
  isLoading,
  isCategoriesLoading,
}: Props) {
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState<string[]>(["Semua"]);
  const [showFilters, setShowFilters] = useState(false);
  const sortedCategories = [...categories].sort((a, b) => {
    if (a.name === "Data Science & Data Analyst") return -1;
    if (b.name === "Data Science & Data Analyst") return 1;
    return 0;
  });
  const categoryOptions = ["Semua", ...sortedCategories.map((cat) => cat.name)];

  const toggleCategory = (name: string) => {
    setChecked((prev) => {
      if (name === "Semua") return ["Semua"];
      const next = prev.includes(name)
        ? prev.filter((c) => c !== name)
        : [...prev.filter((c) => c !== "Semua"), name];
      return next.length ? next : ["Semua"];
    });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byCat = checked.includes("Semua")
      ? items
      : items.filter((it) => checked.includes(it.category));
    const searched = !q
      ? byCat
      : byCat.filter(
          (it) =>
            it.title.toLowerCase().includes(q) ||
            it.category.toLowerCase().includes(q),
        );
    const priorityMap = {
      Exclusive: 1,
      Premium: 2,
      Basic: 3,
    };

    return searched.sort((a, b) => {
      const priorityA = priorityMap[a.type] || 999;
      const priorityB = priorityMap[b.type] || 999;
      return priorityA - priorityB;
    });
  }, [items, query, checked]);

  if (isLoading) {
    return (
      <section className={`${plusJakarta.className} w-full bg-white py-10`}>
        <div className="mx-auto max-w-[1420px] px-4 sm:px-6 text-center">
          <div className="text-[#0056A3] text-xl">Loading courses…</div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`${plusJakarta.className} w-full bg-white py-6 md:py-12`}
    >
      <div className="mx-auto max-w-[1420px] px-4 sm:px-6 md:px-8 lg:px-[64px]">
        <h2 className="text-[#0B2540] font-extrabold text-[24px] leading-[32px] sm:text-[30px] sm:leading-[38px] md:text-[36px] md:leading-[44px] text-center mb-4 md:mb-6">
          Belajar Kapan Saja dan Dimana Saja
        </h2>
        <div className="mx-auto max-w-[980px] mb-4 md:mb-8">
          <label className="relative block">
            <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-[#9AA8B2]">
              <Search className="h-4 w-4 md:h-5 md:w-5" />
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Apa skill yang ingin kamu cari?"
              className="w-full rounded-xl border border-[#0056A3] bg-white pl-10 md:pl-11 pr-4 py-2.5 md:py-3 outline-none
                         text-[14px] md:text-[16px] text-[#0B2540] placeholder:text-[#9AA8B2] focus:ring-2 focus:ring-[#0056A3]/20"
            />
          </label>
        </div>
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 bg-[#0056A3] text-white font-semibold py-3 rounded-xl transition-all"
          >
            <Filter className="h-5 w-5" />
            Filter Kategori
          </button>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr] gap-6">
          <aside
            className={`${showFilters ? "block" : "hidden"} lg:block lg:sticky lg:top-6 lg:self-start`}
          >
            <div className="rounded-2xl bg-[#0056A3] text-white p-4 md:p-6">
              <h3 className="text-[20px] md:text-[24px] leading-[24px] md:leading-[28px] font-extrabold mb-3 md:mb-4">
                Kategori
              </h3>
              <ul className="space-y-2 md:space-y-3">
                {categoryOptions.map((name) => {
                  const active = checked.includes(name);
                  return (
                    <li key={name} className="flex items-center gap-2 md:gap-3">
                      <button
                        type="button"
                        onClick={() => toggleCategory(name)}
                        aria-pressed={active}
                        className={`h-5 w-5 md:h-6 md:w-6 rounded-md border-2 bg-white transition flex-shrink-0
                          ${active ? "border-white ring-2 ring-white/50" : "border-white/70"}`}
                      >
                        <span
                          className={`flex items-center justify-center h-full w-full rounded-[4px] transition
                          ${active ? "bg-[#D9E6F1]" : "bg-transparent"}`}
                        >
                          {active && (
                            <Check className="h-3 w-3 md:h-4 md:w-4 text-[#0056A3]" />
                          )}
                        </span>
                      </button>
                      <span
                        className="text-[14px] md:text-[16px] leading-[20px] md:leading-[22px] cursor-pointer"
                        onClick={() => toggleCategory(name)}
                      >
                        {name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
          <div className="grid gap-4 md:gap-6 grid-cols-2 xl:grid-cols-3">
            {filtered.map((it) => {
              const TypeIcon = TYPE_CONFIG[it.type].icon;
              const typeColor = TYPE_CONFIG[it.type].color;
              const categoryColor =
                CATEGORY_COLORS[it.category] || "text-[#0056A3]";

              return (
                <article
                  key={it.id}
                  className="group bg-white rounded-2xl shadow-sm ring-1 ring-[#0056A3]/10 overflow-hidden hover:shadow-md transition flex flex-col"
                >
                  <div className="p-0">
                    <div className="overflow-hidden">
                      <Image
                        src={
                          it.poster?.url ||
                          "/assets/home/program-section/thumbnail.png"
                        }
                        alt={`Poster ${it.category}`}
                        width={640}
                        height={800}
                        className="h-auto w-full object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 flex flex-col flex-grow">
                    <h3
                      className="pt-3 sm:pt-4 font-semibold text-[#0B2540] text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] line-clamp-2 min-h-[44px] sm:min-h-[52px]"
                      title={it.title}
                    >
                      {it.title}
                    </h3>
                    <div className="mt-2 space-y-2 flex-grow">
                      <div
                        className={`text-[11px] sm:text-[12px] text-[#0B2540]/70 ${categoryColor}`}
                      >
                        ({it.category})
                      </div>
                      <div className="flex items-center gap-1.5">
                        {TypeIcon && (
                          <TypeIcon className={`h-4 w-4 ${typeColor}`} />
                        )}
                        <span
                          className={`text-[12px] sm:text-[13px] font-medium ${typeColor}`}
                        >
                          {it.type}
                        </span>
                      </div>
                      {it.participants && (
                        <div className="flex items-center gap-1.5 text-[#0B2540]/70">
                          <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="text-[11px] sm:text-[12px]">
                            {it.participants}
                          </span>
                        </div>
                      )}
                      {it.duration && (
                        <div className="flex items-center gap-1.5 text-[#0B2540]/70">
                          <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                          <span className="text-[11px] sm:text-[12px]">
                            Durasi {it.duration} jam
                          </span>
                        </div>
                      )}
                    </div>
                    <Link
                      href={it.href}
                      className="mt-3 sm:mt-4 inline-flex w-full items-center justify-center gap-2 
                                 rounded-xl bg-[#D9E6F1] text-[#0056A3] font-semibold 
                                 py-2 sm:py-2.5 text-[14px] sm:text-[15px] 
                                 hover:bg-[#0056A3] hover:text-white transition-all duration-300"
                    >
                      Selengkapnya{" "}
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Link>
                  </div>
                </article>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-full text-center text-[#0B2540]/70 py-10">
                Tidak ada program yang cocok dengan filter.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
