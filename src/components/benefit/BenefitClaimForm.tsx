"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

const REQUEST_TIMEOUT_MS = 70_000;

type ProgramKey = "karier" | "beasiswa";
type PackageName = "Free" | "Basic" | "VIP";

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
    (
      value.programKey !== "karier" &&
      value.programKey !== "beasiswa"
    ) ||
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

function safeUrl(value: string): string {
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

function externalLink(
  label: string,
  value: string,
  key: string,
): ReactNode {
  const href = safeUrl(value);

  if (!href) {
    return null;
  }

  return (
    <a
      key={key}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="break-words text-[#5b2585] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#71369b]"
    >
      {label}
    </a>
  );
}

function renderTemplate(
  template: string,
  data: Announcement,
): ReactNode[] {
  const textValues: Record<string, string> = {
    nama: data.nama,
    program: data.programName,
    paket: data.packageName,
    brand: data.brand,
  };

  const linkValues: Record<string, string> = {
    link_benefit: data.benefitUrl,

    link_cv:
      data.packageName === "VIP"
        ? data.cvUrl
        : "",
  };

  const pattern =
    /\{\{\s*([a-z_]+)\s*\}\}|https:\/\/[^\s<>"{}]+/gi;

  const nodes: ReactNode[] = [];
  let previousIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(template)) !== null) {
    nodes.push(template.slice(previousIndex, match.index));

    const key = match[1]?.toLowerCase();

    if (
      key &&
      Object.prototype.hasOwnProperty.call(textValues, key)
    ) {
      nodes.push(textValues[key]);
    } else if (
      key &&
      Object.prototype.hasOwnProperty.call(linkValues, key)
    ) {
      const value = linkValues[key];

      const fallback =
        key === "link_cv"
          ? data.packageName === "VIP"
            ? "CV sedang direview & dibuatkan"
            : "Layanan CV tidak tersedia untuk paket ini."
          : "Tautan belum tersedia untuk paket ini.";

      nodes.push(
        externalLink(
          value,
          value,
          `placeholder-${match.index}`,
        ) || fallback,
      );
    } else if (key) {
      nodes.push("[Bagian template belum dikenali]");
    } else {
      nodes.push(
        externalLink(
          match[0],
          match[0],
          `url-${match.index}`,
        ) || match[0],
      );
    }

    previousIndex = pattern.lastIndex;
  }

  nodes.push(template.slice(previousIndex));

  return nodes;
}

