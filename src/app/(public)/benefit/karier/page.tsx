import type { Metadata } from "next";
import Footer from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Klaim Benefit Karier ProCareer",
  description: "Halaman klaim benefit program Karier ProCareer.",
};

const BENEFIT_URL =
  "https://script.google.com/macros/s/AKfycbz6CZXKNXBVOJZIXQ2sorJ6CPrF-8EZZ52lB9PaGSEfmUB8-vH8ZDmHo2FKo0z3XTcUdw/exec?program=karier";

export default function KarierBenefitPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-white">
      <section
        className="w-full flex-1"
        aria-label="Klaim Benefit Karier ProCareer"
      >
        <iframe
          src={BENEFIT_URL}
          title="Klaim Benefit Karier ProCareer"
          className="block w-full border-0"
          style={{ height: "100dvh", minHeight: "800px" }}
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </section>
      <Footer />
    </div>
  );
}
