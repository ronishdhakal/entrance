import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import HeroSection from "@/components/home/HeroSection"
import ProgramsSection from "@/components/home/ProgramsSection"
import FeaturesSection from "@/components/home/FeaturesSection"
import StatsSection from "@/components/home/StatsSection"
import CTASection from "@/components/home/CTASection"

export const metadata = {
  title: "MockTest Nepal - BIT, BCA, BSc CSIT, CMAT Practice",
  description:
    "Nepal's leading mock test platform for entrance exams. Practice for BIT, BCA, BSc CSIT, and CMAT with 100+ questions per program.",
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