export default function BenefitClaimForm() {
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");

  const [announcement, setAnnouncement] =
    useState<Announcement | null>(null);

  const controllerRef =
    useRef<AbortController | null>(null);

  const resultRef =
    useRef<HTMLElement | null>(null);

  useEffect(() => {
    return () => {
      const controller = controllerRef.current;
      controllerRef.current = null;
      controller?.abort();
    };
  }, []);

  useEffect(() => {
    if (!announcement) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    resultRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }, [announcement]);

  function resetResult() {
    if (controllerRef.current) {
      return;
    }

    setAnnouncement(null);
    setStatus("");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (controllerRef.current) {
      return;
    }

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);

    const nama = String(formData.get("nama") || "")
      .normalize("NFKC")
      .trim();

    const email = String(formData.get("email") || "")
      .normalize("NFKC")
      .trim()
      .toLowerCase();

    const program = String(
      formData.get("program") || "",
    );

    setAnnouncement(null);

    if (!nama || nama.length > 200) {
      setStatus("Masukkan nama lengkap dengan benar.");
      return;
    }

    if (
      !email ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      setStatus("Masukkan alamat email yang valid.");
      return;
    }

    if (
      program !== "karier" &&
      program !== "beasiswa"
    ) {
      setStatus("Silakan pilih program terlebih dahulu.");
      return;
    }

    const controller = new AbortController();
    controllerRef.current = controller;

    setBusy(true);
    setStatus("Sedang memeriksa data...");

    const timer = window.setTimeout(() => {
      controller.abort();
    }, REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch("/api/benefit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          nama,
          email,
          program,
        }),
        cache: "no-store",
        signal: controller.signal,
      });

      const rawData: unknown = await response.json();

      if (controllerRef.current !== controller) {
        return;
      }

      if (controller.signal.aborted) {
        throw new Error("REQUEST_ABORTED");
      }

      const data = parseResponse(rawData);

      if (!data) {
        throw new Error("INVALID_RESPONSE");
      }

      if (!data.ok) {
        setStatus(data.message);
        return;
      }

      if (!response.ok) {
        throw new Error("REQUEST_FAILED");
      }

      if (
        data.programKey !== program ||
        data.programName !==
          (program === "karier" ? "Karier" : "Beasiswa")
      ) {
        throw new Error("PROGRAM_MISMATCH");
      }

      setAnnouncement(data);
      setStatus("");
    } catch {
      if (controllerRef.current !== controller) {
        return;
      }

      setAnnouncement(null);

      setStatus(
        controller.signal.aborted
          ? "Pengecekan membutuhkan waktu lebih lama. Silakan coba kembali."
          : "Terjadi gangguan saat memeriksa data. Silakan coba kembali atau hubungi tim ProCareer.",
      );
    } finally {
      window.clearTimeout(timer);

      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setBusy(false);
      }
    }
  }

  const benefitUrl = announcement
    ? safeUrl(announcement.benefitUrl)
    : "";

  const cvUrl = announcement
    ? safeUrl(announcement.cvUrl)
    : "";

  const isPaidPackage =
    announcement?.packageName === "Basic" ||
    announcement?.packageName === "VIP";

  const hasCustomMessage =
    Boolean(announcement?.displayTemplate.trim());

  const inputClassName =
    "block min-h-[60px] w-full min-w-0 rounded-full border-2 border-transparent bg-white px-5 py-4 text-base text-[#30243d] placeholder:text-[#8a8090] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#e5b6ff] disabled:cursor-wait disabled:opacity-80";

  const actionClassName =
    "inline-flex min-h-12 w-full items-center justify-center rounded-xl px-5 py-3 text-center text-sm font-semibold focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#71369b] sm:w-auto";

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #c96de4 0%, #71369b 48%, #321451 100%)",
      }}
    >
      <main
        className="mx-auto min-h-dvh w-full max-w-6xl px-5 py-10 text-[#fffbe0] sm:px-10 lg:px-16"
        style={{
          background:
            "linear-gradient(180deg, #733b98 0%, #4c246c 45%, #321451 100%)",
        }}
      >
        <header className="text-center">
          <p className="text-lg font-semibold tracking-wide text-[#fffbe0]">
            ProCareer
          </p>

          <h1 className="mt-6 text-3xl leading-tight font-semibold tracking-tight text-[#fffbe0] sm:text-5xl">
            Klaim Benefit
            <span className="block">
              paket VIP &amp; Basic
            </span>
          </h1>

          <div
            id="benefit-instructions"
            className="mx-auto mt-6 max-w-3xl space-y-3 text-base leading-8 text-white sm:text-lg"
          >
            <p>
              Masukkan nama lengkap &amp; email yang kamu
              gunakan saat mendaftar
            </p>

            <p className="font-semibold text-[#fffbe0]">
              Jika baru mendaftar, mohon ditunggu, datamu
              sedang dicek maks. 3x24 jam yaa
            </p>
          </div>
        </header>

        <form
          className="mx-auto mt-10 max-w-[850px]"
          aria-describedby="benefit-instructions"
          aria-busy={busy}
          onSubmit={handleSubmit}
          onChange={resetResult}
        >
          <fieldset
            disabled={busy}
            className="m-0 min-w-0 space-y-6 border-0 p-0"
          >
            <legend className="sr-only">
              Data peserta untuk pengecekan benefit
            </legend>

            <div>
              <label
                htmlFor="benefit-nama"
                className="mb-2 block font-medium text-[#fffbe0]"
              >
                Nama Lengkap :
              </label>

              <input
                id="benefit-nama"
                name="nama"
                type="text"
                autoComplete="name"
                maxLength={200}
                placeholder="Contoh: Budi Santoso"
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="benefit-email"
                className="mb-2 block font-medium text-[#fffbe0]"
              >
                Email :
              </label>

              <input
