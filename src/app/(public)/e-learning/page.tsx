"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import EHeroSection from "@/components/e-learning/EHeroSection";
import EBenefitSection from "@/components/e-learning/EBenefitSection";
import EProgramListSection, {
  type CourseItem,
  type Category,
} from "@/components/e-learning/EProgramListSection";
import Footer from "@/components/common/Footer";
import AlumniTestimonial from "@/components/home/AlumniTestimonial";
import { eLearningTestimonials } from "@/lib/testimonials/eLearningTestimonials";

function normalizePackageType(
  label: string | undefined,
): "Exclusive" | "Premium" | "Basic" {
  if (!label) return "Basic";
  const normalized = label.trim();
  if (normalized === "Eksklusif" || normalized === "Exclusive")
    return "Exclusive";
  if (normalized === "Premium") return "Premium";
  return "Basic";
}

async function getCourses(): Promise<CourseItem[]> {
  try {
    const r = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/elearning?status=PUBLISHED`,
      {
        cache: "no-store",
      },
    );

    if (!r.ok) throw new Error("Gagal fetch");

    const data = await r.json();

    return data.data.items.map((course: any) => ({
      id: course.id,
      title: course.title,
      category: course.category ?? "Digital Marketing",
      type: normalizePackageType(course.packages?.[0]?.label),
      participants: `${course.participants ?? 0} Peserta`,
      duration: String(course.durationMin ?? 60),
      href: course.payLink ?? "#",
      poster: { url: course.poster?.url },
    }));
  } catch (err) {
    console.error("Gagal fetch data e-learning:", err);
    return [];
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      cache: "no-store",
    });

    if (!r.ok) throw new Error("Gagal fetch categories");

    const data = await r.json();

    if (!data.success || !data.data?.items) {
      return [];
    }

    return data.data.items;
  } catch (err) {
    console.error("Gagal fetch data categories:", err);
    return [];
  }
}

export default function ELearningPage() {
  const { data: courses, isLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <main className="w-full overflow-x-hidden bg-white">
      <EHeroSection />
      <EBenefitSection />
      <AlumniTestimonial testimonialData={eLearningTestimonials} />
      <EProgramListSection
        items={courses || []}
        categories={categories || []}
        isLoading={isLoading}
        isCategoriesLoading={isCategoriesLoading}
      />
      <Footer />
    </main>
  );
}
