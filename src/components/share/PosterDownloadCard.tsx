"use client";

import { useState } from "react";
import Image from "next/image";

type PosterDownloadCardProps = {
  number: number;
  title: string;
  description: string;
  imageSrc: string;
  filePath: string;
};

export default function PosterDownloadCard({
  number,
  title,
  description,
}: PosterDownloadCardProps) {
  const [downloaded, setDownloaded] = useState(false);

  const posterPath = "/assets/poster-new.png";

  const handleDownload = async () => {
    try {
      const response = await fetch(posterPath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "poster-procareer.png";
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setDownloaded(true);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <section className="bg-white rounded-2xl shadow-md p-6 space-y-5">
      <div>
        <span className="inline-flex items-center gap-2 bg-[#2F184C]/10 text-[#2F184C] text-sm font-semibold px-3 py-1 rounded-full">
          📄 Poster {number}
        </span>

        <h3 className="mt-3 font-semibold text-gray-800">{title}</h3>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full max-w-xs bg-gray-200 rounded-xl shadow-inner overflow-hidden">
          <Image
            width={500}
            height={500}
            src={posterPath}
            alt={`Poster ${number}`}
            className="object-cover"
          />
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="block text-center w-full rounded-lg bg-[#2F184C] hover:bg-[#24123a] text-white font-semibold py-3 transition"
      >
        Download Poster {number}
      </button>

      <p className="text-xs text-gray-500">
        Format: PNG — siap dikirim ke grup WhatsApp untuk misi penyebaran
        poster.
      </p>

      {downloaded && (
        <div className="bg-yellow-100 text-yellow-800 text-sm px-4 py-2 rounded-lg">
          Poster {number} berhasil di-download. Kirim bareng Poster lainnya ke
          grup WhatsApp 💛
        </div>
      )}
    </section>
  );
}
