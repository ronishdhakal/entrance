import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "katex/dist/katex.min.css"
import "./globals.css"

import PopupAd from "@/components/ads/PopupAd" // ✅ POPUP AD

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

/* ===============================
   GLOBAL METADATA (SEO + OG)
   =============================== */
export const metadata: Metadata = {
  metadataBase: new URL("https://entrance.collegeinfonepal.com"),

  title: {
    default: "Entrance Prep by College Info Nepal",
    template: "%s | Entrance Prep by College Info Nepal",
  },

  description:
    "Prepare for BSc CSIT, BIT, BBA and other entrance exams with smart mock tests, real exam patterns, practice questions, and expert guidance by College Info Nepal.",

  keywords: [
    "Entrance Preparation Nepal",
    "BSc CSIT Entrance",
    "BIT Entrance Exam",
    "Mock Test Nepal",
    "College Info Nepal",
  ],

  authors: [{ name: "College Info Nepal" }],
  creator: "College Info Nepal",

  /* ===== Open Graph (Facebook, WhatsApp, LinkedIn) ===== */
  openGraph: {
    title: "Entrance Prep by College Info Nepal",
    description:
      "Practice mock tests and prepare smarter for entrance exams in Nepal with College Info Nepal.",
    url: "https://entrance.collegeinfonepal.com",
    siteName: "Entrance Prep by College Info Nepal",
    images: [
      {
        url: "/assets/social.png",
        width: 1200,
        height: 630,
        alt: "Entrance Prep by College Info Nepal – Mock Tests & Entrance Preparation",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  /* ===== Twitter / X ===== */
  twitter: {
    card: "summary_large_image",
    title: "Entrance Prep by College Info Nepal",
    description:
      "Practice mock tests and prepare smarter for entrance exams in Nepal with College Info Nepal.",
    images: ["/assets/social.jpg"],
  },

  /* ===== Icons ===== */
  icons: {
    icon: "/assets/icon.png",
    shortcut: "/assets/icon.png",
    apple: "/assets/icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 🔔 Global Popup Advertisement */}
        <PopupAd />

        {children}
      </body>
    </html>
  )
}
