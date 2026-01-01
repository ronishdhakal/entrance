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
import ProgramInquiry from "@/components/inquiry/ProgramInquiry"

import { API_URL } from "@/lib/api-config"

export default function ProgramDetailPage() {
  const { slug } = useParams()

  const [program, setProgram] = useState(null)
  const [mockTests, setMockTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // ✅ Inquiry popup state
  const [showInquiry, setShowInquiry] = useState(false)

  useEffect(() => {
    if (!slug) return

    const fetchProgramData = async () => {
      try {
        setLoading(true)

        const programResponse = await fetch(`${API_URL}/programs/${slug}/`)
        if (!programResponse.ok) throw new Error("Program not found")
        const programData = await programResponse.json()
        setProgram(programData)

        const mockTestsResponse = await fetch(
          `${API_URL}/mocktests/?program=${programData.id}`
        )

        if (mockTestsResponse.ok) {
          const mockTestsData = await mockTestsResponse.json()
          setMockTests(mockTestsData)
        }
      } catch (err) {
        setError(err.message)
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
            <h2 className="text-2xl font-bold mb-2">Program Not Found</h2>
            <p className="text-muted-foreground mb-4">
              {error || "The program you're looking for doesn't exist."}
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
              Confused about eligibility, syllabus, or preparation strategy for{" "}
              <strong>{program.title}</strong>?
            </p>

            <button
              onClick={() => setShowInquiry(true)}
              className="inline-flex items-center justify-center bg-primary text-white px-6 py-3 rounded-md font-medium hover:opacity-90 transition"
            >
              Ask a Question
            </button>
          </section>

          <ProgramMockTests mockTests={mockTests} />
          <Footer />
        </>
      )}

      {/* ✅ PROGRAM INQUIRY MODAL */}
      {showInquiry && program && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
          <div className="relative bg-white w-full max-w-lg rounded-xl p-6">
            {/* Close button */}
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
