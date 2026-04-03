import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair-next",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant-next",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-next",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aria & Ethan — Wedding Invitation",
  description:
    "You are cordially invited to celebrate the joyful union of Aria & Ethan on October 12, 2026. Join us for a day filled with love, laughter, and cherished memories.",
  openGraph: {
    title: "Aria & Ethan — Wedding Invitation",
    description: "Join us to celebrate our special day — October 12, 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body className="min-h-screen antialiased bg-cream">
        {children}
      </body>
    </html>
  );
}
