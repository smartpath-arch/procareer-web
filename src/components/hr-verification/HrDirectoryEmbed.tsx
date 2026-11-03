"use client";

import { useEffect, useState } from "react";

type HrDirectoryEmbedProps = {
  /** Embed URL of the HR directory web app (ends with /embed). */
  src: string;
  /** Full-page URL, offered as a fallback link if the embed cannot load. */
  fallbackHref: string;
  title: string;
};

// Message the embedded directory sends with its content height.
const HEIGHT_MESSAGE = "hr-directory:height";
// Apps Script runs the page inside a sandboxed *.googleusercontent.com frame.
const APPS_SCRIPT_ORIGIN = /^https:\/\/[a-z0-9-]+\.googleusercontent\.com$/;
// No height reported by then usually means the embed was blocked.
const LOAD_TIMEOUT_MS = 15000;
const MIN_HEIGHT = 320;
const MAX_HEIGHT = 20000;

export default function HrDirectoryEmbed({
  src,
  fallbackHref,
  title,
}: HrDirectoryEmbedProps) {
  const [height, setHeight] = useState<number | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const srcOrigin = new URL(src).origin;

    function onMessage(event: MessageEvent) {
      if (
        event.origin !== srcOrigin &&
        !APPS_SCRIPT_ORIGIN.test(event.origin)
      ) {
        return;
      }
      const data = event.data as { type?: unknown; height?: unknown } | null;
      if (
        !data ||
        data.type !== HEIGHT_MESSAGE ||
        typeof data.height !== "number" ||
        !Number.isFinite(data.height)
      ) {
        return;
      }
      setHeight(
        Math.min(Math.max(Math.ceil(data.height), MIN_HEIGHT), MAX_HEIGHT),
      );
    }

    window.addEventListener("message", onMessage);
    const timer = window.setTimeout(() => setTimedOut(true), LOAD_TIMEOUT_MS);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timer);
    };
  }, [src]);

  const isReady = height !== null;
  // Blocked or failed: collapse the (blank) frame but keep it loading, so it
  // reappears if the directory reports in late.
  const isCollapsed = !isReady && timedOut;

  return (
    <section className="w-full flex-1" aria-label={title}>
      {isCollapsed && (
        <div
          role="status"
          className="mx-auto my-6 max-w-3xl rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 md:text-base"
        >
          Daftar HR resmi belum dapat ditampilkan di halaman ini.{" "}
          <a
            href={fallbackHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline underline-offset-4"
          >
            Buka daftar HR resmi di tab baru
          </a>
          .
        </div>
      )}

      <iframe
        src={src}
        title={title}
        className="block w-full border-0"
        // Grows to the directory's own height, so the page scrolls as one.
        style={{
          height: isReady ? height : isCollapsed ? 0 : "min(85dvh, 900px)",
        }}
        aria-hidden={isCollapsed || undefined}
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </section>
  );
}
