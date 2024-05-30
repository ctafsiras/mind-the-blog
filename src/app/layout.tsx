import type { Metadata } from "next";
import { Poppins as Font } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";
import { Navbar } from "@/components/component/navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";

const font = Font({ subsets: ["latin"], weight: ["400"] });

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
      <Analytics />
      <SpeedInsights />
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="container mx-auto">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
