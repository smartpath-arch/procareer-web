"use client";

import { useEffect, useState } from "react";

type CaptionCardProps = {
  title: string;
  description: string;
  caption: string;
};

export default function CaptionCard({
  title,
  description,
  caption,
}: CaptionCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(caption);
    setCopied(true);
  }

  return (
    <section className="bg-white rounded-2xl shadow-md p-6 space-y-5">
      <div>
        <span className="inline-flex items-center gap-2 bg-[#2F184C]/10 text-[#2F184C] text-sm font-semibold px-3 py-1 rounded-full">
          📝 Caption
        </span>

        <h3 className="mt-3 font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <div className="bg-gray-200 rounded-xl p-3 text-sm text-gray-800 whitespace-pre-wrap max-h-36 overflow-y-auto">
        {caption || "Loading caption..."}
      </div>
      <button
        onClick={handleCopy}
        className="w-full rounded-lg bg-[#431f70] hover:bg-[#24123a] text-white font-semibold py-3 transition"
      >
        Copy Caption
      </button>
      <a
        target="_blank"
        href={`https://wa.me/?text=${encodeURIComponent(caption)}`}
        className="w-full bg-[#25D366] text-white text-sm py-2.5 rounded-lg hover:bg-[#128C7E] transition flex items-center justify-center gap-2"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="18"
          width="18"
          viewBox="0 0 640 640"
        >
          <path
            fill="#ffffff"
            d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z"
          />
        </svg>
        Share on Whatsapp
      </a>
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
