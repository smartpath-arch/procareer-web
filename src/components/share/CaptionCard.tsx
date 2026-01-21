"use client";

import { useEffect, useState } from "react";

type CaptionCardProps = {
  title: string;
  description: string;
  filePath: string;
};

export default function CaptionCard({
  title,
  description,
  filePath,
}: CaptionCardProps) {
  const [caption, setCaption] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(filePath)
      .then((res) => res.text())
      .then(setCaption);
  }, [filePath]);

  async function handleCopy() {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <section className="bg-white rounded-2xl shadow-md p-6 space-y-5">
      <div>
        <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
          📝 Caption
        </span>

        <h3 className="mt-3 font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="bg-gray-200 rounded-xl p-4 text-sm text-gray-800 whitespace-pre-wrap">
        {caption || "Loading caption..."}
      </div>
      <button
        onClick={handleCopy}
        className="w-full rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-600 font-semibold py-3 transition"
      >
        Copy Caption
      </button>
      <p className="text-xs text-gray-500">
        Setelah di-copy, paste caption ini ke grup WhatsApp tempat kamu mengirim
        poster.
      </p>
      {copied && (
        <div className="bg-yellow-100 text-yellow-800 text-sm px-4 py-2 rounded-lg">
          Caption sudah tersalin. Tinggal paste di grup WhatsApp sesuai
          instruksi misi ✨
        </div>
      )}
    </section>
  );
}
