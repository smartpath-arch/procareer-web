import type { Metadata } from "next";
import BenefitClaimForm from "@/components/benefit/BenefitClaimForm";

export const metadata: Metadata = {
  title: "Klaim Benefit ProCareer",
  description:
    "Cek benefit program Karier dan Beasiswa ProCareer sesuai paket menggunakan nama lengkap dan email pendaftaran.",
};

export default function BenefitPage() {
  return <BenefitClaimForm />;
}
