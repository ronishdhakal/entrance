"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Head from "next/head"
import { X } from "lucide-react"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProgramHeader from "@/components/program/ProgramHeader"
import ProgramMockTests from "@/components/program/ProgramMockTests"
import { PracticeSections } from "@/components/question/PracticeSections"
import ProgramInquiry from "@/components/inquiry/ProgramInquiry"

import { API_URL } from "@/lib/api-config"
import { fetchPublicSectionsByProgram } from "@/utils/api"

export default function ProgramDetailPage() {
  const { slug } = useParams()

  const [program, setProgram] = useState(null)
  const [sections, setSections] = useState([])
  const [mockTests, setMockTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showInquiry, setShowInquiry] = useState(false)

  useEffect(() => {
    if (!slug) return

    const fetchProgramData = async () => {
      try {
        setLoading(true)

        /* PROGRAM (PUBLIC) */
        const programResponse = await fetch(
          `${API_URL}/programs/${slug}/`,
          { cache: "no-store" }
        )

        if (!programResponse.ok) {
          throw new Error("Program not found")
        }

        const programData = await programResponse.json()
        setProgram(programData)

        /* MOCK TESTS (PUBLIC) */
        const mockTestsResponse = await fetch(
          `${API_URL}/mocktests/?program=${programData.id}`,
          { cache: "no-store" }
        )

        if (mockTestsResponse.ok) {
          const mockTestsData = await mockTestsResponse.json()
          setMockTests(mockTestsData)
        }

        /* SECTIONS (PUBLIC — NO AUTH) */
        const sectionsData = await fetchPublicSectionsByProgram(programData.id)
        setSections(sectionsData)
      } catch (err) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchProgramData()
  }, [slug])

  const pageTitle = program
    ? `${program.abbreviation} - Entrance Mock Test, Old Question`
    : "Entrance Mock Test - College Info Nepal"

  const pageDescription = program
    ? `Practice ${program.title} entrance mock tests and old questions based on real exam patterns.`
    : "Prepare for entrance exams with mock tests and old questions."

  return (
    <div className="min-h-screen bg-background">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Head>

      <Navbar />

      {/* LOADING */}
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">
              Loading program details...
            </p>
          </div>
        </div>
      )}

      {/* ERROR */}
      {!loading && (error || !program) && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">
              Program Not Found
            </h2>
            <p className="text-muted-foreground mb-4">
              {error ||
                "The program you're looking for doesn't exist."}
            </p>
            <Link href="/" className="text-primary hover:underline">
              Go back to home
            </Link>
          </div>
        </div>
      )}

      {/* CONTENT */}
      {!loading && program && (
        <>
          <ProgramHeader program={program} />

          {/* CTA */}
          <section className="max-w-4xl mx-auto px-4 mt-6 text-center">
            <p className="text-gray-600 mb-4">
              Confused about eligibility, syllabus, or preparation
              strategy for <strong>{program.title}</strong>?
            </p>

            <button
              onClick={() => setShowInquiry(true)}
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
            >
              Ask a Question
            </button>
          </section>

          {/* PRACTICE SECTIONS */}
          {sections.length > 0 && (
            <section className="py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <PracticeSections
                  sections={sections}
                  programSlug={slug}
                />
              </div>
            </section>
          )}

          <ProgramMockTests mockTests={mockTests} />
          <Footer />
        </>
      )}

      {/* INQUIRY MODAL */}
      {showInquiry && program && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="relative bg-white w-full max-w-lg rounded-xl p-6">
            <button
              onClick={() => setShowInquiry(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              aria-label="Close inquiry"
            >
              <X size={20} />
            </button>

            <ProgramInquiry program={program} />
          </div>
        </div>
      )}
    </div>
  )
}
