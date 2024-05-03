import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const font = Share_Tech_Mono({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "Mind The Blog",
  description: "A smart reminder of your favorite blogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-thesme="light">
      <body className={font.className}>
        <Navbar />
        <main className="container mx-auto">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
