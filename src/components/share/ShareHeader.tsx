import Image from "next/image";

export default function ShareHeader() {
  return (
    <header className="bg-white rounded-2xl shadow-md p-6">
      <div className="inline-flex gap-4">
        <Image
          src="/assets/icon/icon.png"
          alt="SmartPath Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
        <div>
          <p className="text-sm text-gray-600 tracking-wide">
            SKILLSPACE INTERNSHIP MISSION
          </p>
          <h1 className="text-2xl text-gray-600 font-bold mt-1">
            Poster Internship SkillSpace
          </h1>
          <p className="mt-3 text-gray-600">
            Tempat khusus untuk download <b>Poster</b>, dan <b>copy caption</b>{" "}
            yang dipakai untuk misi dari SkillSpace
          </p>
        </div>
      </div>

      <p className="mt-4 text-gray-700">
        <b>Instruksi misi:</b> sebar poster resmi + caption ke{" "}
      </p>
    </header>
  );
}
