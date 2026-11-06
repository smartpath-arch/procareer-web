import type { CSSProperties, ReactNode } from "react";
import type { HrContact } from "./getHrDirectory";

/** Colors of one program; the layout is shared by all three websites. */
export type HrDirectoryTheme = {
  pageBg: string;
  heroBg: string;
  heroAccent: string;
  heroLine: string;
  heading: string;
  primary: string;
  accent: string;
  border: string;
  cardTint: string;
  cardHoverBorder: string;
  phoneBg: string;
  phoneBorder: string;
  phoneText: string;
};

type HrDirectoryProps = {
  programName: string;
  /** null = the directory could not be loaded. */
  contacts: HrContact[] | null;
  theme: HrDirectoryTheme;
};

export default function HrDirectory({
  programName,
  contacts,
  theme,
}: HrDirectoryProps) {
  const colors = {
    "--hr-page": theme.pageBg,
    "--hr-heading": theme.heading,
    "--hr-border": theme.border,
    "--hr-card-hover": theme.cardHoverBorder,
    "--hr-phone-bg": theme.phoneBg,
    "--hr-phone-border": theme.phoneBorder,
    "--hr-phone-text": theme.phoneText,
  } as CSSProperties;

  return (
    <main className="w-full flex-1 bg-(--hr-page)" style={colors}>
      <section
        aria-labelledby="hr-directory-title"
        className="rounded-b-[28px] md:rounded-b-[48px]"
        style={{ backgroundImage: theme.heroBg }}
      >
        <div className="mx-auto max-w-[1120px] px-5 pt-10 pb-11 md:pt-[72px] md:pb-20">
          <h1
            id="hr-directory-title"
            className="text-[30px] leading-tight font-extrabold tracking-tight text-white md:text-5xl"
          >
            List HRD Resmi{" "}
            <span style={{ color: theme.heroAccent }}>{programName}</span>
          </h1>
          <span
            aria-hidden="true"
            className="mt-[18px] block h-[3px] w-full max-w-[360px] rounded-full"
            style={{ backgroundColor: theme.heroLine }}
          />
          <p className="mt-4 text-base font-medium text-white/90 md:text-[19px]">
            Daftar kontak resmi Human Resources {programName}.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="hr-directory-list"
        className="mx-auto max-w-[1120px] px-5 pt-8 pb-10 md:pt-14 md:pb-[72px]"
      >
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2
            id="hr-directory-list"
            className="text-xl font-bold tracking-tight text-(--hr-heading) md:text-2xl"
          >
            Daftar HR Resmi
          </h2>
          {contacts && contacts.length > 0 && (
            <p className="text-[13px] text-slate-500">
              Diperbarui otomatis setiap menit
            </p>
          )}
        </div>

        {contacts === null ? (
          <Message tone="error">
            Daftar HR resmi sedang tidak dapat dimuat. Silakan muat ulang
            halaman ini beberapa saat lagi.
          </Message>
        ) : contacts.length === 0 ? (
          <Message>Belum ada kontak HR resmi yang tercantum saat ini.</Message>
        ) : (
          <ul className="flex flex-wrap justify-center gap-6">
            {contacts.map((contact, index) => (
              <li
                key={`${contact.phone}-${index}`}
                className="relative flex min-h-[166px] w-full min-w-0 flex-col items-start justify-center overflow-hidden rounded-[20px] border border-(--hr-border) px-6 pt-7 pb-6 shadow-sm transition duration-200 hover:-translate-y-[3px] hover:border-(--hr-card-hover) hover:shadow-lg sm:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
                style={{
                  backgroundImage: `linear-gradient(145deg, #fff 52%, ${theme.cardTint})`,
                }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[5px]"
                  style={{
                    backgroundImage: `linear-gradient(90deg, ${theme.primary} 0 72%, ${theme.accent} 72% 100%)`,
                  }}
                />
                <p className="mb-5 max-w-full text-[19px] leading-snug font-bold [overflow-wrap:anywhere] text-(--hr-heading)">
                  {contact.name}
                </p>
                <p className="max-w-full rounded-[11px] border border-(--hr-phone-border) bg-(--hr-phone-bg) px-3.5 py-2 text-[17px] font-bold tracking-wide tabular-nums [overflow-wrap:anywhere] text-(--hr-phone-text)">
                  {contact.phone}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function Message({ tone, children }: { tone?: "error"; children: ReactNode }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={
        tone === "error"
          ? "mx-auto max-w-[620px] rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-center text-red-800"
          : "mx-auto max-w-[620px] rounded-2xl border border-(--hr-border) bg-white px-5 py-4 text-center text-slate-600"
      }
    >
      {children}
    </p>
  );
}
