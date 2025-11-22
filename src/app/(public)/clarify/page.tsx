import Image from "next/image";
import TestimonialsSlider from "@/components/clarify/TestimonialsSlider";

export const metadata = {
  title: "Klarifikasi Program Beasiswa SmartPath: Fakta & Penjelasan Resmi",
  description:
    "Penjelasan resmi terkait program beasiswa SmartPath. Ketahui fakta, mekanisme seleksi, dan bukti nyata bahwa program ini benar-benar membantu ribuan mahasiswa berprestasi.",
  keywords: [
    "smartpath penipuan",
    "beasiswa smartpath resmi",
    "klarifikasi smartpath",
    "beasiswa smartpath terpercaya",
    "program beasiswa smartpath",
    "smartpath beasiswa fakta",
  ],
};

export default function ClarifyPage() {
  return (
    <main className="w-full bg-white text-[#0B2540] min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0056A3] to-[#0B69BE] text-white py-16 md:py-20 px-6 md:px-12 rounded-b-[50px] shadow-md">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
            SMARTPATH PENIPUAN ?
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Sebagai bentuk permintaan maaf kami,{" "}
            <strong>klaim kompensasi Rp 100.000 di halaman terbawah.</strong>
          </p>
        </div>
      </section>

      <article className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16 prose prose-lg md:prose-xl leading-relaxed text-justify">
        {/* Video Klarifikasi */}
        <section className="mb-12">
          <h2 className="text-[#0056A3] font-bold text-2xl md:text-3xl mb-4 text-center">
            Klarifikasi Resmi SmartPath
          </h2>
          <p className="mb-4 text-center">
            Untuk meluruskan berbagai informasi yang beredar, berikut adalah
            video klarifikasi resmi dari SmartPath.
          </p>
          <div className="rounded-2xl overflow-hidden border border-[#E0E7FF] shadow-sm aspect-video">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/7VFwNnWY9Zo?si=349aFmqyTMj99x5F&start=1&autoplay=1&mute=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Latar Belakang Isu */}
        <section className="mb-12">
          <h2 className="text-[#0056A3] font-bold text-2xl md:text-3xl mb-4">
            Apa yang terjadi?
          </h2>
          <p className="mb-4">
            Belakangan beredar isu bahwa beasiswa dan internship SmartPath
            penipuan atau <em>SmartPath scam</em>. Setelah kami telusuri,
            penyebab utama isu ini adalah adanya{" "}
            <strong>miskomunikasi</strong>{" "}
          </p>
          <p className="mb-3">
            Setelah kami telusuri, penyebab utama isu ini adalah miskomunikasi:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mb-4">
            <li>
              Banyak peserta tidak baca keseluruhan panduan dan mengira tidak
              ada pengumuman lebih lanjut karena timeline, testimoni{" "}
              <em>awardee</em>, dan info yang dihubungi hanya bagi yang lolos
              saja berada di halaman akhir <em>guidebook</em>.
            </li>
            <li>
              Terdapat pihak yang membuka program mirip Smartpath dengan tujuan
              penipuan, sehingga kami ikut terdampak.
            </li>
            <li>
              Selain itu, ada info terkait sertifikat program Smartpath tidak
              dikirim. Padahal seluruh sertifikat sudah dikirim via email dan
              kemungkinan masuk ke folder spam sehingga tidak terbaca.
            </li>
          </ol>

          <p className="mb-4">
            Menanggapi hal ini, smartpath meminta maaf kepada seluruh pihak yang
            terlibat dan merasa dirugikan
          </p>
        </section>

        {/* Langkah Perbaikan */}
        <section className="mb-12">
          <h2 className="text-[#0056A3] font-bold text-2xl md:text-3xl mb-4">
            Langkah Perbaikan SmartPath
          </h2>
          <p className="mb-3">
            Sebagai langkah perbaikan, Smartpath telah berbenah sesuai dengan
            feedback para peserta dengan cara:
          </p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              Menaruh <strong>timeline dan informasi penting</strong> di bagian
              awal agar mudah terbaca.
            </li>
            <li>
              Pengumuman diumumkan ke <strong>seluruhnya</strong>, bukan bagi
              yang lolos saja
            </li>
            <li>
              Mengirim sertifikat & benefit <strong>melalui WhatsApp</strong>,
              bukan email.
            </li>
            <li>
              Melakukan <strong>pergantian manajemen</strong> agar semua
              berjalan lebih profesional.
            </li>
          </ol>
        </section>

        {/* Apakah SmartPath Penipuan? */}
        <section className="mb-12">
          <h2 className="text-[#0056A3] font-bold text-2xl md:text-3xl mb-4">
            Jadi, Apakah SmartPath Penipuan?
          </h2>
          <p className="mb-4">
            Hingga kini, 300k+ orang telah merasakan manfaat Smartpath, 38 orang
            terbantu dengan beasiswa dan puluhan lapangan kerja terbuka (cek:{" "}
            <a
              href="https://www.linkedin.com/company/smartpath-id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0056A3] hover:underline"
            >
              https://www.linkedin.com/company/smartpath-id
            </a>
            ).
          </p>
          <p className="mb-4">
            Kami berterimakasih kepada channel resmi{" "}
            <strong>Maba Universitas Padjadjaran 2025</strong>, yang sebelumnya
            terkena hoax, akhirnya klarifikasi bahwa itu tidak benar.
          </p>
        </section>

        {/* Klarifikasi Unpad */}
        <section className="mb-12">
          {/* <h2 className="text-[#0056A3] font-bold text-2xl md:text-3xl mb-4">
            Klarifikasi dari Channel Resmi Maba Unpad
          </h2>
          <p className="mb-4">
            Berikut adalah ilustrasi bukti klarifikasi yang telah dilakukan oleh
            pihak terkait:
          </p> */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-xl rounded-2xl overflow-hidden border border-[#E0E7FF] shadow-sm bg-[#F8FAFC]">
              <Image
                src="/assets/clarify/buktiss.png"
                alt="Bukti klarifikasi hoaks dari channel resmi"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-[#0056A3] font-bold text-2xl md:text-3xl mb-4">
            Dampak positif SmartPath
          </h2>
          <p className="mb-4">
            <strong>Testimoni Beasiswa</strong>
          </p>
          <p className="mb-4">
            Berikut adalah beberapa testimoni dari para penerima beasiswa
            SmartPath:
          </p>
          <div className="mt-5">
            <TestimonialsSlider />
          </div>
        </section>

        {/* Aksi Berbagi SmartPath */}
        <section className="mb-12">
          <h2 className="text-[#0056A3] font-bold text-2xl md:text-3xl mb-4">
            Aksi Berbagi SmartPath
          </h2>
          <p className="mb-4">
            Kami juga <strong>aktif berbagi untuk sesama </strong>Ini bisa
            terwujud berkat dukungan kalian
          </p>
          <a
            href="https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MDUzMzE4MzQyNDIyMzY0?story_media_id=3759834270551758638_58443842517&igsh=b2QyOXhzbnozdWZ0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#0056A3] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#004080] transition"
          >
            Lihat Aksi Berbagi Smartpath
          </a>
        </section>

        {/* Bukti Nyata dan Publikasi */}
        <section className="mb-12">
          <h2 className="text-[#0056A3] font-bold text-2xl md:text-3xl mb-4">
            Bukti Nyata dan Publikasi Media
          </h2>
          <p className="mb-4">
            SmartPath diliput <strong>media terpercaya</strong> dan influencer
            yang kredibel yang tidak akan menyebar berita hoax.
          </p>

          <div className="my-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-center">
            <a
              href="https://www.cnbcindonesia.com/tech/20231202143220-37-494002/smartpath-hilangkan-kegalauan-anak-muda-dalam-berkarier"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <Image
                src="/assets/home/published-on/cnbc.svg"
                alt="CNBC"
                width={140}
                height={80}
                className="opacity-90 hover:opacity-100 transition"
              />
            </a>

            <a
              href="https://kumparan.com/kanalbali/hadirkan-smartpath-mahasiswa-upn-yogya-beri-solusi-spesifik-kembangkan-karir-21kQ2zxhWzP"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <Image
                src="/assets/home/published-on/kumparan.svg"
                alt="Kumparan"
                width={140}
                height={80}
                className="opacity-90 hover:opacity-100 transition"
              />
            </a>

            <a
              href="https://rri.co.id/index.php/denpasar/nasional/467631/cek-ini-top-3-pertamuda-seed-and-scale-2023"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <Image
                src="/assets/home/published-on/rri.svg"
                alt="RRI"
                width={140}
                height={80}
                className="opacity-90 hover:opacity-100 transition"
              />
            </a>

            <a
              href="https://www.idntimes.com/life/education/beasiswa-smartpath-2024-00-l17j4-xc84f9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <Image
                src="/assets/home/published-on/idntimes.svg"
                alt="IDN Times"
                width={140}
                height={80}
                className="opacity-90 hover:opacity-100 transition"
              />
            </a>

            <a
              href="https://m.tribunnews.com/pendidikan/2023/08/31/beasiswa-smartpath-2023-untuk-siswa-sma-smk-hingga-mahasiswa-simak-syaratnya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <Image
                src="/assets/home/published-on/tribunnews.svg"
                alt="Tribun News"
                width={140}
                height={80}
                className="opacity-90 hover:opacity-100 transition"
              />
            </a>

            <a
              href="https://www.cnnindonesia.com/ekonomi/20250711190525-625-1249757/pertamina-ajak-generasi-muda-berwirausaha-lewat-pgtc-2025/amp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <Image
                src="/assets/home/published-on/cnn.svg"
                alt="CNN"
                width={140}
                height={80}
                className="opacity-90 hover:opacity-100 transition"
              />
            </a>
          </div>
        </section>

        {/* Kerja Sama Influencer */}
        <section className="mb-12">
          {/* <h2 className="text-[#0056A3] font-bold text-2xl md:text-3xl mb-4">
            Kolaborasi dengan Influencer Kredibel
          </h2>
          <p className="mb-4">
            Selain publikasi di media, SmartPath juga telah bekerja sama dengan
            berbagai <strong>influencer karier yang kredibel</strong> seperti
            Vina Muliana, Anindhyta Arsa, Sadam Permana, dan lainnya dalam
            menyebarkan konten edukasi seputar pengembangan karier, beasiswa,
            dan dunia kerja.
          </p>
          <p className="mb-4">
            Dokumentasi kolaborasi tersebut dapat dilihat melalui highlight
            Instagram resmi SmartPath.
          </p> */}
          <a
            href="https://www.instagram.com/stories/highlights/17846072658552457/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#0056A3] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#004080] transition"
          >
            Lihat Bukti Kerja Sama Influencer
          </a>
        </section>

        {/* Penutup */}
        <section className="mb-4">
          <h2 className="text-[#0056A3] font-bold text-2xl md:text-3xl mb-4">
            Penutup
          </h2>
          <p className="mb-4">
            Demikian isu bahwa <strong>SmartPath penipuan</strong>{" "}
            <strong>tidak benar</strong>.
          </p>
          <p className="mb-4">
            Terima kasih kepada seluruh pihak yang telah mendukung perjalanan
            SmartPath hingga sejauh ini.
          </p>
          {/* <p>
            Semoga klarifikasi ini dapat membantu meluruskan informasi dan
            menjadi dasar kepercayaan yang lebih kuat di masa depan.
          </p> */}
        </section>
      </article>

      {/* Compensation Section */}
      <section
        id="kompensasi"
        className="bg-gray-50 py-16 md:py-20 px-6 md:px-12"
      >
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#0B2540]">
            Klaim Kompensasi Anda
          </h2> */}
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Sebagai permintaan maaf, kami memberi{" "}
            <strong>kompensasi Rp 100.000/orang.</strong> Silakan klaim melalui:
          </p>
          <div className="mt-6">
            <a
              href="https://forms.gle/NR19uM1F1BMZgom18"
              className="inline-block bg-[#F7C948] text-[#0B2540] font-bold px-10 py-4 rounded-xl shadow-lg hover:bg-[#f5b700] transition text-lg"
            >
              Klik untuk klaim kompensasi
            </a>
          </div>
        </div>
      </section>

      {/* Footer Clarify Page */}
      <footer className="bg-[#F7C948] text-center py-8">
        <p className="text-gray-900 font-semibold">
          © {new Date().getFullYear()} SmartPath — Klarifikasi Resmi Program
          Beasiswa.
        </p>
      </footer>
    </main>
  );
}
