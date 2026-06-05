import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Online-Shop",
  description: "Online-Shop built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased bg-background`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
