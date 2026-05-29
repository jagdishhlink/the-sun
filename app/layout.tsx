import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../src/styles/globals.css";
import { businessData, aiContent } from "@/data/site-data";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: `${businessData.name} — ${aiContent.tagline}`,
  description: aiContent.metaDescription,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-body antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
