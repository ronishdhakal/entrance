"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Loader2, ArrowLeft } from "lucide-react"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PracticeTopicFilter } from "@/components/question/PracticeTopicFilter"
import { PracticeQuestionViewer } from "@/components/question/PracticeQuestionViewer"

import {
  fetchPrograms,
  fetchSectionsByProgram,
  fetchAllQuestions,
} from "@/utils/admin-api"

export default function PracticePage() {
  const { programSlug, sectionId } = useParams()
  const sectionIdNum = Number(sectionId)

  const [currentSection, setCurrentSection] = useState(null)
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [filters, setFilters] = useState({ topic: null, sub_topic: null })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // 1️⃣ Fetch all programs
        const programs = await fetchPrograms()
        const program = programs.find((p) => p.slug === programSlug)

        if (!program) {
          setError("Program not found")
          return
        }

        // 2️⃣ Fetch sections of this program
        const sections = await fetchSectionsByProgram(program.id)
        const section = sections.find((s) => s.id === sectionIdNum)

        if (!section) {
          setError("Section not found")
          return
        }

        setCurrentSection(section)

        // 3️⃣ Fetch questions of this section
        const qs = await fetchAllQuestions({ section: sectionIdNum })
        setQuestions(qs || [])
        setFilteredQuestions(qs || [])
      } catch (err) {
        console.error("Practice page load error:", err)
        setError("Failed to load practice questions")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [programSlug, sectionIdNum])

  // 🔍 Apply topic / sub-topic filters
  useEffect(() => {
    let result = questions

    if (filters.topic) {
      result = result.filter((q) => q.topic === filters.topic)
    }

    if (filters.sub_topic) {
      result = result.filter((q) => q.sub_topic === filters.sub_topic)
    }

    setFilteredQuestions(result)
  }, [filters, questions])

  /* LOADING */
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="size-10 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    )
  }

  /* ERROR */
  if (error || !currentSection) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Card className="p-6 max-w-md">
            <h2 className="text-lg font-semibold mb-2">Error</h2>
            <p className="text-muted-foreground mb-4">
              {error || "Section not found"}
            </p>
            <Button asChild>
              <Link href={`/program/${programSlug}`}>
                <ArrowLeft className="mr-2 size-4" />
                Back to Program
              </Link>
            </Button>
          </Card>
        </div>
        <Footer />
      </>
    )
  }

  /* NO QUESTIONS */
  if (filteredQuestions.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <Card className="p-6 max-w-md">
            <h2 className="text-lg font-semibold mb-2">No Questions</h2>
            <p className="text-muted-foreground mb-4">
              No questions available for this section.
            </p>
            <Button asChild>
              <Link href={`/program/${programSlug}`}>
                <ArrowLeft className="mr-2 size-4" />
                Back to Program
              </Link>
            </Button>
          </Card>
        </div>
        <Footer />
      </>
    )
  }

  /* CONTENT */
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-background">
        <div className="container max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-4">
              <Link href={`/program/${programSlug}`}>
                <ArrowLeft className="mr-2 size-4" />
                Back to Program
              </Link>
            </Button>

            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Practice – {currentSection.title}
            </h1>
            <p className="text-muted-foreground">
              {filteredQuestions.length} question
              {filteredQuestions.length !== 1 && "s"}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <PracticeTopicFilter
                  sectionId={sectionIdNum}
                  onFilter={setFilters}
                />
              </div>
            </div>

            {/* Questions */}
            <div className="lg:col-span-3">
              <PracticeQuestionViewer
                questions={filteredQuestions}
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
