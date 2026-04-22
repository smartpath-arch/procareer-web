import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action") ?? "check";
    const email = searchParams.get("email") ?? "";
    const name = searchParams.get("name") ?? "";

    const gasUrl = process.env.ANNOUNCEMENT_GAS_URL;
    const apiKey = process.env.ANNOUNCEMENT_GAS_KEY;
    const slug = process.env.ANNOUNCEMENT_PROGRAM_SLUG;

    if (!gasUrl || !apiKey || !slug) {
      return NextResponse.json(
        { ok: false, message: "missing server configured." },
        { status: 500 },
      );
    }

    const url = new URL(gasUrl);
    url.searchParams.set("key", apiKey);
    url.searchParams.set("action", action);
    url.searchParams.set("slug", slug);

    if (action === "check") {
      url.searchParams.set("email", email);
      url.searchParams.set("name", name);
    }

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json(
        { ok: false, message: "Upstream error", detail: text },
        { status: res.status },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("API route error:", err);
    return NextResponse.json(
      { ok: false, message: "server error", detail: String(err) },
      { status: 500 },
    );
  }
}
