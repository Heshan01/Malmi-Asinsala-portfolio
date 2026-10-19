import type { Metadata } from "next";
import "./globals.css";
import "./reference-home.css";
import AmbientParticles from "./ambient-particles";

export const metadata: Metadata = {
  title: "Malmi Asinsala Konara | Portfolio",
  description:
    "The portfolio of Malmi Asinsala Konara, an undergraduate in Social Studies in Indigenous Knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><AmbientParticles />{children}</body>
    </html>
  );
}
