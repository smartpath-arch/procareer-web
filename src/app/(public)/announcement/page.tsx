"use client";

import { useEffect, useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";

import logoProcareer from "../../../../public/assets/announcement/ProcareerLog.png";
import successImg from "../../../../public/assets/announcement/success.png";
import failedImg from "../../../../public/assets/announcement/Failed.png";
import belumAdaImg from "../../../../public/assets/announcement/BelumAda.png";

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

type GasConfigResponse = {
  ok: boolean;
  program?: {
    isOpen: boolean;
    periodStart?: string | null;
    periodEnd?: string | null;
    title?: string;
  };
  message?: string;
};

type AnnouncementStatus = "PASSED" | "FAILED" | "NOT_FOUND";

type GasResponse = {
  ok: boolean;
  status?: AnnouncementStatus;
  message?: string;
  ctaUrl?: string;
};

type ViewState = "FORM" | "RESULT" | "CLOSED";

const CLOSED_MESSAGE =
  "Mohon menunggu pengumuman selanjutnya. Terima kasih atas pengertiannya.";

const DEFAULT_CTA_URL =
  "https://skillspace.myr.id/m/career-preparation-mastery-cv-interview-networking-to-get-hired-faster/?coupon=UPGRADESKILL";

export default function AnnouncementPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [configLoading, setConfigLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<AnnouncementStatus | null>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [timelineMsg, setTimelineMsg] = useState(CLOSED_MESSAGE);
  const [view, setView] = useState<ViewState>("FORM");
  const [ctaUrl, setCtaUrl] = useState(DEFAULT_CTA_URL);
  const [programMeta, setProgramMeta] = useState<
    GasConfigResponse["program"] | null
  >(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/announcement?action=config", {
          cache: "no-store",
        });
        const data: GasConfigResponse = await res.json();

        if (!data.ok || !data.program) {
          setProgramMeta(null);
          setIsOpen(false);
          setTimelineMsg(CLOSED_MESSAGE);
          setView("CLOSED");
          return;
        }

        const program = data.program;
        setProgramMeta(program);
        setIsOpen(program.isOpen);

        if (!program.isOpen) {
          setTimelineMsg(CLOSED_MESSAGE);
          setView("CLOSED");
        } else {
          setTimelineMsg("");
          setView("FORM");
        }
      } catch {
        setProgramMeta(null);
        setIsOpen(false);
        setTimelineMsg(CLOSED_MESSAGE);
        setView("CLOSED");
      } finally {
        setConfigLoading(false);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus(null);

    if (programMeta?.isOpen === false || isOpen === false) {
      setTimelineMsg(CLOSED_MESSAGE);
      setView("CLOSED");
      return;
    }

    if (!name.trim()) return setError("Nama wajib diisi!");
    if (!email) return setError("Email wajib diisi!");
    if (!email.includes("@") || !email.includes(".")) {
      return setError("Format email tidak valid!");
    }

    setLoading(true);

    const encodedEmail = encodeURIComponent(email);
    const encodedName = encodeURIComponent(name);

    try {
      const res = await fetch(
        `/api/announcement?email=${encodedEmail}&name=${encodedName}`,
        { cache: "no-store" },
      );

      if (!res.ok) {
        setStatus("NOT_FOUND");
        setError("Gagal memproses. Silakan coba lagi.");
        setView("FORM");
        return;
      }

      const data = (await res.json()) as GasResponse;

      if (data?.ctaUrl) {
        setCtaUrl(data.ctaUrl);
      } else {
        setCtaUrl(DEFAULT_CTA_URL);
      }

      if (data?.ok && (data.status === "PASSED" || data.status === "FAILED")) {
        setStatus(data.status);
        setView("RESULT");
        return;
      }

      setStatus("NOT_FOUND");
      setError("Data tidak ditemukan. Pastikan nama dan email sudah benar.");
      setView("FORM");
    } catch (err) {
      console.error("Fetch error:", err);
      setStatus("NOT_FOUND");
      setError("Terjadi kendala jaringan. Silakan coba lagi.");
      setView("FORM");
    } finally {
      setLoading(false);
    }
  };

  const isPassed = status === "PASSED";
  const isFailed = status === "FAILED";

  return (
    <main
      className={`${plusJakarta.className}
        min-h-screen w-full overflow-hidden
        bg-[linear-gradient(180deg,_#C663E3_0%,_#B55BDE_35%,_#7B3FA8_68%,_#361C53_100%)]
        flex items-center justify-center
        px-4 sm:px-8 md:px-16 lg:px-20
        py-6
      `}
    >
      {configLoading && (
        <div className="text-[#f7e8ff]/80 text-sm">Memuat...</div>
      )}

      {!configLoading && view === "FORM" && (
        <div
          className="
            w-full max-w-3xl
            rounded-[32px]
            border border-white/10
            bg-[#2f184c]/78
            backdrop-blur-md
            px-6 sm:px-10 md:px-16 lg:px-20
            pt-8 sm:pt-10
            pb-12 sm:pb-16 md:pb-20
            shadow-[0_24px_80px_rgba(47,24,76,0.35)]
          "
        >
          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex justify-center">
              <div className="relative h-[110px] w-[360px] sm:h-[130px] sm:w-[420px] md:h-[150px] md:w-[500px]">
                <Image
                  src={logoProcareer}
                  alt="Logo Procareer"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
                />
              </div>
            </div>

            <h1
              className="
                -mt-1 sm:-mt-2 md:-mt-3
                text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                p-2 sm:p-3
                text-center font-bold
                leading-[1.02]
                bg-[linear-gradient(90deg,_#fff6ff_0%,_#f1cbff_40%,_#cb66e8_100%)]
                bg-clip-text text-transparent
              "
            >
              PENGUMUMAN PROCAREER
            </h1>

            <p className="mt-2 text-center text-xs sm:text-sm text-[#f5dbff]/80">
              Masukkan Nama Lengkap dan Alamat Email dengan benar
            </p>
          </div>

          <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
            <div>
              <label className="mb-1 block text-xs sm:text-sm text-[#f9e9ff]">
                Nama Lengkap :
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="
                  w-full rounded-full
                  bg-white/95 px-4 py-2.5 sm:py-3
                  text-sm text-[#2f184c]
                  outline-none
                  placeholder:text-[#816595]
                  focus:ring-2 focus:ring-[#cb66e8]
                "
                required
                placeholder="Contoh: Budi Santoso"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs sm:text-sm text-[#f9e9ff]">
                Email :
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full rounded-full
                  bg-white/95 px-4 py-2.5 sm:py-3
                  text-sm text-[#2f184c]
                  outline-none
                  placeholder:text-[#816595]
                  focus:ring-2 focus:ring-[#cb66e8]
                "
                required
                placeholder="Contoh: email@domain.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading || isOpen === false}
              className="
                mt-2 sm:mt-4
                w-full rounded-xl
                bg-[linear-gradient(90deg,_#cb66e8_0%,_#a14ed3_100%)]
                py-3
                text-sm sm:text-base
                font-semibold text-white
                shadow-[0_12px_30px_rgba(203,102,232,0.35)]
                transition hover:scale-[1.01] hover:opacity-95
                disabled:opacity-70
              "
            >
              {loading ? "Memproses..." : "Lihat Hasil"}
            </button>

            {error && (
              <div className="rounded-lg border border-[#ffb6da]/30 bg-[#5e2348]/60 p-3 text-sm text-[#ffe1f0]">
                ⚠️ {error}
              </div>
            )}

            <div className="flex items-center justify-between text-[#f0d3ff]/80">
              <span>Ada kendala?</span>
              <a
                className="font-medium text-[#fff0ff] underline decoration-[#cb66e8] underline-offset-4"
                href="https://docs.google.com/forms/d/e/1FAIpQLScuyptqS01iiP7-vTk31IE_Nrxf4_goUtM3zdFBK4D9schBiQ/viewform?usp=dialog"
                target="_blank"
                rel="noreferrer"
              >
                Klik Bantuan
              </a>
            </div>
          </form>
        </div>
      )}

      {!configLoading && view === "RESULT" && (
        <div className="w-full max-w-[420px] px-2 py-4">
          <div className="flex min-h-[88vh] flex-col items-center text-center">
            <div className="relative mb-1 h-[82px] w-[260px] sm:h-[92px] sm:w-[290px]">
              <Image
                src={logoProcareer}
                alt="Logo Procareer"
                fill
                priority
                className="object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
              />
            </div>

            <h1
              className="
                -mt-1
                text-[34px] font-extrabold leading-[1.05]
                text-white sm:text-[38px]
              "
            >
              HASIL PENGUMUMAN
            </h1>

            {isPassed && (
              <>
                <div className="mt-5 max-w-[320px] text-[#361C53]">
                  <p className="text-[18px] font-bold leading-[1.35] sm:text-[20px]">
                    Selamat ya, kamu lolos ke tahap selanjutnya!
                  </p>
                  <p className="text-[18px] font-bold leading-[1.35] sm:text-[20px]">
                    (kode PC371)
                  </p>
                </div>
              </>
            )}

            {isFailed && (
              <>
                <div className="mt-5 max-w-[340px] text-[#361C53]">
                  <p className="text-[18px] font-bold leading-[1.35] sm:text-[20px]">
                    Maaf, kamu belum lolos tahap ini
                  </p>
                </div>
              </>
            )}

            <div className="mt-auto flex w-full justify-center pt-8">
              <Image
                src={isPassed ? successImg : failedImg}
                alt={isPassed ? "Lolos" : "Tidak Lolos"}
                priority
                className="h-auto w-full max-w-[230px] sm:max-w-[250px]"
              />
            </div>

            <button
              onClick={() => {
                setView("FORM");
                setStatus(null);
                setError("");
              }}
              className="
                mt-3 text-sm text-white/90
                underline underline-offset-4 hover:text-white
              "
            >
              Cek data lagi
            </button>
          </div>
        </div>
      )}

      {!configLoading && view === "CLOSED" && (
        <div
          className="
            w-full max-w-sm sm:max-w-md
            rounded-[32px]
            border border-white/10
            bg-[#2f184c]/76
            backdrop-blur-md
            shadow-[0_24px_80px_rgba(47,24,76,0.35)]
            flex flex-col
            text-center
            overflow-hidden
          "
        >
          <div className="px-6 sm:px-8 pt-8 sm:pt-10">
            <div className="mb-2 sm:mb-3 flex justify-center">
              <div className="relative h-[110px] w-[360px] sm:h-[130px] sm:w-[420px] md:h-[150px] md:w-[500px]">
                <Image
                  src={logoProcareer}
                  alt="Logo Procareer"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_6px_18px_rgba(0,0,0,0.18)]"
                />
              </div>
            </div>

            <h1
              className="
                mb-4
                text-xl sm:text-2xl md:text-3xl
                font-extrabold
                text-[#fff3ff]
              "
            >
              PENGUMUMAN TIDAK TERSEDIA
            </h1>

            <p className="text-center text-[18px] font-bold leading-[1.25] text-[#ffe2ff]">
              {timelineMsg || CLOSED_MESSAGE}
            </p>
          </div>

          <div className="mt-auto flex justify-center px-6 pt-6 sm:px-8 sm:pt-8">
            <Image
              src={belumAdaImg}
              alt="Pengumuman Tidak Tersedia"
              className="w-full max-w-[240px] sm:max-w-xs md:max-w-sm"
              priority
            />
          </div>
        </div>
      )}
    </main>
  );
}
