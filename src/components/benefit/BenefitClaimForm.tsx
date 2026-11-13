"use client";

import Image from "next/image";
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
          <div className="mx-auto flex w-fit max-w-[90%] items-center justify-center overflow-hidden rounded-[14px] bg-[#fffbe0] px-2 py-1 sm:rounded-2xl sm:px-[10px] sm:py-[5px]">
            <Image
              src="/assets/common/navbar/logonavbarprocareer.svg"
              alt="ProCareer"
              width={272}
              height={74}
              className="block h-auto w-[170px] max-w-full sm:w-[190px]"
            />
          </div>

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
                id="benefit-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                placeholder="Contoh: email@domain.com"
                required
                className={inputClassName}
              />
            </div>

            <div>
              <label
                htmlFor="benefit-program"
                className="mb-2 block font-medium text-[#fffbe0]"
              >
                Program :
              </label>

              <select
                id="benefit-program"
                name="program"
                defaultValue=""
                required
                className={inputClassName}
              >
                <option value="" disabled>
                  Pilih program
                </option>

                <option value="karier">
                  Karir/intern/webinar/bootcamp
                </option>

                <option value="beasiswa">
                  Beasiswa
                </option>
              </select>
            </div>

            <button
              type="submit"
              disabled={busy}
              className="mt-2 block min-h-[58px] w-full rounded-2xl border border-[#b68bcd] bg-[#321451] px-6 py-4 text-lg font-semibold text-white hover:bg-[#462063] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#e5b6ff] disabled:cursor-wait disabled:opacity-65"
            >
              {busy ? "Memeriksa..." : "Klaim Benefit"}
            </button>
          </fieldset>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm sm:text-base">
            <span className="text-[#eadcf5]">
              Ada kendala?
            </span>

            <a
              href="https://s.id/FormAduanProCareer"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 text-[#fffbe0] underline underline-offset-4 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e5b6ff]"
            >
              Klik Bantuan
            </a>
          </div>
        </form>

        <p
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="mx-auto mt-5 max-w-[850px] text-[#fffbe0] [overflow-wrap:anywhere] empty:hidden"
        >
          {status}
        </p>

        {announcement && (
          <section
            ref={resultRef}
            aria-label="Hasil pengecekan benefit ProCareer"
            aria-live="polite"
            className="mx-auto mt-8 max-w-[850px] scroll-mt-6 rounded-2xl bg-[#fffbe0] p-5 text-[#30243d] [overflow-wrap:anywhere] sm:p-7"
          >
            {!hasCustomMessage && (
              <h2 className="mb-4 text-xl font-semibold text-[#321451] sm:text-2xl">
                {announcement.greeting}
              </h2>
            )}

            <p className="mb-4 inline-block rounded-full bg-[#eadcf5] px-4 py-1.5 text-sm font-medium text-[#321451]">
              {announcement.programName} — Paket{" "}
              {announcement.packageName}
            </p>

            {hasCustomMessage ? (
              <div className="whitespace-pre-wrap">
                {renderTemplate(
                  announcement.displayTemplate,
                  announcement,
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <p>{announcement.message}</p>

                {announcement.note && (
                  <p className="text-[#675a73]">
                    {announcement.note}
                  </p>
                )}
              </div>
            )}

            {announcement.packageName === "VIP" &&
              announcement.cvMessage && (
                <p className="mt-6 rounded-xl border border-[#dfccec] bg-[#f1e9f9] p-5 whitespace-pre-wrap text-[#321451]">
                  {announcement.cvMessage}
                </p>
              )}

            {isPaidPackage && (
              <div className="mt-5 flex flex-wrap gap-3">
                {benefitUrl && (
                  <a
                    href={benefitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${actionClassName} bg-[#321451] text-white hover:bg-[#51246f]`}
                  >
                    Klaim Benefit
                  </a>
                )}

                {announcement.packageName === "VIP" &&
                  (cvUrl ? (
                    <a
                      href={cvUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${actionClassName} bg-[#eadcf5] text-[#321451] hover:bg-[#dfc9ee]`}
                    >
                      Ambil Hasil CV
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#e9e4ed] px-5 py-3 text-center text-sm font-semibold text-[#655b6e] sm:w-auto"
                    >
                      CV sedang direview &amp; dibuatkan
                    </span>
                  ))}
              </div>
            )}

            {isPaidPackage && !benefitUrl && (
              <p className="mt-4 rounded-xl border border-[#e2c88c] bg-[#fff2cf] p-4 text-sm text-[#655125]">
                Tautan klaim benefit belum tersedia.
                Silakan hubungi tim ProCareer.
              </p>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
