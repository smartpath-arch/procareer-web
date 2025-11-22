"use client";

import { useQuery } from "@tanstack/react-query";
import { Plus_Jakarta_Sans } from "next/font/google";
import HeroSection from "@/components/bootcamp-webinar/HeroSection";
import EBenefitSection from "@/components/bootcamp-webinar/BenefitSection";
import AlumniTestimonial from "@/components/home/AlumniTestimonial";
import ProgramListSection from "@/components/bootcamp-webinar/ProgramListSection";
import Footer from "@/components/common/Footer";
import { bootcampTestimonials } from "@/lib/testimonials/bootcampTestimonials";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "800"],
  display: "swap",
});

type Item = {
  id: string;
  title: string;
  type: string;
  slug?: string;
  dateISO?: string;
  dateText?: string;
  poster?: string;
  linkMayar?: string | null;
};

type BootcampApiItem = {
  id: string;
  name: string;
  type: string;
  closedDate?: string;
  status: string;
  poster?: {
    id: string;
    url: string;
    key: string;
    mimeType: string;
    fileSize: number;
  } | null;
  linkMayar?: string | null;
};

function absPoster(url?: string | null): string {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  if (!url) return "/assets/bootcamp-webinar/Poster.png";
  if (url.startsWith("http://localhost:3000")) {
    return url.replace("http://localhost:3000", API_ORIGIN);
  }
  if (url.startsWith("http")) return url;
  return `${API_ORIGIN}${url}`;
}

function formatTanggal(iso?: string): string {
  if (!iso) return "TBA";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "TBA";
  return `Hingga ${d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function getBootcamps(): Promise<Item[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bootcamps?page=1&limit=50&status=published`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      console.error(`Bootcamps fetch failed: ${res.status}`);
      return [];
    }

    const json = await res.json();
    const raw: BootcampApiItem[] = json?.items ?? json?.data ?? [];
    const filtered = raw.filter((it) => it.type !== "Webinar");

    const mapped = filtered.map((it) => {
      const posterUrl = absPoster(it.poster?.url);
      console.log(
        "Bootcamp:",
        it.name,
        "Poster URL:",
        posterUrl,
        "Raw:",
        it.poster?.url,
      );
      return {
        id: it.id,
        title: it.name || "Tanpa Judul",
        type: it.type || "Bootcamp",
        poster: posterUrl,
        dateISO: it.closedDate || undefined,
        dateText: formatTanggal(it.closedDate),
        slug: slugify(it.name || it.id),
        linkMayar: it.linkMayar,
      };
    });

    return mapped;
  } catch (err) {
    console.error("Error fetching bootcamps:", err);
    return [];
  }
}

async function getWebinars(): Promise<Item[]> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bootcamps?page=1&limit=50&status=published`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      console.error(`Webinars fetch failed: ${res.status}`);
      return [];
    }

    const json = await res.json();
    const raw: BootcampApiItem[] = json?.items ?? json?.data ?? [];
    const filtered = raw.filter((it) => it.type === "Webinar");

    const mapped = filtered.map((it) => {
      const posterUrl = absPoster(it.poster?.url);
      console.log(
        "Webinar:",
        it.name,
        "Poster URL:",
        posterUrl,
        "Raw:",
        it.poster?.url,
      );
      return {
        id: it.id,
        title: it.name || "Tanpa Judul",
        type: it.type || "Webinar",
        poster: posterUrl,
        dateISO: it.closedDate || undefined,
        dateText: formatTanggal(it.closedDate),
        slug: slugify(it.name || it.id),
        linkMayar: it.linkMayar,
      };
    });

    return mapped;
  } catch (err) {
    console.error("Error fetching webinars:", err);
    return [];
  }
}

export default function BootcampWebinarPage() {
  const bootcamps = useQuery({
    queryKey: ["bootcamps"],
    queryFn: getBootcamps,
  });

  const webinars = useQuery({
    queryKey: ["webinars"],
    queryFn: getWebinars,
  });

  const isLoading = bootcamps.isLoading || webinars.isLoading;

  return (
    <main
      className={`${plusJakarta.className} w-full overflow-hidden bg-white`}
    >
      <HeroSection />
      <EBenefitSection />
      <AlumniTestimonial testimonialData={bootcampTestimonials} />
      <ProgramListSection
        bootcamps={bootcamps.data}
        webinars={webinars.data}
        isLoading={isLoading}
      />
      <Footer />
    </main>
  );
}
