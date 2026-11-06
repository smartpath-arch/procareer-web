import type { Metadata } from "next";
import Footer from "@/components/common/Footer";
import HrDirectory, {
  type HrDirectoryTheme,
} from "@/components/hr-verification/HrDirectory";
import { getHrDirectory } from "@/components/hr-verification/getHrDirectory";

// Official HR directory, read on the server from the shared Google Apps Script
// web app (see getHrDirectory) and rendered here, without an iframe. The page
// is regenerated at most once a minute.
export const revalidate = 60;

const PROGRAM = "procareer";
const PROGRAM_NAME = "ProCareer";

// ProCareer: purple + soft yellow
const THEME: HrDirectoryTheme = {
  pageBg: "#FFFBEA",
  heroBg:
    "linear-gradient(180deg, #C25FE3 0%, #9A45C7 40%, #6A2A96 75%, #46196A 100%)",
  heroAccent: "#FFE27A",
  heroLine: "#FFE27A",
  heading: "#2B0F4C",
  primary: "#7E35A8",
  accent: "#F5C93A",
  border: "#EFE5C6",
  cardTint: "#F6ECFC",
  cardHoverBorder: "#E0C9EF",
  phoneBg: "#FFFDF3",
  phoneBorder: "#EFE5C6",
  phoneText: "#2B0F4C",
};

export const metadata: Metadata = {
  title: "Verifikasi HR Resmi",
  description:
    "Daftar kontak resmi Human Resources ProCareer. Pastikan kontak yang menghubungi Anda tercantum di halaman ini.",
};

export default async function HrVerificationPage() {
  const contacts = await getHrDirectory(PROGRAM);

  return (
    <div className="flex min-h-dvh w-full flex-col overflow-x-hidden">
      <HrDirectory
        programName={PROGRAM_NAME}
        contacts={contacts}
        theme={THEME}
      />
      <Footer />
    </div>
  );
}
