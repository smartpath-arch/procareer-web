import Link from "next/link";

export const metadata = {
  title: "404 Not Found • SmartPath",
  description: "Halaman yang kamu cari tidak ditemukan di SmartPath.",
};

export default function NotFound() {
  return (
    <main
      className="min-h-[60vh] flex items-center justify-center px-6 py-16"
      role="main"
      aria-labelledby="page-title"
    >
      <div className="text-center space-y-4">
        <h1
          id="page-title"
          aria-label="404 Page Not Found"
          className="text-2xl md:text-3xl font-bold"
        >
          Page not found
        </h1>
        <p className="text-gray-600">Halaman yang kamu cari tidak tersedia.</p>
        <Link
          href="/"
          className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          Kembali ke Home
        </Link>
      </div>
    </main>
  );
}
