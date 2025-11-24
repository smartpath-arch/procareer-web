import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Providers from "@/components/provider";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SkillSpace",
  description: "SkillSpace - Bantu Kamu Cepat Berkarir di Bidang Data & AI",
  icons: {
    icon: "/assets/icon/iconskillspace.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/assets/icon/iconskillspace.png",
  },
  manifest: "/site.webmanifest",
};

// Viewport configuration mobile
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#F7C948",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}
      >
        <Providers>
          <Navbar />
          <div>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
