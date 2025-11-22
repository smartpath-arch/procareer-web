import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "SmartPath", template: "%s • SmartPath" },
  description: "Rebuild & Optimization",
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
