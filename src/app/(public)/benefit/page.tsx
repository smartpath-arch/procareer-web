import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Klaim Benefit ProCareer",
  description: "Halaman klaim benefit peserta ProCareer.",
};

const BENEFIT_URL =
  "https://script.google.com/macros/s/AKfycbz6CZXKNXBVOJZIXQ2sorJ6CPrF-8EZZ52lB9PaGSEfmUB8-vH8ZDmHo2FKo0z3XTcUdw/exec";

export default function BenefitPage() {
  return (
    <main className="min-h-dvh w-full overflow-x-hidden">
      <div className="border-b border-gray-200 bg-white px-4 py-3">
        <p className="text-center text-sm leading-6 text-gray-600">
          Jika formulir tidak tampil,{" "}
          <a
            href={BENEFIT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900"
          >
            buka formulir klaim benefit ProCareer di tab baru
          </a>
          .
        </p>
      </div>

      <iframe
        src={BENEFIT_URL}
        title="Klaim Benefit ProCareer"
        className="block w-full border-0"
        style={{ height: "100dvh", minHeight: "800px" }}
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </main>
  );
}
