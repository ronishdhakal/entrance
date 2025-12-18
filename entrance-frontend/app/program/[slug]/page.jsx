"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Head from "next/head"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ProgramHeader from "@/components/program/ProgramHeader"
import ProgramMockTests from "@/components/program/ProgramMockTests"
import { API_URL } from "@/lib/api-config"

export default function ProgramDetailPage() {
  const { slug } = useParams()

  const [program, setProgram] = useState(null)
  const [mockTests, setMockTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
          `${API_URL}/mocktests/?program=${slug}`
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

  /* ===============================
     HEAD META (CLIENT SIDE)
     =============================== */
  const pageTitle = program
    ? `${program.abbreviation} - Entrance Mock Test, Old Question`
    : "Entrance Mock Test - College Info Nepal"

  const pageDescription = program
    ? `Practice ${program.name} entrance mock tests and old questions based on real exam patterns. Prepare confidently with College Info Nepal.`
    : "Prepare for entrance exams with mock tests and old questions by College Info Nepal."

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ SINGLE HEAD – ALWAYS PRESENT */}
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
          <ProgramMockTests mockTests={mockTests} />
          <Footer />
        </>
      )}
    </div>
  )
}
