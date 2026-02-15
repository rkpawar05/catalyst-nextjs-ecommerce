import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Catalyst E-Commerce",
    template: "%s | Catalyst E-Commerce",
  },
  description:
    "Modern e-commerce platform built with Next.js 15, featuring server-side rendering, Redux state management, and secure authentication.",
  keywords: [
    "ecommerce",
    "online shopping",
    "Next.js",
    "React",
    "Redux",
    "shopping cart",
  ],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
    siteName: "Catalyst E-Commerce",
    title: "Catalyst E-Commerce",
    description:
      "Modern e-commerce platform with server-side rendering and secure authentication",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Catalyst E-Commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catalyst E-Commerce",
    description: "Modern e-commerce platform built with Next.js 15",
    images: ["/og-image.png"],
    creator: "@yourusername",
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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: "your-google-verification-code",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
