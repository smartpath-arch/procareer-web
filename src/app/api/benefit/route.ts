import { NextResponse } from "next/server";

const DEFAULT_APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz6CZXKNXBVOJZIXQ2sorJ6CPrF-8EZZ52lB9PaGSEfmUB8-vH8ZDmHo2FKo0z3XTcUdw/exec";

const TIMEOUT_MS = 60_000;
const MAX_REQUEST_BYTES = 4096;

type ProgramKey = "karier" | "beasiswa";
type PackageName = "Free" | "Basic" | "VIP";

type BenefitInput = {
  nama: string;
  email: string;
  program: ProgramKey;
};

type Announcement = {
  ok: true;
  type: "announcement";
  brand: "ProCareer";
  nama: string;
  programKey: ProgramKey;
  programName: "Karier" | "Beasiswa";
  packageName: PackageName;
  greeting: string;
  message: string;
  note: string;
  cvMessage: string;
  cvStatus: "" | "ready" | "processing";
  benefitUrl: string;
  cvUrl: string;
  displayTemplate: string;
};

type BenefitError = {
  ok: false;
  type: "error";
  message: string;
};

const PROGRAM_NAMES = {
  karier: "Karier",
  beasiswa: "Beasiswa",
} as const;

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
  );
}

function isText(
  value: unknown,
  maxLength: number,
  minLength = 0,
): value is string {
  return (
    typeof value === "string" &&
    value.length >= minLength &&
    value.length <= maxLength
  );
}

function isProgram(value: unknown): value is ProgramKey {
  return value === "karier" || value === "beasiswa";
}

function parseInput(value: unknown): BenefitInput | null {
  if (
    !isRecord(value) ||
    typeof value.nama !== "string" ||
    typeof value.email !== "string" ||
    !isProgram(value.program)
  ) {
    return null;
  }

  const nama = value.nama.normalize("NFKC").trim();

  const email = value.email
    .normalize("NFKC")
    .trim()
    .toLowerCase();

  if (!nama || nama.length > 200) {
    return null;
  }

  if (
    !email ||
    email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return null;
  }

  return {
    nama,
    email,
    program: value.program,
  };
}

function parseResponse(
  value: unknown,
): Announcement | BenefitError | null {
  if (!isRecord(value)) {
    return null;
  }

  if (
    value.ok === false &&
    value.type === "error" &&
    isText(value.message, 2000, 1)
  ) {
    return {
      ok: false,
      type: "error",
      message: value.message,
    };
  }

  if (
    value.ok !== true ||
    value.type !== "announcement" ||
    value.brand !== "ProCareer" ||
    !isProgram(value.programKey) ||
    (
      value.programName !== "Karier" &&
      value.programName !== "Beasiswa"
    ) ||
    (
      value.packageName !== "Free" &&
      value.packageName !== "Basic" &&
      value.packageName !== "VIP"
    ) ||
    !isText(value.nama, 200, 1) ||
    !isText(value.greeting, 1000) ||
    !isText(value.message, 5000) ||
    !isText(value.note, 5000) ||
    !isText(value.cvMessage, 5000) ||
    (
      value.cvStatus !== "" &&
      value.cvStatus !== "ready" &&
      value.cvStatus !== "processing"
    ) ||
    !isText(value.benefitUrl, 4096) ||
    !isText(value.cvUrl, 4096) ||
    !isText(value.displayTemplate, 50_000)
  ) {
    return null;
  }

  return {
    ok: true,
    type: "announcement",
    brand: "ProCareer",
    nama: value.nama,
    programKey: value.programKey,
    programName: value.programName,
    packageName: value.packageName,
    greeting: value.greeting,
    message: value.message,
    note: value.note,
    cvMessage: value.cvMessage,
    cvStatus: value.cvStatus,
    benefitUrl: value.benefitUrl,
    cvUrl: value.cvUrl,
    displayTemplate: value.displayTemplate,
  };
}

function jsonResponse(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function errorResponse(message: string, status: number) {
  return jsonResponse(
    {
      ok: false,
      type: "error",
      message,
    },
    status,
  );
}

function safeHttpsUrl(value: string): string {
  if (!value.trim()) {
    return "";
  }

  try {
    const url = new URL(value.trim());

    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password
    ) {
      return "";
    }

    return url.href;
  } catch {
    return "";
  }
}

function getAppsScriptUrl(): string {
  const configuredUrl =
    process.env.BENEFIT_APPS_SCRIPT_URL?.trim() ||
    DEFAULT_APPS_SCRIPT_URL;

  const url = new URL(configuredUrl);

  if (
    url.protocol !== "https:" ||
    url.hostname !== "script.google.com" ||
    url.port ||
    url.username ||
    url.password ||
    !/^\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(
      url.pathname,
    ) ||
    url.search ||
    url.hash
  ) {
    throw new Error("Invalid benefit endpoint configuration");
  }

  return url.href;
}

