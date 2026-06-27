import type { Metadata } from "next";
import "./globals.css";
import StarField from "@/components/StarField";
import { AuthProvider } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Nakshatra — Vedic astrology, numerology, tarot, and Vastu",
  description:
    "One birth profile. Every tradition. Vedic astrology, numerology, tarot, and Vastu Shastra readings calculated from real astronomical data, interpreted in your own language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="ch-cosmic-bg" />
        <StarField />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
