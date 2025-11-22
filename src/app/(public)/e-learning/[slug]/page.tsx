"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

type Course = { id: string; title: string; slug: string; description?: string };

async function getCourse(slug: string): Promise<Course | null> {
  try {
    const r = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courses/${slug}`,
      { cache: "no-store" },
    );
    if (r.status === 404) return null;
    if (!r.ok) throw new Error();
    return r.json();
  } catch {
    if (slug === "intro-web")
      return {
        id: "c1",
        title: "Intro to Web",
        slug,
        description: "Materi dasar pengembangan web.",
      };
    return null;
  }
}

export default function CourseDetail({ params }: { params: { slug: string } }) {
  const { data, isLoading } = useQuery({
    queryKey: ["course", params.slug],
    queryFn: () => getCourse(params.slug),
  });
  if (isLoading) return <p>Loading…</p>;
  if (!data) notFound();
  return (
    <article className="prose dark:prose-invert">
      <h1>{data.title}</h1>
      <p>{data.description ?? "Deskripsi menyusul."}</p>
    </article>
  );
}
