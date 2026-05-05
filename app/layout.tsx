import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "LAVANDA — handcrafted log homes since 1995",
  description:
    "Будівництво будинків із дикого зрубу за канадською технологією. Преміальні резиденції в Україні та Європі.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} bg-[#0F0F0F] font-sans text-[#EAE7E1] antialiased`}>
        {children}
      </body>
    </html>
  );
}
