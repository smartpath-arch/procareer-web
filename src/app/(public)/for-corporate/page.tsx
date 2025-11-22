"use client";

import Lottie from "lottie-react";
import maintenanceAnimation from "../../../../public/website-maintenance.json";

export default function ForCorporate() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="max-w-md w-full">
        <Lottie animationData={maintenanceAnimation} loop={true} />
      </div>
      <div className="text-center mt-6">
        <h1 className="text-2xl font-semibold mb-2">
          Halaman Dalam Pengembangan
        </h1>
        <p className="text-muted-foreground">
          Halaman ini sedang dalam tahap pengembangan. Mohon tunggu untuk update
          selanjutnya.
        </p>
      </div>
    </section>
  );
}
