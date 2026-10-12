import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.omartorbi.engineer"),
  title: {
    default: "Omar Torbi — Software & DevOps Engineer | Portfolio",
    template: "%s | Omar Torbi",
  },
  description:
    "Official portfolio of Omar Torbi. Software & DevOps Engineer specializing in Spring Boot, Docker, Linux, OCI Cloud Architecture, Distributed Systems, and Web 3D CAD.",
  keywords: [
    "Omar Torbi",
    "Omar Torbi Portfolio",
    "Omar Torbi Software Engineer",
    "Omar Torbi DevOps Engineer",
    "Omar Torbi EMSI",
    "Omar Torbi OCI",
    "Software Engineer",
    "DevOps Engineer",
    "Spring Boot",
    "Docker",
    "Linux",
    "Oracle Cloud Infrastructure",
    "Cloud Systems Architecture",
    "EMSI Rabat",
  ],
  authors: [{ name: "Omar Torbi", url: "https://www.omartorbi.engineer" }],
  creator: "Omar Torbi",
  publisher: "Omar Torbi",
  alternates: {
    canonical: "https://www.omartorbi.engineer",
  },
  openGraph: {
    title: "Omar Torbi — Software & DevOps Engineer",
    description:
      "Official portfolio of Omar Torbi. Software & DevOps Engineer specializing in Spring Boot, Docker, Linux, OCI Cloud Systems, and Web 3D CAD.",
    url: "https://www.omartorbi.engineer",
    siteName: "Omar Torbi — Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/card.svg",
        width: 1200,
        height: 630,
        alt: "Omar Torbi — Software & DevOps Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Torbi — Software & DevOps Engineer",
    description:
      "Official portfolio of Omar Torbi. Software & DevOps Engineer specializing in Spring Boot, Docker, Linux, and OCI Cloud.",
    images: ["/card.svg"],
    creator: "@omartorbi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.omartorbi.engineer/#person",
      name: "Omar Torbi",
      givenName: "Omar",
      familyName: "Torbi",
      url: "https://www.omartorbi.engineer",
      image: "https://www.omartorbi.engineer/icon-512x512.png",
      jobTitle: "Software & DevOps Engineer",
      description:
        "Software & DevOps Engineer specializing in Spring Boot, Docker, Linux, OCI Cloud Architecture, Distributed Systems, and Web 3D CAD.",
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "EMSI Rabat",
      },
      knowsAbout: [
        "Java",
        "Spring Boot",
        "DevOps",
        "Docker",
        "Linux",
        "Oracle Cloud Infrastructure",
        "OCI Certified DevOps Professional",
        "OCI Certified Architect Professional",
        "Distributed Systems",
        "Three.js",
      ],
      sameAs: [
        "https://github.com/TORBIomar",
        "https://linkedin.com/in/omar-torbi",
        "https://www.omartorbi.engineer",
      ],
    },
    {
      "@type": "Organization",
      "@id": "https://www.omartorbi.engineer/#organization",
      name: "Omar Torbi",
      url: "https://www.omartorbi.engineer",
      logo: {
        "@type": "ImageObject",
        url: "https://www.omartorbi.engineer/icon-512x512.png",
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://github.com/TORBIomar",
        "https://linkedin.com/in/omar-torbi",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.omartorbi.engineer/#website",
      url: "https://www.omartorbi.engineer",
      name: "Omar Torbi — Official Portfolio",
      description: "Official engineering portfolio of Omar Torbi.",
      publisher: {
        "@id": "https://www.omartorbi.engineer/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      data-theme="dark"
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="48x48" href="/icon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/icon-96x96.png" />
        <link rel="icon" type="image/png" sizes="144x144" href="/icon-144x144.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#fcfcfc] dark:bg-[#000000] text-[#1a1a1a] dark:text-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
