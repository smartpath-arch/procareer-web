import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "ProCareer", template: "%s • ProCareer" },
  description: "CV Standar Top Company Dibuatkan Langsung oleh HRD",
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <main>{children}</main>
    </div>
  );
}
