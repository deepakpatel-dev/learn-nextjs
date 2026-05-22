import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Routing Exploration",
  description: "Learning Next.js App Router — routing, nested routing, dynamic routes, route groups, and catch-all routes",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="bg-gray-900 text-gray-400 text-center text-sm py-4">
          Next.js Routing Exploration — App Router
        </footer>
      </body>
    </html>
  );
}
