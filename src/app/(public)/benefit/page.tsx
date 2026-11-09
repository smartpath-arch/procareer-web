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
