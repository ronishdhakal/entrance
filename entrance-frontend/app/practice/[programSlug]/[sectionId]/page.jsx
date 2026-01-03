"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Loader2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PracticeTopicFilter } from "@/components/question/PracticeTopicFilter"
import { PracticeQuestionViewer } from "@/components/question/PracticeQuestionViewer"
import { fetchSectionsByProgram, fetchAllQuestions } from "@/utils/admin-api"

export default function PracticePage() {
  const params = useParams()
  const router = useRouter()

  const programSlug = params.programSlug
  const sectionId = Number.parseInt(params.sectionId)

  const [sections, setSections] = useState([])
  const [allQuestions, setAllQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [currentSection, setCurrentSection] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({ topic: null, sub_topic: null })

  // Get program ID from slug (you may need to adjust based on your API)
  const [programId, setProgramId] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Fetch sections to find program ID
        const sectionsData = await fetchSectionsByProgram(1) // Will need to get actual program ID
        setSections(sectionsData)

        const section = sectionsData.find((s) => s.id === sectionId)
        if (!section) {
          setError("Section not found")
          return
        }

        setCurrentSection(section)
        setProgramId(section.program)

        // Fetch all questions for this section
        const questionsData = await fetchAllQuestions({
          section: sectionId,
        })
        setAllQuestions(questionsData || [])
        setFilteredQuestions(questionsData || [])
      } catch (err) {
        console.error("Error loading practice data:", err)
        setError("Failed to load practice questions")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [sectionId])

  // Apply topic/subtopic filters
  useEffect(() => {
    let filtered = allQuestions

    if (filters.topic) {
      filtered = filtered.filter((q) => q.topic === filters.topic)
    }

    if (filters.sub_topic) {
      filtered = filtered.filter((q) => q.sub_topic === filters.sub_topic)
    }

    setFilteredQuestions(filtered)
  }, [filters, allQuestions])

  const handleFilter = (newFilters) => {
    setFilters(newFilters)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="size-10 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !currentSection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p className="text-muted-foreground mb-4">{error || "Section not found"}</p>
          <Button asChild>
            <Link href={`/program/${programSlug}`}>
              <ArrowLeft className="mr-2 size-4" />
              Back to Program
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-6 max-w-md">
          <h2 className="text-lg font-semibold mb-2">No Questions</h2>
          <p className="text-muted-foreground mb-4">No questions available for the selected filters</p>
          <Button asChild>
            <Link href={`/program/${programSlug}`}>
              <ArrowLeft className="mr-2 size-4" />
              Back to Program
            </Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
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

          <h1 className="text-3xl md:text-4xl font-bold mb-2">Practice - {currentSection?.title}</h1>
          <p className="text-muted-foreground">
            {filteredQuestions.length} question{filteredQuestions.length !== 1 ? "s" : ""} available
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <PracticeTopicFilter sectionId={sectionId} onFilter={handleFilter} />
            </div>
          </div>

          {/* Question Viewer */}
          <div className="lg:col-span-3">
            <PracticeQuestionViewer questions={filteredQuestions} sectionTitle={currentSection?.title} />
          </div>
        </div>
      </div>
    </div>
  )
}
