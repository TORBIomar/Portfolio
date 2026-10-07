import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Omar Torbi — Software & DevOps Engineer",
  description: "Portfolio of Omar Torbi. Final-year Computer Science & Networks engineer at EMSI Rabat. OCI Certified DevOps & Architect Professional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased scroll-smooth`}
      data-theme="dark"
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-[#fafafa] selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
