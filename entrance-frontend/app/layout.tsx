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
   GLOBAL METADATA (SEO + ICON)
   =============================== */
export const metadata: Metadata = {
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
