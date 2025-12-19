import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroSection from "@/components/home/HeroSection"
import ProgramsSection from "@/components/home/ProgramsSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import StatsSection from "@/components/home/StatsSection"
import CTASection from "@/components/home/CTASection"

export const metadata = {
  title: "Entrance Prep by College Info Nepal",
  description:
    "Prepare for BSc CSIT, BIT, BBA and other entrance exams with smart mock tests, real exam patterns, practice questions, and expert guidance by College Info Nepal.",

  // ✅ Google Search Console Verification (BEST PLACE)
  other: {
    "google-site-verification":
      "In_u6RGEpUbj3PhoaLjXNsloEjIUZ2cXTcYqfLi_iYU",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <ProgramsSection />
        <FeaturesSection />
        <StatsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  )
}
