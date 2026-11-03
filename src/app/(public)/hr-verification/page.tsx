import type { Metadata } from "next";
import Footer from "@/components/common/Footer";
import HrDirectoryEmbed from "@/components/hr-verification/HrDirectoryEmbed";

// Official HR directory: shared Google Apps Script web app reading the HR
// Google Sheet. NEXT_PUBLIC_HR_DIRECTORY_URL overrides the /exec URL (e.g. for
// testing). The query-string form is used because Apps Script asks signed-out
// visitors to log in on path-style URLs.
const HR_DIRECTORY_URL =
  process.env.NEXT_PUBLIC_HR_DIRECTORY_URL ||
  "https://script.google.com/macros/s/AKfycbxtFl48gDZfkVpiFXcqeoPYxLHPrXs6p1lJMgNIaOOhLdW2qxyLEkCyQMhKvPqhqCVlOg/exec";
const PROGRAM = "procareer";

export const metadata: Metadata = {
  title: "Verifikasi HR Resmi",
  description:
    "Daftar kontak resmi Human Resources ProCareer. Pastikan kontak yang menghubungi Anda tercantum di halaman ini.",
};

export default function HrVerificationPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden bg-white">
      <HrDirectoryEmbed
        src={`${HR_DIRECTORY_URL}?program=${PROGRAM}&embed=1`}
        fallbackHref={`${HR_DIRECTORY_URL}?program=${PROGRAM}`}
        title="Daftar HR Resmi ProCareer"
      />
      <Footer />
    </div>
  );
}
