import type { Metadata } from "next";
import { Share_Tech_Mono } from "next/font/google";
import "./globals.css";

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
    <html lang="en">
      <body className={font.className}>
        <main className="container mx-auto">{children}</main>
      </body>
    </html>
  );
}
