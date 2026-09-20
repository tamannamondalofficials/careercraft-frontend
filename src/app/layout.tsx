import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#4f46e5",
};

export const metadata: Metadata = {
  title: "CareerCraft — Free ATS Resume Builder | Land More Interviews",
  description: "Create recruiter-approved, ATS-friendly resumes in 5 minutes. 100% free PDF export, no watermarks, no signup required. Made for freshers, developers, and career switchers.",
  keywords: [
    "free resume builder",
    "ATS friendly resume",
    "software engineer resume",
    "resume templates",
    "free PDF resume",
    "recruiter approved resume",
    "career switcher resume",
    "fresher resume"
  ],
  authors: [{ name: "CareerCraft" }],
  openGraph: {
    title: "CareerCraft — Free ATS Resume Builder",
    description: "Build a recruiter-approved resume in 5 minutes. 100% free PDF export, no watermarks, no credit card required.",
    type: "website",
    locale: "en_US",
    siteName: "CareerCraft",
  },
  twitter: {
    card: "summary_large_image",
    title: "CareerCraft — Free ATS Resume Builder",
    description: "Build a recruiter-approved resume in 5 minutes. 100% free PDF export, no watermarks, no credit card required.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" }
    ],
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
