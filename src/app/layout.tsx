import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "BMU Maritime Law, Session: 2025-2026",
  description: "Maritime Law 8th Batch — Bangladesh Maritime University",
  openGraph: {
    title: "BMU Maritime Law, Session: 2025-2026",
    description: "Maritime Law 8th Batch — Bangladesh Maritime University",
    images: [
      {
        url: "/logo.jpeg",
        width: 1080,
        height: 1080,
        alt: "Maritime Law Batch Logo",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMU Maritime Law, Session: 2025-2026",
    description: "Maritime Law 8th Batch — Bangladesh Maritime University",
    images: ["/logo.jpeg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased bg-background">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
