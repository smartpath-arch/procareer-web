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
    title: "Procareer Mission",
    description: "Deskripsi mission procareer (hardcode local)",
    instruction: "Instruksi mission (hardcode local)",
    isActive: true,
    posters: [
      {
        id: "p1",
        title: "Poster 1",
        description: "Deskripsi poster 1",
        imageUrl: "/assets/poster-1.png",
        order: 1,
      },
      {
        id: "p2",
        title: "Poster 2",
        description: "Deskripsi poster 2",
        imageUrl: "/assets/poster-2.png",
        order: 2,
      },
    ],
    caption: {
      content: `    *📢Magang Resmi SkillSpace – DIBUKA!*

    🎯 Link Testimoni &  Daftar: https://s.id/InternSS1
    Internship hanya dibuka setahun sekali,
    Persiapkan dirimu sebaik mungkin!

    ___________
    📢About Us!
    SkillSpace (by PT Jalur Cerdas Internasional)
    adalah edutech yang membantu gen Z cepat berkarier di bidang
    data dan AI.
    Kami telah berpartner dengan instansi besar seperti Reddoorz,
    Glints, Dana, dan lainnya.

    *💰BENEFIT:*
    1. Peluang menjadi Parttime & Fulltime (Gaji 3-9 jt/bulan)
    2. Peluang rekomendasi kerja di Top Company
    3. Konversi Magang Kampus
    4. WFH 3 bulan, dan Waktu kerja fleksibel

    *💼Posisi:*
    1. Administration & Finance
    2. Human Resource
    3. Public Relation
    4. Social Media Specialist
    5. Social Media Specialist
    6. IT Developer
    Dan 9 posisi lainnya...

    🔒Deadline: 14 Februari 2026
    *⚠️ Kuota terbatas, ditutup lebih awal jika penuh!*

    ⚠️Waspada atas Hoax Penipuan mengatasnamakan lembaga resmi SkillSpace
    ___
    📱Instagram: https://www.instagram.com/skillspace.id/
    Website: https://skillspace.id/
    ✉️Email: admin@skillspace.id`,
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
  return HARDCODE_MISSIONS[missionKey] || null;
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
            // imageSrc={`${process.env.NEXT_PUBLIC_API_URL}${poster.imageUrl}`}
            // filePath={`${process.env.NEXT_PUBLIC_API_URL}${poster.imageUrl}`}
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