async function readLimitedBody(
  request: Request,
): Promise<string> {
  if (!request.body) {
    throw new Error("EMPTY_BODY");
  }

  const reader = request.body.getReader();
  const decoder = new TextDecoder();

  let byteCount = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      byteCount += value.byteLength;

      if (byteCount > MAX_REQUEST_BYTES) {
        await reader.cancel();
        throw new Error("BODY_TOO_LARGE");
      }

      text += decoder.decode(value, { stream: true });
    }

    text += decoder.decode();

    return text;
  } finally {
    reader.releaseLock();
  }
}

export async function POST(request: Request) {
  const mediaType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();

  if (mediaType !== "application/json") {
    return errorResponse(
      "Format permintaan harus berupa JSON.",
      415,
    );
  }

  let rawBody: string;

  try {
    rawBody = await readLimitedBody(request);
  } catch (error) {
    const tooLarge =
      error instanceof Error &&
      error.message === "BODY_TOO_LARGE";

    return errorResponse(
      tooLarge
        ? "Ukuran permintaan terlalu besar."
        : "Permintaan tidak dapat dibaca.",
      tooLarge ? 413 : 400,
    );
  }

  let body: unknown;

  try {
    body = JSON.parse(rawBody);
  } catch {
    return errorResponse(
      "Format permintaan tidak valid.",
      400,
    );
  }

  const input = parseInput(body);

  if (!input) {
    return errorResponse(
      "Periksa nama lengkap, email, dan pilihan program.",
      400,
    );
  }

  let endpoint: string;

  try {
    endpoint = getAppsScriptUrl();
  } catch {
    console.error(
      "[benefit] Invalid Apps Script endpoint configuration.",
    );

    return errorResponse(
      "Layanan klaim benefit belum dapat diakses. " +
        "Silakan hubungi tim ProCareer.",
      500,
    );
  }

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, TIMEOUT_MS);

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(input),
      cache: "no-store",
      redirect: "follow",
      signal: controller.signal,
    });

    if (!upstream.ok) {
      console.error(
        "[benefit] Apps Script returned HTTP status:",
        upstream.status,
      );

      return errorResponse(
        "Layanan pengecekan sedang mengalami gangguan. " +
          "Silakan coba kembali.",
        502,
      );
    }

    let upstreamBody: unknown;

    try {
      upstreamBody = await upstream.json();
    } catch {
      if (controller.signal.aborted) {
        throw new Error("UPSTREAM_TIMEOUT");
      }

      console.error(
        "[benefit] Apps Script returned a non-JSON response.",
      );

      return errorResponse(
        "Respons layanan pengecekan belum sesuai. " +
          "Silakan coba kembali atau hubungi tim ProCareer.",
        502,
      );
    }

    const result = parseResponse(upstreamBody);

    if (!result) {
      console.error(
        "[benefit] Apps Script response failed validation.",
      );

      return errorResponse(
        "Hasil pengecekan belum dapat ditampilkan. " +
          "Silakan coba kembali atau hubungi tim ProCareer.",
        502,
      );
    }

    if (!result.ok) {
      return jsonResponse(result);
    }

    if (
      result.programKey !== input.program ||
      result.programName !== PROGRAM_NAMES[input.program]
    ) {
      console.error(
        "[benefit] Apps Script returned a mismatched program.",
      );

      return errorResponse(
        "Hasil program tidak sesuai dengan permintaan. " +
          "Silakan coba kembali.",
        502,
      );
    }

    const isPaidPackage =
      result.packageName === "Basic" ||
      result.packageName === "VIP";

    const cvUrl =
      result.packageName === "VIP"
        ? safeHttpsUrl(result.cvUrl)
        : "";

    return jsonResponse({
      ...result,

      benefitUrl: isPaidPackage
        ? safeHttpsUrl(result.benefitUrl)
        : "",

      cvUrl,

      cvStatus:
        result.packageName === "VIP"
          ? cvUrl
            ? "ready"
            : "processing"
          : "",

      cvMessage:
        result.packageName === "VIP"
          ? result.cvMessage
          : "",
    });
  } catch {
    const timedOut = controller.signal.aborted;

    console.error(
      timedOut
        ? "[benefit] Apps Script request timed out."
        : "[benefit] Apps Script request failed.",
    );

    return errorResponse(
      timedOut
        ? "Pengecekan membutuhkan waktu lebih lama. " +
            "Silakan coba kembali."
        : "Terjadi gangguan saat memeriksa data.
