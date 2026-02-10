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
  imageSrc,
  filePath,
}: PosterDownloadCardProps) {
  const [downloaded, setDownloaded] = useState(false);

  return (
    <section className="bg-white rounded-2xl shadow-md p-6 space-y-5">
      <div>
        <span className="inline-flex items-center gap-2 bg-[#2F184C]/10 text-[#2F184C] text-sm font-semibold px-3 py-1 rounded-full">
          📄 Poster {number}
        </span>

        <h3 className="mt-3 font-semibold text-gray-800">{title}</h3>
        {/* <p className="text-sm text-gray-800">{description}</p> */}
      </div>
      <div className="flex justify-center">
        <div className="relative w-full max-w-xs aspect-[2/3] bg-gray-200 rounded-xl shadow-inner overflow-hidden">
          <img
            src={imageSrc}
            alt={`Poster ${number}`}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <a
        href={filePath}
        download
        onClick={() => setDownloaded(true)}
        className="block text-center w-full rounded-lg bg-[#2F184C] hover:bg-[#24123a] text-white font-semibold py-3 transition"
      >
        Download Poster {number}
      </a>
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
