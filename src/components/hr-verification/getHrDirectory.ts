// Server-only: reads the official HR list from the shared Google Apps Script
// web app (JSON mode) so visitors' browsers never connect to Google. That is
// what lets Samsung Internet and Safari with tracking protection show the list.
//
// HR_DIRECTORY_URL (server env, never sent to the browser) overrides the /exec
// URL, e.g. to point at the local preview server.

export type HrContact = { name: string; phone: string };

const HR_DIRECTORY_URL =
  process.env.HR_DIRECTORY_URL ||
  "https://script.google.com/macros/s/AKfycbynyuBvI7bD0Fdv41sUs1WKHYuzk46ZwhNMSQ7aUBoDnR-qSIaqVghrHwikEbMiVtHzPg/exec";

const REVALIDATE_SECONDS = 60;
const TIMEOUT_MS = 10_000;
const MAX_CONTACTS = 200;

/**
 * Returns the active HR contacts, or null when the directory cannot be read.
 *
 * In production, after the build, a failure throws instead: Next.js then keeps
 * serving the last page it generated successfully rather than replacing it
 * with the "unavailable" message.
 */
export async function getHrDirectory(
  program: string,
): Promise<HrContact[] | null> {
  const url = new URL(HR_DIRECTORY_URL);
  url.searchParams.set("program", program);
  url.searchParams.set("format", "json");

  try {
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = (await res.json()) as {
      ok?: unknown;
      records?: unknown;
    } | null;
    if (!data || data.ok !== true || !Array.isArray(data.records)) {
      throw new Error("Unexpected response from the HR directory");
    }
    return data.records.flatMap(toContact).slice(0, MAX_CONTACTS);
  } catch (err) {
    console.error("[hr-directory] could not load the HR list:", err);
    const isProductionRuntime =
      process.env.NODE_ENV === "production" &&
      process.env.NEXT_PHASE !== "phase-production-build";
    if (isProductionRuntime) throw err;
    return null;
  }
}

function toContact(record: unknown): HrContact[] {
  if (!record || typeof record !== "object") return [];
  const { name, phone } = record as { name?: unknown; phone?: unknown };
  if (typeof name !== "string" || typeof phone !== "string") return [];
  const contact = { name: name.trim(), phone: phone.trim() };
  return contact.name && contact.phone ? [contact] : [];
}
