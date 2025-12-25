import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "SkillSpace", template: "%s • SkillSpace" },
  description: "Bantu freshgraduate cepat berkarir di bidang Data & AI",
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
