import { notFound } from "next/navigation"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProgramHeader from "@/components/program/ProgramHeader"
import ProgramMockTests from "@/components/program/ProgramMockTests"
import ProgramOldQuestions from "@/components/program/ProgramOldQuestions"
import { PracticeSections } from "@/components/question/PracticeSections"
import ProgramInquiryButton from "@/components/program/ProgramInquiryButton"

import { API_URL } from "@/lib/api-config"
import { fetchPublicSectionsByProgram } from "@/utils/api"

/* ─────────────────────────────────────────────
   Server-side data helpers
───────────────────────────────────────────── */
async function getProgram(slug) {
  const res = await fetch(`${API_URL}/programs/${slug}/`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return null
  return res.json()
}

async function getMockTests(programId) {
  const res = await fetch(`${API_URL}/mocktests/?program=${programId}`, {
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []
  return res.json()
}

/* ─────────────────────────────────────────────
   generateMetadata — per-program SEO
───────────────────────────────────────────── */
export async function generateMetadata({ params }) {
  const { slug } = await params
  const program = await getProgram(slug)

  if (!program) {
    return { title: "Program Not Found" }
  }

  const title = `Free ${program.abbreviation} Entrance Preparation – Mock Tests & Old Questions`
  const description = `Practice ${program.title} entrance exam with free mock tests and real old questions. Prepare smarter with College Info Nepal.`
  const url = `https://entrance.collegeinfonepal.com/program/${slug}`

  return {
    title,
    description,
    keywords: [
      `${program.abbreviation} entrance exam`,
      `${program.abbreviation} mock test`,
      `${program.abbreviation} old questions`,
      `${program.title} preparation`,
      "entrance exam Nepal",
      "College Info Nepal",
    ],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  }
}

/* ─────────────────────────────────────────────
   Page (Server Component)
───────────────────────────────────────────── */
export default async function ProgramDetailPage({ params }) {
  const { slug } = await params
  const program = await getProgram(slug)

  if (!program) notFound()

  // Fetch secondary data in parallel after program resolves
  const [mockTests, sections] = await Promise.all([
    getMockTests(program.id),
    fetchPublicSectionsByProgram(program.id),
  ])

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: program.title,
    description: `Free entrance exam preparation for ${program.title} including mock tests and old questions.`,
    provider: {
      "@type": "Organization",
      name: "College Info Nepal",
      url: "https://entrance.collegeinfonepal.com",
    },
    url: `https://entrance.collegeinfonepal.com/program/${slug}`,
  }

  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Navbar />

      <ProgramHeader program={program} />

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 mt-6 text-center">
        <p className="text-gray-600 mb-4">
          Confused about eligibility, syllabus, or preparation strategy for{" "}
          <strong>{program.title}</strong>?
        </p>
        <ProgramInquiryButton program={program} />
      </section>

      {/* PRACTICE SECTIONS */}
      {sections.length > 0 && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PracticeSections sections={sections} programSlug={slug} />
          </div>
        </section>
      )}

      {/* MOCK TESTS */}
      <ProgramMockTests mockTests={mockTests} />

      {/* OLD QUESTIONS */}
      <ProgramOldQuestions mockTests={mockTests} />

      <Footer />
    </div>
  )
}
