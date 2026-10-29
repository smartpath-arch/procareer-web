import PosterDownloadCard from "@/components/share/PosterDownloadCard";
import CaptionCard from "@/components/share/CaptionCard";
import ShareHeader from "@/components/share/ShareHeader";
import { Lock } from "lucide-react";

type MissionResponse = {
  missionKey: string;
  title: string;
  description: string;
  instruction: string;
  isActive: boolean;
  posters: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    order: number;
  }[];
  caption?: {
    content: string;
  };
};

const HARDCODE_MISSIONS: Record<string, MissionResponse> = {
  procareer: {
    missionKey: "procareer",
    title: "Beasiswa Procareer",
    description: "",
    instruction:
      "Share poster 1 + caption ke 5 grup WhatsApp (20+ anggota) atau 10 grup WhatsApp (5+ anggota).",
    isActive: true,
    posters: [
      {
        id: "p1",
        title: "Beasiswa Procareer",
        description: "Beasiswa Procareer",
        imageUrl: "/assets/beasiswa.png",
        order: 1,
      },
    ],
    caption: {
      content: `*💰TOTAL BEASISWA/SEMESTER: RP 12.000.000
📢Beasiswa Resmi ProCareer – DIBUKA!*

🎯 35 Pendaftar Pertama mendapat jalur prioritas!
https://s.id/BeasiswaPC26

Beasiswa hanya dibuka setahun sekali

⚠️ Kuota terbatas! Ditutup lebih awal jika penuh!

—-----
📢About Us!
ProCareer
membantu membangun CV standar Top Company & Career Preparation yang dirancang langsung oleh HRD berpengalaman.

🎁BENEFIT LAINNYA:
⭐Peluang rekomendasi kerja di Top Company (Diakui HRD)
⭐Sertifikat Nasional
⭐Peluang Paid Internship di ProCareer & Konversi SKS

📌PERSYARATAN:
- Wajib lolos seleksi (online)
- Tidak ada syarat IPK, prestasi, dan Motivation Letter

👥KATEGORI:
- Mahasiswa
- Umum
- Siswa SMA/K
Daftar di:
https://s.id/BeasiswaPC26

Cek guidebook di: https://s.id/guidebookPCbeasiswa1
.
⚠️Waspada atas penipuan yang mengatasnamakan lembaga resmi ProCareer

📱Instagram: https://www.instagram.com/procareer.official/
Website: https://procareer.id/
✉️Email: admin@procareer.id
📞WhatsApp: +62 851-2290-3009`,
    },
  },

  cv: {
    missionKey: "CV",
    title: "CV ProCareer",
    description: "",
    instruction:
      "Share poster CV + caption ke grup WhatsApp sesuai instruksi misi.",
    isActive: true,
    posters: [
      {
        id: "cv1",
        title: "Poster CV",
        description: "Poster CV ProCareer",
        imageUrl: "/assets/poster_cv.png",
        order: 1,
      },
    ],
    caption: {
      content: `*📢CV Kamu Dibuatkan oleh HRD Agar Lolos Top Company *

🎯Daftar di:
https://s.id/CVProCareer

Cocok untuk kamu yang ingin cepat dapat kerja di Top Company!

*💡BENEFIT:*
💠Sertifikat Internasional
💠Peluang Disalurkan Kerja Sesuai Bidangmu
💠1 on 1 Consultation & Grup Info Loker/Magang

*Mentors from:*
Glints, Pertamina, Unilever, dll.

⚠️Kuota terbatas!
*Gratis untuk 25 orang terpilih!*
ditutup lebih awal jika penuh

👉 Daftar sekarang:
https://s.id/CVProCareer

📱 WhatsApp: +62 851-2290-3009
💻Instagram: https://www.instagram.com/procareer/official/
🌐Website: https://procareer.id/
✉️Email: admin@procareer.id`,
    },
  },
};

async function getMission(missionKey: string): Promise<MissionResponse | null> {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/poster-mission/${missionKey}`,
  //   { cache: "no-store" },
  // );

  // if (!res.ok) {
  //   return null;
  // }

  // const json = await res.json();
  // return json.data;

  const normalizedKey = missionKey.toLowerCase();

  return HARDCODE_MISSIONS[normalizedKey] || null;
}

export default async function SharePage({
  params,
}: {
  params: Promise<{ missionKey: string }>;
}) {
  const { missionKey } = await params;
  const mission = await getMission(missionKey);

  if (!mission) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg text-center space-y-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              Mission Not Found
            </h1>
            <p className="text-gray-500">
              The poster mission you are looking for does not exist or the link
              is invalid.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (!mission.isActive) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full p-8 rounded-2xl shadow-lg text-center space-y-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">
              {mission.title}
            </h1>
            <div className="inline-block px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
              Mission Closed
            </div>
            <p className="text-gray-500">
              This poster mission is no longer active. You can no longer
              download materials from this link.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <div className="mx-auto px-4 space-y-10 max-w-4xl">
        <ShareHeader
          title={mission.title}
          description={mission.description}
          instruction={mission.instruction}
        />

        {mission.posters.map((poster, index) => (
          <PosterDownloadCard
            key={poster.id}
            number={index + 1}
            title={poster.title}
            description={poster.description}
            imageSrc={poster.imageUrl}
            filePath={poster.imageUrl}
          />
        ))}

        {mission.caption && (
          <CaptionCard
            title="Caption Poster Sharing"
            description="Copy caption dan kirim bersama poster"
            caption={mission.caption.content}
          />
        )}
      </div>
    </main>
  );
}
