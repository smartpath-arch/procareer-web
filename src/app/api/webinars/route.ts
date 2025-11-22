import { NextResponse } from "next/server";

type BootcampItem = {
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

function absPoster(url?: string | null) {
  const API_ORIGIN = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";
  if (!url) return "/assets/bootcamp-webinar/Poster.png";
  if (url.startsWith("http://localhost:3000")) {
    return url.replace("http://localhost:3000", API_ORIGIN);
  }
  if (url.startsWith("http")) return url;
  return `${API_ORIGIN}${url}`;
}

function formatTanggal(iso?: string) {
  if (!iso) return "TBA";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "TBA";
  return `Hingga ${d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}`;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bootcamps?page=1&limit=50&status=published`,
    );

    if (!res.ok) {
      console.error(`Backend fetch failed: ${res.status} ${res.statusText}`);
      return NextResponse.json([], { status: res.status });
    }

    const json = await res.json();
    const raw: BootcampItem[] = json?.items ?? json?.data ?? [];
    const filtered = raw.filter((it) => it.type === "Webinar");

    const mapped = filtered.map((it) => ({
      id: it.id,
      title: it.name || "Tanpa Judul",
      type: it.type || "Webinar",
      poster: absPoster(it.poster?.url),
      dateISO: it.closedDate || null,
      dateText: formatTanggal(it.closedDate),
      slug: slugify(it.name || it.id),
      linkMayar: it.linkMayar,
    }));

    return NextResponse.json(mapped, { status: 200 });
  } catch (err) {
    console.error("Error fetching webinars:", err);
    return NextResponse.json([], { status: 500 });
  }
}
